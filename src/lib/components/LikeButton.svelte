<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {boolean} */
  export let isLiked = false;
  
  /** @type {number} */
  export let likeCount = 0;
  
  /** @type {boolean} */
  export let disabled = false;
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {string} */
  export let imageId = '';
  
  function handleClick() {
    if (disabled || loading) return;
    dispatch('toggle', { imageId, isLiked });
  }
</script>

<button 
  class="like-button"
  class:liked={isLiked}
  class:loading
  {disabled}
  on:click={handleClick}
  aria-label={isLiked ? 'Unlike image' : 'Like image'}
>
  <div class="like-content">
    {#if loading}
      <div class="spinner"></div>
    {:else}
      <svg 
        class="heart-icon" 
        viewBox="0 0 24 24" 
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    {/if}
    <span class="like-count">{likeCount}</span>
  </div>
</button>

<style>
  .like-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 8px;
    background: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 16px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(8px);
    font-size: 12px;
    font-weight: 500;
  }
  
  .like-button:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.05);
  }
  
  .like-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .like-button.loading {
    pointer-events: none;
  }
  
  .like-button.liked {
    background: rgba(239, 68, 68, 0.9);
    color: white;
  }
  
  .like-button.liked:hover:not(:disabled) {
    background: rgba(220, 38, 38, 0.9);
  }
  
  .like-content {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .heart-icon {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
  }
  
  .like-button.liked .heart-icon {
    animation: heartPulse 0.3s ease;
  }
  
  .like-count {
    font-size: 12px;
    font-weight: 600;
    min-width: 12px;
    text-align: center;
  }
  
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
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
    .like-button {
      padding: 8px 10px;
      font-size: 13px;
    }
    
    .heart-icon {
      width: 16px;
      height: 16px;
    }
    
    .like-count {
      font-size: 13px;
    }
  }
</style>
