<script lang="ts">
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import CommunityFlow from "$lib/components/CommunityFlow.svelte";
  import MonthlySpotlight from "$lib/components/MonthlySpotlight.svelte";
  import PartnerLogos from "$lib/components/PartnerLogos.svelte";
  import FloatingParticles from "$lib/components/FloatingParticles.svelte";
  import TutorialSection from "$lib/components/TutorialSection.svelte";
  import SiteFooter from "$lib/components/SiteFooter.svelte";
  import { base, assets } from '$app/paths';
  import { onMount } from 'svelte';

  // Desktop sidebar state (separate from MinimalSidebar mobile logic)
  let sidebarCollapsed = false;

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

  // AI Status Panel states
  let aiModelsStatus = 'starting'; // starting, updating, active
  let creativeEngineStatus = 'starting'; // starting, updating, active  
  let innovationModeStatus = 'starting'; // starting, updating, active

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

  // Desktop sidebar toggle function
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

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

  function startAIStatusSequence() {
    // AI Models: starting -> updating -> active (2s total)
    setTimeout(() => {
      aiModelsStatus = 'updating';
    }, 1000);
    setTimeout(() => {
      aiModelsStatus = 'active';
    }, 2000);

    // Creative Engine: starting -> updating -> active (3s total, starts 1s after AI Models)
    setTimeout(() => {
      creativeEngineStatus = 'updating';
    }, 2500);
    setTimeout(() => {
      creativeEngineStatus = 'active';
    }, 4000);

    // Innovation Mode: starting -> updating -> active (4s total, starts 2s after Creative Engine)
    setTimeout(() => {
      innovationModeStatus = 'updating';
    }, 5000);
    setTimeout(() => {
      innovationModeStatus = 'active';
    }, 6500);
  }

  onMount(() => {
    // Staggered animation sequence
    setTimeout(() => mounted = true, 100);
    setTimeout(() => titleVisible = true, 300);
    setTimeout(() => {
      subtitleVisible = true;
      // Start typewriter effect when subtitle becomes visible
      setTimeout(() => typewriterEffect(), 1000);
      // Start AI status sequence when subtitle becomes visible
      setTimeout(() => startAIStatusSequence(), 1500);
    }, 600);
    setTimeout(() => cardsVisible = true, 900);
    setTimeout(() => tutorialsVisible = true, 1200);
  });
</script>

