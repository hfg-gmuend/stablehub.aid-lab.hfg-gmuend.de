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

  // Dynamic typewriter animation
  let currentWordIndex = 0;
  let currentText = '';
  let isDeleting = false;
  let typewriterSpeed = 150;

  const words = [
    'artificial intelligence',
    'creative possibilities', 
    'image generation',
    'neural networks',
    'machine learning',
    'digital creativity',
    'visual storytelling',
    'AI-powered art',
    'computational design',
    'innovative solutions'
  ];

  function typewriterEffect() {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      currentText = currentWord.substring(0, currentText.length - 1);
      typewriterSpeed = 75; // Faster when deleting
    } else {
      currentText = currentWord.substring(0, currentText.length + 1);
      typewriterSpeed = 150; // Normal speed when typing
    }

    if (!isDeleting && currentText === currentWord) {
      // Word complete, wait then start deleting
      setTimeout(() => {
        isDeleting = true;
        typewriterEffect();
      }, 2000);
      return;
    } else if (isDeleting && currentText === '') {
      // Deletion complete, move to next word
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % words.length;
      setTimeout(typewriterEffect, 500);
      return;
    }

    setTimeout(typewriterEffect, typewriterSpeed);
  }

  onMount(() => {
    // Staggered animation sequence
    setTimeout(() => mounted = true, 100);
    setTimeout(() => titleVisible = true, 300);
    setTimeout(() => {
      subtitleVisible = true;
      // Start typewriter effect when subtitle becomes visible
      setTimeout(() => typewriterEffect(), 1000);
    }, 600);
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

    <!-- Enhanced Hero Section with Neural Network and Hologram Effects -->
    <div class="hero-container" class:visible={titleVisible}>
      <!-- Neural Network Background -->
      <div class="neural-network">
        {#each Array(8) as _, i}
          <div class="neural-node" style="--delay: {i * 0.3}s; --x: {Math.random() * 100}%; --y: {Math.random() * 100}%;">
            <div class="node-pulse"></div>
          </div>
        {/each}

      </div>

      <!-- Hologram Frame -->
      <div class="hologram-frame">
        <div class="data-stream">
          <span>AI_INITIALIZING...</span>
          <span>NEURAL_NETWORK_ACTIVE</span>
          <span>CREATIVE_MODE_ENABLED</span>
        </div>
        
        <!-- Main Title with 3D Effect -->
        <h1 class="main-title" class:visible={titleVisible}>
          <span class="title-word" style="--delay: 0s">Welcome</span>
          <span class="title-word" style="--delay: 0.1s">to</span>
          <span class="title-word highlight" style="--delay: 0.2s">HfG</span>
          <span class="title-word highlight" style="--delay: 0.3s">AI-Hub</span>
        </h1>

        <!-- Enhanced Subtitle with Dynamic Typing Effect -->
        <div class="subtitle-container" class:visible={subtitleVisible}>
          <p class="subtitle">
            <span class="static-text">Discover the possibilities of </span>
            <span class="dynamic-text">{currentText}</span>
            <span class="cursor">|</span>
            <span class="static-text"> for your projects</span>
          </p>
        </div>

        <!-- Interactive AI Status Panel -->
        <div class="ai-status-panel" class:visible={subtitleVisible}>
          <div class="status-item">
            <div class="status-dot active"></div>
            <span>AI Models: Online</span>
          </div>
          <div class="status-item">
            <div class="status-dot active"></div>
            <span>Creative Engine: Ready</span>
          </div>
          <div class="status-item">
            <div class="status-dot processing"></div>
            <span>Innovation Mode: Active</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Main Features Section -->
    <section class="main-features" class:visible={cardsVisible}>
      <div class="features-header">
        <h2>Choose Your AI Tool</h2>
        <p class="features-subtitle">Transform your ideas into stunning visuals with our powerful AI models</p>
      </div>

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
    </section>
    
    <!-- Community Gallery Section -->
    <section class="community-gallery" class:visible={tutorialsVisible}>
      <div class="community-header">
        <h2>Join Our Creative Community</h2>
        <p class="community-subtitle">Discover, share, and get inspired by the HfG AI community</p>
      </div>
      
      <div class="community-features">
        <div class="feature-card">
          <div class="feature-icon">
            <div class="icon-background">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Share & Showcase</h3>
          <p>Upload your AI-generated masterpieces to our public gallery and share your creativity with fellow HfG students.</p>
          <div class="feature-preview">Gallery integration</div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <div class="icon-background">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11H15M9 15H15M17 21L12 16L7 21V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Copy & Learn</h3>
          <p>Get inspired by others' work! Copy prompts directly from any image in the gallery to learn new techniques.</p>
          <div class="feature-preview">Prompt copying available</div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <div class="icon-background">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Like & Connect</h3>
          <p>Show appreciation for amazing artwork by liking your favorites and connecting with talented creators.</p>
          <div class="feature-preview">Social features</div>
          <div class="coming-soon">Coming Soon!</div>
        </div>

        <div class="feature-card highlight">
          <div class="feature-icon">
            <div class="icon-background special">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h3>Monthly Winner</h3>
          <p>Every month, the most outstanding creation will be selected as our featured artwork and displayed at the HfG campus!</p>
          <div class="feature-preview">🏆 Featured at HfG</div>
        </div>
      </div>

      <div class="community-cta">
        <a href="{base}/gallery" class="cta-button">
          Explore Gallery
        </a>
      </div>
    </section>
    
    <!-- Tutorial-Teaser-Abschnitt -->
    <section class="tutorials-teaser" class:visible={tutorialsVisible}>
      <div class="tutorials-header">
        <h2>New here? Start with our tutorials</h2>
        <p class="tutorials-subtitle">Master AI image generation with our step-by-step guides</p>
      </div>
      
      <div class="teaser-actions">
        <a href="{base}/guided-tutorial" class="view-all-link">View all tutorials</a>
      </div>
      
      <div class="tutorial-highlights">
        <TutorialHighlightCard
          icon="/icon/rocket.svg"
          title="Quick Start"
          description="Learn the basics of Stable Diffusion in just 10 minutes"
          href="{base}/guided-tutorial/stable-diffusion-intro"
          linkText="Start now"
        />

        <TutorialHighlightCard
          icon="/icon/idea.svg"
          title="Prompt Power"
          description="Better prompts lead to better results"
          href="{base}/guided-tutorial/prompt-basics"
          linkText="Discover tips"
        />

        <TutorialHighlightCard
          icon="/icon/tool.svg"
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
  
  /* Enhanced Hero Section */
  .hero-container {
    position: relative;
    margin-bottom: 4rem;
    padding: 4rem 0;
    min-height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transform: scale(0.95);
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    overflow: hidden;
  }

  .hero-container.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* Neural Network Background */
  .neural-network {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .neural-node {
    position: absolute;
    left: var(--x, 50%);
    top: var(--y, 50%);
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #FCEA2B 0%, rgba(252, 234, 43, 0.3) 70%, transparent 100%);
    border-radius: 50%;
    animation: nodeGlow 3s ease-in-out infinite var(--delay, 0s);
  }

  .node-pulse {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 12px;
    height: 12px;
    border: 1px solid rgba(252, 234, 43, 0.3);
    border-radius: 50%;
    animation: nodePulse 2s ease-in-out infinite var(--delay, 0s);
  }


  @keyframes nodeGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @keyframes nodePulse {
    0%, 100% { opacity: 0; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(2); }
  }

  @keyframes connectionFlow {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
  }

  /* Hologram Frame */
  .hologram-frame {
    position: relative;
    z-index: 2;
    /* border: 2px solid rgba(252, 234, 43, 0.3);
    border-radius: 20px; */
    padding: 3rem 2rem;
    /* background: rgba(0, 0, 0, 0.3); */
    /* backdrop-filter: blur(15px); */
    animation: hologramFlicker 8s ease-in-out infinite;
    max-width: 900px;
    width: 100%;
    text-align: center;
  }

  @keyframes hologramFlicker {
    0%, 100% { 
      border-color: rgba(252, 234, 43, 0.3);
    }
    25%, 75% { 
      border-color: rgba(252, 234, 43, 0.5);
    }
    50% { 
      border-color: rgba(252, 234, 43, 0.7);
    }
  }

  .data-stream {
    position: absolute;
    top: -30px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    color: rgba(252, 234, 43, 0.6);
    opacity: 0.8;
  }

  .data-stream span {
    animation: dataFlow 2s ease-in-out infinite;
  }

  .data-stream span:nth-child(1) { animation-delay: 0s; }
  .data-stream span:nth-child(2) { animation-delay: 0.7s; }
  .data-stream span:nth-child(3) { animation-delay: 1.4s; }

  @keyframes dataFlow {
    0%, 90%, 100% { opacity: 0.3; }
    45% { opacity: 1; }
  }

  /* Enhanced 3D Title */
  .main-title {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #f0f0f0;
    position: relative;
    z-index: 3;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }

  .title-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) rotateX(45deg);
    animation-delay: var(--delay, 0s);
  }

  .main-title.visible .title-word {
    animation: title3DEntry 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .title-word.highlight {
    background: linear-gradient(45deg, #FCEA2B, #FFE566, #FCEA2B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    background-size: 200% 200%;
    animation: shimmer 3s ease-in-out infinite;
  }

  @keyframes title3DEntry {
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }

  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  /* Dynamic Typing Effect Subtitle */
  .subtitle-container {
    position: relative;
    margin-bottom: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 0.5s;
  }

  .subtitle-container.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.3rem;
    color: #a0a0a0;
    margin: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
  }

  .static-text {
    color: #a0a0a0;
  }

  .dynamic-text {
    color: #FCEA2B;
    font-weight: 500;
    min-width: 2ch;
    display: inline-block;
    background: linear-gradient(45deg, #FCEA2B, #FFE566);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .dynamic-text::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    opacity: 0.6;
  }

  .cursor {
    color: #FCEA2B;
    font-weight: bold;
    animation: blink 1s infinite;
    margin-left: 2px;
    font-size: 1.4rem;
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  /* AI Status Panel */
  .ai-status-panel {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease-out 1s;
  }

  .ai-status-panel.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #888;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
  }

  .status-dot.active {
    background: #4ade80;
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
    animation: statusPulse 2s ease-in-out infinite;
  }

  .status-dot.processing {
    background: #FCEA2B;
    box-shadow: 0 0 10px rgba(252, 234, 43, 0.5);
    animation: statusProcessing 1.5s ease-in-out infinite;
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }

  @keyframes statusProcessing {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }


  @keyframes orbFloat {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.6; }
  }

  /* Enhanced Particle Animations */
  /* Enhanced Particle Animations */
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
    width: 6px;
    height: 6px;
    background: linear-gradient(45deg, #FCEA2B, rgba(252, 234, 43, 0.4));
    border-radius: 50%;
    animation: float var(--duration, 12s) infinite ease-in-out;
    animation-delay: var(--delay, 0s);
    opacity: 0.8;
    box-shadow: 0 0 10px rgba(252, 234, 43, 0.3);
  }

  .particle:nth-child(1) { top: 15%; left: 10%; }
  .particle:nth-child(2) { top: 65%; left: 15%; }
  .particle:nth-child(3) { top: 25%; left: 85%; }
  .particle:nth-child(4) { top: 85%; left: 75%; }
  .particle:nth-child(5) { top: 45%; left: 50%; }
  .particle:nth-child(6) { top: 5%; left: 90%; }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
      opacity: 0.8;
    }
    25% {
      transform: translateY(-30px) translateX(15px) scale(1.2) rotate(90deg);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px) translateX(-20px) scale(0.8) rotate(180deg);
      opacity: 0.6;
    }
    75% {
      transform: translateY(20px) translateX(10px) scale(1.1) rotate(270deg);
      opacity: 0.9;
    }
  }

  /* Main Features Section */
  .main-features {
    margin: 6rem 0;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
    position: relative;
  }

  .main-features::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(252, 234, 43, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .main-features.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .features-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .features-header h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .features-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }

  .features-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    margin-bottom: 0;
  }
  
  /* Animated Cards */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
    position: relative;
    z-index: 1;
  }

  /* Enhanced Card Animations and Hover Effects */
  .cards-container :global(.card) {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  .cards-container :global(.card::before) {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.1), transparent);
    transition: left 0.6s ease;
    z-index: 1;
  }

  .cards-container :global(.card:hover::before) {
    left: 100%;
  }

  .cards-container :global(.card:hover) {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(252, 234, 43, 0.15);
  }

  /* Staggered card animations */
  .main-features.visible .cards-container :global(.card:nth-child(1)) {
    animation: slideInCard 0.8s ease-out 0.1s both;
  }

  .main-features.visible .cards-container :global(.card:nth-child(2)) {
    animation: slideInCard 0.8s ease-out 0.3s both;
  }

  .main-features.visible .cards-container :global(.card:nth-child(3)) {
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
  
  /* Community Gallery Section */
  .community-gallery {
    margin: 6rem 0;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
    position: relative;
  }

  .community-gallery::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(252, 234, 43, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .community-gallery.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .community-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .community-header h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .community-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }

  @keyframes underlineGlow {
    0%, 100% { opacity: 0.5; width: 60px; }
    50% { opacity: 1; width: 120px; }
  }

  .community-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    margin-bottom: 0;
  }


  @keyframes floatSoft {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(2deg); }
    50% { transform: translateY(-4px) rotate(-1deg); }
    75% { transform: translateY(-12px) rotate(1deg); }
  }

  .community-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .feature-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .feature-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.05), transparent);
    transition: left 0.6s ease;
  }

  .feature-card:hover::before {
    left: 100%;
  }

  .feature-card:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(252, 234, 43, 0.3);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  }

  .feature-card.highlight {
    border-color: rgba(252, 234, 43, 0.3);
    background: rgba(252, 234, 43, 0.02);
  }

  .feature-card.highlight:hover {
    border-color: rgba(252, 234, 43, 0.5);
    box-shadow: 0 16px 32px rgba(252, 234, 43, 0.1);
  }

  .feature-icon {
    margin-bottom: 1.5rem;
  }

  .icon-background {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: rgba(252, 234, 43, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FCEA2B;
    transition: all 0.3s ease;
    position: relative;
  }

  .feature-card:hover .icon-background {
    background: rgba(252, 234, 43, 0.25);
    transform: scale(1.1) rotate(5deg);
  }

  .icon-background.special {
    background: rgba(255, 215, 0, 0.15);
    color: #ffd700;
  }

  .feature-card:hover .icon-background.special {
    background: rgba(255, 215, 0, 0.25);
  }

  .icon-background svg {
    width: 28px;
    height: 28px;
    transition: all 0.3s ease;
  }

  .feature-card:hover .icon-background svg {
    transform: scale(1.1);
  }

  .feature-card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f0f0f0;
    transition: color 0.3s ease;
  }

  .feature-card:hover h3 {
    color: #FCEA2B;
  }

  .feature-card p {
    color: #a0a0a0;
    line-height: 1.6;
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }

  .feature-card:hover p {
    color: #b8b8b8;
  }

  .feature-preview {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .feature-card:hover .feature-preview {
    color: #FCEA2B;
    transform: translateY(-2px);
  }

  .coming-soon {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(252, 234, 43, 0.15);
    color: #FCEA2B;
    padding: 6px 10px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 1px solid rgba(252, 234, 43, 0.3);
    animation: comingSoonPulse 2s ease-in-out infinite;
  }

  @keyframes comingSoonPulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  .community-cta {
    text-align: center;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: rgba(252, 234, 43, 0.1);
    color: #FCEA2B;
    text-decoration: none;
    border: 2px solid rgba(252, 234, 43, 0.3);
    border-radius: 30px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .cta-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .cta-button:hover::before {
    left: 100%;
  }

  .cta-button:hover {
    background: rgba(252, 234, 43, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(252, 234, 43, 0.2);
    border-color: rgba(252, 234, 43, 0.6);
  }

  /* Enhanced Tutorial Section Animations */
  .tutorials-teaser {
    margin: 6rem 0 4rem 0;
    padding-top: 0;
    border-top: none;
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s ease-out;
    position: relative;
  }

  .tutorials-teaser::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(252, 234, 43, 0.03) 0%, transparent 70%);
    pointer-events: none;
  }

  .tutorials-teaser.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .tutorials-header {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
  }

  .tutorials-header h2 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #f0f0f0;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
  }

  .tutorials-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    animation: underlineGlow 3s ease-in-out infinite;
  }

  .tutorials-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    margin-bottom: 0;
  }


  .teaser-actions {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .view-all-link {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    display: inline-block;
    padding: 1rem 2rem;
    background: rgba(252, 234, 43, 0.1);
    border: 2px solid rgba(252, 234, 43, 0.3);
    border-radius: 30px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .view-all-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .view-all-link:hover::before {
    left: 100%;
  }

  .view-all-link::after {
    content: '→';
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  .view-all-link:hover {
    background: rgba(252, 234, 43, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(252, 234, 43, 0.2);
    border-color: rgba(252, 234, 43, 0.6);
  }

  .view-all-link:hover::after {
    transform: translateX(4px);
  }
  
  .tutorial-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
  }

  /* Enhanced Tutorial Card Animations */
  .tutorial-highlights :global(.tutorial-card) {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
  }

  .tutorial-highlights :global(.tutorial-card::before) {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.08), transparent);
    transition: left 0.6s ease;
    z-index: 0;
  }

  .tutorial-highlights :global(.tutorial-card:hover::before) {
    left: 100%;
  }

  .tutorial-highlights :global(.tutorial-card:hover) {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
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

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-container {
      padding: 2rem 0;
      min-height: 50vh;
    }

    .hologram-frame {
      padding: 2rem 1rem;
      border-radius: 15px;
    }

    .main-title {
      font-size: 2.2rem;
      margin-bottom: 1.5rem;
    }

    .subtitle {
      font-size: 1.1rem;
      flex-direction: column;
      text-align: center;
    }

    .dynamic-text {
      margin: 0.5rem 0;
    }

    .cursor {
      display: inline-block;
    }

    .ai-status-panel {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    .data-stream {
      display: none;
    }

    .neural-node {
      width: 6px;
      height: 6px;
    }

    .node-pulse {
      width: 10px;
      height: 10px;
      top: -2px;
      left: -2px;
    }

    .community-header h2,
    .tutorials-header h2,
    .features-header h2 {
      font-size: 2rem;
    }

    .community-features {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .feature-card {
      padding: 1.5rem;
    }
    
    .tutorial-highlights {
      grid-template-columns: 1fr;
    }

    .particles .particle {
      width: 4px;
      height: 4px;
    }

    .community-gallery,
    .tutorials-teaser,
    .main-features {
      margin: 4rem 0;
    }
  }
</style>
