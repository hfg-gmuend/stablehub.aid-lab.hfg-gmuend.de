<script>
  import { page } from '$app/stores';
  
  // Aktuelle Route für Hervorhebung
  $: currentPath = $page.url.pathname;
  
  // Navigation für die Modi
  const modes = [
    { name: 'Text To Image', path: '/text-to-image' },
    { name: 'Image To Image', path: '/image-to-image' },
    { name: 'ControlNet', path: '/control-net' }
  ];
  
  // Prüfung, ob wir uns im Tutorial-Bereich befinden
  $: isInTutorialSection = currentPath.startsWith('/guided-tutorial');
</script>

<aside class="minimal-sidebar">
  <div class="sidebar-header">
    <a href="/" class="logo">
      <img src="/icon/icon.svg" alt="HfG Ai-Hub Logo" width="24" height="24" />
      <span>HfG Ai-Hub</span>
    </a>
  </div>
  
  <div class="mode-navigation">
    <h3>Modi Auswahl</h3>
    <div class="mode-buttons">
      {#each modes as mode}
        <a 
          href={mode.path} 
          class="mode-button" 
          class:active={currentPath === mode.path}
        >
          {mode.name}
        </a>
      {/each}
    </div>
  </div>
  
  <!-- Separater Abschnitt für Tutorials -->
  <div class="mode-navigation tutorial-section">
    <h3>Lernbereich</h3>
    <div class="mode-buttons">
      <a 
        href="/guided-tutorial" 
        class="mode-button" 
        class:active={isInTutorialSection}
      >
        Guided Tutorials
      </a>
    </div>
  </div>
</aside>

<style>
  .minimal-sidebar {
    width: 280px;
    background-color: #1a1a1a;
    border-right: 1px solid #333333;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #333333;
    margin-bottom: 1rem;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.2rem;
    color: #ffffff;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  
  .logo:hover {
    opacity: 0.8;
  }
  
  .logo img {
    object-fit: contain;
  }
  
  .mode-navigation {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    color: #888888;
  }
  
  .mode-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .mode-button {
    padding: 0.75rem 1rem;
    background-color: #262626;
    border-radius: 6px;
    color: #b0b0b0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
    border-right: 0 solid transparent; /* Änderung: Border rechts statt links */
  }
  
  .mode-button:hover {
    background-color: #2a2a2a;
    color: #ffffff;
    border-right: 3px solid rgba(252, 234, 43, 0.5); /* Gelber Border mit Transparenz beim Hover */
    box-shadow: 0 0 10px rgba(252, 234, 43, 0.2); /* Subtiler Glow-Effekt */
  }
  
  .mode-button.active {
    background-color: #1e1e1e;
    color: #ffffff;
    border-right: 3px solid #FCEA2B; /* Änderung: Border rechts statt links */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .tutorial-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #333333;
  }
</style>