<svelte:head>
  <title>Stablehub</title>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container" class:mounted class:sidebar-collapsed={sidebarCollapsed}>
  {#if !sidebarCollapsed}
    <MinimalSidebar />
  {/if}

  <!-- Desktop Sidebar Control Buttons -->
  {#if sidebarCollapsed}
    <button class="sidebar-expand-btn" on:click={toggleSidebar} aria-label="Expand sidebar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {:else}
    <button class="sidebar-collapse-btn" on:click={toggleSidebar} aria-label="Collapse sidebar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 7L6 12L11 17M18 7L13 12L18 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {/if}

  <main class:expanded={sidebarCollapsed}>
    <!-- Floating particles background -->
    <FloatingParticles />

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
          <span class="title-word highlight" style="--delay: 0.2s">Stable</span>
          <span class="title-word highlight" style="--delay: 0.3s">Hub</span>
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
            <div class="status-dot" class:starting={aiModelsStatus === 'starting'} class:updating={aiModelsStatus === 'updating'} class:active={aiModelsStatus === 'active'}></div>
            <span>AI Models: {aiModelsStatus === 'starting' ? 'Starting...' : aiModelsStatus === 'updating' ? 'Updating...' : 'Online'}</span>
          </div>
          <div class="status-item">
            <div class="status-dot" class:starting={creativeEngineStatus === 'starting'} class:updating={creativeEngineStatus === 'updating'} class:active={creativeEngineStatus === 'active'}></div>
            <span>Creative Engine: {creativeEngineStatus === 'starting' ? 'Starting...' : creativeEngineStatus === 'updating' ? 'Initializing...' : 'Ready'}</span>
          </div>
          <div class="status-item">
            <div class="status-dot" class:starting={innovationModeStatus === 'starting'} class:updating={innovationModeStatus === 'updating'} class:active={innovationModeStatus === 'active'}></div>
            <span>Innovation Mode: {innovationModeStatus === 'starting' ? 'Loading...' : innovationModeStatus === 'updating' ? 'Activating...' : 'Active'}</span>
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
        <p class="community-subtitle">Discover, share, and get inspired by the Stablehub AI community</p>
      </div>
      
      <!-- Main Community Flow -->
      <CommunityFlow />

      <!-- Featured Monthly Winner -->
      <MonthlySpotlight visible={tutorialsVisible} />

      <!-- Simple CTA -->
      <div class="community-cta-simple">
        <a href="{base}/gallery" class="cta-link">
          <span>Explore Gallery</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
    
    <!-- Tutorial-Teaser-Abschnitt -->
    <TutorialSection visible={tutorialsVisible} />
    
    <!-- Powered by Section -->
    <PartnerLogos visible={tutorialsVisible} />
    
    <!-- Footer -->
    <SiteFooter />
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
    position: relative;
  }

  .app-container.mounted {
    opacity: 1;
  }
  
  .app-container.sidebar-collapsed {
    display: block;
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
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  main.expanded {
    padding: 2rem 8rem;
    max-width: none;
  }

  /* Desktop Sidebar Control Buttons */
  .sidebar-expand-btn,
  .sidebar-collapse-btn {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 1001;
    width: 50px;
    height: 50px;
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(252, 234, 43, 0.3);
    border-radius: 12px;
    color: #FCEA2B;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .sidebar-expand-btn:hover,
  .sidebar-collapse-btn:hover {
    background: rgba(252, 234, 43, 0.1);
    border-color: rgba(252, 234, 43, 0.6);
    transform: scale(1.05);
  }

  .sidebar-expand-btn svg,
  .sidebar-collapse-btn svg {
    width: 24px;
    height: 24px;
  }

  .sidebar-collapse-btn {
    left: 300px;
  }

  .sidebar-collapse-btn svg {
    width: 20px;
    height: 20px;
  }

  /* Enhanced Hero Section */
  .hero-container {
    position: relative;
    /* margin-bottom: 4rem; */
    /* padding: 4rem 0; */
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
    transition: all 0.3s ease;
  }

  .status-dot.starting {
    background: #6b7280;
    box-shadow: 0 0 5px rgba(107, 114, 128, 0.3);
    animation: statusStarting 1s ease-in-out infinite;
  }

  .status-dot.updating {
    background: #f59e0b;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    animation: statusUpdating 0.8s ease-in-out infinite;
  }

  .status-dot.active {
    background: #4ade80;
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
    animation: statusPulse 2s ease-in-out infinite;
  }

  @keyframes statusStarting {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
  }

  @keyframes statusUpdating {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }

  @keyframes statusPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.2); }
  }


  @keyframes orbFloat {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.6; }
  }

  /* Main Features Section */
  .main-features {
    margin: 1rem 0;
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
    margin: 12rem 0;
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

  /* Simple CTA */
  .community-cta-simple {
    text-align: center;
    margin-top: 3rem;
  }

  .cta-link {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    background: rgba(252, 234, 43, 0.08);
    color: #FCEA2B;
    text-decoration: none;
    border: 1px solid rgba(252, 234, 43, 0.2);
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .cta-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .cta-link:hover::before {
    left: 100%;
  }

  .cta-link:hover {
    background: rgba(252, 234, 43, 0.12);
    border-color: rgba(252, 234, 43, 0.3);
    transform: translateY(-2px);
  }

  .cta-link svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .cta-link:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    /* Hide desktop sidebar buttons on mobile - let MinimalSidebar handle mobile nav */
    .sidebar-expand-btn,
    .sidebar-collapse-btn {
      display: none !important;
    }

    /* Reset sidebar state on mobile */
    .app-container.sidebar-collapsed {
      display: flex;
    }

    main.expanded {
      padding: 1rem !important;
    }

    /* Main layout fixes */
    main {
      padding: 1rem !important;
    }
    
    /* Hero section mobile fixes */
    .hero-container {
      min-height: 40vh;
      padding: 2rem 0;
    }
    
    .main-title {
      font-size: 2.2rem;
      line-height: 1.2;
    }
    
    .subtitle {
      font-size: 1.1rem;
      line-height: 1.4;
    }
    
    /* AI Status Panel mobile */
    .ai-status-panel {
      flex-direction: column;
      gap: 1rem;
      margin: 2rem 0;
    }
    
    /* Cards mobile */
    .cards-container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      margin: 2rem 0;
    }
  }
</style>
