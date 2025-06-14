<script lang="ts">
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import TutorialHighlightCard from "$lib/components/uicomponents/TutorialHighlightCard.svelte";
  import { base, assets } from '$app/paths';
  import { onMount } from 'svelte';

  // Animation states
  let mounted = false;
  let titleVisible = false;
  let subtitleVisible = false;
  let cardsVisible = false;
  let tutorialsVisible = false;

  onMount(() => {
    // Staggered animation sequence
    setTimeout(() => mounted = true, 100);
    setTimeout(() => titleVisible = true, 300);
    setTimeout(() => subtitleVisible = true, 600);
    setTimeout(() => cardsVisible = true, 900);
    setTimeout(() => tutorialsVisible = true, 1200);
  });
</script>

<svelte:head>
  <title>HfG Ai-Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container" class:mounted>
  <MinimalSidebar />
  <main>
    <!-- Floating particles background -->
    <div class="particles">
      {#each Array(6) as _, i}
        <div class="particle" style="--delay: {i * 0.5}s; --duration: {8 + i * 2}s;"></div>
      {/each}
    </div>

    <h1 class="main-title" class:visible={titleVisible}>
      <span class="title-word" style="--delay: 0s">Welcome</span>
      <span class="title-word" style="--delay: 0.1s">to</span>
      <span class="title-word highlight" style="--delay: 0.2s">HfG</span>
      <span class="title-word highlight" style="--delay: 0.3s">AI-Hub</span>
    </h1>


    <p class="subtitle" class:visible={subtitleVisible}>Discover the possibilities of artificial intelligence for your projects</p>
    
    <div class="cards-container" class:visible={cardsVisible}>
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
    <section class="tutorials-teaser" class:visible={tutorialsVisible}>
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
    opacity: 0;
    transition: opacity 0.8s ease-out;
  }

  .app-container.mounted {
    opacity: 1;
  }
  
  main {
    flex: 1;
    padding: 2rem;
    background-color: #121212;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(60, 60, 60, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(40, 40, 40, 0.15) 0%, transparent 50%);
    position: relative;
    overflow: hidden;
  }

  /* Floating Particles Background */
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, #FCEA2B, rgba(252, 234, 43, 0.3));
    border-radius: 50%;
    animation: float var(--duration, 10s) infinite ease-in-out;
    animation-delay: var(--delay, 0s);
    opacity: 0.6;
  }

  .particle:nth-child(1) { top: 20%; left: 10%; }
  .particle:nth-child(2) { top: 60%; left: 20%; }
  .particle:nth-child(3) { top: 30%; left: 80%; }
  .particle:nth-child(4) { top: 80%; left: 70%; }
  .particle:nth-child(5) { top: 50%; left: 50%; }
  .particle:nth-child(6) { top: 10%; left: 90%; }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1);
      opacity: 0.6;
    }
    33% {
      transform: translateY(-20px) translateX(10px) scale(1.1);
      opacity: 0.8;
    }
    66% {
      transform: translateY(10px) translateX(-5px) scale(0.9);
      opacity: 0.4;
    }
  }
  
  /* Animated Title */
  .main-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #f0f0f0;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .main-title.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .title-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    animation-delay: var(--delay, 0s);
  }

  .main-title.visible .title-word {
    animation: slideInUp 0.6s ease-out forwards;
  }

  .title-word.highlight {
    background: linear-gradient(45deg, #FCEA2B, #FFE566);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .title-word.highlight::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(45deg, #FCEA2B, #FFE566);
    animation: underlineGrow 0.8s ease-out 0.5s forwards;
  }

  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes underlineGrow {
    to {
      width: 100%;
    }
  }
  
  /* Animated Subtitle */
  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.2rem;
    color: #a0a0a0;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 0.3s;
  }

  .subtitle.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Animated Cards */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    position: relative;
    z-index: 1;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease-out;
  }

  .cards-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Staggered card animations */
  .cards-container.visible :global(.card:nth-child(1)) {
    animation: slideInCard 0.8s ease-out 0.1s both;
  }

  .cards-container.visible :global(.card:nth-child(2)) {
    animation: slideInCard 0.8s ease-out 0.3s both;
  }

  .cards-container.visible :global(.card:nth-child(3)) {
    animation: slideInCard 0.8s ease-out 0.5s both;
  }

  @keyframes slideInCard {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Tutorial-Teaser-Styling */
  .tutorials-teaser {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #333;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease-out;
  }

  .tutorials-teaser.visible {
    opacity: 1;
    transform: translateY(0);
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

  /* Staggered tutorial card animations */
  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(1)) {
    animation: slideInCard 0.8s ease-out 0.2s both;
  }

  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(2)) {
    animation: slideInCard 0.8s ease-out 0.4s both;
  }

  .tutorials-teaser.visible .tutorial-highlights :global(.tutorial-card:nth-child(3)) {
    animation: slideInCard 0.8s ease-out 0.6s both;
  }
  
  @media (max-width: 768px) {
    main {
      padding: 1.5rem;
    }

    .main-title {
      font-size: 2rem;
      text-align: left;
      margin-left: 4rem; /* Nur die Headline nach rechts verschieben */
    }

    .subtitle {
      font-size: 1rem;
      text-align: center;
    }

    .teaser-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .tutorial-highlights {
      grid-template-columns: 1fr;
    }

    .particles .particle {
      width: 3px;
      height: 3px;
    }
  }
</style>
