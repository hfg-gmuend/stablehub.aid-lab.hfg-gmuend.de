<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  /** @type {'all' | 'my' | 'liked'} */
  export let activeFilter = 'all';
  
  /** @type {boolean} */
  export let isLoggedIn = false;
  
  const filters = [
    { id: 'all', label: 'All Images' },
    { id: 'liked', label: 'Most Liked' },
    { id: 'my', label: 'My Images', requiresLogin: true }
  ];
  
  function handleFilterChange(filterId) {
    if (filterId === 'my' && !isLoggedIn) {
      return; // Not available when not logged in
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
        title={filter.requiresLogin && !isLoggedIn ? 'Login required' : filter.label}
      >
        <span class="filter-label">{filter.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .gallery-filters {
    width: 100%;
    margin-bottom: 2rem;
    padding: 0;
  }
  
  .filter-container {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  
  .filter-button {
    display: flex;
    align-items: center;
    justify-content: center;
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
    white-space: nowrap;
    min-height: 44px; /* Touch-friendly */
  }
  
  .filter-button:hover:not(:disabled) {
    background: rgba(252, 234, 43, 0.15);
    border-color: #FCEA2B;
    color: #FCEA2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(252, 234, 43, 0.2);
  }
  
  .filter-button.active {
    background: linear-gradient(135deg, #FCEA2B, #FFE566);
    border-color: #FCEA2B;
    color: #121212;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(252, 234, 43, 0.3);
  }
  
  .filter-button.active:hover {
    background: linear-gradient(135deg, #FFE566, #FCEA2B);
    color: #121212; /* Schrift bleibt schwarz beim Hover des aktiven Buttons */
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(252, 234, 43, 0.4);
  }
  
  .filter-button.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(30, 30, 30, 0.4);
    border-color: rgba(68, 68, 68, 0.3);
    color: #666;
  }
  
  .filter-button.disabled:hover {
    background: rgba(30, 30, 30, 0.4);
    border-color: rgba(68, 68, 68, 0.3);
    color: #666;
    transform: none;
    box-shadow: none;
  }
  
  .filter-label {
    font-size: 0.85rem;
    font-weight: inherit;
  }
  
  /* Mobile responsive */
  @media (max-width: 768px) {
    .gallery-filters {
      margin-bottom: 1.5rem;
    }
    
    .filter-container {
      gap: 0.5rem;
    }
    
    .filter-button {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
      min-height: 40px;
    }
    
    .filter-label {
      font-size: 0.8rem;
    }
  }
  
  /* Extra kleine Bildschirme */
  @media (max-width: 480px) {
    .filter-container {
      justify-content: flex-start;
      overflow-x: auto;
      padding: 0.5rem 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
      gap: 0.5rem;
    }
    
    .filter-container::-webkit-scrollbar {
      display: none;
    }
    
    .filter-button {
      flex-shrink: 0;
      padding: 0.5rem 0.8rem;
      font-size: 0.75rem;
      min-height: 36px;
    }
    
    .filter-label {
      font-size: 0.75rem;
    }
  }
</style>
