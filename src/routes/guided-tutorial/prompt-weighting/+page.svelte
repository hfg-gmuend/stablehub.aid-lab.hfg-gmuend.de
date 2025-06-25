<script>
  // Examples for weighting syntax
  const weightingExamples = [
    { syntax: "(Term)", weight: "1.1×", example: "(portrait of a woman)", description: "Slight emphasis" },
    { syntax: "((Term))", weight: "1.21× (1.1²)", example: "((portrait of a woman))", description: "Medium emphasis" },
    { syntax: "(((Term)))", weight: "1.33× (1.1³)", example: "(((portrait of a woman)))", description: "Strong emphasis" },
    { syntax: "[Term]", weight: "0.9×", example: "[portrait of a woman]", description: "Slight de-emphasis" },
    { syntax: "[[Term]]", weight: "0.81× (0.9²)", example: "[[portrait of a woman]]", description: "Medium de-emphasis" },
    { syntax: "Term:1.5", weight: "1.5×", example: "portrait of a woman:1.5", description: "Exact weighting" }
  ];

  // Examples for AND/OR techniques
  const combinationExamples = [
    { name: "Blend Technique", example: "a house AND a castle", description: "Creates a mix of both elements" },
    { name: "OR Technique", example: "a house | a castle", description: "Generates either one or the other" },
    { name: "AND with Weighting", example: "a house:1.2 AND a castle:0.8", description: "Controlled mix with dominance" }
  ];
  // Import TutorialNavigation if it's used (it seems to be missing in the provided script but present in the HTML)
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
</script>

