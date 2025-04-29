<script>
  // Tutorial-Daten in Kategorien
  const tutorialCategories = [
    {
      title: "Grundlagen der KI-Bildgenerierung",
      level: "Grundlagen",
      topics: [
        { 
          name: "Was ist Stable Diffusion?", 
          path: "/guided-tutorial/stable-diffusion-intro",
          description: "Einführung in Stable Diffusion: Modellübersicht, Betrieb & Promptgestaltung"
        },
        { 
          name: "Prompt-Grundlagen", 
          path: "/guided-tutorial/prompt-basics",
          description: "Aufbau erfolgreicher Prompts: Struktur, Reihenfolge und Stilelemente"
        }
      ]
    },
    {
      title: "Fortgeschrittene Techniken",
      level: "Fortgeschritten",
      topics: [
        { 
          name: "Kernparameter", 
          path: "/guided-tutorial/core-parameters",
          description: "CFG-Scale, Sampling-Steps und Seed: Die wichtigsten Parameter verstehen und steuern"
        },
        { 
          name: "Stile verwalten", 
          path: "/guided-tutorial/manage-styles",
          description: "Eigene Stil-Bibliotheken anlegen, verwenden und mit einem Klick wechseln"
        }
      ]
    },
    {
      title: "Profi-Techniken",
      level: "Profi",
      topics: [
        { 
          name: "Prompt-Priorisierung", 
          path: "/guided-tutorial/prompt-weighting",
          description: "Wortposition und Gewichtungssyntax für ausbalancierte und präzise Bilder"
        },
        { 
          name: "Fortgeschrittenes Prompting", 
          path: "/guided-tutorial/advanced-prompting",
          description: "Multi-Prompt, Upscaling und weiterführende Techniken für komplexe Szenen"
        }
      ]
    }
  ];

  // Zusatzbereich
  const additionalResources = {
    title: "Zusatzbereich",
    topics: [
      { 
        name: "KI-Modelle verstehen", 
        path: "/guided-tutorial/advanced/ai-models",
        description: "Ein tieferer Einblick in verschiedene Bildgenerierungsmodelle und ihre Anwendungsbereiche"
      },
      { 
        name: "Ressourcen & Deep-Dive", 
        path: "/guided-tutorial/advanced/workflow-optimization",
        description: "Weiterführende Materialien, Cheatsheets und Links für das selbstständige Lernen"
      }
    ]
  };
</script>

<svelte:head>
  <title>Guided Tutorials | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Guided Tutorials</h1>
    <p>Lerne Schritt für Schritt die wichtigsten Aspekte der KI-Bildgenerierung</p>
  </div>

  <!-- Tutorial-Kategorien -->
  <div class="tutorial-content">
    {#each tutorialCategories as category}
      <div class="tutorial-section">
        <div class="section-header">
          <h2>{category.title}</h2>
          <span class="level-badge level-{category.level.toLowerCase()}">{category.level}</span>
        </div>
        <div class="topic-cards">
          {#each category.topics as topic}
            <a href={topic.path} class="topic-card">
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              <div class="card-footer">
                <span class="start-button">Starten</span>
                <span class="arrow-icon">→</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/each}

    <!-- Zusatzbereich -->
    <div class="tutorial-section additional-section">
      <div class="section-header">
        <h2>{additionalResources.title}</h2>
        <span class="level-badge level-zusatz">Erweitert</span>
      </div>
      <div class="topic-cards">
        {#each additionalResources.topics as topic}
          <a href={topic.path} class="topic-card additional-card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div class="card-footer">
              <span class="start-button">Erkunden</span>
              <span class="arrow-icon">→</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .tutorial-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .tutorial-header {
    margin-bottom: 2.5rem;
    text-align: center;
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #f0f0f0, #FCEA2B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .tutorial-header p {
    font-size: 1.1rem;
    color: #a0a0a0;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .tutorial-section {
    margin-bottom: 3rem;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.5rem;
    color: #e0e0e0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #333;
    flex-grow: 1;
    margin: 0;
  }
  
  .level-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    border-radius: 20px;
    font-weight: 500;
    margin-left: 1rem;
  }
  
  .level-grundlagen {
    background-color: #4da6ff;
    color: #000;
  }
  
  .level-fortgeschritten {
    background-color: #FFC107;
    color: #000;
  }
  
  .level-profi {
    background-color: #F44336;
    color: #fff;
  }
  
  .level-zusatz {
    background-color: #9C27B0;
    color: #fff;
  }
  
  .topic-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .topic-card {
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .topic-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: #FCEA2B;
  }
  
  .additional-card {
    border-left: 3px solid #9C27B0;
  }
  
  .additional-card:hover {
    border-color: #FCEA2B;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .topic-card p {
    font-size: 0.95rem;
    color: #a0a0a0;
    margin: 0;
    flex-grow: 1;
  }
  
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }
  
  .start-button {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
    color: #FCEA2B;
  }
  
  .arrow-icon {
    font-size: 1.2rem;
    color: #FCEA2B;
    transition: transform 0.2s;
  }
  
  .topic-card:hover .arrow-icon {
    transform: translateX(5px);
  }
  
  .additional-section {
    margin-top: 4rem;
  }
</style>
