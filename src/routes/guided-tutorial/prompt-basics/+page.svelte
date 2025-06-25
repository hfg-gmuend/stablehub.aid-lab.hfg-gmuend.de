<script lang="ts">
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
  
  // Interfaces and Types
  interface ExamplePrompts {
    basic: string;
    improved: string;
    detailed: string;
    structured: string;
  }
  
  interface StyleCategory {
    category: string;
    keywords: string[];
  }
  
  // Example prompts for demonstration
  const examplePrompts: ExamplePrompts = {
    basic: "a castle",
    improved: "a medieval castle on a hill",
    detailed: "a medieval castle on a hill, surrounded by a foggy forest, at sunset, photorealistic representation, detailed architecture",
    structured: "Medieval castle | on a hill | surrounded by foggy forest | sunset | photorealistic | detailed architecture | cinematic lighting | 8k"
  };

  // Style keywords for demonstration
  const styleKeywords: StyleCategory[] = [
    { category: "Photorealism", 
      keywords: ["photorealistic", "hyperrealistic", "8k", "detailed", "cinematic", "professional photography"] },
    { category: "Art & Illustration", 
      keywords: ["oil painting", "watercolor", "concept art", "digital art", "anime style", "cartoon style"] },
    { category: "Graphics & Design", 
      keywords: ["vector art", "flat design", "minimalist", "isometric", "3D render", "pixel art"] }
  ];
  
  // Navigation props (explicitly typed as strings)
  const navigationPrevPath: string = "/guided-tutorial/stable-diffusion-intro";
  const navigationNextPath: string = "/guided-tutorial/core-parameters";
</script>

