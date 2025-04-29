<script>
  // Beispiel-Prompts für die Demonstration
  const examplePrompts = {
    basic: "ein Schloss",
    improved: "ein mittelalterliches Schloss auf einem Hügel",
    detailed: "ein mittelalterliches Schloss auf einem Hügel, umgeben von einem nebligen Wald, bei Sonnenuntergang, fotorealistische Darstellung, detaillierte Architektur",
    structured: "Mittelalterliches Schloss | auf einem Hügel | umgeben von nebligem Wald | Sonnenuntergang | fotorealistisch | detaillierte Architektur | cinematic lighting | 8k"
  };

  // Stil-Keywords für die Demonstration
  const styleKeywords = [
    { category: "Fotorealismus", 
      keywords: ["photorealistic", "hyperrealistic", "8k", "detailed", "cinematic", "professional photography"] },
    { category: "Kunst & Illustration", 
      keywords: ["oil painting", "watercolor", "concept art", "digital art", "anime style", "cartoon style"] },
    { category: "Grafik & Design", 
      keywords: ["vector art", "flat design", "minimalist", "isometric", "3D render", "pixel art"] }
  ];
</script>

<svelte:head>
  <title>Prompt-Grundlagen | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Prompt-Grundlagen</h1>
    <p class="subtitle">Die Kunst des effektiven Prompt-Schreibens</p>
  </div>

  <div class="content-sections">
    <!-- Anatomie eines Prompts -->
    <section class="tutorial-section">
      <h2>Anatomie eines Prompts</h2>
      <p>Ein erfolgreicher Prompt besteht typischerweise aus vier Hauptelementen:</p>
      
      <div class="anatomy-grid">
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">1</span>
            <h3>Subjekt</h3>
          </div>
          <p>Das Hauptobjekt oder die Person im Bild — <em>Was</em> soll dargestellt werden?</p>
          <div class="anatomy-example">
            <span class="highlight">Ein mittelalterliches Schloss</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">2</span>
            <h3>Stil</h3>
          </div>
          <p>Die künstlerische Darstellungsart — <em>Wie</em> soll es aussehen?</p>
          <div class="anatomy-example">
            <span class="highlight">fotorealistisch, cinematic lighting</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">3</span>
            <h3>Kontext</h3>
          </div>
          <p>Die Umgebung oder Situation — <em>Wo</em> und <em>wann</em> findet es statt?</p>
          <div class="anatomy-example">
            <span class="highlight">auf einem Hügel, bei Sonnenuntergang</span>
          </div>
        </div>
        
        <div class="anatomy-item">
          <div class="anatomy-header">
            <span class="badge">4</span>
            <h3>Details</h3>
          </div>
          <p>Zusätzliche Beschreibungen, die das Bild bereichern.</p>
          <div class="anatomy-example">
            <span class="highlight">detaillierte Architektur, umgeben von nebligem Wald</span>
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Wichtig zu wissen:</h4>
        <p>Nicht jeder Prompt muss alle vier Elemente enthalten, aber je spezifischer dein Prompt ist, desto gezielter wird das generierte Bild.</p>
      </div>
    </section>

    <!-- Reihenfolge & Verständlichkeit -->
    <section class="tutorial-section">
      <h2>Reihenfolge & Verständlichkeit</h2>
      
      <p>Die Reihenfolge der Elemente in deinem Prompt hat Einfluss auf das Ergebnis. Eine empfohlene Struktur ist:</p>
      
      <div class="order-flow">
        <div class="flow-item">
          <div class="flow-number">1</div>
          <div class="flow-content">
            <h4>Subjekt</h4>
            <p>Was ist das Hauptmotiv?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-number">2</div>
          <div class="flow-content">
            <h4>Eigenschaften</h4>
            <p>Wie sieht es aus?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-number">3</div>
          <div class="flow-content">
            <h4>Umgebung</h4>
            <p>Wo befindet es sich?</p>
          </div>
        </div>
        <div class="flow-arrow">→</div>
        <div class="flow-item">
          <div class="flow-number">4</div>
          <div class="flow-content">
            <h4>Stil & Details</h4>
            <p>Künstlerische Elemente</p>
          </div>
        </div>
      </div>
      
      <div class="prompt-evolution">
        <h3>Vom einfachen zum detaillierten Prompt</h3>
        
        <div class="prompt-level">
          <div class="level-label">Einfach</div>
          <div class="prompt-box">
            <p>{examplePrompts.basic}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Sehr allgemein, viele Interpretationsmöglichkeiten</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="level-label">Besser</div>
          <div class="prompt-box">
            <p>{examplePrompts.improved}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Grundlegende Details, aber immer noch offen für viele Stile</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="level-label">Detailliert</div>
          <div class="prompt-box detailed">
            <p>{examplePrompts.detailed}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Klares Motiv mit Stil, Kontext und Details</p>
          </div>
        </div>
        
        <div class="prompt-level">
          <div class="level-label">Strukturiert</div>
          <div class="prompt-box structured">
            <p>{examplePrompts.structured}</p>
          </div>
          <div class="prompt-effect">
            <p>→ Gut organisiert mit Trennzeichen für bessere Lesbarkeit</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Häufige Stil-Keywords -->
    <section class="tutorial-section">
      <h2>Häufige Stil-Keywords</h2>
      
      <p>Stil-Keywords sind entscheidend, um den Look deines Bildes zu definieren. Hier sind einige gängige Kategorien:</p>
      
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
        <h3>Beispiel-Anwendungen</h3>
        
        <div class="style-example">
          <div class="example-label">Fotorealismus:</div>
          <div class="example-prompt">
            <p>Ein Porträt eines älteren Mannes mit Bart, detaillierte Gesichtszüge, fotorealistisch, Studio-Beleuchtung, 8k, professionelle Fotografie</p>
          </div>
        </div>
        
        <div class="style-example">
          <div class="example-label">Kunst:</div>
          <div class="example-prompt">
            <p>Eine Landschaft mit Bergen und See, Ölgemälde-Stil, impressionistisch, kräftige Pinselstriche, lebendige Farben</p>
          </div>
        </div>
        
        <div class="style-example">
          <div class="example-label">Design:</div>
          <div class="example-prompt">
            <p>Ein futuristisches Auto, isometrische Vektorillustration, klare Linien, flache Farben, minimalistischer Stil</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Übungsbereich -->
    <section class="tutorial-section">
      <h2>Praktische Übung</h2>
      
      <div class="exercise-box">
        <h3>Erstelle deinen eigenen strukturierten Prompt</h3>
        <p>Versuche, einen Prompt nach dem folgenden Schema zu entwickeln:</p>
        
        <div class="prompt-template">
          <p><span class="template-part">Subjekt</span> | <span class="template-part">Eigenschaften</span> | <span class="template-part">Umgebung</span> | <span class="template-part">Stil</span> | <span class="template-part">Details</span></p>
        </div>
        
        <p>Beispiel für eine Naturszene:</p>
        <div class="prompt-example">
          <p>Ein majestätischer Wasserfall | hoch und mächtig, türkisblaues Wasser | in einem tropischen Regenwald | fotorealistisch | Morgennebel, goldenes Sonnenlicht, detaillierte Vegetation, 8k</p>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Lernziel erreicht:</h4>
        <p>Du solltest jetzt in der Lage sein, einen strukturierten Prompt zu schreiben, der alle wichtigen Elemente enthält und ein erwartbares Ergebnis liefert.</p>
      </div>
      
      <div class="next-section">
        <p>Im nächsten Tutorial lernst du mehr über die Kernparameter und wie sie deine Bilder beeinflussen.</p>
        <a href="/guided-tutorial/core-parameters" class="next-button">
          Weiter zum nächsten Thema
          <span class="arrow">→</span>
        </a>
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin: 2rem 0;
  }
  
  .flow-item {
    display: flex;
    align-items: center;
    background-color: #222;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #333;
    min-width: 120px;
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
