<script>
  // Examples for negative prompts
  const negativePromptExamples = [
    {
      category: "Quality Issues",
      prompt: "blurry, low quality, pixelated, jpeg artifacts, compression artifacts, bad composition, deformed, mutated, signature, watermark"
    },
    {
      category: "Anatomy Issues",
      prompt: "bad anatomy, deformed hands, extra fingers, missing fingers, extra limbs, distorted face, unrealistic proportions, cross-eyed, assymetrical, disfigured"
    },
    {
      category: "Unwanted Art Style",
      prompt: "cartoon style, anime, 3d render, painting, drawing, sketch, illustration, low detail face"
    }
  ];
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
</script>

<svelte:head>
  <title>Advanced Prompting | Guided Tutorial | Stablehub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Advanced Prompting</h1>
    <p class="subtitle">Advanced techniques for complex and high-resolution images</p>
  </div>

  <div class="content-sections">
    <!-- Negative Prompt Fine-tuning -->
    <section class="tutorial-section">
      <h2>Fine-tuning the Negative Prompt</h2>

      <p>A well-structured negative prompt is crucial for high-quality images. With targeted negative prompts, you can avoid common problems:</p>

      <div class="negative-categories">
        {#each negativePromptExamples as category}
          <div class="negative-category">
            <h3>{category.category}</h3>
            <div class="negative-box">
              <p>{category.prompt}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="comparison-grid">
        <h3>Impact of the Negative Prompt</h3>
        <div class="comparison-items">
          <div class="comparison-item">
            <div class="comparison-image">

              <div class="placeholder-image" data-label="Without">
                <img src="/tutorial/negative1.jpg" alt="Example generated without a negative prompt" class="comparison-example-image"/>
              </div>
            </div>
            <div class="comparison-prompt">
              <p class="prompt-caption">Negative Prompt:</p>
              <p class="prompt-text empty">Empty</p>
            </div>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">

              <div class="placeholder-image" data-label="With">
                 <img src="/tutorial/negative2.jpg" alt="Example generated with a detailed negative prompt" class="comparison-example-image"/>
              </div>
            </div>
            <div class="comparison-prompt">
              <p class="prompt-caption">Negative Prompt:</p>
              <p class="prompt-text">bad quality, blurry, bad anatomy, worst quality, low quality, lowres, extra fingers, ...</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tips-box">
        <h4>Tips for effective negative prompts:</h4>
        <ul>
          <li><strong>Adapt project-specifically:</strong> Focus on anatomy errors for portraits, quality issues for landscapes</li>
          <li><strong>Don't overload:</strong> Extremely long negative prompts can confuse the model</li>
          <li><strong>Test run:</strong> Compare results with and without the negative prompt</li>
          <li><strong>Prioritize:</strong> Place the most important avoidance terms at the beginning of the negative prompt</li>
        </ul>
      </div>
    </section>

    <!-- Multi-Prompt / Composable Diffusion -->
    <section class="tutorial-section">
      <h2>Multi-Prompt / Composable Diffusion</h2>

      <p>Multi-prompt or Composable Diffusion is an advanced technique that allows using multiple separate prompts simultaneously to generate complex scenes.</p>

      <div class="technique-explanation">
        <h3>How it works:</h3>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1. Prompt Decomposition</h4>
            <p>Break down your complex scene into individual elements and create separate prompts for each element.</p>
          </div>
          <div class="explanation-item">
            <h4>2. Weighted Combination</h4>
            <p>Assign a weight to each prompt indicating its importance in the overall composition.</p>
          </div>
          <div class="explanation-item">
            <h4>3. Connection</h4>
            <p>Connect the prompts using specific syntax depending on the UI used.</p>
          </div>
        </div>
      </div>

      <div class="example-box">
        <h3>Example: Landscape with multiple elements</h3>

        <div class="multi-prompt-example">
          <div class="component">
            <div class="component-label">Component 1:</div>
            <div class="component-prompt">
              <p>a majestic castle on top of a hill</p>
            </div>
            <div class="component-weight">Weight: 1.2</div>
          </div>
          <div class="plus-sign">+</div>
          <div class="component">
            <div class="component-label">Component 2:</div>
            <div class="component-prompt">
              <p>a beautiful lake with reflections</p>
            </div>
            <div class="component-weight">Weight: 0.8</div>
          </div>
          <div class="plus-sign">+</div>
          <div class="component">
            <div class="component-label">Common Styles:</div>
            <div class="component-prompt">
              <p>sunset, cinematic lighting, detailed, 8k</p>
            </div>
            <div class="component-weight">For all components</div>
          </div>
        </div>

        <div class="syntax-examples">
          <h4>Implementation Syntax:</h4>
          <div class="syntax-box">
            <p class="syntax-label">A1111 WebUI:</p>
            <code>a majestic castle on top of a hill :1.2 AND a beautiful lake with reflections :0.8, sunset, cinematic lighting, detailed, 8k</code>
          </div>
          <div class="syntax-box">
            <p class="syntax-label">ComfyUI:</p>
            <code>// Connected in separate prompt nodes with corresponding weights</code>
          </div>
        </div>
      </div>

      <div class="tips-box">
        <p>This technique is particularly useful for:</p>
        <ul>
          <li>Complex scenes with multiple main elements</li>
          <li>Combining different styles</li>
          <li>Precise control over the balance of elements in the image</li>
        </ul>
      </div>
    </section>

    <!-- Hires-Fix & Upscale Loops -->
    <section class="tutorial-section">
      <h2>Hires-Fix & Upscale Loops</h2>

      <p>For high-resolution images with fine details, special techniques are necessary, as diffusion models often struggle at higher resolutions.</p>

      <div class="technique-box">
        <h3>Hires-Fix</h3>
        <p>This technique first generates an image at low resolution and then refines it in a second pass:</p>

        <div class="process-diagram">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Initial Generation</h4>
              <p>Generate image at low resolution (e.g., 512x512 px)</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Upscaling</h4>
              <p>Enlarge image to target size (e.g., 1024x1024 px)</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Detail Refinement</h4>
              <p>Rediffusion with fewer steps for detail enhancement</p>
            </div>
          </div>
        </div>

        <div class="settings-box">
          <h4>Typical Settings:</h4>
          <div class="settings-grid">
            <div class="setting-item">
              <span class="setting-name">Denoising Strength:</span>
              <span class="setting-value">0.3 - 0.6</span>
              <p class="setting-desc">Lower values = retain more of the original</p>
            </div>
            <div class="setting-item">
              <span class="setting-name">Upscaler:</span>
              <span class="setting-value">ESRGAN, Latent</span>
              <p class="setting-desc">Different upscalers have different style impacts</p>
            </div>
            <div class="setting-item">
              <span class="setting-name">Second-pass Steps:</span>
              <span class="setting-value">15-25</span>
              <p class="setting-desc">Fewer than in the initial generation</p>
            </div>
          </div>
        </div>
      </div>

      <div class="technique-box">
        <h3>Upscale Loops / Progressive Growing</h3>
        <p>For particularly large images (2K+), a multi-stage process can work better:</p>

        <div class="upscale-loop-diagram">
          <div class="loop-step">
            <p>512×512</p>
            <div class="loop-arrow">↓</div>
            <p>Initial Generation</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>768×768</p>
            <div class="loop-arrow">↓</div>
            <p>First Upscale + Fix<br>(Denoising: 0.5)</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>1024×1024</p>
            <div class="loop-arrow">↓</div>
            <p>Second Upscale + Fix<br>(Denoising: 0.4)</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>1536×1536+</p>
            <div class="loop-arrow">↓</div>
            <p>Final Upscale + Fix<br>(Denoising: 0.3)</p>
          </div>
        </div>

        <div class="info-box">
          <h4>Advantages of this method:</h4>
          <ul>
            <li>Retains overall composition and important elements</li>
            <li>Adds finer details at each step</li>
            <li>Avoids artifacts and inconsistencies at very high resolutions</li>
            <li>Allows more control over the level of detail in each step</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ControlNet & LoRAs -->
    <section class="tutorial-section">
      <h2>ControlNet & LoRAs: How they work</h2>

      <div class="technologies-grid">
        <div class="technology-card">
          <h3>ControlNet</h3>
          <div class="tech-image">
            <div class="placeholder-image tech">
              <img src="/tutorial/controlnet.jpg" alt="Example showing ControlNet input (pose) and generated output" class="tech-example-image"/>
            </div>
          </div>
          <p class="tech-description">ControlNet allows you to guide the generation process using an input image. Instead of just working with text, the model can consider outlines, poses, depth maps, or other structural information.</p>

          <div class="tech-features">
            <h4>Main Applications:</h4>
            <ul>
              <li><strong>Canny/Scribble:</strong> Convert outlines and sketches into finished images</li>
              <li><strong>Pose:</strong> Control body postures and gestures</li>
              <li><strong>Depth/Normal:</strong> Maintain 3D information and spatial structure</li>
            </ul>
          </div>
        </div>

        <div class="technology-card">
          <h3>LoRAs (Low-Rank Adaptations)</h3>
          <div class="tech-image">
            <div class="placeholder-image tech">
              <!-- Replace span with img -->
              <img src="/tutorial/lora.jpg" alt="Example showing LoRA application" class="tech-example-image"/>
            </div>
          </div>
          <p class="tech-description">LoRAs are small, trained model add-ons that teach a base model new styles, characters, or concepts without needing to retrain the entire model.</p>

          <div class="tech-features">
            <h4>Main Applications:</h4>
            <ul>
              <li><strong>Styles:</strong> Specific art styles or visual aesthetics</li>
              <li><strong>Characters:</strong> Consistent generation of specific people or figures</li>
              <li><strong>Concepts:</strong> Special objects or visual elements</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="integration-box">
        <h3>Integration into the Workflow</h3>
        <p>Both technologies can be combined with the prompting techniques learned so far:</p>

        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-icon">🎨</div>
            <div class="step-content">
              <h4>1. Create Base Prompt</h4>
              <p>Define the main subject and style as usual</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">🔧</div>
            <div class="step-content">
              <h4>2. Add ControlNet / LoRAs</h4>
              <p>Select appropriate control inputs and model extensions</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">⚖️</div>
            <div class="step-content">
              <h4>3. Adjust Weights</h4>
              <p>Find the balance between text prompt and other inputs</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">🔄</div>
            <div class="step-content">
              <h4>4. Refine Iteratively</h4>
              <p>Find the optimal settings through testing</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box tutorial-links">
        <h4>Further Tutorials:</h4>
        <p>These topics are complex and are covered in separate, specialized tutorials:</p>
        <div class="link-buttons">
          <!-- Add target="_blank" to YouTube links -->
          <a href="https://www.youtube.com/watch?v=KEv-F5UkhxU" class="tutorial-link" target="_blank">Understanding & Applying LoRAs</a>
          <a href="https://www.youtube.com/watch?v=fhIGt7QGg4w" class="tutorial-link" target="_blank">Understanding ControlNet</a>
        </div>
      </div>
    </section>

    <!-- Conclusion -->
    <section class="tutorial-section">
      <h2>Summary</h2>

      <p>You now have a comprehensive overview of advanced prompting techniques:</p>

      <div class="summary-points">
        <ul>
          <li>Use <strong>Negative Prompts</strong> specifically and tailor them to the use case</li>
          <li>Create complex scenes with multiple elements using <strong>Multi-Prompt Techniques</strong></li>
          <li>Utilize <strong>Hires-Fix and Upscale Loops</strong> for high-resolution, detailed images</li>
          <li>Understand the basic concepts of <strong>ControlNet and LoRAs</strong> and integrate them into the workflow</li>
        </ul>
      </div>

      <div class="next-steps">
        <h3>Next Steps</h3>
        <p>To further deepen your skills, we recommend:</p>
        <ul>
          <li>Experiment with the learned techniques and document your results</li>
          <li>Create your own library of negative prompts for different use cases</li>
          <li>Learn specific tools like ControlNet or Image-to-Image in more detail</li>
          <li>Share your results and experiences with the community</li>
        </ul>
      </div>

      <div class="info-box success">
        <h4>Course Completion:</h4>
        <p>Congratulations! You have completed all tutorial modules and now have a solid foundation of knowledge about Stable Diffusion and advanced prompting techniques.</p>
      </div>

      <!-- Navigation buttons -->
      <TutorialNavigation
        previousPath="/guided-tutorial/prompt-weighting"
        nextPath="/guided-tutorial/advanced/ai-models"
        nextLabel="Continue to Additional Resources"
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
  
  /* Negative Categories */
  .negative-categories {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  
  .negative-category h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }
  
  .negative-box {
    background-color: #222;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #F44336;
  }
  
  .negative-box p {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    color: #e0e0e0;
    font-size: 0.9rem;
  }
  
  /* Comparison Grid */
  .comparison-grid {
    margin: 2rem 0;
  }
  
  .comparison-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .comparison-items {
      grid-template-columns: 1fr;
    }
  }
  
  .comparison-item {
    display: flex;
    flex-direction: column;
  }
  
  .comparison-image {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .placeholder-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #2a2a2a;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 1rem; */ /* Padding entfernt */
    position: relative;
    border: 1px solid #333;
    overflow: hidden; /* Beibehalten, um sicherzustellen, dass nichts überläuft */
  }

  /* Add max-width specifically for comparison images */
  .comparison-item .placeholder-image {
    max-width: 350px; /* Limit width */
    margin-left: auto;  /* Center the container */
    margin-right: auto; /* Center the container */
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
  
  .placeholder-image.tech {
    aspect-ratio: 16 / 9;
  }
  
  .comparison-prompt {
    background-color: #222;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #F44336;
  }
  
  .prompt-caption {
    font-size: 0.85rem;
    color: #888;
    margin-bottom: 0.5rem;
  }
  
  .prompt-text {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    color: #d0d0d0;
    font-size: 0.9rem;
  }
  
  .prompt-text.empty {
    color: #555;
    font-style: italic;
  }
  
  /* Tips Box */
  .tips-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #333;
  }
  
  .tips-box h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .tips-box ul, .tips-box ol {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .tips-box li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  /* Technique Explanation */
  .technique-explanation {
    margin: 1.5rem 0;
  }
  
  .explanation-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .explanation-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .explanation-item {
    background-color: #222;
    padding: 1.2rem;
    border-radius: 6px;
    border: 1px solid #333;
  }
  
  .explanation-item h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .explanation-item p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  /* Example Box */
  .example-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #4da6ff;
  }
  
  .example-box h3 {
    margin-top: 0;
    margin-bottom: 1.2rem;
    color: #e0e0e0;
  }
  
  /* Multi Prompt Example */
  .multi-prompt-example {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }
  
  .component {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #4da6ff;
  }
  
  .component-label {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.5rem;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .component-prompt p {
    margin: 0 0 0.5rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.95rem;
  }
  
  .component-weight {
    font-size: 0.85rem;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .plus-sign {
    text-align: center;
    color: #888;
    font-size: 1.5rem;
    margin: 0.2rem 0;
  }
  
  /* Syntax Examples */
  .syntax-examples {
    margin-top: 1.5rem;
  }
  
  .syntax-box {
    margin-bottom: 1rem;
  }
  
  .syntax-label {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 0.4rem;
  }
  
  .syntax-box code {
    display: block;
    background-color: #1a1a1a;
    padding: 0.8rem;
    border-radius: 6px;
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    font-size: 0.9rem;
    white-space: pre-wrap;
  }
  
  /* Technique Box */
  .technique-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #333;
  }
  
  .technique-box h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  /* Process Diagram */
  .process-diagram {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .process-diagram {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .step-arrow {
      transform: rotate(90deg);
    }
  }
  
  .process-step {
    display: flex;
    align-items: center;
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #333;
    flex: 1;
    max-width: 30%;
  }
  
  @media (max-width: 768px) {
    .process-step {
      max-width: 90%;
    }
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    background-color: #4da6ff;
    color: #000;
    border-radius: 50%;
    display: flex; /* Use flexbox for centering */
    align-items: center; /* Center vertically */
    justify-content: center; /* Center horizontally */
    font-weight: bold;
    margin-right: 1rem;
    flex-shrink: 0; /* Prevent shrinking */
    font-size: 0.9rem; /* Optional: Adjust font size if needed */
    line-height: 1; /* Ensure text stays centered */
  }
  
  .step-content h4 {
    margin: 0 0 0.5rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.95rem;
  }
  
  .step-content p {
    margin: 0;
    font-size: 0.9rem;
    color: #a0a0a0;
  }
  
  .step-arrow {
    color: #555;
    font-size: 1.5rem;
  }
  
  /* Settings Box */
  .settings-box {
    background-color: #1a1a1a;
    padding: 1.2rem;
    border-radius: 6px;
    margin-top: 1.5rem;
  }
  
  .settings-box h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    .settings-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .setting-item {
    background-color: #222;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #333;
  }
  
  .setting-name {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #d0d0d0;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .setting-value {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: bold;
    color: #FCEA2B;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .setting-desc {
    font-size: 0.8rem;
    color: #888;
    margin: 0;
  }
  
  /* Upscale Loop Diagram */
  .upscale-loop-diagram {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
    flex-wrap: wrap;
    text-align: center;
  }
  
  @media (max-width: 768px) {
    .upscale-loop-diagram {
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .loop-arrow {
      transform: rotate(90deg);
    }
  }
  
  .loop-step {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #333;
    flex: 1;
    max-width: 22%;
  }
  
  @media (max-width: 768px) {
    .loop-step {
      max-width: 80%;
    }
  }
  
  .loop-step p {
    margin: 0.5rem 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #d0d0d0;
  }
  
  .loop-step p:first-child {
    font-weight: bold;
    color: #FCEA2B;
  }
  
  .loop-arrow {
    color: #555;
    font-size: 1.5rem;
  }
  
  /* Info Box */
  .info-box {
    background-color: #1a1a1a;
    border-radius: 6px;
    padding: 1.2rem;
    margin-top: 1.5rem;
    border-left: 4px solid #4da6ff;
  }
  
  .info-box h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .info-box ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .info-box li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  /* Technologies Grid */
  .technologies-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .technologies-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .technology-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .technology-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    text-align: center;
  }
  
  .tech-image {
    margin-bottom: 1.2rem;
  }
  
  .tech-description {
    margin-bottom: 1.2rem;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  .tech-features h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #d0d0d0;
    font-size: 1rem;
  }
  
  /* Integration Box */
  .integration-box {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 1px solid #333;
  }
  
  .integration-box h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  /* Workflow Steps */
  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1.2rem;
  }
  
  .workflow-step {
    display: flex;
    align-items: flex-start;
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
  }
  
  .step-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  
  .step-content h4 {
    margin: 0 0 0.5rem;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .step-content p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  /* Tutorial Links */
  .tutorial-links {
    border-left-color: #FCEA2B;
  }
  
  .link-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1rem;
  }
  
  .tutorial-link {
    display: inline-block;
    padding: 0.7rem 1rem;
    background-color: #2a2a2a;
    border-radius: 6px;
    color: #FCEA2B;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .tutorial-link:hover {
    background-color: #333;
    transform: translateY(-3px);
  }
  
  /* Summary Points */
  .summary-points {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border: 1px solid #333;
  }
  
  .summary-points ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .summary-points li {
    margin-bottom: 0.8rem;
    color: #b0b0b0;
  }
  
  .summary-points li:last-child {
    margin-bottom: 0;
  }
  
  /* Next Steps */
  .next-steps {
    margin-top: 2rem;
  }
  
  .next-steps h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .next-steps ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .next-steps li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  /* Info Box Success */
  .info-box.success {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4CAF50;
    margin-top: 2.5rem;
  }

  .tech-example-image { /* Neue Klasse für das Bild */
    display: block; /* Verhindert zusätzlichen Leerraum unter dem Bild */
    width: 100%;
    height: 100%; /* Lässt das Bild die Höhe des Containers füllen */
    object-fit: cover; /* Stellt sicher, dass das ganze Bild sichtbar ist, skaliert es passend */
    /* object-fit: cover; */ /* Alternative: Füllt den Container, schneidet ggf. Teile ab */
  }

  /* Use contain for comparison examples */
  .comparison-example-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain; /* Changed to contain for comparison images */
  }
</style>