<svelte:head>
  <title>Prompt Basics | Guided Tutorial | Stablehub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Prompt Basics</h1>
    <p class="subtitle">The Art of Effective Prompt Writing</p>
  </div>

  <div class="content-sections">
    <!-- Anatomy of a Prompt -->
    <section class="tutorial-section">
      <h2>Anatomy of a Prompt</h2>
      <p>A successful prompt typically consists of four main elements:</p>
      
      <div class="anatomy-grid">
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">1</span>
            <h3>Subject</h3>
          </div>
          <p>The main object or person in the image — <em>What</em> should be depicted?</p>
          <div class="anatomy-example">
            <span class="highlight">A medieval castle</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">2</span>
            <h3>Style</h3>
          </div>
          <p>The artistic representation — <em>How</em> should it look?</p>
          <div class="anatomy-example">
            <span class="highlight">photorealistic, cinematic lighting</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">3</span>
            <h3>Context</h3>
          </div>
          <p>The environment or situation — <em>Where</em> and <em>when</em> does it take place?</p>
          <div class="anatomy-example">
            <span class="highlight">on a hill, at sunset</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">4</span>
            <h3>Details</h3>
          </div>
          <p>Additional descriptions that enrich the image.</p>
          <div class="anatomy-example">
            <span class="highlight">detailed architecture, surrounded by foggy forest</span>
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Important to know:</h4>
        <p>Not every prompt needs to contain all four elements, but the more specific your prompt is, the more targeted the generated image will be.</p>
      </div>
    </section>

    <!-- Order & Clarity -->
    <section class="tutorial-section">
      <h2>Order & Clarity</h2>
      
      <p>The order of elements in your prompt influences the result. A recommended structure is:</p>
      
      <div class="order-flow">
        <div class="flow-item">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h4>Subject</h4>
            <p>What is the main motif?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h4>Properties</h4>
            <p>What does it look like?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h4>Environment</h4>
            <p>Where is it located?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-content">
            <h4>Style & Details</h4>
            <p>Artistic elements</p>
          </div>
        </div>
      </div>
      
      <div class="prompt-evolution">
        <h3>From Simple to Detailed Prompt</h3>
        
        <div class="prompt-level">
          <div class="level-label">Simple</div>
          <div class="prompt-box">
            <p>{examplePrompts.basic}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Very general, many interpretations possible</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="level-label">Better</div>
          <div class="prompt-box">
            <p>{examplePrompts.improved}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Basic details, but still open to many styles</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="prompt-box detailed">
            <p>{examplePrompts.detailed}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Clear motif with style, context, and details</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="level-label">Structured</div>
          <div class="prompt-box structured">
            <p>{examplePrompts.structured}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Well-organized with separators for better readability</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Common Style Keywords -->
    <section class="tutorial-section">
      <h2>Common Style Keywords</h2>
      
      <p>Style keywords are crucial for defining the look of your image. Here are some common categories:</p>
      
      <div class="style-categories">
        {#each styleKeywords as style}
          <div class="style-category">
            <h3>{style.category}</h3>
            <div class="keywords-cloud">
              {#each style.keywords as keyword}
                <span class="keyword">{keyword}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      
      <div class="style-examples">
        <h3>Example Applications</h3>
        
        <div class="style-example">
          <div class="example-label">Photorealism:</div>
          <div class="example-prompt">
            <p>A portrait of an elderly man with a beard, detailed facial features, photorealistic, studio lighting, 8k, professional photography</p>
          </div>
        </div>
        
        <div class="style-example">
          <div class="example-label">Art:</div>
          <div class="example-prompt">
            <p>A landscape with mountains and a lake, oil painting style, impressionistic, bold brushstrokes, vibrant colors</p>
          </div>
        </div>
        
        <div class="style-example">
          <div class="example-label">Design:</div>
          <div class="example-prompt">
            <p>A futuristic car, isometric vector illustration, clean lines, flat colors, minimalist style</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Practical Exercise -->
    <section class="tutorial-section">
      <h2>Practical Exercise</h2>
      
      <div class="exercise-box">
        <h3>Create your own structured prompt</h3>
        <p>Try to develop a prompt according to the following scheme:</p>
        
        <div class="prompt-template">
          <p><span class="template-part">Subject</span> | <span class="template-part">Properties</span> | <span class="template-part">Environment</span> | <span class="template-part">Style</span> | <span class="template-part">Details</span></p>
        </div>
        
        <p>Example for a nature scene:</p>
        <div class="prompt-example">
          <p>A majestic waterfall | tall and powerful, turquoise blue water | in a tropical rainforest | photorealistic | morning mist, golden sunlight, detailed vegetation, 8k</p>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Learning objective achieved:</h4>
        <p>You should now be able to write a structured prompt that includes all important elements and delivers a predictable result.</p>
      </div>
      
      <!-- Navigation buttons -->
      <TutorialNavigation 
        previousPath={navigationPrevPath}
        nextPath={navigationNextPath}
      />
    </section>
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
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #f0f0f0;
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #a0a0a0;
  }
  
  .content-sections {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  .tutorial-section {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #333;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.3rem;
    margin: 1.5rem 0 1rem;
    color: #d0d0d0;
  }
  
  p {
    margin: 0 0 1rem;
    line-height: 1.6;
    color: #b0b0b0;
  }
  
  /* Anatomy Grid */
  .anatomy-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  @media (max-width: 768px) {
    .anatomy-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .anatomy-item {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .anatomy-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    background-color: #FCEA2B;
    color: #000;
    border-radius: 50%;
    font-weight: bold;
    margin-right: 10px;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .anatomy-example {
    background-color: #2a2a2a;
    padding: 0.8rem;
    border-radius: 6px;
    margin-top: 1rem;
  }
  
  .highlight {
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  /* Flow Diagram */
  .order-flow {
    display: flex;
    flex-wrap: nowrap; /* Prevent wrapping */
    align-items: center;
    justify-content: flex-start; /* Align items to the start */
    gap: 0.8rem;
    margin: 2rem 0;
    overflow-x: auto; /* Allow horizontal scrolling */
    padding: 1rem 0.5rem; /* Add some padding for scrollbar and spacing */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    scrollbar-width: thin; /* Firefox scrollbar */
  }

  /* Optional: Style scrollbar for Webkit browsers */
  .order-flow::-webkit-scrollbar {
    height: 8px;
  }

  .order-flow::-webkit-scrollbar-track {
    background: #222;
    border-radius: 4px;
  }

  .order-flow::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }

  .flow-item {
    display: flex;
    align-items: center;
    background-color: #222;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #333;
    min-width: 150px; /* Ensure items have a minimum width */
    flex-shrink: 0; /* Prevent items from shrinking */
  }
  
  .flow-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background-color: #FCEA2B;
    color: #000;
    border-radius: 50%;
    font-weight: bold;
    margin-right: 10px;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .flow-content h4 {
    margin: 0 0 0.4rem;
    font-size: 1rem;
  }
  
  .flow-content p {
    margin: 0;
    font-size: 0.8rem;
    color: #888;
  }
  
  .flow-arrow {
    color: #FCEA2B;
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  /* Prompt Evolution */
  .prompt-evolution {
    margin-top: 2.5rem;
  }
  
  .prompt-level {
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .prompt-level {
      grid-template-columns: 1fr;
    }
  }
  
  .level-label {
    font-weight: bold;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  .prompt-box {
    background-color: #222;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #4da6ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  .prompt-box.detailed {
    border-left: 3px solid #4CAF50;
  }
  
  .prompt-box.structured {
    border-left: 3px solid #FCEA2B;
  }
  
  .prompt-box p {
    margin: 0;
    color: #e0e0e0;
  }
  
  .prompt-effect {
    font-style: italic;
    color: #888;
    font-size: 0.9rem;
  }
  
  .prompt-effect p {
    margin: 0;
    color: #888;
  }
  
  /* Style Categories */
  .style-categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  @media (max-width: 768px) {
    .style-categories {
      grid-template-columns: 1fr;
    }
  }
  
  .style-category {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .style-category h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    text-align: center;
  }
  
  .keywords-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .keyword {
    background-color: #2a2a2a;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #d0d0d0;
  }
  
  /* Style Examples */
  .style-examples {
    margin-top: 2rem;
  }
  
  .style-example {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .style-example {
      grid-template-columns: 1fr;
    }
  }
  
  .example-label {
    font-weight: bold;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  .example-prompt {
    background-color: #222;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #4da6ff;
  }
  
  .example-prompt p {
    margin: 0;
    color: #d0d0d0;
    font-style: italic;
  }
  
  /* Exercise Box */
  .exercise-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #333;
  }
  
  .prompt-template {
    background-color: #2a2a2a;
    padding: 1rem;
    border-radius: 6px;
    margin: 1rem 0;
    text-align: center;
  }
  
  .template-part {
    color: #FCEA2B;
    font-weight: bold;
  }
  
  .prompt-example {
    background-color: #2a2a2a;
    padding: 1rem;
    border-radius: 6px;
    margin-top: 1rem;
    border-left: 3px solid #FCEA2B;
  }
  
  .prompt-example p {
    margin: 0;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  /* Info Boxes */
  .info-box {
    background-color: #222;
    border-left: 4px solid #4da6ff;
    padding: 1.2rem;
    margin: 1.5rem 0;
    border-radius: 0 6px 6px 0;
  }
  
  .info-box.success {
    border-left-color: #4CAF50;
  }
  
  .info-box h4 {
    margin-top: 0;
    margin-bottom: 0.7rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .info-box p {
    margin-bottom: 0;
  }
</style>
