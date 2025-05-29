<script lang="ts">
  import TutorialPanel from "$lib/components/TutorialPanel.svelte";
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
  import { assets } from '$app/paths';
  
  // Define navigation path types
  interface NavigationProps {
    nextPath: string | null | undefined;
    nextLabel: string;
    previousPath?: string;
    previousLabel?: string;
  }

  
  // Define parameter types
  interface Parameter {
    name: string;
    value: string | number;
    description: string;
  }
  
  // Define learning objective types
  type LearningObjective = string;
  
  // Parameters for display
  const parameters: Parameter[] = [
    {
      name: "CFG Scale",
      value: 7.5,
      description: "Controls how strongly the prompt is followed. Higher values = more prompt adherence."
    },
    {
      name: "Steps",
      value: 30,
      description: "Number of diffusion steps. More steps = more details, but longer generation time."
    },
    {
      name: "Seed",
      value: 1234567890,
      description: "Starting point for the random generator. Same seed = reproducible images."
    }
  ];
  
  // Learning objectives
  const learningObjectives: LearningObjective[] = [
    "What Stable Diffusion is and how it fundamentally works",
    "Differences between online services and local installation",
    "The role of positive and negative prompts",
    "Why parameters are important and how they influence the result"
  ];
  
  // Navigation props
  const navigationProps: NavigationProps = {
    nextPath: "/guided-tutorial/prompt-basics",
    nextLabel: "Continue to the next topic"
  };
</script>



<svelte:head>
  <title>What is Stable Diffusion? | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>What is Stable Diffusion?</h1>
    <p class="subtitle">Introduction to AI Image Generation</p>
  </div>

  <div class="content-sections">
    <!-- Introduction Section -->
    <section class="tutorial-section">
      <h2>Brief Model Overview</h2>
      <div class="content-block">
        <div class="text-content">
          <p>Stable Diffusion is an AI model for image generation developed by Stability AI. It belongs to the family of <strong>diffusion models</strong>, which are based on a step-by-step removal of noise.</p>
          
          <p>The core functions of Stable Diffusion are:</p>
          <ul>
            <li>Text-to-Image Generation</li>
            <li>Image-to-Image Transformation</li>
            <li>Inpainting and Outpainting (Completing existing images)</li>
            <li>Controlled Image Generation (ControlNet)</li>
          </ul>
        </div>
        <div class="image-block">
          <img src="{assets}/tutorial/stablediffusion.jpg" alt="Stable Diffusion Process" class="tutorial-image" />
          <p class="image-caption">The Diffusion Process: From Noise to Image</p>
        </div>
      </div>
    </section>

    <!-- Second Section: Online vs. Local Operation -->
    <section class="tutorial-section">
      <h2>Online versus Local Operation</h2>
      <div class="compare-table">
        <div class="compare-column">
          <h3>Online Services</h3>
          <ul class="feature-list">
            <li><span class="icon check">✓</span> No installation required</li>
            <li><span class="icon check">✓</span> Immediately usable</li>
            <li><span class="icon check">✓</span> No powerful hardware needed</li>
            <li><span class="icon x">×</span> Usually paid or limited</li>
            <li><span class="icon x">×</span> Limited customization options</li>
            <li><span class="icon x">×</span> Potentially less privacy</li>
          </ul>
          <p class="examples">Examples: Midjourney, DALL-E, Leonardo.AI</p>
        </div>
        
        <div class="compare-column">
          <h3>Local Installation</h3>
          <ul class="feature-list">
            <li><span class="icon check">✓</span> Complete control</li>
            <li><span class="icon check">✓</span> No running costs</li>
            <li><span class="icon check">✓</span> Custom models & extensions</li>
            <li><span class="icon x">×</span> Requires powerful GPU</li>
            <li><span class="icon x">×</span> Technical know-how required</li>
            <li><span class="icon x">×</span> More complex setup</li>
          </ul>
          <p class="examples">Interfaces: A1111 Webui, ComfyUI, InvokeAI</p>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Did you know?</h4>
        <p>The HfG Ai-Hub uses Stable Diffusion in the backend, offering you the benefits of local operation without the installation effort!</p>
      </div>
    </section>

    <!-- Third Section: Prompts & Parameters -->
    <section class="tutorial-section">
      <h2>Positive ↔ Negative Prompt & Parameters</h2>
      
      <div class="content-block">
        <div class="text-content">
          <h3>Positive Prompt</h3>
          <p>The positive prompt describes what should appear in the image. The more detailed and precise your wording, the more targeted the model can generate.</p>
          
          <div class="prompt-example">
            <p class="prompt-text">A majestic castle on a mountain, sunset, dramatic lighting, detailed architecture, 8k, cinematic, fog, mystical atmosphere</p>
          </div>
          
          <h3>Negative Prompt</h3>
          <p>The negative prompt specifies what should be avoided in the image. This helps reduce unwanted elements or quality issues.</p>
          
          <div class="prompt-example negative">
            <p class="prompt-text">blurry, bad anatomy, distorted, deformed, disfigured, poor quality, low resolution, text, watermark</p>
          </div>
        </div>
        
        <div class="parameter-sidebar">
          <h3>Parameter Control</h3>
          {#each parameters as param}
            <div class="parameter-item">
              <div class="param-header">
                <span class="param-name">{param.name}</span>
                <span class="param-value">{param.value}</span>
              </div>
              <p class="param-desc">{param.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Learning Check Section -->
    <section class="tutorial-section">
      <h2>Learning Objective Check</h2>
      <div class="info-box success">
        <h4>You should now understand:</h4>
        <ul>
          {#each learningObjectives as objective}
            <li>{objective}</li>
          {/each}
        </ul>
      </div>
      
      <!-- Navigation buttons -->
      <TutorialNavigation 
        nextPath={navigationProps.nextPath}
        nextLabel={navigationProps.nextLabel}
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
  
  ul {
    margin: 0 0 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  .content-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .content-block {
      grid-template-columns: 1fr;
    }
  }
  
  .image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tutorial-image {
    width: 100%;
    max-width: 400px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .image-caption {
    font-size: 0.9rem;
    color: #888;
    text-align: center;
    margin-top: 0.7rem;
  }
  
  .compare-table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .compare-table {
      grid-template-columns: 1fr;
    }
  }
  
  .compare-column {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
  }
  
  .icon {
    display: inline-block;
    width: 20px;
    margin-right: 10px;
    text-align: center;
  }
  
  .check {
    color: #4CAF50;
  }
  
  .x {
    color: #F44336;
  }
  
  .examples {
    margin-top: 1rem;
    font-style: italic;
    font-size: 0.9rem;
    color: #777;
  }
  
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
  
  .info-box p, .info-box ul {
    margin-bottom: 0;
  }
  
  .prompt-example {
    background-color: #222;
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    border-left: 3px solid #4da6ff;
  }
  
  .prompt-example.negative {
    border-left-color: #F44336;
  }
  
  .prompt-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #e0e0e0;
    margin: 0;
  }
  
  .parameter-sidebar {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .parameter-item {
    margin-bottom: 1.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #333;
  }
  
  .parameter-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .param-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .param-name {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    color: #e0e0e0;
  }
  
  .param-value {
    background-color: #FCEA2B;
    color: #000;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .param-desc {
    font-size: 0.9rem;
    color: #a0a0a0;
    margin: 0;
  }
  

  
</style>
