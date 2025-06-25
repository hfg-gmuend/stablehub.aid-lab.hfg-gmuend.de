<script lang="ts">
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";

  // Type definitions
  interface SamplerInfo {
    name: string;
    speed: string; // Renamed from geschwindigkeit
    detailLevel: string; // Renamed from detailgrad
    suitability: string[]; // Renamed from eignung
    steps: string;
    comment: string; // Renamed from kommentar
  }

  interface StyleKeyword {
    word: string;
    description: string;
  }

  interface StyleCategory {
    category: string;
    keywords: StyleKeyword[];
  }

  interface Resource {
    name: string;
    url: string;
    description: string;
  }

  // Sampler comparison data
  const samplerComparison: SamplerInfo[] = [
    {
      name: "Euler a",
      speed: "Fast",
      detailLevel: "Medium",
      suitability: ["General images", "Quick tests", "Creative explorations"],
      steps: "20-25",
      comment: "Good all-rounder, often default"
    },
    {
      name: "DPM++ 2M Karras",
      speed: "Medium",
      detailLevel: "High",
      suitability: ["Photorealism", "Portraits", "Detailed scenes"],
      steps: "25-30",
      comment: "Excellent balance of quality and speed"
    },
    {
      name: "DDIM",
      speed: "Fast",
      detailLevel: "Medium",
      suitability: ["Inpainting", "Img2Img", "Consistent results"],
      steps: "30-50",
      comment: "Stable, good for iterating on existing images"
    },
    {
      name: "LMS",
      speed: "Medium",
      detailLevel: "Medium-High",
      suitability: ["Abstract art", "Stylized images"],
      steps: "30-40",
      comment: "Interesting creative results"
    }
  ];

  // Style keywords by category
  const styleKeywords: StyleCategory[] = [
    {
      category: "Photographic Realism",
      keywords: [
        { word: "photorealistic", description: "Photorealistic representation" },
        { word: "hyperrealistic", description: "Exaggerated but realistic-looking details" },
        { word: "8k", description: "High-resolution image quality" },
        { word: "cinematic", description: "Film-like lighting and composition" },
        { word: "professional photography", description: "Professional photo quality" }
      ]
    },
    {
      category: "Artistic Styles",
      keywords: [
        { word: "oil painting", description: "Oil painting texture and colors" },
        { word: "watercolor", description: "Light, transparent watercolor look" },
        { word: "digital art", description: "Contemporary digital art style" },
        { word: "concept art", description: "Professional, detailed concept art" },
        { word: "anime style", description: "Japanese anime style" }
      ]
    },
    {
      category: "Lighting",
      keywords: [
        { word: "golden hour", description: "Warm, golden light like sunrise/sunset" },
        { word: "volumetric lighting", description: "Visible light rays and atmospheric lighting" },
        { word: "studio lighting", description: "Professional, clean studio lighting" },
        { word: "dramatic lighting", description: "Strong contrasts between light and dark" },
        { word: "rim light", description: "Edge/outline of an object is illuminated" }
      ]
    }
  ];

  // Community resources
  const communityResources: Resource[] = [
    { name: "Civitai", url: "https://civitai.com", description: "Community hub for models, LoRAs, and prompts" },
    { name: "Lexica", url: "https://lexica.art", description: "Search engine for AI-generated images with prompts" },
    { name: "PromptHero", url: "https://prompthero.com", description: "Curated prompts and tutorials" },
    { name: "r/StableDiffusion", url: "https://reddit.com/r/StableDiffusion", description: "Reddit community for Stable Diffusion" }
  ];

  // Technical resources
  const technicalResources: Resource[] = [
    { name: "Stable Diffusion Web UI Wiki", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki", description: "Official documentation for A1111 UI" },
    { name: "Hugging Face", url: "https://huggingface.co/models", description: "Official model repository" },
    { name: "Papers With Code", url: "https://paperswithcode.com/task/text-to-image-generation", description: "Scientific papers on Text-to-Image" },
    { name: "ComfyUI Documentation", url: "https://github.com/comfyanonymous/ComfyUI", description: "Node-based UI for Stable Diffusion" }
  ];

  // Navigation paths
  const previousPath: string = "/guided-tutorial/advanced/ai-models";
  const nextPath: string = "/guided-tutorial";
  const nextLabel: string = "Back to Tutorial Overview"; // Translated from "Zurück zur Tutorial-Übersicht"
</script>

<svelte:head>
  <title>Resources & Deep-Dive | Guided Tutorial | Stablehub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Resources & Deep-Dive</h1>
    <p class="subtitle">Further materials, comparison tables, and community links</p>
  </div>

  <div class="content-sections">
    <!-- Sampler Comparison Table -->
    <section class="tutorial-section">
      <h2>Recommended Samplers Compared</h2>

      <p>The choice of sampler greatly influences image quality, speed, and style. Here is a comparative overview of the most important samplers.</p>

      <div class="table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Sampler</th>
              <th>Speed</th>
              <th>Detail Level</th>
              <th>Optimal Steps</th>
              <th>Recommended for</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {#each samplerComparison as sampler}
              <tr>
                <td class="sampler-name">{sampler.name}</td>
                <td class="sampler-speed">{sampler.speed}</td>
                <td>{sampler.detailLevel}</td>
                <td class="sampler-steps">{sampler.steps}</td>
                <td>
                  <ul class="compact-list">
                    {#each sampler.suitability as use}
                      <li>{use}</li>
                    {/each}
                  </ul>
                </td>
                <td class="sampler-comment">{sampler.comment}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="info-box">
        <h4>Tip for Sampler Choice:</h4>
        <p>Start your experiments with <strong>Euler a</strong> for quick tests and switch to <strong>DPM++ 2M Karras</strong> for final image generation. Adjust the steps accordingly: more steps for complex images, fewer for simpler subjects.</p>
      </div>
    </section>

    <!-- Cheatsheets for Keywords and Weights -->
    <section class="tutorial-section">
      <h2>Cheatsheets: Style Keywords and Weights</h2>

      <p>These collections of commonly used keywords help you quickly find suitable style terms for your prompts.</p>

      <!-- Style Keywords Cheatsheet -->
      <div class="keyword-section">
        <h3>Style Keywords by Category</h3>

        <div class="accordion">
          {#each styleKeywords as category}
            <div class="accordion-item">
              <div class="accordion-header">
                <span class="category-name">{category.category}</span>
                <span class="accordion-icon">+</span>
              </div>
              <div class="accordion-content">
                <table class="keywords-table">
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Effect/Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each category.keywords as keyword}
                      <tr>
                        <td class="keyword">{keyword.word}</td>
                        <td>{keyword.description}</td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Weighting Cheatsheet -->
      <div class="weight-section">
        <h3>Weighting Cheatsheet</h3>

        <div class="weight-grid">
          <div class="weight-card">
            <h4>For Main Subjects</h4>
            <div class="weight-examples">
              <div class="weight-example">
                <span class="weight-syntax">(subject)</span>
                <span class="weight-value">1.1×</span>
              </div>
              <div class="weight-example">
                <span class="weight-syntax">((subject))</span>
                <span class="weight-value">1.21×</span>
              </div>
              <div class="weight-example">
                <span class="weight-syntax">subject:1.3</span>
                <span class="weight-value">1.3×</span>
              </div>
            </div>
          </div>

          <div class="weight-card">
            <h4>For Backgrounds</h4>
            <div class="weight-examples">
              <div class="weight-example">
                <span class="weight-syntax">[background]</span>
                <span class="weight-value">0.9×</span>
              </div>
              <div class="weight-example">
                <span class="weight-syntax">background:0.7</span>
                <span class="weight-value">0.7×</span>
              </div>
            </div>
          </div>

          <div class="weight-card">
            <h4>For Styles</h4>
            <div class="weight-examples">
              <div class="weight-example">
                <span class="weight-syntax">style:1.1</span>
                <span class="weight-value">1.1×</span>
              </div>
              <div class="weight-example">
                <span class="weight-syntax">(style)</span>
                <span class="weight-value">1.1×</span>
              </div>
            </div>
          </div>
        </div>

        <div class="weight-formula">
          <h4>Weighting Formula:</h4>
          <ul>
            <li>Parentheses increase influence: <code>(word)</code> = 1.1×, <code>((word))</code> = 1.21×</li>
            <li>Square brackets decrease: <code>[word]</code> = 0.9×, <code>[[word]]</code> = 0.81×</li>
            <li>Exact values with colon: <code>word:1.2</code> = 1.2×</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Links to Community Resources -->
    <section class="tutorial-section">
      <h2>Community & Further Resources</h2>

      <p>The AI image generation community is very active and constantly shares new insights, models, and prompts. Here are important starting points for your further journey.</p>

      <!-- Community Links -->
      <div class="resources-container">
        <div class="resource-category">
          <h3>Community & Prompt Inspiration</h3>
          <div class="resources-grid">
            {#each communityResources as resource}
              <div class="resource-card">
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" class="resource-link">Visit ↗</a>
              </div>
            {/each}
          </div>
        </div>

        <!-- Technical Resources -->
        <div class="resource-category">
          <h3>Technical Documentation & Papers</h3>
          <div class="resources-grid">
            {#each technicalResources as resource}
              <div class="resource-card">
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" class="resource-link">Visit ↗</a>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <div class="downloadable-resources">
        <h3>Downloadable Resources</h3>
        <div class="downloads-list">
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Complete Sampler Comparison Table</h4>
              <p>PDF with detailed comparison data for all available samplers</p>
            </div>
          </a>
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Style Keywords Cheatsheet</h4>
              <p>Over 200 categorized style keywords for various use cases</p>
            </div>
          </a>
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Prompt Engineering Handbook</h4>
              <p>Comprehensive handbook for advanced prompt engineering</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Bookmarks and Terminology -->
    <section class="tutorial-section">
      <h2>Bookmarks & Terminology</h2>

      <div class="bookmarks-section">
        <h3>Recommended Bookmarks for Getting Started</h3>
        <ul class="bookmark-list">
          <li>
            <h4>"LoRA Training Simplified" by Aitrepreneur</h4>
            <p>A detailed guide to training your own LoRAs, explained clearly.</p>
            <a href="#" class="bookmark-link">YouTube ↗</a>
          </li>
          <li>
            <h4>"The Stable Diffusion Parameters Guide" by HuggingFace</h4>
            <p>Detailed explanation of all SD parameters and their effects.</p>
            <a href="#" class="bookmark-link">HuggingFace Blog ↗</a>
          </li>
          <li>
            <h4>"Prompt Engineering Guide" by Learn Prompting</h4>
            <p>Systematic guide to creating effective prompts for text-to-image models.</p>
            <a href="#" class="bookmark-link">Website ↗</a>
          </li>
        </ul>
      </div>

      <div class="terminology-section">
        <h3>Important Terms and Terminology</h3>
        <div class="terminology-grid">
          <div class="term-card">
            <h4>VAE</h4>
            <p>Variational Autoencoder - Part of the model that influences final image quality and color reproduction.</p>
          </div>
          <div class="term-card">
            <h4>Embedding</h4>
            <p>Trained text concepts that package complex ideas or styles into a single term.</p>
          </div>
          <div class="term-card">
            <h4>Inpainting</h4>
            <p>Technique for selectively replacing/modifying parts of an already generated image.</p>
          </div>
          <div class="term-card">
            <h4>CLIP</h4>
            <p>Contrastive Language-Image Pre-Training - Connection layer between text and image in SD.</p>
          </div>
        </div>
      </div>

      <div class="info-box success">
        <h4>Congratulations!</h4>
        <p>You have completed all additional sections of the tutorial and now have comprehensive resources for your advanced learning in AI image generation.</p>
      </div>

      <!-- Navigation buttons -->
      <TutorialNavigation
        previousPath={previousPath}
        nextPath={nextPath}
        nextLabel={nextLabel}
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
  
  /* Table Container */
  .table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .comparison-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.95rem;
  }
  
  .comparison-table th {
    background-color: #222;
    padding: 1rem 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    border-bottom: 1px solid #444;
  }
  
  .comparison-table td {
    padding: 1rem 0.8rem;
    border-bottom: 1px solid #333;
    vertical-align: top;
    color: #b0b0b0;
  }
  
  .comparison-table tr:last-child td {
    border-bottom: none;
  }
  
  .sampler-name {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    color: #FCEA2B;
  }
  
  .sampler-speed {
    color: #4da6ff;
  }
  
  .sampler-steps {
    font-family: 'IBM Plex Mono', monospace;
    color: #4CAF50;
  }
  
  .sampler-comment {
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .compact-list {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .compact-list li {
    margin-bottom: 0.3rem;
  }
  
  /* Accordion */
  .accordion {
    margin-top: 1.5rem;
  }
  
  .accordion-item {
    border: 1px solid #333;
    border-radius: 6px;
    margin-bottom: 1rem;
    overflow: hidden;
  }
  
  .accordion-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: #222;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .accordion-header:hover {
    background-color: #2a2a2a;
  }
  
  .category-name {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    color: #e0e0e0;
  }
  
  .accordion-icon {
    font-size: 1.2rem;
    color: #4da6ff;
  }
  
  .accordion-content {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  
  .accordion-item:hover .accordion-content {
    max-height: 500px;
    padding: 1rem;
  }
  
  /* Keywords Table */
  .keywords-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .keywords-table th {
    text-align: left;
    padding: 0.7rem;
    background-color: #1a1a1a;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    border-bottom: 1px solid #333;
  }
  
  .keywords-table td {
    padding: 0.7rem;
    border-bottom: 1px solid #2a2a2a;
    color: #b0b0b0;
  }
  
  .keywords-table tr:last-child td {
    border-bottom: none;
  }
  
  .keyword {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    font-size: 0.9rem;
  }
  
  /* Weight Section */
  .weight-section {
    margin-top: 2.5rem;
  }
  
  .weight-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .weight-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .weight-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .weight-card h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    text-align: center;
  }
  
  .weight-examples {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .weight-example {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #1a1a1a;
    border-radius: 6px;
    border-left: 2px solid #4da6ff;
  }
  
  .weight-syntax {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    font-size: 0.9rem;
  }
  
  .weight-value {
    font-family: 'IBM Plex Mono', monospace;
    color: #4da6ff;
    font-size: 0.9rem;
  }
  
  .weight-formula {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    margin-top: 1.5rem;
    border: 1px solid #333;
  }
  
  .weight-formula h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .weight-formula ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .weight-formula li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  .weight-formula code {
    font-family: 'IBM Plex Mono', monospace;
    background-color: #1a1a1a;
    padding: 0.1rem 0.3rem;
    border-radius: 3px;
    color: #FCEA2B;
    font-size: 0.9rem;
  }
  
  /* Resources Section */
  .resource-category {
    margin-bottom: 2rem;
  }
  
  .resources-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .resources-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .resource-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .resource-card h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .resource-card p {
    margin: 0 0 1rem;
    color: #a0a0a0;
    font-size: 0.95rem;
    flex-grow: 1;
  }
  
  .resource-link {
    align-self: flex-end;
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #2a2a2a;
    border-radius: 6px;
    color: #FCEA2B;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .resource-link:hover {
    background-color: #333;
    transform: translateY(-3px);
  }
  
  /* Downloadable Resources */
  .downloadable-resources {
    margin-top: 2.5rem;
  }
  
  .downloads-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .download-item {
    display: flex;
    align-items: center;
    background-color: #222;
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid #333;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }
  
  .download-item:hover {
    background-color: #2a2a2a;
    transform: translateX(5px);
  }
  
  .download-icon {
    font-size: 2rem;
    margin-right: 1rem;
  }
  
  .download-info h4 {
    margin: 0 0 0.4rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .download-info p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.9rem;
  }
  
  /* Bookmarks Section */
  .bookmarks-section {
    margin-bottom: 2.5rem;
  }
  
  .bookmark-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .bookmark-list li {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .bookmark-list h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .bookmark-list p {
    margin: 0 0 1rem;
    color: #a0a0a0;
  }
  
  .bookmark-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #2a2a2a;
    border-radius: 6px;
    color: #4da6ff;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    transition: all 0.2s;
  }
  
  .bookmark-link:hover {
    background-color: #333;
    transform: translateY(-3px);
  }
  
  /* Terminology Section */
  .terminology-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
    margin-top: 1rem;
  }
  
  @media (max-width: 768px) {
    .terminology-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .term-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .term-card h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .term-card p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.95rem;
  }
  
  /* Info Box */
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
