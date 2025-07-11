<script>
  import { onMount } from 'svelte';
  import { voteService } from '../api/voteService.js';
  
  export let visible = false;
  
  // Props für dynamische Inhalte (bereit für API-Integration)
  export let featuredImageUrl = '';
  export let prizeAmount = '50€';
  export let awardTitle = 'Creative Excellence Award';
  export let awardDescription = 'Submit your best AI artwork and compete for recognition, prizes, and campus exhibition.';
  
  // Dynamische Berechnung der verbleibenden Tage bis Monatsende
  let daysUntilMonthEnd = 0;
  
  function calculateDaysUntilMonthEnd() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Letzter Tag des aktuellen Monats
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Berechne die Differenz in Millisekunden und wandle in Tage um
    const timeDiff = lastDayOfMonth.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  }
  
  // Aktualisiere die Tage-Anzeige
  function updateCountdown() {
    daysUntilMonthEnd = calculateDaysUntilMonthEnd();
  }
  
  // Features-Array für einfache Anpassung
  export let features = [
    { icon: '/monthlyspotlight/coin.png', label: '50€ Print Credit' },
    { icon: '/monthlyspotlight/unicorn.png', label: 'Campus Exhibition' },
    { icon: '/monthlyspotlight/star.png', label: 'Portfolio Feature' },
    { icon: '/monthlyspotlight/student.png', label: 'Creative Mentoring' }
  ];

  // Zustand für das Top-Bild
  /** @type {any} */
  let topImage = null;
  let loading = true;
  /** @type {string | null} */
  let error = null;

  /**
   * Lädt das Bild mit den meisten Votes
   */
  async function loadTopImage() {
    try {
      loading = true;
      error = null;
      
      console.log('[MonthlySpotlight] Loading top image...');
      
      // Da 'month' und 'week' 500-Fehler werfen, verwenden wir 'total'
      const topImages = await voteService.getTopImages(1, 'total');
      
      if (topImages && topImages.length > 0) {
        topImage = topImages[0];
        console.log('[MonthlySpotlight] Top image loaded:', topImage);
        
        // Wenn kein featuredImageUrl gesetzt ist, verwende das Top-Bild
        if (!featuredImageUrl && topImage.imageUrl) {
          featuredImageUrl = topImage.imageUrl;
        }
      } else {
        console.log('[MonthlySpotlight] No top images found');
      }
      
    } catch (err) {
      error = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('[MonthlySpotlight] Error loading top image:', err);
    } finally {
      loading = false;
    }
  }

  // Beim Mount das Top-Bild laden und Countdown initialisieren
  onMount(() => {
    loadTopImage();
    updateCountdown();
    
    // Aktualisiere den Countdown täglich um Mitternacht
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    // Erste Aktualisierung um Mitternacht
    setTimeout(() => {
      updateCountdown();
      
      // Dann täglich aktualisieren
      const dailyInterval = setInterval(updateCountdown, 24 * 60 * 60 * 1000);
      
      // Cleanup function für das Interval
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);
  });
</script>

<!-- Featured Monthly Winner -->
<div class="monthly-spotlight" class:visible>
  <div class="spotlight-header">
    <div class="trophy-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="spotlight-text">
      <h3>Monthly Spotlight</h3>
      <p>Win {prizeAmount} print credit & get featured at Stablehub Campus</p>
    </div>
    <div class="winner-badge">
      <span>🏆 This Month</span>
    </div>
  </div>
  
  <div class="spotlight-content">
    <div class="spotlight-main">
      <div class="spotlight-image">
        {#if loading}
          <div class="image-placeholder loading">
            <span>Loading top image...</span>
            <div class="glow-effect"></div>
          </div>
        {:else if error}
          <div class="image-placeholder error">
            <span>⚠️ Could not load image</span>
            <div class="error-text">{error}</div>
          </div>
        {:else if featuredImageUrl || topImage?.imageUrl}
          <img 
            src={featuredImageUrl || topImage.imageUrl} 
            alt="Featured artwork{topImage?.prompt ? ` - ${topImage.prompt}` : ''}" 
          />
          {#if topImage && topImage.votes}
            <div class="image-overlay">
              <div class="vote-badge">
                <span class="vote-icon">❤️</span>
                <span class="vote-count">{topImage.votes}</span>
              </div>
              {#if topImage.userid}
                <div class="prompt-badge">
                  @{topImage.userid}
                </div>
              {/if}
            </div>
          {/if}
        {:else}
          <div class="image-placeholder">
            <span>Your creation here</span>
            <div class="glow-effect"></div>
          </div>
        {/if}
      </div>
      <div class="spotlight-info">
        <h4>{awardTitle}</h4>
        <p>{awardDescription}</p>
        
        <div class="spotlight-features">
          {#each features as feature}
            <div class="feature-item">
              <img src={feature.icon} alt={feature.label} class="feature-icon" />
              <span>{feature.label}</span>
            </div>
          {/each}
        </div>

        <div class="submission-countdown">
          <div class="countdown-label">Submissions close in:</div>
          <div class="countdown-timer">
            {daysUntilMonthEnd} {daysUntilMonthEnd === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Monthly Spotlight */
  .monthly-spotlight {
    margin: 4rem auto;
    max-width: 80%;
    background: linear-gradient(135deg, rgba(252, 234, 43, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(252, 234, 43, 0.1);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }

  .monthly-spotlight.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .spotlight-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .trophy-icon {
    width: 40px;
    height: 40px;
    color: #ffd700;
    flex-shrink: 0;
  }

  .trophy-icon svg {
    width: 100%;
    height: 100%;
  }

  .spotlight-text {
    flex: 1;
  }

  .spotlight-text h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #f0f0f0;
  }

  .spotlight-text p {
    color: #a0a0a0;
    margin: 0;
    font-size: 0.95rem;
  }

  .winner-badge {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, rgba(252, 234, 43, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%);
    border: 1px solid rgba(252, 234, 43, 0.3);
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffd700;
    white-space: nowrap;
  }

  .spotlight-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .spotlight-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
  }

  .spotlight-image {
    aspect-ratio: 4/3;
    position: relative;
  }

  .spotlight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid rgba(252, 234, 43, 0.2);
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 2px dashed rgba(252, 234, 43, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-style: italic;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .image-placeholder.loading {
    border-color: rgba(252, 234, 43, 0.4);
    background: rgba(252, 234, 43, 0.02);
  }

  .image-placeholder.error {
    border-color: rgba(255, 100, 100, 0.4);
    background: rgba(255, 100, 100, 0.02);
    color: #ff6b6b;
    flex-direction: column;
    gap: 0.5rem;
  }

  .error-text {
    font-size: 0.8rem;
    color: #ff8888;
    text-align: center;
    max-width: 80%;
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg, 
      transparent 0%, 
      transparent 50%, 
      rgba(0, 0, 0, 0.7) 100%
    );
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .spotlight-image:hover .image-overlay {
    opacity: 1;
  }

  .vote-badge {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem 0.8rem;
    border-radius: 20px;
    margin-bottom: 0.5rem;
    width: fit-content;
    backdrop-filter: blur(10px);
  }

  .vote-icon {
    font-size: 1.1rem;
  }

  .vote-count {
    font-weight: 600;
    color: #fff;
    font-size: 0.9rem;
  }

  .prompt-badge {
    background: rgba(0, 0, 0, 0.8);
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    font-size: 0.85rem;
    color: #e0e0e0;
    line-height: 1.3;
    backdrop-filter: blur(10px);
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .image-placeholder:hover {
    border-color: rgba(252, 234, 43, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }

  .spotlight-info h4 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f0f0f0;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .spotlight-info p {
    color: #a0a0a0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .spotlight-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: rgba(252, 234, 43, 0.05);
    border-color: rgba(252, 234, 43, 0.2);
    transform: translateY(-2px);
  }

  .feature-icon {
    width: 28px;
    height: 28px;
    flex-shrink: 0;
  }

  .feature-item span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #d0d0d0;
  }

  .submission-countdown {
    background: rgba(252, 234, 43, 0.05);
    border: 1px solid rgba(252, 234, 43, 0.15);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }

  .countdown-label {
    font-size: 0.85rem;
    color: #a0a0a0;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .countdown-timer {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
  }

  @media (max-width: 768px) {
    /* Monthly spotlight mobile */
    .monthly-spotlight {
      max-width: 100%;
      margin: 2rem 0;
      padding: 1.5rem;
    }
    
    .spotlight-main {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .spotlight-features {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
</style>
