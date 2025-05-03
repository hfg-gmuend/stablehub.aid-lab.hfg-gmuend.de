<script>
  // Example images for CFG comparison
  const cfgExamples = [
    // Remove /static from image paths
    { level: "Low (CFG 3)", image: "/tutorial/cfglow.png", description: "Creative, but often far from the prompt" },
    { level: "Medium (CFG 7)", image: "/tutorial/cfgmedium.png", description: "Good balance between creativity and prompt adherence" },
    { level: "High (CFG 15)", image: "/tutorial/cfghigh.png", description: "Strict prompt adherence, can seem exaggerated" }
  ];

  // Sampler examples
  const samplers = [
    { name: "Euler a", description: "Fast with good details, somewhat creative", startwert: "20-25 Steps" }, // 'startwert' kept as variable name, value translated
    { name: "DPM++ 2M Karras", description: "Highly detailed, good for photorealistic images", startwert: "25-30 Steps" },
    { name: "DDIM", description: "Very stable, good for inpainting", startwert: "30-40 Steps" }
  ];
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
</script>

<svelte:head>
  <title>Core Parameters | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Core Parameters</h1>
    <p class="subtitle">The most important settings for optimal results</p>
  </div>

  <div class="content-sections">
    <!-- CFG-Scale Section -->
    <section class="tutorial-section">
      <h2>2.1 CFG Scale: Creativity vs. Prompt Adherence</h2>

      <p>The <strong>Classifier Free Guidance Scale</strong> (CFG Scale) determines how closely the model should follow your prompt.</p>

      <div class="slider-visualization">
        <div class="slider-container">
          <div class="slider-labels">
            <span>Creativity</span>
            <span>Balance</span>
            <span>Prompt Adherence</span>
          </div>
          <div class="slider-track">
            <div class="slider-thumb" style="left: 50%;">7.5</div>
          </div>
          <div class="slider-values">
            <span>1</span>
            <span>7.5</span>
            <span>20</span>
          </div>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-card">
          <h4>Low CFG Value (1-5)</h4>
          <ul>
            <li>More creativity, interpretation</li>
            <li>Less adherence to the prompt</li>
            <li>More diverse, but unpredictable results</li>
          </ul>
        </div>

        <div class="info-card highlight">
          <h4>Medium CFG Value (6-10)</h4>
          <ul>
            <li>Balanced ratio</li>
            <li>Ideal for most applications</li>
            <li>Default: 7.5</li>
          </ul>
        </div>

        <div class="info-card">
          <h4>High CFG Value (11-20+)</h4>
          <ul>
            <li>Strict prompt adherence</li>
            <li>Less creative freedom</li>
            <li>Can lead to exaggerated images</li>
          </ul>
        </div>
      </div>

      <div class="example-images">
        <h3>CFG Examples with the same prompt</h3>
        <div class="image-comparison">
          {#each cfgExamples as example}
            <div class="comparison-item">
              <div class="comparison-image">
                <img src={example.image} alt={`Example for ${example.level} CFG`} />
              </div>
              <h4>{example.level}</h4>
              <p>{example.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Sampling Steps & Sampler Section -->
    <section class="tutorial-section">
      <h2>2.2 Sampling Steps & Sampler</h2>

      <div class="content-block">
        <div class="text-content">
          <h3>Sampling Steps</h3>
          <p>The number of steps the model goes through to create the image. More steps mean more details, but also longer generation time.</p>

          <div class="steps-comparison">
            <div class="steps-range">
              <span class="steps-low">10 Steps</span>
              <div class="steps-arrow">→</div>
              <span class="steps-medium">30 Steps</span>
              <div class="steps-arrow">→</div>
              <span class="steps-high">50+ Steps</span>
            </div>
            <div class="steps-labels">
              <span>Fast, fewer details</span>
              <span>Balanced</span>
              <span>Slow, more details</span>
            </div>
          </div>

          <div class="info-box">
            <h4>Guideline:</h4>
            <p>For most images, <strong>20-30 steps</strong> are sufficient. Above 40-50 steps, improvements are often barely noticeable.</p>
          </div>
        </div>

        <div class="sampler-content">
          <h3>Sampler Algorithms</h3>
          <p>The sampler determines how the model performs the diffusion process. Each has its own strengths:</p>

          <div class="sampler-table">
            <div class="table-header">
              <span>Sampler</span>
              <span>Properties</span>
              <span>Recommended Steps</span>
            </div>
            {#each samplers as sampler}
              <div class="table-row">
                <span class="sampler-name">{sampler.name}</span>
                <span class="sampler-desc">{sampler.description}</span>
                <span class="sampler-steps">{sampler.startwert}</span>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <!-- Seed Section -->
    <section class="tutorial-section">
      <h2>2.3 Seed: Randomness & Reproducibility</h2>

      <p>The seed is the starting value for the random generator. It determines the starting point of the image generation.</p>

      <div class="seed-visualization">
        <div class="seed-box">
          <h4>What does the seed do?</h4>
          <div class="seed-diagram">
            <div class="seed-input">Prompt: "a castle"</div>
            <div class="seed-branches">
              <div class="seed-branch">
                <div class="seed-value">Seed: 1234</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Image A</div>
              </div>
              <div class="seed-branch">
                <div class="seed-value">Seed: 5678</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Image B</div>
              </div>
              <div class="seed-branch">
                <div class="seed-value">Seed: 9012</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Image C</div>
              </div>
            </div>
          </div>
        </div>

        <div class="seed-strategies">
          <h4>Seed Strategies:</h4>
          <div class="strategy-cards">
            <div class="strategy-card">
              <span class="strategy-icon">🎲</span>
              <h5>Random Seed</h5>
              <p>For exploration and diverse results. Each generated image is unique.</p>
              <div class="code-snippet">Seed: -1</div>
            </div>
            <div class="strategy-card">
              <span class="strategy-icon">🔁</span>
              <h5>Fixed Seed</h5>
              <p>To reproduce images or for systematic testing.</p>
              <div class="code-snippet">Seed: 1234567890</div>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box tip">
        <h4>Pro Tip:</h4>
        <p>If you've generated an image you like, note down the seed! With the same prompt and parameters, you can reproduce the image exactly later.</p>
      </div>
    </section>

    <!-- Practical Application -->
    <section class="tutorial-section">
      <h2>Recommended Starting Values</h2>

      <div class="parameter-recommendations">
        <div class="recommendation-card">
          <h3>Photorealism</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 7-9</li>
            <li><strong>Sampler:</strong> DPM++ 2M Karras</li>
            <li><strong>Steps:</strong> 25-30</li>
          </ul>
        </div>

        <div class="recommendation-card">
          <h3>Creative Art</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 4-7</li>
            <li><strong>Sampler:</strong> Euler a</li>
            <li><strong>Steps:</strong> 20-25</li>
          </ul>
        </div>

        <div class="recommendation-card">
          <h3>Precise Illustration</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 9-12</li>
            <li><strong>Sampler:</strong> DDIM</li>
            <li><strong>Steps:</strong> 30-40</li>
          </ul>
        </div>
      </div>

      <div class="info-box success">
        <h4>Learning objective achieved:</h4>
        <p>You now understand how CFG, Steps, and Seed influence the result and can make informed decisions for your generations.</p>
      </div>

      <!-- Navigation buttons -->
      <TutorialNavigation
        previousPath="/guided-tutorial/prompt-basics"
        nextPath="/guided-tutorial/manage-styles"
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
  
  /* Slider Visualization */
  .slider-visualization {
    margin: 2rem 0;
  }
  
  .slider-container {
    width: 100%;
    padding: 0 1rem;
  }
  
  .slider-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    color: #a0a0a0;
    font-size: 0.9rem;
  }
  
  .slider-track {
    position: relative;
    height: 6px;
    background: linear-gradient(to right, #4CAF50, #FFC107, #F44336);
    border-radius: 3px;
    margin-bottom: 0.5rem;
  }
  
  .slider-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #FCEA2B;
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    color: #000;
  }
  
  .slider-values {
    display: flex;
    justify-content: space-between;
    color: #888;
    font-size: 0.8rem;
  }
  
  /* Info Grid */
  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 2rem 0;
  }
  
  @media (max-width: 768px) {
    .info-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .info-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .info-card.highlight {
    border-color: #FCEA2B;
    box-shadow: 0 0 15px rgba(252, 234, 43, 0.2);
  }
  
  .info-card h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .info-card ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .info-card li {
    margin-bottom: 0.5rem;
    color: #a0a0a0;
  }
  
  /* Example Images */
  .example-images {
    margin-top: 2.5rem;
  }
  
  .image-comparison {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
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
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 1rem;
    border: 1px solid #333;
  }
  
  .comparison-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .comparison-item h4 {
    margin: 0 0 0.5rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .comparison-item p {
    text-align: center;
    color: #888;
    font-size: 0.9rem;
    margin: 0;
  }
  
  /* Content Blocks */
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
  
  /* Steps Comparison */
  .steps-comparison {
    background-color: #222;
    padding: 1.5rem;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
  
  .steps-range {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }
  
  .steps-arrow {
    color: #888;
  }
  
  .steps-low {
    color: #F44336;
    font-weight: bold;
  }
  
  .steps-medium {
    color: #FFC107;
    font-weight: bold;
  }
  
  .steps-high {
    color: #4CAF50;
    font-weight: bold;
  }
  
  .steps-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #888;
  }
  
  /* Sampler Table */
  .sampler-table {
    background-color: #222;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 1.5rem;
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 1rem;
    background-color: #2a2a2a;
    font-weight: bold;
    border-bottom: 1px solid #333;
    color: #e0e0e0;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    padding: 1rem;
    border-bottom: 1px solid #333;
  }
  
  .table-row:last-child {
    border-bottom: none;
  }
  
  .sampler-name {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
  }
  
  .sampler-desc {
    color: #b0b0b0;
  }
  
  .sampler-steps {
    color: #b0b0b0;
    text-align: center;
  }
  
  /* Seed Visualization */
  .seed-visualization {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    .seed-visualization {
      grid-template-columns: 1fr;
    }
  }
  
  .seed-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .seed-box h4 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    color: #e0e0e0;
    text-align: center;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .seed-diagram {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .seed-input {
    background-color: #2a2a2a;
    padding: 0.8rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    width: 80%;
    text-align: center;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  .seed-branches {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
  
  .seed-branch {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .seed-value {
    background-color: #2a2a2a;
    padding: 0.5rem;
    border-radius: 6px;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    text-align: center;
  }
  
  .seed-arrow {
    color: #888;
  }
  
  .seed-result {
    background-color: #2a2a2a;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    color: #4da6ff;
  }
  
  /* Seed Strategies */
  .seed-strategies h4 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    color: #e0e0e0;
    text-align: center;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .strategy-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    .strategy-cards {
      grid-template-columns: 1fr;
    }
  }
  
  .strategy-card {
    background-color: #2a2a2a;
    border-radius: 8px;
    padding: 1.2rem;
    text-align: center;
    border: 1px solid #333;
  }
  
  .strategy-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .strategy-card h5 {
    margin: 0 0 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .strategy-card p {
    color: #a0a0a0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .code-snippet {
    background-color: #222;
    padding: 0.5rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    color: #FCEA2B;
  }
  
  /* Parameter Recommendations */
  .parameter-recommendations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .parameter-recommendations {
      grid-template-columns: 1fr;
    }
  }
  
  .recommendation-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .recommendation-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-size: 1.2rem;
    text-align: center;
  }
  
  .param-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .param-list li {
    margin-bottom: 0.8rem;
    color: #b0b0b0;
  }
  
  .param-list li strong {
    color: #FCEA2B;
    margin-right: 0.5rem;
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
  
  .info-box.tip {
    border-left-color: #FFC107;
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
