<script>
  import { goto } from '$app/navigation';
  
  // Props: aktiver Tab (entweder 'generate' oder 'gallery')
  export let active = 'generate';
</script>

<div class="header-bar">
  <div class="nav-tabs">
    <button 
      class="tab-button {active === 'generate' ? 'active' : ''}" 
      on:click={() => goto('/text-to-image')}>
      Generieren
    </button>
    <button 
      class="tab-button {active === 'gallery' ? 'active' : ''}" 
      on:click={() => goto('/gallery')}>
      Galerie
    </button>
  </div>
</div>

<style>
  .header-bar {
    background-color: #1e1e1e;
    padding: 0.4rem 0.5rem;
    border-radius: 0 0 6px 6px;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .nav-tabs {
    display: flex;
    gap: 0.75rem;
  }
  
  .tab-button {
    background: none;
    border: none;
    color: #b0b0b0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 0.5rem 1.25rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 100px;
    text-align: center;
  }
  
  .tab-button:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
  }
  
  .tab-button.active {
    color: #FCEA2B;
    background-color: rgba(252, 234, 43, 0.1);
    box-shadow: 0 0 0 1px rgba(252, 234, 43, 0.2);
  }
</style>
