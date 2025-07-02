<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {boolean} */
  export let isVoted = false;
  
  /** @type {number} */
  export let voteCount = 0;
  
  /** @type {boolean} */
  export let disabled = false;
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {string} */
  export let imageId = '';
  
  /** @type {'small' | 'medium' | 'large'} */
  export let size = 'medium';
  
  function handleClick() {
    if (disabled || loading) return;
    dispatch('toggle', { imageId, isVoted });
  }
</script>

<button 
  class="vote-button"
  class:voted={isVoted}
  class:loading
  class:small={size === 'small'}
  class:large={size === 'large'}
  {disabled}
  on:click={handleClick}
  aria-label={isVoted ? 'Remove vote' : 'Vote for image'}
  title={isVoted ? 'Remove vote' : 'Vote for image'}
>
  <div class="vote-content">
    {#if loading}
      <div class="spinner"></div>
    {:else}
      <img 
        src="/vote/heart.svg" 
        alt="Heart"
        class="heart-icon"
        class:voted={isVoted}
      />
    {/if}
    <span class="vote-count">{voteCount}</span>
  </div>
</button>

<style>
  .vote-button {
    display: flex;
    align-items: center;
    gap: 0.375rem; /* Etwas mehr Abstand zwischen Icon und Text */
    padding: 0.5rem 0.75rem; /* Größeres Padding für Desktop */
    background: rgba(30, 30, 30, 0.85);
    border: 1px solid rgba(68, 68, 68, 0.6);
    border-radius: 20px;
    color: #e0e0e0;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem; /* Größere Schrift für Desktop */
    font-weight: 600;
    white-space: nowrap;
  }
  
  .vote-button:hover:not(:disabled) {
    background: rgba(40, 40, 40, 0.95);
    border-color: rgba(252, 234, 43, 0.4);
    color: #FCEA2B;
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .vote-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .vote-button.loading {
    pointer-events: none;
  }
  
  .vote-button.voted {
    background: rgba(252, 234, 43, 0.9); /* Gelber Hintergrund statt rot */
    border-color: rgba(252, 234, 43, 0.6);
    color: #121212; /* Dunkle Schrift für besseren Kontrast auf gelb */
  }
  
  .vote-button.voted:hover:not(:disabled) {
    background: rgba(255, 229, 102, 0.95); /* Heller gelb beim Hover */
    border-color: rgba(255, 229, 102, 0.8);
    color: #121212; /* Schrift bleibt dunkel */
    transform: scale(1.05);
  }
  
  .vote-content {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .heart-icon {
    width: 16px; /* Größeres Icon für Desktop */
    height: 16px;
    transition: transform 0.2s ease;
    flex-shrink: 0;
    /* Keine Filter - behalte die originale gelbe Farbe des SVG */
  }
  
  /* Gevotetes Herz: rote Farbe */
  .heart-icon.voted {
    filter: brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(2497%) hue-rotate(346deg) brightness(104%) contrast(95%);
  }
  
  .vote-button.voted .heart-icon {
    animation: heartPulse 0.3s ease;
  }
  
  .vote-count {
    font-size: 0.85rem; /* Größere Schrift für Desktop */
    font-weight: 600;
    min-width: 14px; /* Etwas mehr Platz für größere Zahlen */
    text-align: center;
    line-height: 1;
  }
  
  .spinner {
    width: 16px; /* Größerer Spinner für Desktop */
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    flex-shrink: 0;
  }
  
  /* Size Variants */
  .vote-button.small {
    padding: 0.25rem 0.375rem;
    font-size: 0.6rem;
    gap: 0.2rem;
  }
  
  .vote-button.small .heart-icon {
    width: 12px;
    height: 12px;
  }
  
  .vote-button.small .vote-count {
    font-size: 0.6rem;
    min-width: 10px;
  }
  
  .vote-button.small .spinner {
    width: 12px;
    height: 12px;
    border-width: 1.5px;
  }
  
  .vote-button.large {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  }
  
  .vote-button.large .heart-icon {
    width: 16px;
    height: 16px;
  }
  
  .vote-button.large .vote-count {
    font-size: 0.875rem;
    min-width: 16px;
  }
  
  .vote-button.large .spinner {
    width: 16px;
    height: 16px;
    border-width: 2.5px;
  }
  
  /* Animations */
  @keyframes heartPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .vote-button {
      padding: 0.5rem 0.625rem;
      font-size: 0.8rem;
      min-height: 36px; /* Touch-friendly */
    }
    
    .vote-button .heart-icon {
      width: 15px;
      height: 15px;
    }
    
    .vote-button .vote-count {
      font-size: 0.8rem;
      min-width: 14px;
    }
    
    .vote-button .spinner {
      width: 15px;
      height: 15px;
    }
  }
  
  /* Focus states for accessibility */
  .vote-button:focus {
    outline: 2px solid #FCEA2B;
    outline-offset: 2px;
  }
  
  .vote-button:focus:not(:focus-visible) {
    outline: none;
  }
</style>
