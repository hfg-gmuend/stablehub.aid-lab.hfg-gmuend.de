<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<div class="copilot-button-container">
  <button class="copilot-button" on:click={() => dispatch('click')}>
    <svg viewBox="0 0 24 24" class="copilot-icon">
      <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3M17,12V10H15V12H17M13,12V10H11V12H13M9,12V10H7V12H9Z" />
    </svg>
  </button>
</div>

<style>
  .copilot-button-container {
    position: relative;
    display: inline-block;
  }
  
  .copilot-button {
    background-color: #2a2a2a;
    border: 1px solid #444;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .copilot-button:hover {
    background-color: #333;
    border-color: #FCEA2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(252, 234, 43, 0.2);
  }
  
  .copilot-icon {
    width: 20px;
    height: 20px;
    fill: #FCEA2B;
  }
</style>
