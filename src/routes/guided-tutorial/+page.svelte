<script>
  // Statische Tutorial-Daten
  const tutorialSections = [
    {
      title: "Grundlagen der KI-Bildgenerierung",
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
      topics: [
        { 
          name: "Steps - Wofür?", 
          path: "/guided-tutorial/steps-purpose",
          description: "Rolle der Diffusionsschritte bei der Bildqualität und Generierungszeit"
        },
        { 
          name: "Prompt Advanced", 
          path: "/guided-tutorial/prompt-advanced",
          description: "Fortgeschrittene Techniken für präzise und kreative Prompts"
        }
      ]
    }
  ];
</script>

<svelte:head>
  <title>Guided Tutorials | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Guided Tutorials</h1>
    <p>Lerne Schritt für Schritt die wichtigsten Aspekte der KI-Bildgenerierung</p>
  </div>

  <div class="tutorial-content">
    {#each tutorialSections as section}
      <div class="tutorial-section">
        <h2>{section.title}</h2>
        <div class="topic-cards">
          {#each section.topics as topic}
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
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
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
</style>
