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
</style>
