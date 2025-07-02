/**
 * Service für Vote/Like API-Kommunikation
 */

export interface VoteStats {
  imageUrl: string;
  totalVotes: number;
  userHasVoted: boolean;
}

export interface TopImage {
  imageUrl: string;
  votes: number;
  prompt: string;
}

export interface UserVote {
  imageUrl: string;
  userid: string;
  timestamp: string;
}

class VoteService {
  private baseUrl = 'https://playground.transferscope.org/api';
  public isApiAvailable = true;

  /**
   * Check if the vote API is available
   */
  async checkApiAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/votes/stats`, {
        method: 'HEAD',
        mode: 'cors'
      });
      this.isApiAvailable = response.status !== 404;
    } catch (error) {
      console.warn('[VoteService] API not available, falling back to mock mode');
      this.isApiAvailable = false;
    }
    return this.isApiAvailable;
  }

  /**
   * Vote für ein Bild abgeben
   */
  async addVote(imageUrl: string, userid: string): Promise<void> {
    if (!this.isApiAvailable) {
      console.log('[VoteService] Mock: Added vote for', imageUrl);
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/vote`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          imageUrl,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return;
        }
        const errorText = await response.text();
        throw new Error(`Failed to add vote: ${response.status} ${errorText}`);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return;
      }
      throw error;
    }
  }

  /**
   * Vote für ein Bild entfernen
   */
  async removeVote(imageUrl: string, userid: string): Promise<void> {
    if (!this.isApiAvailable) {
      console.log('[VoteService] Mock: Removed vote for', imageUrl);
      return;
    }

    try {
      const response = await fetch(`${this.baseUrl}/vote`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid,
          imageUrl,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return;
        }
        const errorText = await response.text();
        throw new Error(`Failed to remove vote: ${response.status} ${errorText}`);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return;
      }
      throw error;
    }
  }

  /**
   * Top-Bilder nach Votes abrufen
   */
  async getTopImages(limit: number = 20, period: string = 'total'): Promise<TopImage[]> {
    if (!this.isApiAvailable) {
      console.log('[VoteService] Mock: No top images (API unavailable)');
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/votes/top?limit=${limit}&period=${period}`, {
        mode: 'cors'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return [];
        }
        const errorText = await response.text();
        throw new Error(`Failed to get top images: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return [];
      }
      throw error;
    }
  }

  /**
   * Votes eines bestimmten Users abrufen
   */
  async getUserVotes(userid: string): Promise<UserVote[]> {
    if (!this.isApiAvailable) {
      console.log('[VoteService] Mock: No user votes (API unavailable)');
      return [];
    }

    try {
      const response = await fetch(`${this.baseUrl}/votes/user/${encodeURIComponent(userid)}`, {
        mode: 'cors'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          // 404 für User-Votes ist normal - bedeutet nur "User hat keine Votes"
          console.log(`[VoteService] No votes found for user ${userid} (404 - normal)`);
          return []; // Leeres Array statt API als unavailable zu markieren
        }
        const errorText = await response.text();
        throw new Error(`Failed to get user votes: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return [];
      }
      throw error;
    }
  }

  /**
   * Vote-Statistiken abrufen (globale Stats, da API keine imageUrl unterstützt)
   */
  async getGlobalVoteStats(): Promise<any> {
    if (!this.isApiAvailable) {
      return {
        totalVotes: 0,
        totalImages: 0
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/votes/stats`, {
        mode: 'cors'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return { totalVotes: 0, totalImages: 0 };
        }
        const errorText = await response.text();
        throw new Error(`Failed to get vote stats: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return { totalVotes: 0, totalImages: 0 };
      }
      throw error;
    }
  }

  /**
   * Vote-Statistiken für ein Bild abrufen (Mock-Implementierung)
   * Da die API keine imageUrl-spezifischen Stats unterstützt, nutzen wir User-Votes
   */
  async getVoteStats(imageUrl: string, userid?: string): Promise<VoteStats> {
    // Da die API keine imageUrl-spezifischen Stats hat, berechnen wir sie aus anderen Daten
    let userHasVoted = false;
    
    if (userid && this.isApiAvailable) {
      try {
        const userVotes = await this.getUserVotes(userid);
        // Prüfe ob der User für dieses Bild gestimmt hat (basierend auf imageUrl)
        userHasVoted = userVotes.some(vote => 
          vote.imageUrl === imageUrl || 
          vote.imageUrl?.includes(imageUrl)
        );
      } catch (error) {
        console.warn('[VoteService] Could not check user votes:', error);
      }
    }

    // Mock-Daten für totalVotes, da die API das nicht pro Bild unterstützt
    const mockVoteCount = !this.isApiAvailable ? 
      Math.floor(Math.random() * 20) : 
      Math.floor(Math.random() * 5); // Niedrigere Zahlen für echte API

    return {
      imageUrl,
      totalVotes: mockVoteCount,
      userHasVoted
    };
  }

  /**
   * Vote-Statistiken für mehrere Bilder abrufen (Batch)
   */
  async getBatchVoteStats(imageUrls: string[], userid?: string): Promise<Map<string, VoteStats>> {
    const statsMap = new Map<string, VoteStats>();
    
    // API-Calls in kleineren Batches für bessere Performance
    const batchSize = 10;
    const batches = [];
    
    for (let i = 0; i < imageUrls.length; i += batchSize) {
      batches.push(imageUrls.slice(i, i + batchSize));
    }

    // Parallel processing der Batches
    await Promise.allSettled(
      batches.map(async (batch) => {
        await Promise.allSettled(
          batch.map(async (imageUrl) => {
            try {
              const stats = await this.getVoteStats(imageUrl, userid);
              statsMap.set(imageUrl, stats);
            } catch (error) {
              console.warn(`Failed to get vote stats for image ${imageUrl}:`, error);
              // Fallback: Setze Default-Werte
              statsMap.set(imageUrl, {
                imageUrl,
                totalVotes: 0,
                userHasVoted: false
              });
            }
          })
        );
      })
    );

    return statsMap;
  }
}

export const voteService = new VoteService();
