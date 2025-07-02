<script>
  /** @type {string} */
  export let message = 'Loading...';
  
  /** @type {'small' | 'medium' | 'large'} */
  export let size = 'medium';
  
  /** @type {string} */
  export let color = '#FCEA2B';
</script>

<div class="loading-state" class:small={size === 'small'} class:large={size === 'large'}>
  <div class="spinner" style="--spinner-color: {color}"></div>
  {#if message}
    <p class="loading-message">{message}</p>
  {/if}
</div>

<style>
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
    color: #888888;
  }
  
  .loading-state.small {
    gap: 0.5rem;
    padding: 1rem;
  }
  
  .loading-state.large {
    gap: 1.5rem;
    padding: 3rem;
    min-height: 250px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(51, 51, 51, 0.3);
    border-top: 4px solid var(--spinner-color, #FCEA2B);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  .loading-state.small .spinner {
    width: 24px;
    height: 24px;
    border-width: 3px;
  }
  
  .loading-state.large .spinner {
    width: 56px;
    height: 56px;
    border-width: 5px;
  }
  
  .loading-message {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: center;
    color: inherit;
  }
  
  .loading-state.small .loading-message {
    font-size: 0.8rem;
  }
  
  .loading-state.large .loading-message {
    font-size: 1.1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .loading-state {
      padding: 1.5rem;
    }
    
    .loading-state.large {
      padding: 2rem;
      min-height: 200px;
    }
    
    .spinner {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }
    
    .loading-message {
      font-size: 0.8rem;
    }
  }
</style>
