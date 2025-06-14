<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // Mobile tutorial sidebar state
  let isMobileTutorialOpen = false;

  // Current route for highlighting
  $: currentPath = $page.url.pathname;

  // Tutorial topics in categories
  const tutorialCategories = [
    {
      title: "Basics", // Translated from "Grundlagen"
      topics: [
        // Assuming target page title is "What is Stable Diffusion?"
        { name: 'What is Stable Diffusion?', path: '/guided-tutorial/stable-diffusion-intro' },
        // Assuming target page title is "Prompt Basics"
        { name: 'Prompt Basics', path: '/guided-tutorial/prompt-basics' }
      ]
    },
    {
      title: "Intermediate", // Translated from "Fortgeschritten"
      topics: [
        // Assuming target page title is "Core Parameters"
        { name: 'Core Parameters', path: '/guided-tutorial/core-parameters' },
        // Matching the translated page title
        { name: 'Manage Styles', path: '/guided-tutorial/manage-styles' }
      ]
    },
    {
      title: "Advanced", // Translated from "Profi"
      topics: [
        // Matching the translated page title
        { name: 'Prompt Prioritization & Weighting', path: '/guided-tutorial/prompt-weighting' },
        // Assuming target page title is "Advanced Prompting"
        { name: 'Advanced Prompting', path: '/guided-tutorial/advanced-prompting' }
      ]
    }
  ];

  // Extra topics
  const advancedTopics = [
    // Matching the translated page title
    { name: 'Understanding AI Models', path: '/guided-tutorial/advanced/ai-models' },
    // Matching the translated page title
    { name: 'Resources & Deep-Dive', path: '/guided-tutorial/advanced/workflow-optimization' }
  ];

  // Toggle mobile tutorial sidebar
  function toggleMobileTutorial() {
    isMobileTutorialOpen = !isMobileTutorialOpen;
  }

  // Close mobile tutorial sidebar when clicking on a topic
  function handleTopicClick() {
    isMobileTutorialOpen = false;
  }

  // Close tutorial sidebar when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    const sidebar = document.querySelector('.tutorial-sidebar');
    const button = document.querySelector('.mobile-tutorial-button');
    
    if (isMobileTutorialOpen && sidebar && button && 
        !sidebar.contains(target) && !button.contains(target)) {
      isMobileTutorialOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<!-- Mobile Tutorial Button (visible only on mobile) -->
<button 
  class="mobile-tutorial-button" 
  class:hidden={isMobileTutorialOpen}
  on:click={toggleMobileTutorial}
  aria-label="Toggle tutorial navigation"
>
  <svg viewBox="0 0 24 24" class="tutorial-icon">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
</button>

<!-- Mobile Overlay -->
{#if isMobileTutorialOpen}
  <div class="mobile-overlay"></div>
{/if}

<aside class="tutorial-sidebar" class:mobile-open={isMobileTutorialOpen}>
  <div class="sidebar-header">
    <div class="header-title">
      <img src="/icon/tutorial.svg" alt="Tutorial Icon" class="tutorial-header-icon" />
      <h2>Guided Tutorials</h2>
    </div>
    <!-- Close button for mobile -->
    <button 
      class="mobile-close-button" 
      on:click={toggleMobileTutorial}
      aria-label="Close tutorial navigation"
    >
      ✕
    </button>
  </div>
  
  <div class="sidebar-content">
    <!-- Tutorial Categories -->
    {#each tutorialCategories as category}
      <div class="tutorial-navigation">
        <h3>{category.title}</h3>
        <div class="topic-buttons">
          {#each category.topics as topic}
            <a 
              href={topic.path} 
              class="topic-button" 
              class:active={currentPath === topic.path}
              on:click={handleTopicClick}
            >
              {topic.name}
            </a>
          {/each}
        </div>
      </div>
    {/each}
    
    <!-- Extra Section -->
    <div class="tutorial-navigation">
      <h3>Extras</h3> <!-- Translated from "Zusatzbereich" -->
      <div class="topic-buttons">
        {#each advancedTopics as topic}
          <a 
            href={topic.path} 
            class="topic-button" 
            class:active={currentPath === topic.path}
            on:click={handleTopicClick}
          >
            {topic.name}
          </a>
        {/each}
      </div>
    </div>
  </div>
</aside>

<style>
  /* Mobile Tutorial Button */
  .mobile-tutorial-button {
    display: none;
    position: fixed;
    top: 1rem;
    left: 5rem; /* Next to the burger menu */
    z-index: 900;
    background-color: #1a1a1a; /* Gleiche Farbe wie Burger-Menü */
    border: 1px solid #333; /* Gleiche Border wie Burger-Menü */
    border-radius: 6px; /* Gleicher Border-Radius wie Burger-Menü */
    padding: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease; /* Gleiche Transition wie Burger-Menü */
    width: 50px; /* Gleiche Breite wie Burger-Menü */
    height: 50px; /* Gleiche Höhe wie Burger-Menü */
    align-items: center;
    justify-content: center;
  }

  /* Tutorial-Button ausblenden wenn Tutorial-Sidebar geöffnet ist */
  .mobile-tutorial-button.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
  }

  .mobile-tutorial-button:hover {
    background-color: #333;
    border-color: #FCEA2B;
  }

  .tutorial-icon {
    width: 20px; /* Gleiche Größe wie Burger-Lines */
    height: 20px;
    fill: #e0e0e0;
    transition: fill 0.3s ease; /* Gleiche Transition-Dauer */
  }

  .mobile-tutorial-button:hover .tutorial-icon {
    fill: #FCEA2B;
  }

  /* Mobile Overlay */
  .mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1009; /* Knapp unter der Tutorial-Sidebar aber über den Buttons */
  }

  /* Mobile Close Button */
  .mobile-close-button {
    display: none;
    background: none;
    border: none;
    color: #888;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.25rem;
    transition: color 0.2s ease;
  }

  .mobile-close-button:hover {
    color: #FCEA2B;
  }

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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .tutorial-header-icon {
    width: 28px;
    height: 28px;
    /* Removed CSS filter to preserve natural SVG colors */
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.3rem;
    margin: 0;
    color: #ffffff;
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
    font-size: 1rem; /* Vergrößert von Standard-Größe */
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

  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .mobile-tutorial-button {
      display: flex;
    }

    .mobile-overlay {
      display: block;
    }

    .mobile-close-button {
      display: block;
    }

    .tutorial-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 320px;
      height: 100vh;
      height: 100dvh;
      z-index: 1010; /* Erhöht über beide mobile Buttons (1001, 1002) */
      transform: translateX(-100%);
      transition: transform 0.3s ease;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    }

    .tutorial-sidebar.mobile-open {
      transform: translateX(0);
      box-shadow: 2px 0 20px rgba(0, 0, 0, 0.5); /* Verstärkter Schatten wenn geöffnet */
    }

    .sidebar-header {
      padding: 1rem 1.5rem;
    }

    .sidebar-content {
      padding: 1rem 1.5rem;
    }

    h2 {
      font-size: 1.1rem;
      margin: 0;
    }

    .tutorial-navigation {
      margin-bottom: 1.2rem;
    }

    h3 {
      font-size: 0.85rem;
      margin-bottom: 0.8rem;
    }

    .topic-buttons {
      gap: 0.6rem;
    }

    .topic-button {
      padding: 0.6rem 0.8rem;
      font-size: 0.95rem; /* Etwas vergrößert für mobile */
    }
  }

  @media (max-width: 480px) {
    .mobile-tutorial-button {
      width: 50px; /* Gleiche Größe wie Burger-Menü auch bei 480px */
      height: 50px;
      padding: 0.75rem; /* Gleicher Padding wie Burger-Menü */
      top: 1rem; /* Gleiche Höhe wie Burger-Menü */
      left: 4.5rem;
    }

    .tutorial-icon {
      width: 20px; /* Gleiche Icon-Größe wie Burger-Lines */
      height: 20px;
    }

    .tutorial-sidebar {
      max-width: 280px;
    }

    .sidebar-header {
      padding: 0.8rem 1.2rem;
    }

    .sidebar-content {
      padding: 0.8rem 1.2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 0.8rem;
    }

    .topic-button {
      padding: 0.5rem 0.7rem;
      font-size: 1rem; /* Vergrößert von 0.85rem */
    }
  }
</style>
