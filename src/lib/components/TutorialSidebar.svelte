<script>
  import { page } from '$app/stores';
  
  // Aktuelle Route für Hervorhebung
  $: currentPath = $page.url.pathname;
  
  // Tutorial-Themen in Kategorien
  const tutorialCategories = [
    {
      title: "Grundlagen",
      topics: [
        { name: 'Was ist Stable Diffusion?', path: '/guided-tutorial/stable-diffusion-intro' },
        { name: 'Prompt-Grundlagen', path: '/guided-tutorial/prompt-basics' }
      ]
    },
    {
      title: "Fortgeschritten",
      topics: [
        { name: 'Kernparameter', path: '/guided-tutorial/core-parameters' },
        { name: 'Stile verwalten', path: '/guided-tutorial/manage-styles' }
      ]
    },
    {
      title: "Profi",
      topics: [
        { name: 'Prompt-Priorisierung', path: '/guided-tutorial/prompt-weighting' },
        { name: 'Fortgeschrittenes Prompting', path: '/guided-tutorial/advanced-prompting' }
      ]
    }
  ];
  
  // Zusatzbereich-Themen
  const advancedTopics = [
    { name: 'KI-Modelle verstehen', path: '/guided-tutorial/advanced/ai-models' },
    { name: 'Ressourcen & Deep-Dive', path: '/guided-tutorial/advanced/workflow-optimization' }
  ];
</script>

<aside class="tutorial-sidebar">
  <div class="sidebar-header">
    <h2>Guided Tutorials</h2>
  </div>
  
  <div class="sidebar-content">
    <!-- Tutorial-Kategorien -->
    {#each tutorialCategories as category}
      <div class="tutorial-navigation">
        <h3>{category.title}</h3>
        <div class="topic-buttons">
          {#each category.topics as topic}
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
    {/each}
    
    <!-- Zusatzbereich -->
    <div class="tutorial-navigation">
      <h3>Zusatzbereich</h3>
      <div class="topic-buttons">
        {#each advancedTopics as topic}
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
    flex-shrink: 0;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.3rem;
    margin: 0;
    color: #FCEA2B;
  }
  
  .sidebar-content {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1.5rem;
    /* Scrollbar stylen */
    scrollbar-width: thin;
    scrollbar-color: #333 #161616;
  }
  
  /* Webkit Scrollbar für Chrome, Safari, etc. */
  .sidebar-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .sidebar-content::-webkit-scrollbar-track {
    background: #161616;
  }
  
  .sidebar-content::-webkit-scrollbar-thumb {
    background-color: #333;
    border-radius: 3px;
  }
  
  .tutorial-navigation {
    margin-bottom: 1.5rem;
  }
  
  /* Kategorie-Stil */
  .tutorial-navigation:not(:first-of-type) {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #333333;
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
</style>
