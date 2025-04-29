<script>
  // Beispiel-Bilder für CFG Vergleich
  const cfgExamples = [
    { level: "Niedrig (CFG 3)", image: "/tutorials/cfg-low.png", description: "Kreativ, aber oft weit vom Prompt entfernt" },
    { level: "Mittel (CFG 7)", image: "/tutorials/cfg-medium.png", description: "Gute Balance zwischen Kreativität und Prompt-Treue" },
    { level: "Hoch (CFG 15)", image: "/tutorials/cfg-high.png", description: "Strenge Prompt-Befolgung, kann übertrieben wirken" }
  ];
  
  // Sampler-Beispiele
  const samplers = [
    { name: "Euler a", description: "Schnell mit guten Details, etwas kreativ", startwert: "20-25 Steps" },
    { name: "DPM++ 2M Karras", description: "Hoch detailliert, gut für fotorealistische Bilder", startwert: "25-30 Steps" },
    { name: "DDIM", description: "Sehr stabil, gut für Inpainting", startwert: "30-40 Steps" }
  ];
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
</script>

<svelte:head>
  <title>Kernparameter | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Kernparameter</h1>
    <p class="subtitle">Die wichtigsten Einstellungen für optimale Ergebnisse</p>
  </div>

  <div class="content-sections">
    <!-- CFG-Scale Abschnitt -->
    <section class="tutorial-section">
      <h2>2.1 CFG-Scale: Kreativität vs. Prompt-Bindung</h2>
      
      <p>Die <strong>Classifier Free Guidance Scale</strong> (CFG-Scale) bestimmt, wie genau das Modell deinem Prompt folgen soll.</p>
      
      <div class="slider-visualization">
        <div class="slider-container">
          <div class="slider-labels">
            <span>Kreativität</span>
            <span>Balance</span>
            <span>Prompt-Treue</span>
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
          <h4>Niedriger CFG-Wert (1-5)</h4>
          <ul>
            <li>Mehr Kreativität, Interpretation</li>
            <li>Weniger Bindung an den Prompt</li>
            <li>Vielfältigere, aber unvorhersehbare Ergebnisse</li>
          </ul>
        </div>
        
        <div class="info-card highlight">
          <h4>Mittlerer CFG-Wert (6-10)</h4>
          <ul>
            <li>Ausgewogenes Verhältnis</li>
            <li>Für die meisten Anwendungen ideal</li>
            <li>Standard: 7.5</li>
          </ul>
        </div>
        
        <div class="info-card">
          <h4>Hoher CFG-Wert (11-20+)</h4>
          <ul>
            <li>Strikte Prompt-Befolgung</li>
            <li>Weniger kreative Freiheit</li>
            <li>Kann zu übertriebenen Bildern führen</li>
          </ul>
        </div>
      </div>
      
      <div class="example-images">
        <h3>CFG-Beispiele mit demselben Prompt</h3>
        <div class="image-comparison">
          {#each cfgExamples as example}
            <div class="comparison-item">
              <div class="comparison-image">
                <img src={example.image} alt={`Beispiel für ${example.level} CFG`} />
              </div>
              <h4>{example.level}</h4>
              <p>{example.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>

    <!-- Sampling-Steps & Sampler Abschnitt -->
    <section class="tutorial-section">
      <h2>2.2 Sampling-Steps & Sampler</h2>
      
      <div class="content-block">
        <div class="text-content">
          <h3>Sampling-Steps</h3>
          <p>Die Anzahl der Schritte (Steps), die das Modell durchläuft, um das Bild zu erstellen. Mehr Steps bedeuten mehr Details, aber auch längere Generierungszeit.</p>
          
          <div class="steps-comparison">
            <div class="steps-range">
              <span class="steps-low">10 Steps</span>
              <div class="steps-arrow">→</div>
              <span class="steps-medium">30 Steps</span>
              <div class="steps-arrow">→</div>
              <span class="steps-high">50+ Steps</span>
            </div>
            <div class="steps-labels">
              <span>Schnell, weniger Details</span>
              <span>Ausgewogen</span>
              <span>Langsam, mehr Details</span>
            </div>
          </div>
          
          <div class="info-box">
            <h4>Richtlinie:</h4>
            <p>Für die meisten Bilder reichen <strong>20-30 Steps</strong> aus. Ab 40-50 Steps sind Verbesserungen oft kaum noch wahrnehmbar.</p>
          </div>
        </div>
        
        <div class="sampler-content">
          <h3>Sampler-Algorithmen</h3>
          <p>Der Sampler bestimmt, wie das Modell den Diffusionsprozess durchführt. Jeder hat seine eigenen Stärken:</p>
          
          <div class="sampler-table">
            <div class="table-header">
              <span>Sampler</span>
              <span>Eigenschaften</span>
              <span>Empfohlene Steps</span>
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

    <!-- Seed Abschnitt -->
    <section class="tutorial-section">
      <h2>2.3 Seed: Zufall & Reproduzierbarkeit</h2>
      
      <p>Der Seed ist der Startwert für den Zufallsgenerator. Er bestimmt den Ausgangspunkt der Bild-Generierung.</p>
      
      <div class="seed-visualization">
        <div class="seed-box">
          <h4>Was macht der Seed?</h4>
          <div class="seed-diagram">
            <div class="seed-input">Prompt: "ein Schloss"</div>
            <div class="seed-branches">
              <div class="seed-branch">
                <div class="seed-value">Seed: 1234</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Bild A</div>
              </div>
              <div class="seed-branch">
                <div class="seed-value">Seed: 5678</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Bild B</div>
              </div>
              <div class="seed-branch">
                <div class="seed-value">Seed: 9012</div>
                <div class="seed-arrow">↓</div>
                <div class="seed-result">Bild C</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="seed-strategies">
          <h4>Seed-Strategien:</h4>
          <div class="strategy-cards">
            <div class="strategy-card">
              <span class="strategy-icon">🎲</span>
              <h5>Zufälliger Seed</h5>
              <p>Für Exploration und vielfältige Ergebnisse. Jedes generierte Bild ist einzigartig.</p>
              <div class="code-snippet">Seed: -1</div>
            </div>
            <div class="strategy-card">
              <span class="strategy-icon">🔁</span>
              <h5>Fester Seed</h5>
              <p>Zum Reproduzieren von Bildern oder für systematische Tests.</p>
              <div class="code-snippet">Seed: 1234567890</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box tip">
        <h4>Profi-Tipp:</h4>
        <p>Wenn du ein Bild erzeugt hast, das dir gefällt, notiere den Seed! Mit demselben Prompt und denselben Parametern kannst du das Bild später exakt reproduzieren.</p>
      </div>
    </section>

    <!-- Praktische Anwendung -->
    <section class="tutorial-section">
      <h2>Empfohlene Startwerte</h2>
      
      <div class="parameter-recommendations">
        <div class="recommendation-card">
          <h3>Fotorealismus</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 7-9</li>
            <li><strong>Sampler:</strong> DPM++ 2M Karras</li>
            <li><strong>Steps:</strong> 25-30</li>
          </ul>
        </div>
        
        <div class="recommendation-card">
          <h3>Kreative Kunst</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 4-7</li>
            <li><strong>Sampler:</strong> Euler a</li>
            <li><strong>Steps:</strong> 20-25</li>
          </ul>
        </div>
        
        <div class="recommendation-card">
          <h3>Präzise Illustration</h3>
          <ul class="param-list">
            <li><strong>CFG:</strong> 9-12</li>
            <li><strong>Sampler:</strong> DDIM</li>
            <li><strong>Steps:</strong> 30-40</li>
          </ul>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Lernziel erreicht:</h4>
        <p>Du verstehst jetzt, wie CFG, Steps und Seed das Ergebnis beeinflussen und kannst bewusste Entscheidungen für deine Generierungen treffen.</p>
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
  
  /* Navigation */
  .next-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 2rem;
  }
  
  .next-button {
    display: inline-flex;
    align-items: center;
    background-color: #FCEA2B;
    color: #000;
    padding: 0.8rem 1.2rem;
    border-radius: 6px;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    margin-top: 1rem;
    transition: all 0.2s;
  }
  
  .next-button:hover {
    background-color: #ffed5c;
    transform: translateX(3px);
  }
  
  .arrow {
    margin-left: 10px;
  }
</style>
