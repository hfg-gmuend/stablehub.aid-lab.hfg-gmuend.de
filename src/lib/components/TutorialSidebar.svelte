<script>
  import { page } from '$app/stores';
  
  // Aktuelle Route für Hervorhebung
  $: currentPath = $page.url.pathname;
  
  // Tutorial-Themen
  const tutorialTopics = [
    { name: 'Was ist Stable Diffusion?', path: '/guided-tutorial/stable-diffusion-intro' },
    { name: 'Prompt-Grundlagen', path: '/guided-tutorial/prompt-basics' },
    { name: 'Steps - Wofür?', path: '/guided-tutorial/steps-purpose' },
    { name: 'Prompt Advanced', path: '/guided-tutorial/prompt-advanced' }
  ];
</script>

<aside class="tutorial-sidebar">
  <div class="sidebar-header">
    <h2>Guided Tutorials</h2>
  </div>
  
  <div class="tutorial-navigation">
    <h3>Tutorial-Themen</h3>
    <div class="topic-buttons">
      {#each tutorialTopics as topic}
        <a 
          href={topic.path} 
          class="topic-button" 
          class:active={currentPath === topic.path}
        >
          {topic.name}
        </a>
      {/each}
    </div>
  </div>
  
  <div class="tutorial-info">
    <div class="info-box">
      <h4>Tipp des Tages</h4>
      <p>Verwende spezifische Adjektive in deinen Prompts, um präzisere Bilder zu generieren.</p>
    </div>
  </div>
</aside>

<style>
  .tutorial-sidebar {
    width: 280px;
    background-color: #161616;
    border-right: 1px solid #333333;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.05);
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #333333;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.3rem;
    margin: 0;
    color: #FCEA2B;
  }
  
  .tutorial-navigation {
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
  
  .topic-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .topic-button {
    padding: 0.75rem 1rem;
    background-color: #202020;
    border-radius: 6px;
    color: #b0b0b0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
    border-left: 0 solid transparent;
  }
  
  .topic-button:hover {
    background-color: #252525;
    color: #ffffff;
    border-left: 3px solid rgba(252, 234, 43, 0.5);
  }
  
  .topic-button.active {
    background-color: #1a1a1a;
    color: #ffffff;
    border-left: 3px solid #FCEA2B;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .tutorial-info {
    margin-top: auto;
    padding: 1.5rem;
  }
  
  .info-box {
    background-color: #1d1d1d;
    border-radius: 6px;
    padding: 1rem;
    border: 1px solid #333;
  }
  
  h4 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #a0a0a0;
  }
  
  .info-box p {
    font-size: 0.85rem;
    color: #888;
    margin: 0;
    line-height: 1.4;
  }
</style>
