<script>
  export let visible = false;
  
  // Props für dynamische Inhalte (bereit für API-Integration)
  export let featuredImageUrl = '';
  export let winnerName = '';
  export let prizeAmount = '50€';
  export let countdownDays = '12 days';
  export let awardTitle = 'Creative Excellence Award';
  export let awardDescription = 'Submit your best AI artwork and compete for recognition, prizes, and campus exhibition.';
  
  // Features-Array für einfache Anpassung
  export let features = [
    { icon: '💰', label: '50€ Print Credit' },
    { icon: '🖼️', label: 'Campus Exhibition' },
    { icon: '⭐', label: 'Portfolio Feature' },
    { icon: '🎯', label: 'Creative Mentoring' }
  ];
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
        {#if featuredImageUrl}
          <img src={featuredImageUrl} alt="Featured artwork by {winnerName}" />
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
              <div class="feature-icon">{feature.icon}</div>
              <span>{feature.label}</span>
            </div>
          {/each}
        </div>

        <div class="submission-countdown">
          <div class="countdown-label">Submissions close in:</div>
          <div class="countdown-timer">{countdownDays}</div>
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

  .image-placeholder:hover {
    border-color: rgba(252, 234, 43, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }

  .glow-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(252, 234, 43, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: glowPulse 3s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
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
    font-size: 1.2rem;
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
