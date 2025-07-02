<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {'all' | 'my' | 'liked' | 'newest'} */
  export let activeFilter = 'all';
  
  /** @type {boolean} */
  export let isLoggedIn = false;
  
  const filters = [
    { id: 'all', label: 'Alle Bilder', icon: '🖼️' },
    { id: 'newest', label: 'Neueste', icon: '🆕' },
    { id: 'liked', label: 'Meistgelikte', icon: '❤️' },
    { id: 'my', label: 'Meine Bilder', icon: '👤', requiresLogin: true }
  ];
  
  function handleFilterChange(filterId) {
    if (filterId === 'my' && !isLoggedIn) {
      return; // Nicht verfügbar wenn nicht eingeloggt
    }
    dispatch('filterChange', filterId);
  }
</script>

<div class="gallery-filters">
  <div class="filter-container">
    {#each filters as filter}
      <button
        class="filter-button"
        class:active={activeFilter === filter.id}
        class:disabled={filter.requiresLogin && !isLoggedIn}
        disabled={filter.requiresLogin && !isLoggedIn}
        on:click={() => handleFilterChange(filter.id)}
        title={filter.requiresLogin && !isLoggedIn ? 'Login erforderlich' : filter.label}
      >
        <span class="filter-icon">{filter.icon}</span>
        <span class="filter-label">{filter.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .gallery-filters {
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;
  }
  
  .filter-container {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  
  .filter-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    white-space: nowrap;
  }
  
  .filter-button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
  }
  
  .filter-button.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .filter-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.05);
  }
  
  .filter-icon {
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  
  .filter-label {
    font-size: 13px;
    font-weight: 600;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .gallery-filters {
      padding: 0 5px;
      margin-bottom: 15px;
    }
    
    .filter-container {
      gap: 6px;
    }
    
    .filter-button {
      padding: 6px 12px;
      font-size: 12px;
    }
    
    .filter-icon {
      font-size: 14px;
    }
    
    .filter-label {
      font-size: 11px;
    }
  }
  
  /* Extra kleine Bildschirme */
  @media (max-width: 480px) {
    .filter-container {
      justify-content: flex-start;
      overflow-x: auto;
      padding: 5px 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    
    .filter-container::-webkit-scrollbar {
      display: none;
    }
    
    .filter-button {
      flex-shrink: 0;
    }
  }
</style>
