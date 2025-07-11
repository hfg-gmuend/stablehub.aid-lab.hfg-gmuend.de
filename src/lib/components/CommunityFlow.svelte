<script lang="ts">
  // Props for customization (optional)
  export let showNewBadge = true;
</script>

<div class="community-flow">
  <!-- Step 1: Create -->
  <div class="flow-step">
    <div class="step-number">01</div>
    <div class="step-content">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>Create & Share</h3>
      <p>Upload your AI masterpieces to the gallery</p>
    </div>
  </div>

  <!-- Flow Arrow -->
  <div class="flow-arrow">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- Step 2: Discover -->
  <div class="flow-step">
    <div class="step-number">02</div>
    <div class="step-content">
      <div class="step-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 12H18C19.1046 12 20 12.8954 20 14V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V14C8 12.8954 8.89543 12 10 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>Copy & Learn</h3>
      <p>Get inspired and copy prompts instantly</p>
    </div>
  </div>

  <!-- Flow Arrow -->
  <div class="flow-arrow">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>

  <!-- Step 3: Connect -->
  <div class="flow-step">
    <div class="step-number">03</div>
    <div class="step-content">
      <div class="step-icon heart-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>Like & Connect</h3>
      <p>Show appreciation and connect with creators</p>
      {#if showNewBadge}
        <div class="new-badge">New</div>
      {/if}
    </div>
  </div>
</div>

<style>
  /* Community Flow Design */
  .community-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4rem 0;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .flow-step {
    position: relative;
    text-align: center;
    flex: 1;
    min-width: 200px;
    max-width: 250px;
  }

  .step-number {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    background: rgba(252, 234, 43, 0.1);
    border: 2px solid rgba(252, 234, 43, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FCEA2B;
    z-index: 2;
  }

  .step-content {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 2rem 1.5rem 1.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .step-content:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(252, 234, 43, 0.2);
    transform: translateY(-4px);
  }

  .step-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: #FCEA2B;
    transition: all 0.3s ease;
  }

  .step-content:hover .step-icon {
    transform: scale(1.1);
    color: #FFE566;
  }

  .step-icon svg {
    width: 100%;
    height: 100%;
  }

  .heart-icon {
    position: relative;
  }

  .step-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #f0f0f0;
  }

  .step-content p {
    color: #a0a0a0;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.4;
  }

  .new-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(74, 222, 128, 0.1);
    border: 1px solid rgba(74, 222, 128, 0.3);
    color: #4ade80;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    animation: newBadgeGlow 2s ease-in-out infinite;
  }

  @keyframes newBadgeGlow {
    0%, 100% { 
      box-shadow: 0 0 5px rgba(74, 222, 128, 0.3);
      opacity: 0.8;
    }
    50% { 
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
      opacity: 1;
    }
  }

  .flow-arrow {
    color: rgba(252, 234, 43, 0.4);
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .flow-arrow svg {
    width: 100%;
    height: 100%;
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .community-flow {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .flow-arrow {
      transform: rotate(90deg);
    }
  }
</style>
