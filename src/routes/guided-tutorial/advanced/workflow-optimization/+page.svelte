<script>
  // Sampler-Vergleichsdaten
  const samplerComparison = [
    { 
      name: "Euler a", 
      geschwindigkeit: "Schnell", 
      detailgrad: "Mittel", 
      eignung: ["Allgemeine Bilder", "Schnelle Tests", "Kreative Erkundungen"],
      steps: "20-25",
      kommentar: "Guter Allrounder, oft Standard"
    },
    { 
      name: "DPM++ 2M Karras", 
      geschwindigkeit: "Mittel", 
      detailgrad: "Hoch", 
      eignung: ["Photorealismus", "Porträts", "Detailreiche Szenen"],
      steps: "25-30",
      kommentar: "Exzellente Balance aus Qualität und Geschwindigkeit"
    },
    { 
      name: "DDIM", 
      geschwindigkeit: "Schnell", 
      detailgrad: "Mittel", 
      eignung: ["Inpainting", "Img2Img", "Konsistente Ergebnisse"],
      steps: "30-50",
      kommentar: "Stabil, gut für Iteration auf bestehenden Bildern"
    },
    { 
      name: "LMS", 
      geschwindigkeit: "Mittel", 
      detailgrad: "Mittel-Hoch", 
      eignung: ["Abstrakte Kunst", "Stilisierte Bilder"],
      steps: "30-40",
      kommentar: "Interessante kreative Ergebnisse" 
    }
  ];

  // Stil-Keywords nach Kategorien
  const styleKeywords = [
    {
      category: "Fotografischer Realismus",
      keywords: [
        { word: "photorealistic", description: "Fotorealistische Darstellung" },
        { word: "hyperrealistic", description: "Übersteigerte, aber realistisch wirkende Details" },
        { word: "8k", description: "Hochauflösende Bildqualität" },
        { word: "cinematic", description: "Filmartige Belichtung und Komposition" },
        { word: "professional photography", description: "Professionelle Fotoqualität" }
      ]
    },
    {
      category: "Künstlerische Stile",
      keywords: [
        { word: "oil painting", description: "Ölgemälde-Textur und -Farben" },
        { word: "watercolor", description: "Leichte, transparente Aquarell-Optik" },
        { word: "digital art", description: "Zeitgenössischer digitaler Kunststil" },
        { word: "concept art", description: "Professionelle, detailreiche Konzeptkunst" },
        { word: "anime style", description: "Japanischer Anime-Stil" }
      ]
    },
    {
      category: "Beleuchtung",
      keywords: [
        { word: "golden hour", description: "Warmes, goldenes Licht wie bei Sonnenauf-/untergang" },
        { word: "volumetric lighting", description: "Sichtbare Lichtstrahlen und atmosphärische Beleuchtung" },
        { word: "studio lighting", description: "Professionelle, saubere Studiobeleuchtung" },
        { word: "dramatic lighting", description: "Starke Kontraste zwischen hell und dunkel" },
        { word: "rim light", description: "Kante/Umriss eines Objekts ist beleuchtet" }
      ]
    }
  ];

  // Community-Ressourcen
  const communityResources = [
    { name: "Civitai", url: "https://civitai.com", description: "Community-Hub für Models, LoRAs und Prompts" },
    { name: "Lexica", url: "https://lexica.art", description: "Suchmaschine für AI-generierte Bilder mit Prompts" },
    { name: "PromptHero", url: "https://prompthero.com", description: "Kuratierte Prompts und Tutorials" },
    { name: "r/StableDiffusion", url: "https://reddit.com/r/StableDiffusion", description: "Reddit-Community für Stable Diffusion" }
  ];

  // Technische Ressourcen
  const technicalResources = [
    { name: "Stable Diffusion Web UI Wiki", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki", description: "Offizielle Dokumentation für A1111 UI" },
    { name: "Hugging Face", url: "https://huggingface.co/models", description: "Offizielle Model-Repository" },
    { name: "Papers With Code", url: "https://paperswithcode.com/task/text-to-image-generation", description: "Wissenschaftliche Paper zu Text-to-Image" },
    { name: "ComfyUI Documentation", url: "https://github.com/comfyanonymous/ComfyUI", description: "Node-basierte UI für Stable Diffusion" }
  ];
</script>

<svelte:head>
  <title>Ressourcen & Deep-Dive | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Ressourcen & Deep-Dive</h1>
    <p class="subtitle">Weiterführende Materialien, Vergleichstabellen und Community-Links</p>
  </div>

  <div class="content-sections">
    <!-- Sampler-Vergleichstabelle -->
    <section class="tutorial-section">
      <h2>Empfohlene Sampler im Vergleich</h2>
      
      <p>Die Wahl des Samplers hat großen Einfluss auf die Bildqualität, Geschwindigkeit und den Stil. Hier findest du eine vergleichende Übersicht der wichtigsten Sampler.</p>
      
      <div class="table-container">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Sampler</th>
              <th>Geschwindigkeit</th>
              <th>Detailgrad</th>
              <th>Optimale Steps</th>
              <th>Empfohlen für</th>
              <th>Hinweise</th>
            </tr>
          </thead>
          <tbody>
            {#each samplerComparison as sampler}
              <tr>
                <td class="sampler-name">{sampler.name}</td>
                <td class="sampler-speed">{sampler.geschwindigkeit}</td>
                <td>{sampler.detailgrad}</td>
                <td class="sampler-steps">{sampler.steps}</td>
                <td>
                  <ul class="compact-list">
                    {#each sampler.eignung as use}
                      <li>{use}</li>
                    {/each}
                  </ul>
                </td>
                <td class="sampler-comment">{sampler.kommentar}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
      <div class="info-box">
        <h4>Tipp zur Sampler-Wahl:</h4>
        <p>Beginne deine Experimente mit <strong>Euler a</strong> für schnelle Tests und wechsle zu <strong>DPM++ 2M Karras</strong> für die finale Bildgenerierung. Passe die Steps entsprechend an: mehr Steps für komplexere Bilder, weniger für einfachere Motive.</p>
      </div>
    </section>

    <!-- Cheatsheets für Keywords und Gewichte -->
    <section class="tutorial-section">
      <h2>Cheatsheets: Stil-Keywords und Gewichtungen</h2>
      
      <p>Diese Sammlungen von häufig verwendeten Keywords helfen dir, schnell passende Stilbegriffe für deine Prompts zu finden.</p>
      
      <!-- Stil-Keywords Cheatsheet -->
      <div class="keyword-section">
        <h3>Stil-Keywords nach Kategorien</h3>
        
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
                      <th>Effekt/Beschreibung</th>
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
      
      <!-- Gewichtungs-Cheatsheet -->
      <div class="weight-section">
        <h3>Gewichtungs-Cheatsheet</h3>
        
        <div class="weight-grid">
          <div class="weight-card">
            <h4>Für Hauptmotive</h4>
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
            <h4>Für Hintergründe</h4>
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
            <h4>Für Stile</h4>
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
          <h4>Gewichts-Formel:</h4>
          <ul>
            <li>Klammern erhöhen den Einfluss: <code>(wort)</code> = 1.1×, <code>((wort))</code> = 1.21×</li>
            <li>Eckige Klammern verringern: <code>[wort]</code> = 0.9×, <code>[[wort]]</code> = 0.81×</li>
            <li>Genaue Werte mit Doppelpunkt: <code>wort:1.2</code> = 1.2×</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Links zu Community-Ressourcen -->
    <section class="tutorial-section">
      <h2>Community & Weiterführende Ressourcen</h2>
      
      <p>Die KI-Bildgenerierungs-Community ist sehr aktiv und teilt ständig neue Erkenntnisse, Modelle und Prompts. Hier findest du wichtige Anlaufstellen für deine weitere Reise.</p>
      
      <!-- Community-Links -->
      <div class="resources-container">
        <div class="resource-category">
          <h3>Community & Prompt-Inspiration</h3>
          <div class="resources-grid">
            {#each communityResources as resource}
              <div class="resource-card">
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" class="resource-link">Besuchen ↗</a>
              </div>
            {/each}
          </div>
        </div>
        
        <!-- Technische Ressourcen -->
        <div class="resource-category">
          <h3>Technische Dokumentation & Papers</h3>
          <div class="resources-grid">
            {#each technicalResources as resource}
              <div class="resource-card">
                <h4>{resource.name}</h4>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" class="resource-link">Besuchen ↗</a>
              </div>
            {/each}
          </div>
        </div>
      </div>
      
      <div class="downloadable-resources">
        <h3>Downloadbare Ressourcen</h3>
        <div class="downloads-list">
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Vollständige Sampler-Vergleichstabelle</h4>
              <p>PDF mit detaillierten Vergleichsdaten zu allen verfügbaren Samplern</p>
            </div>
          </a>
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Stil-Keywords Cheatsheet</h4>
              <p>Über 200 kategorisierte Stil-Keywords für verschiedene Anwendungsfälle</p>
            </div>
          </a>
          <a href="#" class="download-item">
            <span class="download-icon">📄</span>
            <div class="download-info">
              <h4>Prompt-Engineering Handbuch</h4>
              <p>Umfassendes Handbuch für fortgeschrittenes Prompt-Engineering</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Lesezeichen und Terminologie -->
    <section class="tutorial-section">
      <h2>Lesezeichen & Terminologie</h2>
      
      <div class="bookmarks-section">
        <h3>Empfohlene Lesezeichen für den Einstieg</h3>
        <ul class="bookmark-list">
          <li>
            <h4>"LoRA Training Simplified" von Aitrepreneur</h4>
            <p>Ein ausführlicher Leitfaden zum Training eigener LoRAs, verständlich erklärt.</p>
            <a href="#" class="bookmark-link">YouTube ↗</a>
          </li>
          <li>
            <h4>"The Stable Diffusion Parameters Guide" von HuggingFace</h4>
            <p>Detaillierte Erläuterung aller SD-Parameter und ihrer Auswirkungen.</p>
            <a href="#" class="bookmark-link">HuggingFace Blog ↗</a>
          </li>
          <li>
            <h4>"Prompt Engineering Guide" von Learn Prompting</h4>
            <p>Systematischer Guide zum Erstellen effektiver Prompts für Text-to-Image Modelle.</p>
            <a href="#" class="bookmark-link">Website ↗</a>
          </li>
        </ul>
      </div>
      
      <div class="terminology-section">
        <h3>Wichtige Begriffe und Terminologie</h3>
        <div class="terminology-grid">
          <div class="term-card">
            <h4>VAE</h4>
            <p>Variational Autoencoder - Teil des Modells, der die endgültige Bildqualität und Farbwiedergabe beeinflusst.</p>
          </div>
          <div class="term-card">
            <h4>Embedding</h4>
            <p>Trainierte Text-Konzepte, die komplexe Ideen oder Stile in einen Begriff packen.</p>
          </div>
          <div class="term-card">
            <h4>Inpainting</h4>
            <p>Technik zum gezielten Ersetzen/Verändern von Teilbereichen eines bereits generierten Bildes.</p>
          </div>
          <div class="term-card">
            <h4>CLIP</h4>
            <p>Contrastive Language-Image Pre-Training - Verbindungsschicht zwischen Text und Bild in SD.</p>
          </div>
        </div>
      </div>
      
      <div class="info-box success">
        <h4>Herzlichen Glückwunsch!</h4>
        <p>Du hast alle Zusatzbereiche des Tutorials absolviert und verfügst nun über umfassende Ressourcen für dein fortgeschrittenes Lernen im Bereich der KI-Bildgenerierung.</p>
      </div>
      
      <!-- Navigation buttons -->
      <TutorialNavigation 
        previousPath="/guided-tutorial/advanced/ai-models"
        nextPath="/guided-tutorial"
        nextLabel="Zurück zur Tutorial-Übersicht"
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
