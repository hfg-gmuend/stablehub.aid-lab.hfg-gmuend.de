<script lang="ts">
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";

  // Types for model data
  interface ModelComparison {
    name: string;
    strengths: string[]; // Renamed from stärken
    weaknesses: string[]; // Renamed from schwächen
  }

  interface Checkpoint {
    name: string;
    focus: string;
    description: string;
  }

  // Model data for the comparison table
  const modelComparisons: ModelComparison[] = [
    {
      name: "Stable Diffusion 1.5",
      strengths: ["Mature and stable", "Many training resources", "Good everyday photos"],
      weaknesses: ["Older model", "Anatomy sometimes problematic", "Limited creativity"]
    },
    {
      name: "Stable Diffusion XL",
      strengths: ["Better detail fidelity", "Improved prompt adherence", "Stronger composition"],
      weaknesses: ["Higher system requirements", "Longer generation time", "Fewer extensions"]
    },
    {
      name: "Midjourney",
      strengths: ["Very aesthetic results", "Easy to use", "Consistent quality"],
      weaknesses: ["Cloud-based only", "Less control", "No local installation"]
    }
  ];

  // Example checkpoints
  const checkpoints: Checkpoint[] = [
    { name: "Realistic Vision", focus: "Photorealism", description: "Optimized for realistic portraits and scenes" },
    { name: "Deliberate", focus: "Balance", description: "Balanced between realism and artistic style" },
    { name: "Dreamshaper", focus: "Creativity", description: "Imaginative, artistic image creations" },
    { name: "AbsoluteReality", focus: "Hyperrealism", description: "Extremely detailed photorealistic images" }
  ];
</script>

