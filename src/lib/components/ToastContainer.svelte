<script>
  import { toasts, removeToast } from '$lib/stores/toastStore.js';
  import Toast from '$lib/components/Toast.svelte';
</script>

<div class="toast-container">
  {#each $toasts as toast (toast.id)}
    <Toast
      message={toast.message}
      type={toast.type}
      duration={toast.duration}
      visible={true}
      onClose={() => removeToast(toast.id)}
    />
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .toast-container :global(.toast) {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    .toast-container {
      left: 0;
      right: 0;
      transform: none;
    }
  }
</style>
