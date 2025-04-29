<script>
  import TutorialPanel from "$lib/components/TutorialPanel.svelte";
  import TutorialNavigation from "$lib/components/TutorialNavigation.svelte";
</script>

<svelte:head>
  <title>Was ist Stable Diffusion? | Guided Tutorial | HfG Ai-Hub</title>
</svelte:head>

<div class="tutorial-container">
  <div class="tutorial-header">
    <h1>Was ist Stable Diffusion?</h1>
    <p class="subtitle">Einführung in die KI-Bildgenerierung</p>
  </div>

  <div class="content-sections">
    <!-- Einführungsabschnitt -->
    <section class="tutorial-section">
      <h2>Kurze Modellübersicht</h2>
      <div class="content-block">
        <div class="text-content">
          <p>Stable Diffusion ist ein KI-Modell zur Bildgenerierung, das von Stability AI entwickelt wurde. Es gehört zur Familie der <strong>Diffusionsmodelle</strong>, die auf einer schrittweisen Entfernung von Rauschen basieren.</p>
          
          <p>Die Kernfunktionen von Stable Diffusion sind:</p>
          <ul>
            <li>Text-zu-Bild-Generierung (Text-to-Image)</li>
            <li>Bild-zu-Bild-Transformation (Image-to-Image)</li>
            <li>Inpainting und Outpainting (Ergänzung bestehender Bilder)</li>
            <li>Kontrollierte Bildgenerierung (ControlNet)</li>
          </ul>
        </div>
        <div class="image-block">
          <img src="/tutorials/stable-diffusion-illustration.png" alt="Stable Diffusion Prozess" class="tutorial-image" />
          <p class="image-caption">Der Diffusionsprozess: Von Rauschen zum Bild</p>
        </div>
      </div>
    </section>

    <!-- Zweiter Abschnitt: Online vs. Lokaler Betrieb -->
    <section class="tutorial-section">
      <h2>Online versus lokaler Betrieb</h2>
      <div class="compare-table">
        <div class="compare-column">
          <h3>Online-Dienste</h3>
          <ul class="feature-list">
            <li><span class="icon check">✓</span> Keine Installation erforderlich</li>
            <li><span class="icon check">✓</span> Sofort einsetzbar</li>
            <li><span class="icon check">✓</span> Keine leistungsstarke Hardware nötig</li>
            <li><span class="icon x">×</span> Meist kostenpflichtig oder limitiert</li>
            <li><span class="icon x">×</span> Eingeschränkte Anpassungsmöglichkeiten</li>
            <li><span class="icon x">×</span> Potenziell weniger Privatsphäre</li>
          </ul>
          <p class="examples">Beispiele: Midjourney, DALL-E, Leonardo.AI</p>
        </div>
        
        <div class="compare-column">
          <h3>Lokale Installation</h3>
          <ul class="feature-list">
            <li><span class="icon check">✓</span> Vollständige Kontrolle</li>
            <li><span class="icon check">✓</span> Keine laufenden Kosten</li>
            <li><span class="icon check">✓</span> Benutzerdefinierte Modelle & Extensions</li>
            <li><span class="icon x">×</span> Benötigt leistungsstarke GPU</li>
            <li><span class="icon x">×</span> Technisches Know-how erforderlich</li>
            <li><span class="icon x">×</span> Aufwändigeres Setup</li>
          </ul>
          <p class="examples">Oberflächen: A1111 Webui, ComfyUI, InvokeAI</p>
        </div>
      </div>
      
      <div class="info-box">
        <h4>Wusstest Du?</h4>
        <p>Der HfG Ai-Hub verwendet Stable Diffusion im Backend und bietet dir damit die Vorteile von lokalem Betrieb ohne den Installationsaufwand!</p>
      </div>
    </section>

    <!-- Dritter Abschnitt: Prompts & Parameter -->
    <section class="tutorial-section">
      <h2>Positiver ↔ negativer Prompt & Parameter</h2>
      
      <div class="content-block">
        <div class="text-content">
          <h3>Positiver Prompt</h3>
          <p>Der positive Prompt beschreibt, was im Bild erscheinen soll. Je detaillierter und präziser du formulierst, desto gezielter kann das Modell generieren.</p>
          
          <div class="prompt-example">
            <p class="prompt-text">A majestic castle on a mountain, sunset, dramatic lighting, detailed architecture, 8k, cinematic, fog, mystical atmosphere</p>
          </div>
          
          <h3>Negativer Prompt</h3>
          <p>Der negative Prompt gibt an, was im Bild vermieden werden soll. Dies hilft, unerwünschte Elemente oder Qualitätsprobleme zu reduzieren.</p>
          
          <div class="prompt-example negative">
            <p class="prompt-text">blurry, bad anatomy, distorted, deformed, disfigured, poor quality, low resolution, text, watermark</p>
          </div>
        </div>
        
        <div class="parameter-sidebar">
          <h3>Parameter-Steuerung</h3>
          <div class="parameter-item">
            <div class="param-header">
              <span class="param-name">CFG Scale</span>
              <span class="param-value">7.5</span>
            </div>
            <p class="param-desc">Steuert, wie stark der Prompt befolgt wird. Höhere Werte = mehr Prompttreue.</p>
          </div>
          
          <div class="parameter-item">
            <div class="param-header">
              <span class="param-name">Steps</span>
              <span class="param-value">30</span>
            </div>
            <p class="param-desc">Anzahl der Diffusionsschritte. Mehr Steps = mehr Details, aber längere Generierung.</p>
          </div>
          
          <div class="parameter-item">
            <div class="param-header">
              <span class="param-name">Seed</span>
              <span class="param-value">1234567890</span>
            </div>
            <p class="param-desc">Startpunkt für den Zufallsgenerator. Gleicher Seed = reproduzierbare Bilder.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Übungsbereich -->
    <section class="tutorial-section">
      <h2>Lernziel-Check</h2>
      <div class="info-box success">
        <h4>Du solltest jetzt verstehen:</h4>
        <ul>
          <li>Was Stable Diffusion ist und wie es grundlegend funktioniert</li>
          <li>Unterschiede zwischen Online-Diensten und lokaler Installation</li>
          <li>Die Rolle von positiven und negativen Prompts</li>
          <li>Warum Parameter wichtig sind und wie sie das Ergebnis beeinflussen</li>
        </ul>
      </div>
      
      <!-- Navigation buttons -->
      <TutorialNavigation 
        nextPath="/guided-tutorial/prompt-basics"
        nextLabel="Weiter zum nächsten Thema"
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
  
  ul {
    margin: 0 0 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
  }
  
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
  
  .image-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .tutorial-image {
    width: 100%;
    max-width: 400px;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .image-caption {
    font-size: 0.9rem;
    color: #888;
    text-align: center;
    margin-top: 0.7rem;
  }
  
  .compare-table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 1.5rem 0;
  }
  
  @media (max-width: 768px) {
    .compare-table {
      grid-template-columns: 1fr;
    }
  }
  
  .compare-column {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
  }
  
  .icon {
    display: inline-block;
    width: 20px;
    margin-right: 10px;
    text-align: center;
  }
  
  .check {
    color: #4CAF50;
  }
  
  .x {
    color: #F44336;
  }
  
  .examples {
    margin-top: 1rem;
    font-style: italic;
    font-size: 0.9rem;
    color: #777;
  }
  
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
  
  .info-box p, .info-box ul {
    margin-bottom: 0;
  }
  
  .prompt-example {
    background-color: #222;
    border-radius: 6px;
    padding: 1rem;
    margin: 1rem 0;
    border-left: 3px solid #4da6ff;
  }
  
  .prompt-example.negative {
    border-left-color: #F44336;
  }
  
  .prompt-text {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #e0e0e0;
    margin: 0;
  }
  
  .parameter-sidebar {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .parameter-item {
    margin-bottom: 1.2rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #333;
  }
  
  .parameter-item:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .param-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .param-name {
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    color: #e0e0e0;
  }
  
  .param-value {
    background-color: #FCEA2B;
    color: #000;
    padding: 2px 8px;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    font-size: 0.9rem;
  }
  
  .param-desc {
    font-size: 0.9rem;
    color: #a0a0a0;
    margin: 0;
  }
  
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