<svelte:head>
  <title>Understanding AI Models | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Understanding AI Models</h1>
    <p class="subtitle">A deeper look into image generation models</p>
  </div>

  <div class="content-sections">
    <!-- Introduction -->
    <section class="tutorial-section">
      <h2>Model Landscape Overview</h2>

      <p>The world of generative AI models is evolving rapidly. Different models have different strengths and are suitable for various use cases.</p>

      <div class="models-overview">
        <div class="models-grid">
          <div class="model-card">
            <div class="model-header">
              <h3>Stable Diffusion</h3>
              <span class="model-badge open">Open Source</span>
            </div>
            <div class="model-desc">
              <p>Open-source model, can be run locally or in the cloud. Many variants (1.5, 2.0, XL) and community extensions.</p>
            </div>
          </div>

          <div class="model-card">
            <div class="model-header">
              <h3>Midjourney</h3>
              <span class="model-badge commercial">Commercial</span>
            </div>
            <div class="model-desc">
              <p>Discord-based service with very aesthetic, artistic results. Proprietary, but easy to use.</p>
            </div>
          </div>

          <div class="model-card">
            <div class="model-header">
              <h3>DALL-E</h3>
              <span class="model-badge commercial">Commercial</span>
            </div>
            <div class="model-desc">
              <p>OpenAI's image generator, known for good prompt interpretation and safe content. API available.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>Important to know:</h4>
        <p>All models have their own strengths and "aesthetics". It's often a matter of personal taste and the specific project which model is best suited.</p>
      </div>
    </section>

    <!-- Model Comparison -->
    <section class="tutorial-section">
      <h2>Model Comparison: Strengths and Weaknesses</h2>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Strengths</th>
              <th>Weaknesses</th>
            </tr>
          </thead>
          <tbody>
            {#each modelComparisons as model}
              <tr>
                <td class="model-name">{model.name}</td>
                <td>
                  <ul class="feature-list">
                    {#each model.strengths as strength}
                      <li><span class="feature-plus">+</span> {strength}</li>
                    {/each}
                  </ul>
                </td>
                <td>
                  <ul class="feature-list">
                    {#each model.weaknesses as weakness}
                      <li><span class="feature-minus">-</span> {weakness}</li>
                    {/each}
                  </ul>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="comparison-images">
        <h3>Stylistic Differences</h3>
        <div class="image-comparison">
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="SD 1.5">
                <span>Example Image SD 1.5</span>
              </div>
            </div>
            <p>Stable Diffusion 1.5</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="SD XL">
                <span>Example Image SD XL</span>
              </div>
            </div>
            <p>Stable Diffusion XL</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Midjourney">
                <span>Example Image Midjourney</span>
              </div>
            </div>
            <p>Midjourney v5</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Checkpoints and Custom Models -->
    <section class="tutorial-section">
      <h2>Checkpoints and Custom Models</h2>

      <p>In the Stable Diffusion ecosystem, there are various "checkpoints" - specialized model variants optimized for specific types of images or styles.</p>

      <div class="checkpoint-grid">
        {#each checkpoints as checkpoint}
          <div class="checkpoint-card">
            <h3>{checkpoint.name}</h3>
            <div class="checkpoint-focus">
              <span class="focus-label">Focus:</span>
              <span class="focus-value">{checkpoint.focus}</span>
            </div>
            <p>{checkpoint.description}</p>
          </div>
        {/each}
      </div>

      <div class="workflow-tip">
        <h3>Tips for Model Selection</h3>
        <div class="tip-container">
          <div class="tip-item">
            <h4>For Beginners</h4>
            <p>Stable Diffusion 1.5 with a balanced checkpoint like "Deliberate" or "Dreamshaper". Easy to run and good all-rounders.</p>
          </div>
          <div class="tip-item">
            <h4>For Professionals</h4>
            <p>Combine custom checkpoints with specific mix models and LoRAs. More advanced setups with custom VAEs for better color reproduction.</p>
          </div>
          <div class="tip-item">
            <h4>For Experiments</h4>
            <p>Test different models and compare results. Sometimes an older model works better for specific use cases than newer ones.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Model Versions and Development -->
    <section class="tutorial-section">
      <h2>Model Versions and Development</h2>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-date">Aug 2022</div>
          <div class="timeline-content">
            <h3>Stable Diffusion 1.4</h3>
            <p>First public version, revolutionized AI image generation with its open-source approach</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Oct 2022</div>
          <div class="timeline-content">
            <h3>Stable Diffusion 1.5</h3>
            <p>Improved image quality, still widely used today and the basis for many community models</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Nov 2022</div>
          <div class="timeline-content">
            <h3>Stable Diffusion 2.0/2.1</h3>
            <p>New architecture with 768x768 resolution, higher detail accuracy</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Jul 2023</div>
          <div class="timeline-content">
            <h3>Stable Diffusion XL</h3>
            <p>Fundamentally revised model with significantly improved image quality and prompt adherence</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-date">Future</div>
          <div class="timeline-content">
            <h3>Multimodal Models</h3>
            <p>Integration of text, image, animation, and 3D into unified AI systems</p>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>Stay Active:</h4>
        <p>AI development is progressing rapidly. To stay up-to-date, we recommend following communities like reddit.com/r/StableDiffusion, Discord servers, and AI blogs.</p>
      </div>
    </section>

    <!-- Exercise Area -->
    <section class="tutorial-section">
      <h2>Practical Comparison</h2>

      <div class="exercise-box">
        <h3>Exercise: Model Comparison with Identical Prompt</h3>
        <p>Perform a comparison test to get a feel for the differences between models:</p>

        <ol>
          <li>Choose a prompt relevant to you, e.g., "A futuristic cityscape at sunset"</li>
          <li>Generate images with identical parameters (Seed, CFG, Steps) in different models</li>
          <li>Compare the results and note the differences in style, quality, and prompt fidelity</li>
          <li>Determine which model is best suited for your specific projects</li>
        </ol>

        <div class="prompt-template">
          <h4>Test Prompt:</h4>
          <div class="template-box">
            <p>A futuristic cityscape at sunset, detailed, cinematic, atmospheric</p>
          </div>
        </div>
      </div>

      <div class="info-box success">
        <h4>Learning objective achieved:</h4>
        <p>You now understand the differences between various AI image generation models and can make informed decisions about which model is best suited for your projects.</p>
      </div>

      <!-- Navigation buttons -->
      <TutorialNavigation
        previousPath="/guided-tutorial/advanced-prompting"
        nextPath="/guided-tutorial/advanced/workflow-optimization"
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
  
  /* Models Overview */
  .models-overview {
    margin: 1.5rem 0;
  }
  
  .models-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }
  
  @media (max-width: 768px) {
    .models-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .model-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .model-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .model-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .model-badge {
    padding: 0.3rem 0.6rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .model-badge.open {
    background-color: #4CAF50;
    color: #000;
  }
  
  .model-badge.commercial {
    background-color: #FFC107;
    color: #000;
  }
  
  .model-desc p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  /* Comparison Table */
  .comparison-table {
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  
  th, td {
    padding: 1rem;
    border-bottom: 1px solid #333;
  }
  
  th {
    background-color: #222;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1rem;
  }
  
  td {
    vertical-align: top;
  }
  
  .model-name {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    color: #d0d0d0;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .feature-list li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  .feature-plus, .feature-minus {
    display: inline-block;
    width: 18px;
    font-weight: bold;
  }
  
  .feature-plus {
    color: #4CAF50;
  }
  
  .feature-minus {
    color: #F44336;
  }
  
  /* Comparison Images */
  .comparison-images {
    margin-top: 2rem;
  }
  
  .image-comparison {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .image-comparison {
      grid-template-columns: 1fr;
    }
  }
  
  .comparison-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .comparison-image {
    width: 100%;
    margin-bottom: 0.8rem;
  }
  
  .placeholder-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #2a2a2a;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    position: relative;
    border: 1px solid #333;
  }
  
  .placeholder-image span {
    color: #888;
    text-align: center;
    font-style: italic;
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  
  .placeholder-image::before {
    content: attr(data-label);
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(77, 166, 255, 0.8);
    color: #000;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    border-radius: 8px 0 8px 0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
  }
  
  .comparison-item p {
    margin: 0;
    text-align: center;
    font-size: 0.9rem;
    color: #a0a0a0;
  }
  
  /* Checkpoint Grid */
  .checkpoint-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .checkpoint-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .checkpoint-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .checkpoint-card h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }
  
  .checkpoint-focus {
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  
  .focus-label {
    font-size: 0.9rem;
    color: #888;
    margin-right: 0.5rem;
  }
  
  .focus-value {
    background-color: #2a2a2a;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .checkpoint-card p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  /* Workflow Tips */
  .workflow-tip {
    margin-top: 2rem;
  }
  
  .tip-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .tip-container {
      grid-template-columns: 1fr;
    }
  }
  
  .tip-item {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .tip-item h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .tip-item p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.9rem;
  }
  
  /* Timeline */
  .timeline {
    margin: 2rem 0;
    position: relative;
  }
  
  .timeline::before {
    content: '';
    position: absolute;
    left: 120px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #333;
  }
  
  .timeline-item {
    display: flex;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .timeline-date {
    width: 100px;
    padding-right: 20px;
    text-align: right;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
    color: #FCEA2B;
    padding-top: 0.2rem;
  }
  
  .timeline-content {
    flex: 1;
    padding-left: 40px;
  }
  
  .timeline-content::before {
    content: '';
    position: absolute;
    left: 116px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FCEA2B;
  }
  
  .timeline-content h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  .timeline-content p {
    margin: 0;
    color: #a0a0a0;
  }
  
  /* Exercise Box */
  .exercise-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #4da6ff;
  }
  
  .exercise-box h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .exercise-box ol {
    padding-left: 1.5rem;
    margin: 0 0 1.5rem;
  }
  
  .exercise-box li {
    margin-bottom: 0.8rem;
    color: #b0b0b0;
  }
  
  .prompt-template {
    margin-top: 1.5rem;
  }
  
  .prompt-template h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .template-box {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #FCEA2B;
  }
  
  .template-box p {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    color: #d0d0d0;
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
    margin-top: 0;    margin-bottom: 0.7rem;    color: #e0e0e0;    font-family: 'IBM Plex Mono', monospace;  }    .info-box p {    margin-bottom: 0;  }    /* Navigation */  .next-section {    display: flex;    flex-direction: column;    align-items: flex-end;    margin-top: 2rem;  }    .next-button {    display: inline-flex;    align-items: center;    background-color: #FCEA2B;    color: #000;    padding: 0.8rem 1.2rem;    border-radius: 6px;    text-decoration: none;    font-family: 'IBM Plex Mono', monospace;    font-weight: 500;
    margin-top: 1rem;
    transition: all 0.2s;
  }
  
</style>
