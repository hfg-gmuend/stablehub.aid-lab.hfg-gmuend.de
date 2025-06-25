<script>
  import { onMount } from 'svelte';
  
  /** @type {string} */
  export let message = '';
  /** @type {'success' | 'error' | 'info'} */
  export let type = 'success';
  /** @type {number} */
  export let duration = 3000;
  /** @type {boolean} */
  export let visible = false;
  /** @type {() => void} */
  export let onClose = () => {};

  let toastElement;

  onMount(() => {
    if (visible) {
      showToast();
    }
  });

  function showToast() {
    if (toastElement) {
      toastElement.classList.add('show');
      
      setTimeout(() => {
        hideToast();
      }, duration);
    }
  }

  function hideToast() {
    if (toastElement) {
      toastElement.classList.add('hiding');
      
      setTimeout(() => {
        visible = false;
        onClose();
      }, 300);
    }
  }

  $: if (visible && toastElement) {
    showToast();
  }
</script>

{#if visible}
  <div 
    bind:this={toastElement}
    class="toast toast-{type}"
    on:click={hideToast}
  >
    <div class="toast-content">
      <div class="toast-icon">
        {#if type === 'success'}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {:else if type === 'error'}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {/if}
      </div>
      <span class="toast-message">{message}</span>
    </div>
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    z-index: 9999;
    
    display: flex;
    align-items: center;
    gap: 1rem;
    
    min-width: 300px;
    max-width: 500px;
    padding: 1rem 1.5rem;
    
    background: rgba(24, 24, 24, 0.95);
    border: 1px solid rgba(252, 234, 43, 0.3);
    border-radius: 12px;
    
    color: #e0e0e0;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    
    backdrop-filter: blur(15px);
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(252, 234, 43, 0.1);
    
    transform: translateX(-50%) translateY(100px) scale(0.9);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    cursor: pointer;
  }

  .toast.show {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }

  .toast.hiding {
    transform: translateX(-50%) translateY(100px) scale(0.8);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
  }

  .toast-success {
    border-left: 4px solid #FCEA2B;
    background: rgba(24, 24, 24, 0.95);
    animation: successPulse 0.6s ease-out;
  }

  .toast-success .toast-icon {
    color: #FCEA2B;
  }

  .toast-error {
    border-left: 4px solid #ff6b6b;
    background: rgba(30, 20, 20, 0.95);
    animation: errorShake 0.5s ease-out;
  }

  .toast-error .toast-icon {
    color: #ff6b6b;
  }

  .toast-info {
    border-left: 4px solid #6bb6ff;
    background: rgba(20, 25, 30, 0.95);
    animation: infoBounce 0.6s ease-out;
  }

  .toast-info .toast-icon {
    color: #6bb6ff;
  }

  .toast-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .toast-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .toast-icon svg {
    width: 100%;
    height: 100%;
  }

  .toast-message {
    line-height: 1.4;
  }

  .toast:hover {
    transform: translateX(-50%) translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(252, 234, 43, 0.3);
  }

  /* Mobile responsivity */
  @media (max-width: 768px) {
    .toast {
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      min-width: auto;
      max-width: none;
      transform: translateX(0) translateY(100px) scale(0.9);
    }

    .toast.show {
      transform: translateX(0) translateY(0) scale(1);
    }

    .toast.hiding {
      transform: translateX(0) translateY(100px) scale(0.8);
    }

    .toast:hover {
      transform: translateX(0) translateY(-4px) scale(1.01);
    }
  }

  /* Animation for better UX */
  @keyframes successPulse {
    0% {
      transform: translateX(-50%) translateY(100px) scale(0.8);
      box-shadow: 0 0 0 0 rgba(252, 234, 43, 0.7);
    }
    50% {
      transform: translateX(-50%) translateY(-5px) scale(1.05);
      box-shadow: 0 0 0 10px rgba(252, 234, 43, 0);
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(1);
      box-shadow: 0 0 0 0 rgba(252, 234, 43, 0);
    }
  }

  @keyframes errorShake {
    0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-48%) translateY(0) scale(1); }
    20%, 40%, 60%, 80% { transform: translateX(-52%) translateY(0) scale(1); }
  }

  @keyframes infoBounce {
    0% {
      transform: translateX(-50%) translateY(100px) scale(0.3);
    }
    50% {
      transform: translateX(-50%) translateY(-10px) scale(1.1);
    }
    70% {
      transform: translateX(-50%) translateY(5px) scale(0.95);
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(1);
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-50%) translateY(100px) scale(0.9);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(100px) scale(0.8);
      opacity: 0;
    }
  }
</style>
