<script lang="ts">
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import ImageCard from "$lib/components/ImageCard.svelte";
  import TutorialHighlightCard from "$lib/components/uicomponents/TutorialHighlightCard.svelte";
  import { base, assets } from '$app/paths';
  import { onMount } from 'svelte';

  // Homepage specific states
  let sidebarCollapsed = false;
  let showCollapseButton = true; // Immer verfügbar für manuelles Einklappen

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

  // Sidebar collapse functionality
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

  onMount(() => {
    // Mobile detection - auf Mobile soll Sidebar standardmäßig eingeklappt sein
    if (window.innerWidth <= 768) {
      sidebarCollapsed = true;
    }
    
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
  
  <!-- Sidebar Expand Button -->
  {#if sidebarCollapsed}
    <button class="sidebar-expand-btn" on:click={toggleSidebar}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {/if}

  <!-- Sidebar Collapse Button -->
  {#if showCollapseButton && !sidebarCollapsed}
    <button class="sidebar-collapse-btn" on:click={toggleSidebar}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 19L4 12L11 5M19 19L12 12L19 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {/if}

  <main class:expanded={sidebarCollapsed}>
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
      <div class="community-flow">
        <!-- Step 1: Create -->
        <div class="flow-step">
          <div class="step-number">01</div>
          <div class="step-content">
            <div class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Create & Share</h3>
            <p>Upload your AI masterpieces to the gallery</p>
          </div>
        </div>

        <!-- Flow Arrow -->
        <div class="flow-arrow">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Step 2: Discover -->
        <div class="flow-step">
          <div class="step-number">02</div>
          <div class="step-content">
            <div class="step-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 12H18C19.1046 12 20 12.8954 20 14V18C20 19.1046 19.1046 20 18 20H10C8.89543 20 8 19.1046 8 18V14C8 12.8954 8.89543 12 10 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Copy & Learn</h3>
            <p>Get inspired and copy prompts instantly</p>
          </div>
        </div>

        <!-- Flow Arrow -->
        <div class="flow-arrow">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Step 3: Connect -->
        <div class="flow-step">
          <div class="step-number">03</div>
          <div class="step-content">
            <div class="step-icon heart-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>Like & Connect</h3>
            <p>Show appreciation and connect with creators</p>
            <div class="coming-soon-badge">Coming Soon</div>
          </div>
        </div>
      </div>

      <!-- Featured Monthly Winner -->
      <div class="monthly-spotlight">
        <div class="spotlight-header">
          <div class="trophy-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="spotlight-text">
            <h3>Monthly Spotlight</h3>
            <p>Win 50€ print credit & get featured at Stablehub Campus</p>
          </div>
          <div class="winner-badge">
            <span>🏆 This Month</span>
          </div>
        </div>
        
        <div class="spotlight-content">
          <div class="spotlight-main">
            <div class="spotlight-image">
              <div class="image-placeholder">
                <span>Your creation here</span>
                <div class="glow-effect"></div>
              </div>
            </div>
            <div class="spotlight-info">
              <h4>Creative Excellence Award</h4>
              <p>Submit your best AI artwork and compete for recognition, prizes, and campus exhibition.</p>
              
              <div class="spotlight-features">
                <div class="feature-item">
                  <div class="feature-icon">💰</div>
                  <span>50€ Print Credit</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🖼️</div>
                  <span>Campus Exhibition</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">⭐</div>
                  <span>Portfolio Feature</span>
                </div>
                <div class="feature-item">
                  <div class="feature-icon">🎯</div>
                  <span>Creative Mentoring</span>
                </div>
              </div>

              <div class="submission-countdown">
                <div class="countdown-label">Submissions close in:</div>
                <div class="countdown-timer">12 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    <section class="tutorials-teaser" class:visible={tutorialsVisible}>
      <div class="tutorials-header">
        <h2>New here? Start with our tutorials</h2>
        <p class="tutorials-subtitle">Master AI image generation with our step-by-step guides</p>
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

      <!-- Tutorial CTA -->
      <div class="tutorial-cta-simple">
        <a href="{base}/guided-tutorial" class="cta-link">
          <span>View all tutorials</span>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
    
    <!-- Powered by Section -->
    <section class="powered-by" class:visible={tutorialsVisible}>
      <div class="powered-by-header">
        <h2>Powered by</h2>
        <p class="powered-by-subtitle">Supported by institutions and organizations</p>
      </div>
      
      <div class="partner-logos">
        <div class="partner-logo">
          <img src="{base}/credit/bw.png" alt="Baden-Württemberg" />
        </div>
        <div class="partner-logo">
          <img src="{base}/credit/DE.jpg" alt="Deutschland" />
        </div>
        <div class="partner-logo">
          <img src="{base}/credit/hfg.svg" alt="HfG Gmünd" />
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <div class="footer-section footer-legal">
          <h3>Legal</h3>
          <ul class="footer-links">
            <li><a href="{base}/imprint">Imprint</a></li>
            <li><a href="{base}/data-privacy">Data Privacy</a></li>
          </ul>
        </div>
        
        <div class="footer-section footer-powered">
          <h3>Powered by</h3>
          <div class="powered-grid">
            <div class="powered-item">
              <span class="institution-name">HfG Schwäbisch Gmünd</span>
            </div>
            <div class="powered-item">
              <span class="institution-name">Federal Ministry of<br>Research, Technology<br>and Space</span>
            </div>
            <div class="powered-item">
              <span class="institution-name">Ministerium für Wissenschaft,<br>Forschung und Kunst<br>Baden-Württemberg</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 Stablehub. All rights reserved.</p>
      </div>
    </footer>
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

  /* Sidebar Control Buttons */
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

  /* Community Flow Design */
  .community-flow {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4rem 0;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .flow-step {
    position: relative;
    text-align: center;
    flex: 1;
    min-width: 200px;
    max-width: 250px;
  }

  .step-number {
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    background: rgba(252, 234, 43, 0.1);
    border: 2px solid rgba(252, 234, 43, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    color: #FCEA2B;
    z-index: 2;
  }

  .step-content {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 2rem 1.5rem 1.5rem;
    transition: all 0.3s ease;
    position: relative;
  }

  .step-content:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(252, 234, 43, 0.2);
    transform: translateY(-4px);
  }

  .step-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    color: #FCEA2B;
    transition: all 0.3s ease;
  }

  .step-content:hover .step-icon {
    transform: scale(1.1);
    color: #FFE566;
  }

  .step-icon svg {
    width: 100%;
    height: 100%;
  }

  .heart-icon {
    position: relative;
  }

  .step-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #f0f0f0;
  }

  .step-content p {
    color: #a0a0a0;
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.4;
  }

  .coming-soon-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: #ff6b6b;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .flow-arrow {
    color: rgba(252, 234, 43, 0.4);
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .flow-arrow svg {
    width: 100%;
    height: 100%;
  }

  /* Monthly Spotlight */
  .monthly-spotlight {
    margin: 4rem auto;
    max-width: 80%;
    background: linear-gradient(135deg, rgba(252, 234, 43, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(252, 234, 43, 0.1);
    border-radius: 20px;
    padding: 2rem;
    position: relative;
  }

  .spotlight-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .trophy-icon {
    width: 40px;
    height: 40px;
    color: #ffd700;
    flex-shrink: 0;
  }

  .trophy-icon svg {
    width: 100%;
    height: 100%;
  }

  .spotlight-text {
    flex: 1;
  }

  .spotlight-text h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: #f0f0f0;
  }

  .spotlight-text p {
    color: #a0a0a0;
    margin: 0;
    font-size: 0.95rem;
  }

  .winner-badge {
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, rgba(252, 234, 43, 0.1) 0%, rgba(255, 215, 0, 0.1) 100%);
    border: 1px solid rgba(252, 234, 43, 0.3);
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #ffd700;
    white-space: nowrap;
  }

  .spotlight-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .spotlight-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    align-items: center;
  }

  .spotlight-image {
    aspect-ratio: 4/3;
    position: relative;
  }

  .image-placeholder {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 2px dashed rgba(252, 234, 43, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
    font-style: italic;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .image-placeholder:hover {
    border-color: rgba(252, 234, 43, 0.4);
    background: rgba(255, 255, 255, 0.05);
  }

  .glow-effect {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(252, 234, 43, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: glowPulse 3s ease-in-out infinite;
  }

  @keyframes glowPulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
  }

  .spotlight-info h4 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f0f0f0;
    background: linear-gradient(135deg, #f0f0f0 0%, #FCEA2B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .spotlight-info p {
    color: #a0a0a0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .spotlight-features {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.8rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: rgba(252, 234, 43, 0.05);
    border-color: rgba(252, 234, 43, 0.2);
    transform: translateY(-2px);
  }

  .feature-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .feature-item span {
    font-size: 0.9rem;
    font-weight: 500;
    color: #d0d0d0;
  }

  .submission-countdown {
    background: rgba(252, 234, 43, 0.05);
    border: 1px solid rgba(252, 234, 43, 0.15);
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
  }

  .countdown-label {
    font-size: 0.85rem;
    color: #a0a0a0;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .countdown-timer {
    font-size: 1.5rem;
    font-weight: 700;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
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

  .tutorial-highlights {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 1rem;
  }

  /* Tutorial CTA - Same as Community CTA */
  .tutorial-cta-simple {
    text-align: center;
    margin-top: 3rem;
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

  /* Powered by Section */
  .powered-by {
    margin: 6rem 0 8rem;
    padding: 4rem 2rem;
    text-align: center;
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .powered-by.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .powered-by-header {
    margin-bottom: 4rem;
  }

  .powered-by-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #FCEA2B 0%, #F7DC6F 50%, #FCEA2B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FCEA2B;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
    position: relative;
    display: inline-block;
  }

  .powered-by-header h2::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #FCEA2B, transparent);
    border-radius: 2px;
    animation: glow-line 2s ease-in-out infinite;
  }

  @keyframes glow-line {
    0%, 100% {
      opacity: 0.6;
      transform: scaleX(0.8);
    }
    50% {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  .powered-by-subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.5;
  }

  .partner-logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    flex-wrap: wrap;
  }

  .partner-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    border-radius: 20px;
    background: #FFFFFF;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(15px);
    height: 250px;
    width: 380px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .partner-logo:hover {
    background: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  .partner-logo img {
    max-height: 180px;
    max-width: 300px;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08));
  }

  .partner-logo:hover img {
    transform: scale(1.05);
    filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.12));
  }

  /* Footer */
  .site-footer {
    background: rgba(18, 18, 18, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem 2rem 1.5rem;
    margin-top: 4rem;
    backdrop-filter: blur(10px);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8rem;
    margin-bottom: 2rem;
  }

  .footer-legal {
    min-width: 160px;
  }

  .footer-powered {
    flex: 1;
    max-width: 800px;
  }

  .footer-section h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #FCEA2B;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-links a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
  }

  .footer-links a:hover {
    color: #FCEA2B;
  }

  .powered-grid {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .powered-item {
    position: relative;
    padding-left: 1.2rem;
    flex: 1;
    min-width: 200px;
  }

  .powered-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.4rem;
    width: 6px;
    height: 6px;
    background: #FCEA2B;
    border-radius: 50%;
  }

  .institution-name {
    color: #a0a0a0;
    font-size: 0.9rem;
    line-height: 1.4;
    display: block;
    transition: color 0.3s ease;
  }

  .powered-item:hover .institution-name {
    color: #c0c0c0;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
  }

  .footer-bottom p {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }

  /* Mobile Footer */
  @media (max-width: 768px) {
    /* Main layout fixes */
    main {
      padding: 1rem !important;
    }
    
    main.expanded {
      padding: 1rem !important;
    }
    
    /* Button visibility fixes */
    .sidebar-collapse-btn {
      display: none !important;
    }
    
    .sidebar-expand-btn {
      top: 1rem;
      left: 1rem;
      z-index: 1000;
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
    
    /* Community flow mobile */
    .community-flow {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .flow-arrow {
      transform: rotate(90deg);
    }
    
    /* Monthly spotlight mobile */
    .monthly-spotlight {
      max-width: 100%;
      margin: 2rem 0;
      padding: 1.5rem;
    }
    
    .spotlight-main {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .spotlight-features {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    /* Tutorial highlights mobile */
    .tutorial-highlights {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    /* Partner logos mobile */
    .partner-logos {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
    
    .partner-logo {
      width: 100%;
      max-width: 300px;
      height: 180px;
      padding: 2rem;
    }
    
    .partner-logo img {
      max-height: 100px;
      max-width: 200px;
    }
    
    /* Footer mobile */
    .site-footer {
      padding: 2rem 1rem 1rem;
    }
    
    .footer-content {
      flex-direction: column;
      gap: 2.5rem;
      align-items: stretch;
    }

    .footer-legal {
      min-width: auto;
    }

    .footer-powered {
      max-width: none;
    }
    
    .powered-grid {
      flex-direction: column;
      gap: 1.5rem;
    }

    .powered-item {
      min-width: auto;
    }
    
    .institution-name {
      font-size: 0.85rem;
      line-height: 1.3;
    }
  }
</style>
