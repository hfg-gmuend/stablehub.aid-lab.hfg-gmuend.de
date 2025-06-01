<script lang="ts">
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import TutorialHighlightCard from "$lib/components/uicomponents/TutorialHighlightCard.svelte";
  import { base, assets } from '$app/paths';
</script>

<svelte:head>
  <title>HfG Ai-Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <h1 class="main-title">Welcome to HfG AI-Hub</h1>
    <p class="subtitle">Discover the possibilities of artificial intelligence for your projects</p>
    
    <div class="cards-container">
      <ImageCard 
        title="Text To Image" 
        description="Write a prompt, get a custom image in seconds."
        href="{base}/text-to-image" 
        imageUrl="{assets}/cards/card1.jpg" 
      />
      <ImageCard 
        title="Image To Image" 
        description="Upload an image and watch it transform into new styles or variations."
        href="{base}/image-to-image" 
        imageUrl="{assets}/cards/card2.jpg" 
      />
      <ImageCard 
        title="ControlNet" 
        description="Use sketches or poses as guides to generate precise images with full creative control."
        href="{base}/control-net" 
        imageUrl="{assets}/cards/card3.jpg" 
      />
    </div>
    
    <!-- Tutorial-Teaser-Abschnitt -->
    <section class="tutorials-teaser">
      <div class="teaser-header">
        <h2>New here? Start with our tutorials</h2>
        <a href="{base}/guided-tutorial" class="view-all-link">View all tutorials</a>
      </div>
      
      <div class="tutorial-highlights">
        <TutorialHighlightCard
          icon="🚀"
          title="Quick Start"
          description="Learn the basics of Stable Diffusion in just 10 minutes"
          href="{base}/guided-tutorial/stable-diffusion-intro"
          linkText="Start now"
        />

        <TutorialHighlightCard
          icon="💡"
          title="Prompt Power"
          description="Better prompts lead to better results"
          href="{base}/guided-tutorial/prompt-basics"
          linkText="Discover tips"
        />

        <TutorialHighlightCard
          icon="🔧"
          title="For Advanced Users"
          description="Parameters, styles and advanced techniques"
          href="{base}/guided-tutorial/core-parameters"
          linkText="Go deeper"
        />
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
