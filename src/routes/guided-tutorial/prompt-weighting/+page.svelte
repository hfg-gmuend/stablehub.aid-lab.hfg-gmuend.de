<script>
  // Beispiele für Gewichtungssyntax
  const weightingExamples = [
    { syntax: "(Begriff)", weight: "1.1×", example: "(porträt einer frau)", description: "Leichte Betonung" },
    { syntax: "((Begriff))", weight: "1.21× (1.1²)", example: "((porträt einer frau))", description: "Mittlere Betonung" },
    { syntax: "(((Begriff)))", weight: "1.33× (1.1³)", example: "(((porträt einer frau)))", description: "Starke Betonung" },
    { syntax: "[Begriff]", weight: "0.9×", example: "[porträt einer frau]", description: "Leichte Abschwächung" },
    { syntax: "[[Begriff]]", weight: "0.81× (0.9²)", example: "[[porträt einer frau]]", description: "Mittlere Abschwächung" },
    { syntax: "Begriff:1.5", weight: "1.5×", example: "porträt einer frau:1.5", description: "Exakte Gewichtung" }
  ];
  
  // Beispiele für AND/OR Techniken
  const combinationExamples = [
    { name: "Blend Technique", example: "ein haus UND ein schloss", description: "Erzeugt eine Mischung beider Elemente" },
    { name: "OR Technique", example: "ein haus | ein schloss", description: "Generiert entweder das eine oder das andere" },
    { name: "AND mit Gewichtung", example: "ein haus:1.2 UND ein schloss:0.8", description: "Kontrollierte Mischung mit Dominanz" }
  ];
</script>

