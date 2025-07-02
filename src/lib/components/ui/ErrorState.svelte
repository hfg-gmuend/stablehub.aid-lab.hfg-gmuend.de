<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {string} */
  export let message = 'Something went wrong';
  
  /** @type {string} */
  export let details = '';
  
  /** @type {boolean} */
  export let showRetry = true;
  
  /** @type {string} */
  export let retryText = 'Retry';
  
  /** @type {'small' | 'medium' | 'large'} */
  export let size = 'medium';
  
  function handleRetry() {
    dispatch('retry');
  }
</script>

<div class="error-state" class:small={size === 'small'} class:large={size === 'large'}>
  <div class="error-icon">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  </div>
  
  <div class="error-content">
    <h3 class="error-message">{message}</h3>
    {#if details}
      <p class="error-details">{details}</p>
    {/if}
  </div>
  
  {#if showRetry}
    <button class="retry-button" on:click={handleRetry}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M3 21v-5h5"/>
      </svg>
      {retryText}
    </button>
  {/if}
</div>

<style>
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;
    text-align: center;
    color: #ff8a8a;
  }
  
  .error-state.small {
    gap: 1rem;
    padding: 1rem;
  }
  
  .error-state.large {
    gap: 2rem;
    padding: 3rem;
    min-height: 250px;
  }
  
  .error-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
  }
  
  .error-state.small .error-icon svg {
    width: 32px;
    height: 32px;
  }
  
  .error-state.large .error-icon svg {
    width: 64px;
    height: 64px;
  }
  
  .error-content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
  }
  
  .error-message {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.1rem;
    font-weight: 600;
    color: #ff8a8a;
  }
  
  .error-state.small .error-message {
    font-size: 0.9rem;
  }
  
  .error-state.large .error-message {
    font-size: 1.3rem;
  }
  
  .error-details {
    margin: 0;
    font-size: 0.85rem;
    color: #cc6666;
    line-height: 1.4;
  }
  
  .error-state.small .error-details {
    font-size: 0.75rem;
  }
  
  .error-state.large .error-details {
    font-size: 0.95rem;
  }
  
  .retry-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(30, 30, 30, 0.8);
    color: #e0e0e0;
    border: 1px solid rgba(68, 68, 68, 0.6);
    border-radius: 8px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .retry-button:hover {
    background: rgba(252, 234, 43, 0.15);
    border-color: #FCEA2B;
    color: #FCEA2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(252, 234, 43, 0.2);
  }
  
  .retry-button svg {
    transition: transform 0.3s ease;
  }
  
  .retry-button:hover svg {
    transform: rotate(180deg);
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .error-state {
      padding: 1.5rem;
    }
    
    .error-state.large {
      padding: 2rem;
      min-height: 200px;
    }
    
    .error-message {
      font-size: 1rem;
    }
    
    .error-details {
      font-size: 0.8rem;
    }
    
    .retry-button {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
      min-height: 40px; /* Touch-friendly */
    }
  }
</style>
