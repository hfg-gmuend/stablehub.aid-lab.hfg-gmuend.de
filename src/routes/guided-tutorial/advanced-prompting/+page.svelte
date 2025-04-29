<script>
  // Beispiele für negative Prompts
  const negativePromptExamples = [
    { 
      category: "Qualitätsprobleme",
      prompt: "blurry, low quality, pixelated, jpeg artifacts, compression artifacts, bad composition, deformed, mutated, signature, watermark"
    },
    { 
      category: "Anatomieprobleme", 
      prompt: "bad anatomy, deformed hands, extra fingers, missing fingers, extra limbs, distorted face, unrealistic proportions, cross-eyed, assymetrical, disfigured"
    },
    { 
      category: "Zeichenstil unerwünscht", 
      prompt: "cartoon style, anime, 3d render, painting, drawing, sketch, illustration, low detail face"
    }
  ];
</script>

<svelte:head>
  <title>Fortgeschrittenes Prompting | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Fortgeschrittenes Prompting</h1>
    <p class="subtitle">Erweiterte Techniken für komplexe und hochauflösende Bilder</p>
  </div>

  <div class="content-sections">
    <!-- Negative Prompt Feintuning -->
    <section class="tutorial-section">
      <h2>Negative Prompt feintunen</h2>
      
      <p>Ein gut strukturierter negativer Prompt ist entscheidend für qualitativ hochwertige Bilder. Mit gezielten Negativ-Prompts kannst du häufige Probleme vermeiden:</p>
      
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
        <h3>Auswirkung des negativen Prompts</h3>
        <div class="comparison-items">
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Ohne">
                <span>Ohne negativen Prompt</span>
              </div>
            </div>
            <div class="comparison-prompt">
              <p class="prompt-caption">Negativer Prompt:</p>
              <p class="prompt-text empty">Leer</p>
            </div>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Mit">
                <span>Mit detailliertem negativen Prompt</span>
              </div>
            </div>
            <div class="comparison-prompt">
              <p class="prompt-caption">Negativer Prompt:</p>
              <p class="prompt-text">bad quality, blurry, bad anatomy, worst quality, low quality, lowres, extra fingers, ...</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tips-box">
        <h4>Tipps für effektive negative Prompts:</h4>
        <ul>
          <li><strong>Projektspezifisch anpassen:</strong> Für Porträts auf Anatomie-Fehler fokussieren, für Landschaften eher auf Qualitätsprobleme</li>
          <li><strong>Nicht überladen:</strong> Extrem lange negative Prompts können das Modell verwirren</li>
          <li><strong>Testlauf:</strong> Vergleiche die Ergebnisse mit und ohne negativen Prompt</li>
          <li><strong>Priorität setzen:</strong> Wichtigste Vermeidungs-Begriffe an den Anfang des negativen Prompts</li>
        </ul>
      </div>
    </section>

    <!-- Multi-Prompt / Composable Diffusion -->
    <section class="tutorial-section">
      <h2>Multi-Prompt / Composable Diffusion</h2>
      
      <p>Multi-Prompt oder Composable Diffusion ist eine fortgeschrittene Technik, die es ermöglicht, mehrere separate Prompts gleichzeitig zu nutzen, um komplexe Szenen zu generieren.</p>
      
      <div class="technique-explanation">
        <h3>So funktioniert es:</h3>
        <div class="explanation-grid">
          <div class="explanation-item">
            <h4>1. Prompt-Zerlegung</h4>
            <p>Teile deine komplexe Szene in einzelne Elemente auf und erstelle separate Prompts für jedes Element.</p>
          </div>
          <div class="explanation-item">
            <h4>2. Gewichtete Kombination</h4>
            <p>Weise jedem Prompt eine Gewichtung zu, die seine Bedeutung in der Gesamtkomposition angibt.</p>
          </div>
          <div class="explanation-item">
            <h4>3. Verbindung</h4>
            <p>Verbinde die Prompts mit einer speziellen Syntax, die von der verwendeten UI abhängt.</p>
          </div>
        </div>
      </div>
      
      <div class="example-box">
        <h3>Beispiel: Landschaft mit mehreren Elementen</h3>
        
        <div class="multi-prompt-example">
          <div class="component">
            <div class="component-label">Komponente 1:</div>
            <div class="component-prompt">
              <p>a majestic castle on top of a hill</p>
            </div>
            <div class="component-weight">Gewicht: 1.2</div>
          </div>
          <div class="plus-sign">+</div>
          <div class="component">
            <div class="component-label">Komponente 2:</div>
            <div class="component-prompt">
              <p>a beautiful lake with reflections</p>
            </div>
            <div class="component-weight">Gewicht: 0.8</div>
          </div>
          <div class="plus-sign">+</div>
          <div class="component">
            <div class="component-label">Gemeinsame Stile:</div>
            <div class="component-prompt">
              <p>sunset, cinematic lighting, detailed, 8k</p>
            </div>
            <div class="component-weight">Für alle Komponenten</div>
          </div>
        </div>
        
        <div class="syntax-examples">
          <h4>Implementierungssyntax:</h4>
          <div class="syntax-box">
            <p class="syntax-label">A1111 WebUI:</p>
            <code>a majestic castle on top of a hill :1.2 AND a beautiful lake with reflections :0.8, sunset, cinematic lighting, detailed, 8k</code>
          </div>
          <div class="syntax-box">
            <p class="syntax-label">ComfyUI:</p>
            <code>// In separaten Prompt-Nodes mit entsprechenden Gewichten verbunden</code>
          </div>
        </div>
      </div>
      
      <div class="tips-box">
        <p>Diese Technik ist besonders nützlich für:</p>
        <ul>
          <li>Komplexe Szenen mit mehreren Hauptelementen</li>
          <li>Kombination verschiedener Stilrichtungen</li>
          <li>Genaue Kontrolle über die Balance von Elementen im Bild</li>
        </ul>
      </div>
    </section>

    <!-- Hires-Fix & Upscale Loops -->
    <section class="tutorial-section">
      <h2>Hires-Fix & Upscale Loops</h2>
      
      <p>Für hochauflösende Bilder mit feinen Details sind spezielle Techniken notwendig, da Diffusionsmodelle oft bei höheren Auflösungen Probleme haben.</p>
      
      <div class="technique-box">
        <h3>Hires-Fix</h3>
        <p>Diese Technik generiert ein Bild zunächst in niedriger Auflösung und verfeinert es dann in einem zweiten Durchlauf:</p>
        
        <div class="process-diagram">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Initiale Generation</h4>
              <p>Bild in niedriger Auflösung (z.B. 512x512 px) generieren</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Upscaling</h4>
              <p>Bild auf Zielgröße vergrößern (z.B. 1024x1024 px)</p>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Detail-Verfeinerung</h4>
              <p>Erneute Diffusion mit weniger Steps zur Detailverbesserung</p>
            </div>
          </div>
        </div>
        
        <div class="settings-box">
          <h4>Typische Einstellungen:</h4>
          <div class="settings-grid">
            <div class="setting-item">
              <span class="setting-name">Denoising Strength:</span>
              <span class="setting-value">0.3 - 0.6</span>
              <p class="setting-desc">Niedrigere Werte = mehr vom Original beibehalten</p>
            </div>
            <div class="setting-item">
              <span class="setting-name">Upscaler:</span>
              <span class="setting-value">ESRGAN, Latent</span>
              <p class="setting-desc">Verschiedene Upscaler haben unterschiedliche Stilauswirkungen</p>
            </div>
            <div class="setting-item">
              <span class="setting-name">Second-pass Steps:</span>
              <span class="setting-value">15-25</span>
              <p class="setting-desc">Weniger als bei der Erstgenerierung</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="technique-box">
        <h3>Upscale Loops / Progressive Growing</h3>
        <p>Bei besonders großen Bildern (2K+) kann ein mehrstufiger Prozess besser funktionieren:</p>
        
        <div class="upscale-loop-diagram">
          <div class="loop-step">
            <p>512×512</p>
            <div class="loop-arrow">↓</div>
            <p>Erstgenerierung</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>768×768</p>
            <div class="loop-arrow">↓</div>
            <p>Erste Upscale + Fix<br>(Denoising: 0.5)</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>1024×1024</p>
            <div class="loop-arrow">↓</div>
            <p>Zweite Upscale + Fix<br>(Denoising: 0.4)</p>
          </div>
          <div class="loop-arrow">&rarr;</div>
          <div class="loop-step">
            <p>1536×1536+</p>
            <div class="loop-arrow">↓</div>
            <p>Finale Upscale + Fix<br>(Denoising: 0.3)</p>
          </div>
        </div>
        
        <div class="info-box">
          <h4>Vorteile dieser Methode:</h4>
          <ul>
            <li>Behält die Gesamtkomposition und wichtige Elemente bei</li>
            <li>Fügt bei jedem Schritt feinere Details hinzu</li>
            <li>Vermeidet Artefakte und Inkonsistenzen bei sehr hohen Auflösungen</li>
            <li>Ermöglicht mehr Kontrolle über den Detailgrad in jedem Schritt</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ControlNet & LoRAs -->
    <section class="tutorial-section">
      <h2>ControlNet & LoRAs: Funktionsprinzip</h2>
      
      <div class="technologies-grid">
        <div class="technology-card">
          <h3>ControlNet</h3>
          <div class="tech-image">
            <div class="placeholder-image tech">
              <span>ControlNet-Beispiel</span>
            </div>
          </div>
          <p class="tech-description">ControlNet erlaubt dir, den Generierungsprozess durch ein Eingabebild zu steuern. Statt nur mit Text zu arbeiten, kann das Modell Konturen, Posen, Tiefenkarten oder andere strukturelle Informationen berücksichtigen.</p>
          
          <div class="tech-features">
            <h4>Hauptanwendungen:</h4>
            <ul>
              <li><strong>Canny/Scribble:</strong> Konturen und Skizzen in fertige Bilder umwandeln</li>
              <li><strong>Pose:</strong> Körperhaltungen und Gesten steuern</li>
              <li><strong>Depth/Normal:</strong> 3D-Informationen und Raumstruktur beibehalten</li>
            </ul>
          </div>
        </div>
        
        <div class="technology-card">
          <h3>LoRAs (Low-Rank Adaptations)</h3>
          <div class="tech-image">
            <div class="placeholder-image tech">
              <span>LoRA-Beispiel</span>
            </div>
          </div>
          <p class="tech-description">LoRAs sind kleine, trainierte Modell-Ergänzungen, die einem Basis-Modell neue Stile, Charaktere oder Konzepte beibringen, ohne das gesamte Modell neu trainieren zu müssen.</p>
          
          <div class="tech-features">
            <h4>Hauptanwendungen:</h4>
            <ul>
              <li><strong>Stile:</strong> Spezifische Kunststile oder visuelle Ästhetiken</li>
              <li><strong>Charaktere:</strong> Konsistente Generierung bestimmter Personen oder Figuren</li>
              <li><strong>Konzepte:</strong> Besondere Objekte oder visuelle Elemente</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="integration-box">
        <h3>Integration in den Workflow</h3>
        <p>Beide Technologien können mit den bisher gelernten Prompting-Techniken kombiniert werden:</p>
        
        <div class="workflow-steps">
          <div class="workflow-step">
            <div class="step-icon">🎨</div>
            <div class="step-content">
              <h4>1. Grundprompt erstellen</h4>
              <p>Definiere das Hauptmotiv und den Stil wie gewohnt</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">🔧</div>
            <div class="step-content">
              <h4>2. ControlNet / LoRAs hinzufügen</h4>
              <p>Wähle passende Kontroll-Inputs und Modell-Erweiterungen</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">⚖️</div>
            <div class="step-content">
              <h4>3. Gewichtungen anpassen</h4>
              <p>Balance zwischen Text-Prompt und anderen Eingaben finden</p>
            </div>
          </div>
          <div class="workflow-step">
            <div class="step-icon">🔄</div>
            <div class="step-content">
              <h4>4. Iterativ verfeinern</h4>
              <p>Durch Tests die optimalen Einstellungen finden</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box tutorial-links">
        <h4>Weiterführende Tutorials:</h4>
        <p>Diese Themen sind komplex und werden in separaten, spezialisierten Tutorials behandelt:</p>
        <div class="link-buttons">
          <a href="#" class="tutorial-link">ControlNet Tutorial</a>
          <a href="#" class="tutorial-link">LoRAs verstehen & anwenden</a>
          <a href="#" class="tutorial-link">Eigene Stile trainieren</a>
        </div>
      </div>
    </section>

    <!-- Abschluss -->
    <section class="tutorial-section">
      <h2>Zusammenfassung</h2>
      
      <p>Du hast nun einen umfassenden Überblick über fortgeschrittene Prompting-Techniken erhalten:</p>
      
      <div class="summary-points">
        <ul>
          <li><strong>Negative Prompts</strong> gezielt einsetzen und auf den Anwendungsfall abstimmen</li>
          <li>Mit <strong>Multi-Prompt-Techniken</strong> komplexe Szenen mit mehreren Elementen erstellen</li>
          <li><strong>Hires-Fix und Upscale-Loops</strong> für hochauflösende, detailreiche Bilder nutzen</li>
          <li>Grundlegende Konzepte von <strong>ControlNet und LoRAs</strong> verstehen und in den Workflow integrieren</li>
        </ul>
      </div>
      
      <div class="next-steps">
        <h3>Nächste Schritte</h3>
        <p>Um deine Fähigkeiten weiter zu vertiefen, empfehlen wir:</p>
        <ul>
          <li>Experimentiere mit den gelernten Techniken und dokumentiere deine Ergebnisse</li>
          <li>Erstelle deine eigene Bibliothek von negativen Prompts für verschiedene Anwendungsfälle</li>
          <li>Lerne spezifische Tools wie ControlNet oder Image-to-Image genauer kennen</li>
          <li>Teil deine Ergebnisse und Erfahrungen mit der Community</li>
        </ul>
      </div>
      
      <div class="info-box success">
        <h4>Kursabschluss:</h4>
        <p>Herzlichen Glückwunsch! Du hast alle Tutorial-Module abgeschlossen und verfügst nun über ein solides Fundament an Wissen zu Stable Diffusion und fortgeschrittenen Prompting-Techniken.</p>
      </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 1rem;
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
</style>