<svelte:head>
  <title>Prompt-Priorisierung | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Prompt-Priorisierung & Gewichtung</h1>
    <p class="subtitle">Feineinstellung von Prompts für präzisere Kontrolle</p>
  </div>

  <div class="content-sections">
    <!-- Wortposition und Gewichtung -->
    <section class="tutorial-section">
      <h2>Wortposition → höheres Gewicht</h2>
      
      <p>Die Reihenfolge deiner Prompt-Begriffe hat Auswirkungen auf das generierte Bild. Begriffe am <strong>Anfang des Prompts</strong> erhalten in der Regel mehr Aufmerksamkeit vom KI-Modell.</p>
      
      <div class="position-examples">
        <div class="position-card">
          <h3>Anfang des Prompts</h3>
          <div class="prompt-example">
            <p class="emphasis">Ein Porträt einer Frau</p> mit einem roten Kleid und einer Kette, ölgemälde, detailliert, kunstvoll
          </div>
          <div class="result-info">
            <p>→ Fokus liegt auf der Person (Frau), Kleid und Kette sind sekundär</p>
          </div>
        </div>
        
        <div class="position-card">
          <h3>Ende des Prompts</h3>
          <div class="prompt-example">
            Ölgemälde, detailliert, kunstvoll, mit einem roten Kleid und einer Kette, <p class="emphasis">ein Porträt einer Frau</p>
          </div>
          <div class="result-info">
            <p>→ Stilelemente könnten dominanter sein als das Hauptmotiv</p>
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Grundregel:</h4>
        <p>Platziere das Hauptmotiv am Anfang des Prompts und stilistische Details eher zum Ende hin.</p>
      </div>
      
      <div class="priority-order">
        <h3>Empfohlene Priorisierungs-Reihenfolge:</h3>
        <ol class="priority-list">
          <li><strong>Hauptmotiv/Subjekt</strong> — Was soll im Fokus stehen?</li>
          <li><strong>Komposition/Umgebung</strong> — Wie ist die Szene aufgebaut?</li>
          <li><strong>Wichtige Attribute</strong> — Spezifische Eigenschaften des Motivs</li>
          <li><strong>Künstlerischer Stil</strong> — Welche Ästhetik soll das Bild haben?</li>
          <li><strong>Qualitätsmarker</strong> — Schärfe, Detailgrad, Auflösung etc.</li>
        </ol>
      </div>
    </section>

    <!-- Gewichtungssyntax -->
    <section class="tutorial-section">
      <h2>Gewichtungssyntax: ( ), [ ] und :n</h2>
      
      <p>Mit spezieller Syntax kannst du bestimmten Begriffen oder Phrasen mehr oder weniger Gewicht verleihen, unabhängig von ihrer Position.</p>
      
      <div class="syntax-table">
        <div class="table-header">
          <span>Syntax</span>
          <span>Gewichtung</span>
          <span>Beispiel</span>
          <span>Effekt</span>
        </div>
        
        {#each weightingExamples as example}
          <div class="table-row">
            <span class="syntax-code">{example.syntax}</span>
            <span class="weight-value">{example.weight}</span>
            <span class="syntax-example">{example.example}</span>
            <span class="syntax-description">{example.description}</span>
          </div>
        {/each}
      </div>
      
      <div class="comparison-grid">
        <h3>Visuelle Auswirkungen der Gewichtung</h3>
        <div class="comparison-items">
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Normal">
                <span>porträt einer frau</span>
              </div>
            </div>
            <p>Normaler Prompt</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Betont">
                <span>((porträt einer frau))</span>
              </div>
            </div>
            <p>Doppelt betont</p>
          </div>
          <div class="comparison-item">
            <div class="comparison-image">
              <div class="placeholder-image" data-label="Abgeschwächt">
                <span>[porträt einer frau]</span>
              </div>
            </div>
            <p>Abgeschwächt</p>
          </div>
        </div>
      </div>
      
      <div class="tips-box">
        <h4>Praktische Tipps:</h4>
        <ul>
          <li><strong>Nicht übertreiben:</strong> Zu viele Gewichtungen machen den Prompt unlesbar</li>
          <li><strong>Experimentieren:</strong> Teste verschiedene Gewichtungen mit demselben Seed</li>
          <li><strong>Selektiv sein:</strong> Gewichte nur die wirklich wichtigen Elemente</li>
          <li><strong>Dokumentieren:</strong> Notiere erfolgreiche Gewichtungen für spätere Verwendung</li>
        </ul>
      </div>
    </section>

    <!-- Kombinationstechniken -->
    <section class="tutorial-section">
      <h2>Themen ausbalancieren: Blend / AND / OR</h2>
      
      <p>Bei komplexen Prompts mit mehreren Motiven oder Stilen kannst du spezielle Techniken verwenden, um sie zu kombinieren oder zu trennen.</p>
      
      <div class="technique-grid">
        {#each combinationExamples as technique}
          <div class="technique-card">
            <h3>{technique.name}</h3>
            <div class="technique-example">
              <code>{technique.example}</code>
            </div>
            <p>{technique.description}</p>
          </div>
        {/each}
      </div>
      
      <div class="example-showcase">
        <h3>Beispielanwendungen</h3>
        
        <div class="showcase-item">
          <h4>Architekturstil-Mix</h4>
          <div class="showcase-prompt">
            <p>moderne architektur:1.2 UND gotische kathedrale:0.8, detailliert, atmosphärisch, sonnenlicht</p>
          </div>
          <div class="showcase-result">
            <div class="placeholder-image wide">
              <span>Modernes Gebäude mit gotischen Elementen</span>
            </div>
          </div>
        </div>
        
        <div class="showcase-item">
          <h4>Alternativ-Generierung</h4>
          <div class="showcase-prompt">
            <p>ein porträt im stile von picasso | ein porträt im stile von van gogh, detailliert, kunstwerk</p>
          </div>
          <div class="showcase-variants">
            <div class="variant">
              <div class="placeholder-image small">
                <span>Picasso-Stil</span>
              </div>
              <p>Variante 1</p>
            </div>
            <div class="variant">
              <div class="placeholder-image small">
                <span>Van Gogh-Stil</span>
              </div>
              <p>Variante 2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box warning">
        <h4>Hinweis zur Kompatibilität:</h4>
        <p>Die AND/OR Syntax funktioniert nicht in allen UI-Implementierungen gleichermaßen. In A1111 WebUI verwendet man "AND" (Großbuchstaben), während ComfyUI andere Notation nutzen kann.</p>
      </div>
    </section>

    <!-- Übungsbereich -->
    <section class="tutorial-section">
      <h2>Praktische Übung</h2>
      
      <div class="exercise-box">
        <h3>Übung: Gewichtung und Balance</h3>
        <p>Probiere folgende Prompt-Variationen mit demselben Seed und vergleiche die Ergebnisse:</p>
        
        <div class="exercise-examples">
          <div class="exercise-prompt">
            <h4>Grundprompt</h4>
            <div class="prompt-box">
              <p>porträt einer frau mit roter jacke, stadt im hintergrund, sonnenlicht, detailliert</p>
            </div>
          </div>
          
          <div class="exercise-prompt">
            <h4>Mit Gewichtung</h4>
            <div class="prompt-box">
              <p>((porträt einer frau)) mit roter jacke, [stadt im hintergrund], sonnenlicht, detailliert</p>
            </div>
          </div>
          
          <div class="exercise-prompt">
            <h4>Mit AND-Technik</h4>
            <div class="prompt-box">
              <p>porträt einer frau mit roter jacke UND stadt im hintergrund, sonnenlicht, detailliert</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Lernziel erreicht:</h4>
        <p>Du verstehst nun, wie Wortposition und Gewichtungssyntax die Aufmerksamkeit des Modells lenken und wie du mehrere Themen in deinen Prompts ausbalancieren kannst.</p>
      </div>
      
      <div class="next-section">
        <p>Im nächsten Tutorial lernst du fortgeschrittene Prompting-Techniken für komplexe Szenen und hochauflösende Bilder.</p>
        <a href="/guided-tutorial/advanced-prompting" class="next-button">
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
  
  .placeholder-image.wide {
    aspect-ratio: 16 / 9;
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
