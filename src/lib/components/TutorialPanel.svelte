<script>
  export let title;
  export let description;
</script>

<div class="tutorial-panel">
  <div class="panel-header">
    <h1>{title}</h1>
    <p class="description">{description}</p>
  </div>
  
  <div class="panel-content">
    <slot />
  </div>
  
  <div class="panel-navigation">
    <button class="nav-button prev">← Vorheriges Thema</button>
    <button class="nav-button next">Nächstes Thema →</button>
  </div>
</div>

<style>
  .tutorial-panel {
    background-color: #1a1a1a;
    border-radius: 10px;
    margin: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 4rem);
    overflow: hidden;
  }
  
  .panel-header {
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #333;
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.8rem;
    margin: 0 0 0.5rem;
    color: #e0e0e0;
  }
  
  .description {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    color: #a0a0a0;
    margin: 0;
  }
  
  .panel-content {
    padding: 2rem;
    flex-grow: 1;
    overflow-y: auto;
  }
  
  .panel-navigation {
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    border-top: 1px solid #333;
  }
  
  .nav-button {
    background-color: #262626;
    border: none;
    border-radius: 6px;
    color: #e0e0e0;
    padding: 0.75rem 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .nav-button.next {
    background-color: #2a2a2a;
    color: #FCEA2B;
  }
  
  .nav-button:hover {
    background-color: #333;
  }
  
  .nav-button.next:hover {
    background-color: #3a3a3a;
    transform: translateX(3px);
  }
  
  .nav-button.prev:hover {
    transform: translateX(-3px);
  }
</style>