<svelte:head>
  <title>Prompt Prioritization | Guided Tutorial | Stablehub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Prompt Prioritization & Weighting</h1>
    <p class="subtitle">Fine-tuning prompts for more precise control</p>
  </div>

  <div class="content-sections">
    <!-- Word Position and Weighting -->
    <section class="tutorial-section">
      <h2>Word Position → Higher Weight</h2>

      <p>The order of your prompt terms affects the generated image. Terms at the <strong>beginning of the prompt</strong> generally receive more attention from the AI model.</p>

      <div class="position-examples">
        <div class="position-card">
          <h3>Beginning of the Prompt</h3>
          <div class="prompt-example">
            <p class="emphasis">A portrait of a woman</p> with a red dress and a necklace, oil painting, detailed, ornate
          </div>
          <div class="result-info">
            <p>→ Focus is on the person (woman), dress and necklace are secondary</p>
          </div>
        </div>

        <div class="position-card">
          <h3>End of the Prompt</h3>
          <div class="prompt-example">
            Oil painting, detailed, ornate, with a red dress and a necklace, <p class="emphasis">a portrait of a woman</p>
          </div>
          <div class="result-info">
            <p>→ Style elements might be more dominant than the main subject</p>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h4>Basic Rule:</h4>
        <p>Place the main subject at the beginning of the prompt and stylistic details towards the end.</p>
      </div>

      <div class="priority-order">
        <h3>Recommended Prioritization Order:</h3>
        <ol class="priority-list">
          <li><strong>Main Subject</strong> — What should be the focus?</li>
          <li><strong>Composition/Environment</strong> — How is the scene structured?</li>
          <li><strong>Important Attributes</strong> — Specific properties of the subject</li>
          <li><strong>Artistic Style</strong> — What aesthetic should the image have?</li>
          <li><strong>Quality Markers</strong> — Sharpness, detail level, resolution, etc.</li>
        </ol>
      </div>
    </section>

    <!-- Weighting Syntax -->
    <section class="tutorial-section">
      <h2>Weighting Syntax: ( ), [ ] and :n</h2>

      <p>Using special syntax, you can give specific terms or phrases more or less weight, regardless of their position.</p>

      <div class="syntax-table">
        <div class="table-header">
          <span>Syntax</span>
          <span>Weighting</span>
          <span>Example</span>
          <span>Effect</span>
        </div>

        {#each weightingExamples as example}
          <div class="table-row">
            <span class="syntax-code">{example.syntax.replace('Begriff', 'Term')}</span>
            <span class="weight-value">{example.weight}</span>
            <span class="syntax-example">{example.example.replace('porträt einer frau', 'portrait of a woman')}</span>
            <span class="syntax-description">{example.description}</span>
          </div>
        {/each}
      </div>

      <div class="comparison-grid">
        <h3>Visual Impact of Weighting</h3>
        <div class="comparison-items">
          <div class="comparison-item">
            <div class="comparison-image">
              <img src="/tutorial/Normal.jpg" alt="Portrait with normal prompt weighting" class="showcase-image small"/>
            </div>
            <p>Normal Prompt</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <img src="/tutorial/Double.jpg" alt="Portrait with double emphasis weighting" class="showcase-image small"/>
            </div>
            <p>Double Emphasis</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <img src="/tutorial/de.jpg" alt="Portrait with de-emphasized weighting" class="showcase-image small"/>
            </div>
            <p>De-emphasized</p>
          </div>
        </div>
      </div>

      <div class="tips-box">
        <h4>Practical Tips:</h4>
        <ul>
          <li><strong>Don't overdo it:</strong> Too many weights make the prompt unreadable</li>
          <li><strong>Experiment:</strong> Test different weights with the same seed</li>
          <li><strong>Be selective:</strong> Only weight the truly important elements</li>
          <li><strong>Document:</strong> Note successful weightings for later use</li>
        </ul>
      </div>
    </section>

    <!-- Combination Techniques -->
    <section class="tutorial-section">
      <h2>Balancing Topics: Blend / AND / OR</h2>

      <p>For complex prompts with multiple subjects or styles, you can use special techniques to combine or separate them.</p>

      <div class="technique-grid">
        {#each combinationExamples as technique}
          <div class="technique-card">
            <h3>{technique.name}</h3>
            <div class="technique-example">
              <code>{technique.example.replace('ein haus', 'a house').replace('ein schloss', 'a castle')}</code>
            </div>
            <p>{technique.description}</p>
          </div>
        {/each}
      </div>

      <div class="example-showcase">
        <h3>Example Applications</h3>

        <div class="showcase-item">
          <h4>Architectural Style Mix</h4>
          <div class="showcase-prompt">
            <p>modern architecture:1.2 AND gothic cathedral:0.8, detailed, atmospheric, sunlight</p>
          </div>
          <div class="showcase-result">
            <img src="/tutorial/cathedral.jpg" alt="Architectural mix of modern and gothic styles" class="showcase-image wide"/>
          </div>
        </div>

        <div class="showcase-item">
          <h4>Alternative Generation</h4>
          <div class="showcase-prompt">
            <p>a portrait in the style of picasso | a portrait in the style of van gogh, detailed, artwork</p>
          </div>
          <div class="showcase-variants">
            <div class="variant">
              <img src="/tutorial/pic-style.jpg" alt="Portrait in Picasso style" class="showcase-image small"/>
              <p>Variant 1</p>
            </div>
            <div class="variant">
              <img src="/tutorial/van-style.jpg" alt="Portrait in Van Gogh style" class="showcase-image small"/>
              <p>Variant 2</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box warning">
        <h4>Compatibility Note:</h4>
        <p>The AND/OR syntax does not work the same way in all UI implementations. In A1111 WebUI, "AND" (uppercase) is used, while ComfyUI might use different notation.</p>
      </div>
    </section>

    <!-- Exercise Area -->
    <section class="tutorial-section">
      <h2>Practical Exercise</h2>

      <div class="exercise-box">
        <h3>Exercise: Weighting and Balance</h3>
        <p>Try the following prompt variations with the same seed and compare the results:</p>

        <div class="exercise-examples">
          <div class="exercise-prompt">
            <h4>Base Prompt</h4>
            <div class="prompt-box">
              <p>portrait of a woman with red jacket, city in background, sunlight, detailed</p>
            </div>
          </div>

          <div class="exercise-prompt">
            <h4>With Weighting</h4>
            <div class="prompt-box">
              <p>((portrait of a woman)) with red jacket, [city in background], sunlight, detailed</p>
            </div>
          </div>

          <div class="exercise-prompt">
            <h4>With AND Technique</h4>
            <div class="prompt-box">
              <p>portrait of a woman with red jacket AND city in background, sunlight, detailed</p>
            </div>
          </div>
        </div>
      </div>

      <div class="info-box success">
        <h4>Learning objective achieved:</h4>
        <p>You now understand how word position and weighting syntax direct the model's attention and how you can balance multiple topics in your prompts.</p>
      </div>

      <!-- Use TutorialNavigation component -->
       <TutorialNavigation
        previousPath="/guided-tutorial/manage-styles"
        nextPath="/guided-tutorial/advanced-prompting"
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
  
  /* Position Examples */
  .position-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .position-examples {
      grid-template-columns: 1fr;
    }
  }
  
  .position-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .position-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.1rem;
  }
  
  .prompt-example {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #4da6ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #a0a0a0;
    margin-bottom: 1rem;
  }
  
  .prompt-example .emphasis {
    display: inline;
    color: #FCEA2B;
    font-weight: bold;
  }
  
  .result-info {
    font-style: italic;
    font-size: 0.9rem;
  }
  
  .result-info p {
    margin: 0;
    color: #888;
  }
  
  /* Priority Order */
  .priority-order {
    margin: 2rem 0;
  }
  
  .priority-list {
    background-color: #222;
    padding: 1.5rem 1.5rem 1.5rem 3rem;
    border-radius: 8px;
    border: 1px solid #333;
  }
  
  .priority-list li {
    margin-bottom: 0.8rem;
    color: #b0b0b0;
  }
  
  .priority-list li strong {
    color: #d0d0d0;
  }
  
  /* Syntax Table */
  .syntax-table {
    background-color: #222;
    border-radius: 8px;
    overflow: hidden;
    margin: 1.5rem 0;
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 0.8fr 0.8fr 1.2fr 1fr;
    padding: 1rem;
    background-color: #2a2a2a;
    font-weight: bold;
    border-bottom: 1px solid #333;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 0.8fr 0.8fr 1.2fr 1fr;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #333;
  }
  
  .table-row:last-child {
    border-bottom: none;
  }
  
  .syntax-code {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
  }
  
  .weight-value {
    font-family: 'IBM Plex Mono', monospace;
    color: #4da6ff;
  }
  
  .syntax-example {
    font-family: 'IBM Plex Mono', monospace;
    color: #d0d0d0;
    font-size: 0.9rem;
  }
  
  .syntax-description {
    color: #b0b0b0;
  }
  
  /* Comparison Grid */
  .comparison-grid {
    margin: 2rem 0;
  }
  
  .comparison-items {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
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
  .placeholder-image.small {
    aspect-ratio: 1 / 1;
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
    background-color: rgba(255, 205, 43, 0.8);
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
  }
  
  .tips-box ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .tips-box li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  /* Technique Grid */
  .technique-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .technique-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .technique-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .technique-card h3 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
    text-align: center;
  }
  
  .technique-example {
    background-color: #1a1a1a;
    padding: 0.8rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .technique-example code {
    font-family: 'IBM Plex Mono', monospace;
    color: #FCEA2B;
    font-size: 0.9rem;
  }
  
  .technique-card p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.9rem;
    text-align: center;
  }
  
  /* Example Showcase */
  .example-showcase {
    margin: 2rem 0;
  }
  
  .showcase-item {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid #333;
  }
  
  .showcase-item h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .showcase-prompt {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1.2rem;
    border-left: 3px solid #4da6ff;
  }
  
  .showcase-prompt p {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    color: #d0d0d0;
    font-size: 0.9rem;
  }
  
  .showcase-variants {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    .showcase-variants {
      grid-template-columns: 1fr;
    }
  }
  
  .variant {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .variant p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: #888;
    font-size: 0.9rem;
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
  
  .exercise-examples {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    margin-top: 1.2rem;
  }
  
  .exercise-prompt h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .prompt-box {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    border-left: 3px solid #FCEA2B;
  }
  
  .prompt-box p {
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
  
  .info-box.warning {
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
  
  .showcase-image {
     width: 100%;
     border-radius: 8px;
     border: 1px solid #333;
     display: block; /* Ensure img behaves like a block element */
  }

  .showcase-image.wide {
     aspect-ratio: 16 / 9; /* Maintain aspect ratio if desired */
     object-fit: cover; /* Ensure image covers the area */
  }

  .showcase-image.small {
     aspect-ratio: 1 / 1; /* Maintain aspect ratio */
     object-fit: cover; /* Ensure image covers the area */
  }
</style>
