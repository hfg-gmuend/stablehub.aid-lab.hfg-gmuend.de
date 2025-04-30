<script lang="ts">
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";

  // TypeScript Interfaces definieren
  interface StyleParameter {
    cfgScale: number;
    steps: number;
    sampler: string;
  }

  interface StylePreset {
    name: string;
    prompt: string;
    negative: string;
    parameters: StyleParameter;
  }

  // Beispiel Stil-Presets mit TypeScript Typisierung
  const stylePresets: StylePreset[] = [
    { 
      name: "Fotorealistisch", 
      prompt: "photorealistic, detailed, 8k, high quality, sharp focus", 
      negative: "cartoon, painting, illustration, drawing, anime, blur",
      parameters: { cfgScale: 7.5, steps: 30, sampler: "DPM++ 2M Karras" }
    },
    { 
      name: "Anime", 
      prompt: "anime style, vibrant colors, cel shading, high quality digital art", 
      negative: "photorealistic, 3d render, photograph",
      parameters: { cfgScale: 9, steps: 25, sampler: "Euler a" }
    },
    { 
      name: "Ölgemälde", 
      prompt: "oil painting, masterpiece, intricate brushwork, artistic, highly detailed", 
      negative: "digital art, 3d render, photograph, sketch",
      parameters: { cfgScale: 8, steps: 30, sampler: "DPM++ SDE Karras" }
    }
  ];

  // Hilfsfunktion zum Formatieren von JSON für die Beispiel-Anzeige
  function formatJsonExample(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  // Typisierte Parameter für Template-Beispiele
  interface TemplateParams {
    cfgValue: number;
    stepsValue: number;
    samplerValue: string;
  }

  const templateParams: TemplateParams = {
    cfgValue: 7.5,
    stepsValue: 30,
    samplerValue: "DPM++ 2M Karras"
  };
</script>

<svelte:head>
  <title>Stile verwalten | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Stile verwalten</h1>
    <p class="subtitle">Arbeite effizienter mit wiederverwendbaren Stil-Bibliotheken</p>
  </div>

  <div class="content-sections">
    <!-- Style Presets Abschnitt -->
    <section class="tutorial-section">
      <h2>„Style-Presets" anlegen</h2>
      
      <p>Style-Presets sind vordefinierte Prompt-Teile und Parameter, die du mit einem Klick in deine Generierung einfügen kannst. Sie sparen Zeit und sorgen für Konsistenz in deinen Projekten.</p>
      
      <div class="platforms-block">
        <div class="platform-card">
          <h3>A1111 Prompt-Schnipsel</h3>
          <div class="platform-image">
            <img src="/tutorials/a1111-styles.png" alt="A1111 Webui Styles Panel" />
          </div>
          <div class="steps-list">
            <h4>Wie du Stile anlegst:</h4>
            <ol>
              <li>Öffne das Styles-Menü im Prompt-Bereich</li>
              <li>Klicke auf "Create Style"</li>
              <li>Gib Namen, positiven und negativen Text ein</li>
              <li>Speichere deinen Stil</li>
            </ol>
          </div>
          <div class="code-example">
            <p class="example-title">Stil-Datei Beispiel <code>styles.csv</code>:</p>
            <div class="code-block">
              <code>name,prompt,negative<br>
              Fotorealismus,"photorealistic, detailed, 8k","cartoon, drawing"<br>
              Anime,"anime style, vibrant colors","photograph, realistic"</code>
            </div>
          </div>
        </div>
        
        <div class="platform-card">
          <h3>ComfyUI Nodes</h3>
          <div class="platform-image">
            <img src="/tutorials/comfyui-nodes.png" alt="ComfyUI Style Nodes" />
          </div>
          <div class="steps-list">
            <h4>Workflow mit Stil-Nodes:</h4>
            <ol>
              <li>Erstelle einen "Primitive" Node vom Typ "String"</li>
              <li>Füge deinen Stil-Prompt in den Inhalt ein</li>
              <li>Verbinde diesen Node mit dem positiven Prompt-Input</li>
              <li>Speichere den Workflow als Template</li>
            </ol>
          </div>
          <div class="code-example">
            <p class="example-title">ComfyUI Node JSON:</p>
            <div class="code-block">
              <code>{`{
  "Style_Preset": {
    "inputs": {},
    "class_type": "STRING",
    "value": "photorealistic, detailed, 8k"
  }
}`}</code>
            </div>
          </div>
        </div>
      </div>
      
      <div class="platform-card standalone">
        <h3>Textdateien & Clipboard</h3>
        <p>Die einfachste Methode: Speichere verschiedene Stile in einer Textdatei und kopiere sie bei Bedarf in deine Prompts.</p>
        <div class="file-template">
          <h4>Beispiel-Struktur:</h4>
          <div class="file-content">
            <code>## Fotorealistisch ##<br>
            positiv: photorealistic, detailed, 8k, high quality photography<br>
            negativ: cartoon, painting, drawing, illustration<br>
            cfg: 7.5 | steps: 30 | sampler: DPM++ 2M Karras<br>
            <br>
            ## Anime ##<br>
            positiv: anime style, vibrant colors, high quality<br>
            negativ: realistic, photograph, 3d render<br>
            cfg: 9 | steps: 25 | sampler: Euler a</code>
          </div>
        </div>
        <div class="tip-box">
          <h4>Tipp:</h4>
          <p>Erstelle einen Ordner für deine Stil-Bibliotheken und organisiere sie nach Kategorien (z.B. Kunststile, Epochen, Materialien).</p>
        </div>
      </div>
    </section>

    <!-- Button-Makros & Parameter-Sets -->
    <section class="tutorial-section">
      <h2>Button-Makros & Parameter-Sets</h2>
      
      <div class="content-block">
        <div class="text-content">
          <p>Mit Makro-Buttons kannst du häufig verwendete Stile und Parameter mit einem Klick anwenden. In vielen Oberflächen kannst du Parameter-Presets zusammen mit deinen Stilen speichern.</p>
          
          <div class="benefits-list">
            <h3>Vorteile von Parameter-Sets:</h3>
            <ul>
              <li>Zeitersparnis beim Wechseln zwischen verschiedenen Stilen</li>
              <li>Konsistente Ergebnisse durch getestete Parametereinstellungen</li>
              <li>Einfaches Experimentieren durch schnelles Umschalten</li>
              <li>Bessere Organisation deiner Workflows</li>
            </ul>
          </div>
        </div>
        
        <div class="example-container">
          <h3>Stil-Button Beispiele</h3>
          <div class="style-buttons-example">
            <button class="style-button photo">Fotorealistisch</button>
            <button class="style-button anime">Anime</button>
            <button class="style-button oil">Ölgemälde</button>
            <button class="style-button pixel">Pixel Art</button>
            <button class="style-button vintage">Vintage Film</button>
            <button class="style-button add">+ Neuer Stil</button>
          </div>
          
          <div class="style-detail">
            <h4>Fotorealistisch</h4>
            <div class="style-params">
              <div class="param-badge">CFG: 7.5</div>
              <div class="param-badge">Steps: 30</div>
              <div class="param-badge">DPM++ 2M Karras</div>
            </div>
            <div class="prompt-preview">
              <div class="preview-section">
                <span class="section-label">Positiv:</span>
                <p>photorealistic, detailed, 8k, high quality, sharp focus</p>
              </div>
              <div class="preview-section negative">
                <span class="section-label">Negativ:</span>
                <p>cartoon, painting, illustration, drawing, anime, blur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="code-example wide">
        <p class="example-title">Parameter-Set JSON Beispiel:</p>
        <div class="code-block">
          <code>{formatJsonExample({
  "fotorealistisch": {
    "prompt_prefix": "photorealistic, detailed, 8k",
    "negative_prefix": "cartoon, painting, drawing",
    "parameters": {
      "cfg_scale": 7.5,
      "steps": 30,
      "sampler_name": "DPM++ 2M Karras",
      "width": 1024,
      "height": 1024
    }
  }
})}</code>
        </div>
      </div>
    </section>

    <!-- Positiv-/Negativ-Sammlungen -->
    <section class="tutorial-section">
      <h2>Positiv-/Negativ-Sammlungen</h2>
      
      <p>Neben vollständigen Stilen ist es hilfreich, separate Sammlungen für positive und negative Prompt-Elemente anzulegen.</p>
      
      <div class="collections-grid">
        <div class="collection-card">
          <h3>Positive Sammlungen</h3>
          <div class="collection-examples">
            <div class="collection-type">
              <h4>Qualitäts-Booster</h4>
              <div class="tag-cloud">
                <span class="tag">highly detailed</span>
                <span class="tag">8k</span>
                <span class="tag">professional</span>
                <span class="tag">masterpiece</span>
                <span class="tag">sharp focus</span>
              </div>
            </div>
            <div class="collection-type">
              <h4>Beleuchtung</h4>
              <div class="tag-cloud">
                <span class="tag">golden hour</span>
                <span class="tag">cinematic lighting</span>
                <span class="tag">rim light</span>
                <span class="tag">dramatic shadows</span>
              </div>
            </div>
            <div class="collection-type">
              <h4>Kamera-Einstellungen</h4>
              <div class="tag-cloud">
                <span class="tag">85mm lens</span>
                <span class="tag">bokeh</span>
                <span class="tag">shallow depth of field</span>
                <span class="tag">f/2.8</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="collection-card">
          <h3>Negative Sammlungen</h3>
          <div class="collection-examples">
            <div class="collection-type">
              <h4>Qualitäts-Probleme</h4>
              <div class="tag-cloud">
                <span class="tag">blurry</span>
                <span class="tag">low quality</span>
                <span class="tag">pixelated</span>
                <span class="tag">jpeg artifacts</span>
                <span class="tag">noise</span>
              </div>
            </div>
            <div class="collection-type">
              <h4>Anatomie-Fehler</h4>
              <div class="tag-cloud">
                <span class="tag">bad anatomy</span>
                <span class="tag">deformed</span>
                <span class="tag">extra limbs</span>
                <span class="tag">distorted</span>
              </div>
            </div>
            <div class="collection-type">
              <h4>Unerwünschtes</h4>
              <div class="tag-cloud">
                <span class="tag">text</span>
                <span class="tag">watermark</span>
                <span class="tag">signature</span>
                <span class="tag">out of frame</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Organisation deiner Sammlungen:</h4>
        <ul>
          <li><strong>Thematisch gruppieren:</strong> Beleuchtung, Kamera, Stile, etc.</li>
          <li><strong>Kombinierbar gestalten:</strong> Einzelne Elemente sollten sich gut mischen lassen</li>
          <li><strong>Testen und dokumentieren:</strong> Notiere, welche Kombinationen besonders gut funktionieren</li>
          <li><strong>Regelmäßig aktualisieren:</strong> Füge neue Erkenntnisse deiner Sammlung hinzu</li>
        </ul>
      </div>
    </section>

    <!-- Praktische Übung -->
    <section class="tutorial-section">
      <h2>Deine eigene Stil-Bibliothek</h2>
      
      <div class="exercise-box">
        <h3>Übung: Erstellen deiner ersten Stil-Bibliothek</h3>
        <ol>
          <li>Wähle einen Stil, den du häufig verwendest (z.B. Fotorealismus, Anime, etc.)</li>
          <li>Sammle positiv- und negativ-Prompt-Elemente, die diesen Stil definieren</li>
          <li>Notiere die Parameter, die am besten funktionieren (CFG, Steps, Sampler)</li>
          <li>Speichere alles in einer Textdatei oder deinem bevorzugten Tool</li>
          <li>Teste den Stil mit verschiedenen Subjekten und verfeinere ihn</li>
        </ol>
        
        <div class="template-box">
          <h4>Stil-Template zum Ausfüllen:</h4>
          <div class="template-form">
            <div class="form-group">
              <span class="form-label">Stil-Name:</span>
              <div class="template-input">Mein erster Stil</div>
            </div>
            <div class="form-group">
              <span class="form-label">Positiver Prompt:</span>
              <div class="template-input">[Stileigenschaften], [Qualitätsverbesserungen]</div>
            </div>
            <div class="form-group">
              <span class="form-label">Negativer Prompt:</span>
              <div class="template-input">[Unerwünschte Eigenschaften]</div>
            </div>
            <div class="form-group params">
              <div class="param-group">
                <span class="form-label">CFG:</span>
                <div class="template-input small">{templateParams.cfgValue}</div>
              </div>
              <div class="param-group">
                <span class="form-label">Steps:</span>
                <div class="template-input small">{templateParams.stepsValue}</div>
              </div>
              <div class="param-group">
                <span class="form-label">Sampler:</span>
                <div class="template-input">{templateParams.samplerValue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Lernziel erreicht:</h4>
        <p>Du weißt nun, wie du deine eigenen Stil-Bibliotheken anlegen, organisieren und effizient nutzen kannst. Dies beschleunigt deinen Workflow und sorgt für konsistentere Ergebnisse.</p>
      </div>
      
      <!-- Navigation buttons -->
      <TutorialNavigation 
        previousPath="/guided-tutorial/core-parameters"
        nextPath="/guided-tutorial/prompt-weighting"
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
  
  /* Platform Cards */
  .platforms-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .platforms-block {
      grid-template-columns: 1fr;
    }
  }
  
  .platform-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .platform-card.standalone {
    margin-top: 1.5rem;
  }
  
  .platform-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .platform-image {
    width: 100%;
    height: 180px;
    background-color: #1a1a1a;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    border: 1px solid #333;
  }
  
  .platform-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  
  .steps-list h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .steps-list ol {
    padding-left: 1.5rem;
    margin: 0 0 1.5rem;
  }
  
  .steps-list li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  /* Code Examples */
  .code-example {
    margin-top: 1.5rem;
  }
  
  .code-example.wide {
    margin: 2rem 0;
  }
  
  .example-title {
    font-size: 0.9rem;
    color: #a0a0a0;
    margin-bottom: 0.5rem;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .code-block {
    background-color: #1a1a1a;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
  }
  
  code {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    color: #e0e0e0;
    line-height: 1.5;
  }
  
  /* File Template */
  .file-template {
    background-color: #1a1a1a;
    border-radius: 6px;
    padding: 1.2rem;
    margin: 1.5rem 0;
  }
  
  .file-template h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
  }
  
  .file-content {
    background-color: #161616;
    padding: 1rem;
    border-radius: 4px;
    border-left: 3px solid #FCEA2B;
  }
  
  .tip-box {
    background-color: #1a1a1a;
    border-left: 4px solid #4CAF50;
    padding: 1rem;
    margin-top: 1.5rem;
    border-radius: 0 6px 6px 0;
  }
  
  .tip-box h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #e0e0e0;
  }
  
  .tip-box p {
    margin: 0;
    color: #a0a0a0;
  }
  
  /* Content Block */
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
  
  /* Benefits List */
  .benefits-list h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  .benefits-list ul {
    padding-left: 1.5rem;
    margin: 0;
  }
  
  .benefits-list li {
    margin-bottom: 0.8rem;
    color: #b0b0b0;
  }
  
  /* Style Buttons Example */
  .style-buttons-example {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    .style-buttons-example {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .style-button {
    padding: 0.8rem;
    border: none;
    border-radius: 6px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }
  
  .style-button.photo {
    background-color: #4da6ff;
    color: #000;
  }
  
  .style-button.anime {
    background-color: #FF6B9A;
    color: #000;
  }
  
  .style-button.oil {
    background-color: #d8a76b;
    color: #000;
  }
  
  .style-button.pixel {
    background-color: #7dcf85;
    color: #000;
  }
  
  .style-button.vintage {
    background-color: #b39ddb;
    color: #000;
  }
  
  .style-button.add {
    background-color: #333;
    color: #e0e0e0;
    border: 1px dashed #555;
  }
  
  .style-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  /* Style Detail */
  .style-detail {
    background-color: #1a1a1a;
    padding: 1.2rem;
    border-radius: 8px;
    border: 1px solid #4da6ff;
  }
  
  .style-detail h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .style-params {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .param-badge {
    background-color: #333;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-size: 0.85rem;
    color: #d0d0d0;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .prompt-preview {
    background-color: #161616;
    padding: 1rem;
    border-radius: 6px;
  }
  
  .preview-section {
    margin-bottom: 0.8rem;
  }
  
  .preview-section:last-child {
    margin-bottom: 0;
  }
  
  .section-label {
    font-size: 0.85rem;
    font-weight: bold;
    color: #888;
    display: block;
    margin-bottom: 0.3rem;
  }
  
  .preview-section p {
    margin: 0;
    color: #4da6ff;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
  }
  
  .preview-section.negative p {
    color: #F44336;
  }
  
  /* Collections Grid */
  .collections-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .collections-grid {
      grid-template-columns: 1fr;
    }
  }
  
  .collection-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .collection-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
    color: #e0e0e0;
  }
  
  .collection-examples {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
  
  .collection-type h4 {
    margin-top: 0;
    margin-bottom: 0.8rem;
    color: #d0d0d0;
    font-size: 1rem;
  }
  
  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tag {
    background-color: #333;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    color: #d0d0d0;
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
  
  /* Template Form */
  .template-box {
    background-color: #1a1a1a;
    border-radius: 6px;
    padding: 1.2rem;
    margin-top: 1.5rem;
  }
  
  .template-box h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .template-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-group.params {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }
  
  @media (max-width: 480px) {
    .form-group.params {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  .param-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-label {
    font-size: 0.9rem;
    color: #888;
    font-family: 'IBM Plex Mono', monospace;
  }
  
  .template-input {
    background-color: #161616;
    padding: 0.8rem;
    border-radius: 4px;
    border: 1px solid #333;
    color: #a0a0a0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  .template-input.small {
    padding: 0.5rem 0.8rem;
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
  
  .info-box ul {
    margin: 0;
    padding-left: 1.2rem;
  }
  
  .info-box li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
  .info-box p {
    margin-bottom: 0;
  }
</style>
