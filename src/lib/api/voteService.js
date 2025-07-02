/**
 * Service für Vote/Like API-Kommunikation
 */

class VoteService {
  constructor() {
    this.baseUrl = 'https://playground.transferscope.org/api';
    this.isApiAvailable = true;
    this.rateLimited = false;
    this.rateLimitResetTime = null;
    
    // Caching to reduce API calls
    this.userVotesCache = new Map(); // userid -> {votes: [], timestamp: number}
    this.voteCountsCache = new Map(); // imageUrl -> votes count
    this.voteCountsCacheTimestamp = 0; // When vote counts were last loaded
    this.cacheExpiry = 60000; // 1 minute cache
  }

  /**
   * Handle rate limiting response
   * @param {Response} response 
   */
  handleRateLimit(response) {
    if (response.status === 429) {
      this.rateLimited = true;
      // Try to parse retry-after header (in seconds)
      const retryAfter = response.headers.get('Retry-After') || '60';
      this.rateLimitResetTime = Date.now() + (parseInt(retryAfter) * 1000);
      console.warn(`[VoteService] Rate limited! Will retry after ${retryAfter} seconds`);
      return true;
    }
    return false;
  }

  /**
   * Check if we're currently rate limited
   */
  isRateLimited() {
    if (!this.rateLimited) return false;
    
    if (this.rateLimitResetTime && Date.now() > this.rateLimitResetTime) {
      // Rate limit has expired
      this.rateLimited = false;
      this.rateLimitResetTime = null;
      console.log('[VoteService] Rate limit expired, resuming API calls');
      return false;
    }
    
    return true;
  }
  async checkApiAvailability() {
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
   * @param {string} imageUrl - Die vollständige URL des Bildes
   * @param {string} userid 
   */
  async addVote(imageUrl, userid) {
    if (!this.isApiAvailable || this.isRateLimited()) {
      console.log('[VoteService] Mock: Added vote for', imageUrl, this.isRateLimited() ? '(rate limited)' : '(API unavailable)');
      return; // Mock success
    }

    try {
      // Die API erwartet imageUrl und timestamp
      const response = await fetch(`${this.baseUrl}/vote`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
          imageUrl: imageUrl, // API erwartet imageUrl 
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        if (this.handleRateLimit(response)) {
          throw new Error('Rate limit exceeded');
        }
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return; // Mock success
        }
        const errorText = await response.text();
        throw new Error(`Failed to add vote: ${response.status} ${errorText}`);
      }
      
      // Invalidate caches when vote is added
      this.userVotesCache.delete(userid);
      this.voteCountsCache.clear(); // Clear vote counts cache as they changed
      this.voteCountsCacheTimestamp = 0;
      console.log(`[VoteService] Vote added for ${imageUrl}, caches invalidated for user ${userid}`);
      
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return; // Mock success
      }
      throw error;
    }
  }

  /**
   * Vote für ein Bild entfernen
   * @param {string} imageUrl - Die vollständige URL des Bildes
   * @param {string} userid 
   */
  async removeVote(imageUrl, userid) {
    if (!this.isApiAvailable || this.isRateLimited()) {
      console.log('[VoteService] Mock: Removed vote for', imageUrl, this.isRateLimited() ? '(rate limited)' : '(API unavailable)');
      return; // Mock success
    }

    try {
      // DELETE request mit imageUrl und timestamp im Body
      const response = await fetch(`${this.baseUrl}/vote`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid,
          imageUrl: imageUrl, // API erwartet imageUrl zur Identifikation
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        if (this.handleRateLimit(response)) {
          throw new Error('Rate limit exceeded');
        }
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return; // Mock success
        }
        const errorText = await response.text();
        throw new Error(`Failed to remove vote: ${response.status} ${errorText}`);
      }
      
      // Invalidate caches when vote is removed
      this.userVotesCache.delete(userid);
      this.voteCountsCache.clear(); // Clear vote counts cache as they changed
      this.voteCountsCacheTimestamp = 0;
      console.log(`[VoteService] Vote removed for ${imageUrl}, caches invalidated for user ${userid}`);
      
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return; // Mock success
      }
      throw error;
    }
  }

  /**
   * Top bewertete Bilder abrufen
   * @param {number} limit 
   * @param {string} period 
   * @returns {Promise<any[]>}
   */
  async getTopImages(limit = 20, period = 'total') {
    if (!this.isApiAvailable) {
      console.log('[VoteService] Mock: No top images (API unavailable)');
      return []; // Mock empty result
    }

    try {
      const response = await fetch(`${this.baseUrl}/votes/top?limit=${limit}&period=${period}`, {
        mode: 'cors'
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          this.isApiAvailable = false;
          console.warn('[VoteService] API not found, switching to mock mode');
          return []; // Mock empty result
        }
        const errorText = await response.text();
        throw new Error(`Failed to get top images: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return []; // Mock empty result
      }
      throw error;
    }
  }

  /**
   * Alle Votes eines Benutzers abrufen (mit Caching)
   * @param {string} userid 
   * @returns {Promise<any[]>}
   */
  async getUserVotes(userid) {
    if (!this.isApiAvailable || this.isRateLimited()) {
      console.log('[VoteService] Mock: No user votes', this.isRateLimited() ? '(rate limited)' : '(API unavailable)');
      return []; // Mock empty result
    }

    // Check cache first
    const cached = this.userVotesCache.get(userid);
    if (cached && (Date.now() - cached.timestamp) < this.cacheExpiry) {
      console.log(`[VoteService] Using cached user votes for ${userid}`);
      return cached.votes;
    }

    try {
      const response = await fetch(`${this.baseUrl}/votes/user/${userid}`, {
        mode: 'cors'
      });
      
      if (!response.ok) {
        if (this.handleRateLimit(response)) {
          throw new Error('Rate limit exceeded');
        }
        if (response.status === 404) {
          // 404 für User-Votes ist normal - bedeutet nur "User hat keine Votes"
          console.log(`[VoteService] No votes found for user ${userid} (404 - normal)`);
          const emptyVotes = [];
          // Cache empty result too
          this.userVotesCache.set(userid, {
            votes: emptyVotes,
            timestamp: Date.now()
          });
          return emptyVotes;
        }
        const errorText = await response.text();
        throw new Error(`Failed to get user votes: ${response.status} ${errorText}`);
      }

      const votes = await response.json();
      
      // Cache the result
      this.userVotesCache.set(userid, {
        votes: votes,
        timestamp: Date.now()
      });
      
      console.log(`[VoteService] Loaded and cached ${votes.length} user votes for ${userid}`);
      return votes;
      
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return []; // Mock empty result
      }
      throw error;
    }
  }

  /**
   * Vote-Statistiken abrufen (globale Stats, da API keine imageId unterstützt)
   * @returns {Promise<any>}
   */
  async getGlobalVoteStats() {
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
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn('[VoteService] CORS or network error, switching to mock mode');
        this.isApiAvailable = false;
        return { totalVotes: 0, totalImages: 0 };
      }
      throw error;
    }
  }

  /**
   * Vote-Statistiken für ein Bild abrufen 
   * @param {string} imageUrl - Die vollständige URL des Bildes
   * @param {string} [userid] 
   * @returns {Promise<{imageUrl: string, totalVotes: number, userHasVoted: boolean}>}
   */
  async getVoteStats(imageUrl, userid = null) {
    let userHasVoted = false;
    let totalVotes = 0;
    
    // User-Votes prüfen
    if (userid && this.isApiAvailable && !this.isRateLimited()) {
      try {
        const userVotes = await this.getUserVotes(userid);
        userHasVoted = userVotes.some(vote => 
          vote.imageUrl === imageUrl || 
          vote.imageUrl?.includes(imageUrl)
        );
      } catch (error) {
        console.warn('[VoteService] Could not check user votes:', error);
      }
    }

    // Echte Vote-Counts aus Cache holen
    try {
      const realVoteCounts = await this.loadRealVoteCounts();
      totalVotes = realVoteCounts.get(imageUrl) || 0;
    } catch (error) {
      console.warn('[VoteService] Could not get real vote count:', error);
      totalVotes = 0; // Default zu 0 statt random
    }

    return {
      imageUrl,
      totalVotes,
      userHasVoted
    };
  }

  /**
   * Vote-Statistiken für mehrere Bilder abrufen (Batch) - OPTIMIERT für Rate Limiting
   * @param {string[]} imageUrls - Array von vollständigen Bild-URLs
   * @param {string} [userid] 
   * @returns {Promise<Map<string, {imageUrl: string, totalVotes: number, userHasVoted: boolean}>>}
   */
  async getBatchVoteStats(imageUrls, userid = null) {
    const statsMap = new Map();
    
    // EINMALIG User-Votes laden statt für jedes Bild einzeln
    let userVoteSet = new Set();
    if (userid && this.isApiAvailable && !this.isRateLimited()) {
      try {
        console.log('[VoteService] Loading user votes once for batch operation');
        const userVotes = await this.getUserVotes(userid);
        userVoteSet = new Set(userVotes.map(vote => vote.imageUrl));
        console.log(`[VoteService] Loaded ${userVotes.length} user votes`);
      } catch (error) {
        console.warn('[VoteService] Could not load user votes for batch:', error);
        // Continue with empty set - no user votes
      }
    }

    // EINMALIG echte Vote-Counts aus der API laden (mit Cache)
    let realVoteCounts = new Map();
    try {
      realVoteCounts = await this.loadRealVoteCounts();
    } catch (error) {
      console.warn('[VoteService] Could not load real vote counts for batch:', error);
      // Continue with empty map - will use 0 for all
    }

    // Für jedes Bild Stats generieren (keine weiteren API-Calls!)
    imageUrls.forEach(imageUrl => {
      const userHasVoted = userVoteSet.has(imageUrl);
      
      // Echte Vote-Counts verwenden falls verfügbar, sonst 0
      const totalVotes = realVoteCounts.get(imageUrl) || 0;

      statsMap.set(imageUrl, {
        imageUrl,
        totalVotes,
        userHasVoted
      });
    });

    console.log(`[VoteService] Generated batch stats for ${imageUrls.length} images with ${this.isApiAvailable ? 'real' : 'mock'} data`);
    return statsMap;
  }

  /**
   * Load real vote counts from API with caching
   * @returns {Promise<Map<string, number>>}
   */
  async loadRealVoteCounts() {
    // Check cache first
    if (this.voteCountsCache.size > 0 && 
        (Date.now() - this.voteCountsCacheTimestamp) < this.cacheExpiry) {
      console.log('[VoteService] Using cached vote counts');
      return this.voteCountsCache;
    }

    if (!this.isApiAvailable || this.isRateLimited()) {
      console.log('[VoteService] API not available or rate limited, returning empty vote counts');
      return new Map();
    }

    try {
      console.log('[VoteService] Loading real vote counts from API');
      const topVotes = await this.getTopImages(100); // API limit is 100, not 1000
      const voteCounts = new Map();
      
      topVotes.forEach(item => {
        if (item.imageUrl && typeof item.votes === 'number') {
          voteCounts.set(item.imageUrl, item.votes);
        }
      });
      
      // Cache the results
      this.voteCountsCache = voteCounts;
      this.voteCountsCacheTimestamp = Date.now();
      
      console.log(`[VoteService] Loaded and cached real vote counts for ${voteCounts.size} images`);
      return voteCounts;
      
    } catch (error) {
      console.warn('[VoteService] Could not load real vote counts:', error);
      return new Map(); // Return empty map on error
    }
  }

  /**
   * Clear the caches
   * @param {string} [userid] - If specified, only clear user cache for this user
   */
  clearCache(userid = null) {
    if (userid) {
      this.userVotesCache.delete(userid);
      console.log(`[VoteService] User votes cache cleared for user ${userid}`);
    } else {
      this.userVotesCache.clear();
      console.log('[VoteService] All user votes cache cleared');
    }
    
    // Always clear vote counts cache when requested
    this.voteCountsCache.clear();
    this.voteCountsCacheTimestamp = 0;
    console.log('[VoteService] Vote counts cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    const now = Date.now();
    const userCacheStats = {
      totalEntries: this.userVotesCache.size,
      validEntries: 0,
      expiredEntries: 0
    };

    this.userVotesCache.forEach((entry) => {
      if ((now - entry.timestamp) < this.cacheExpiry) {
        userCacheStats.validEntries++;
      } else {
        userCacheStats.expiredEntries++;
      }
    });

    const voteCountsCacheValid = this.voteCountsCache.size > 0 && 
      (now - this.voteCountsCacheTimestamp) < this.cacheExpiry;

    return {
      userVotes: userCacheStats,
      voteCounts: {
        size: this.voteCountsCache.size,
        valid: voteCountsCacheValid,
        age: now - this.voteCountsCacheTimestamp
      }
    };
  }
}

export const voteService = new VoteService();
