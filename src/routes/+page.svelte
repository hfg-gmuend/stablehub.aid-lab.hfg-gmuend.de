<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
</script>

<svelte:head>
  <title>HfG Ai-Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <h1 class="main-title">Willkommen im HfG Ai-Hub</h1>
    <p class="subtitle">Entdecke die Möglichkeiten der künstlichen Intelligenz für deine Projekte</p>
    
    <div class="cards-container">
      <ImageCard 
        title="Text To Image" 
        description="Schreibe ein Prompt, erhalte in Sekunden ein maßgeschneidertes Bild."
        href="/text-to-image" 
        imageUrl="/cards/card1.png" 
      />
      <ImageCard 
        title="Image To Image" 
        description="Lade ein Bild hoch und sieh zu, wie es in neue Stile oder Varianten verwandelt wird."
        href="/image-to-image" 
        imageUrl="/cards/card2.png" 
      />
      <ImageCard 
        title="ControlNet" 
        description="Nutze Skizzen oder Posen als Leitfaden, um präzise Bilder mit voller kreativer Kontrolle zu erzeugen."
        href="/control-net" 
        imageUrl="/cards/card3.png" 
      />
    </div>
    
    <!-- Tutorial-Teaser-Abschnitt -->
    <section class="tutorials-teaser">
      <div class="teaser-header">
        <h2>Neu hier? Start mit unseren Tutorials</h2>
        <a href="/guided-tutorial" class="view-all-link">Alle Tutorials ansehen</a>
      </div>
      
      <div class="tutorial-highlights">
        <div class="tutorial-highlight-card">
          <div class="highlight-icon">🚀</div>
          <div class="highlight-content">
            <h3>Schnelleinstieg</h3>
            <p>Lerne die Grundlagen von Stable Diffusion in nur 10 Minuten</p>
            <a href="/guided-tutorial/stable-diffusion-intro" class="highlight-link">
              Jetzt starten
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
        
        <div class="tutorial-highlight-card">
          <div class="highlight-icon">💡</div>
          <div class="highlight-content">
            <h3>Prompt-Power</h3>
            <p>Mit besseren Prompts zu besseren Ergebnissen</p>
            <a href="/guided-tutorial/prompt-basics" class="highlight-link">
              Tipps entdecken
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
        
        <div class="tutorial-highlight-card">
          <div class="highlight-icon">🔧</div>
          <div class="highlight-content">
            <h3>Für Fortgeschrittene</h3>
            <p>Parameter, Stile und fortgeschrittene Techniken</p>
            <a href="/guided-tutorial/core-parameters" class="highlight-link">
              Vertiefen
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
  }
  
  .app-container {
    display: flex;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    padding: 2rem;
    background-color: #121212;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(60, 60, 60, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(40, 40, 40, 0.15) 0%, transparent 50%);
  }
  
  .main-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #f0f0f0;
  }
  
  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: #a0a0a0;
    margin-bottom: 2rem;
  }
  
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
  
  /* Tutorial-Teaser-Styling */
  .tutorials-teaser {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #333;
  }
  
  .teaser-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .teaser-header h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.8rem;
    color: #f0f0f0;
    margin: 0;
  }
  
  .view-all-link {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    transition: all 0.2s ease;
  }
  
  .view-all-link:hover {
    transform: translateX(4px);
  }
  
  .tutorial-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  .tutorial-highlight-card {
    display: flex;
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid #333;
  }
  
  .tutorial-highlight-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: #FCEA2B;
  }
  
  .highlight-icon {
    font-size: 2rem;
    margin-right: 1rem;
    line-height: 1;
  }
  
  .highlight-content {
    flex: 1;
  }
  
  .highlight-content h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
    color: #e0e0e0;
  }
  
  .highlight-content p {
    font-size: 0.95rem;
    color: #a0a0a0;
    margin: 0 0 1rem;
    line-height: 1.5;
  }
  
  .highlight-link {
    display: inline-flex;
    align-items: center;
    color: #FCEA2B;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.2s ease;
  }
  
  .highlight-link:hover {
    transform: translateX(4px);
  }
  
  .arrow {
    margin-left: 6px;
    transition: all 0.2s ease;
  }
  
  .highlight-link:hover .arrow {
    margin-left: 10px;
  }
  
  @media (max-width: 768px) {
    .teaser-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .tutorial-highlights {
      grid-template-columns: 1fr;
    }
  }
</style>
