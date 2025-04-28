<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  import { onMount, onDestroy } from "svelte";
  
  // Parameter für die API
  let prompt = "cat with dog";
  let negativePrompt = "";
  let cfg = 2;
  let steps = 6;
  let seed = 0;
  let uid = "default";
  
  // Zustand für Tooltips
  let activeTooltip = null;
  
  // Tooltip-Texte
  const tooltips = {
    prompt: "Beschreibe detailliert, was im Bild erscheinen soll. Je mehr Details (Stil, Umgebung, Farben, etc.), desto besser das Ergebnis.",
    negativePrompt: "Ein negativer Prompt beschreibt, was im Bild nicht erscheinen soll. Dies hilft, unerwünschte Elemente zu vermeiden.",
    steps: "Mehr Steps bedeuten eine längere Renderzeit, aber oft ein detaillierteres Bild. Übliche Werte liegen zwischen 5 und 50.",
    cfg: "Steuert, wie stark sich das Modell an den Prompt halten soll. Höhere Werte bedeuten mehr Prompt-Treue, aber manchmal weniger Kreativität.",
    seed: "Ein bestimmter Seed erzeugt immer das gleiche Bild bei identischen anderen Parametern. Nützlich, um Ergebnisse zu reproduzieren oder leichte Variationen zu erzeugen.",
    uid: "Identifiziert den Benutzer für die API. Kann für Tracking und Limitierungen verwendet werden."
  };
  
  // Zustand der Anwendung
  let loading = false;
  let imageUrl = null;
  let error = null;
  
  // API URL Basis
  const apiBaseUrl = "https://aid-playground.hfg-gmuend.de/api/txt2img";
  
  // Funktion zum Generieren des Bildes
  async function generateImage() {
    loading = true;
    error = null;
    
    // Alte Bild-URL bereinigen, falls vorhanden
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
      imageUrl = null;
    }
    
    try {
      // URL mit Parametern erstellen
      const url = new URL(apiBaseUrl);
      url.searchParams.append("prompt", prompt);
      if (negativePrompt) {
        url.searchParams.append("negative_prompt", negativePrompt);
      }
      url.searchParams.append("cfg", cfg);
      url.searchParams.append("steps", steps);
      url.searchParams.append("seed", seed);
      url.searchParams.append("uid", uid);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Fehler: ${response.status}`);
      }
      
      // Die Antwort als Blob behandeln (Binärdaten/Bild)
      const blob = await response.blob();
      
      // Objekt-URL für den Blob erstellen
      imageUrl = URL.createObjectURL(blob);
    } catch (e) {
      error = e.message;
      console.error("Fehler beim Generieren des Bildes:", e);
    } finally {
      loading = false;
    }
  }
  
  // Parameter aus URL auslesen, wenn die Seite geladen wird
  onMount(() => {
    const url = new URL(window.location.href);
    
    if (url.searchParams.has("prompt")) {
      prompt = url.searchParams.get("prompt");
    }
    
    if (url.searchParams.has("negative_prompt")) {
      negativePrompt = url.searchParams.get("negative_prompt");
    }
    
    if (url.searchParams.has("cfg")) {
      cfg = parseFloat(url.searchParams.get("cfg"));
    }
    
    if (url.searchParams.has("steps")) {
      steps = parseInt(url.searchParams.get("steps"));
    }
    
    if (url.searchParams.has("seed")) {
      seed = parseInt(url.searchParams.get("seed"));
    }
    
    if (url.searchParams.has("uid")) {
      uid = url.searchParams.get("uid");
    }
    
    // Automatisch Bild generieren, wenn Parameter in der URL vorhanden sind
    if (url.searchParams.has("prompt")) {
      generateImage();
    }
  });
  
  // Aufräumen bei Komponenten-Zerstörung
  onDestroy(() => {
    // Objekt-URL freigeben, wenn vorhanden
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
    }
  });
</script>

<svelte:head>
  <title>Text To Image | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <div class="content-wrapper">
      <!-- Parameter Panel (links) -->
      <div class="parameters-panel">
        <h2>Parameter</h2>
        
        <!-- Negatives Prompt (volle Breite) -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label for="negative-prompt">Negativer Prompt</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'negativePrompt'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'negativePrompt'}
                <div class="tooltip">{tooltips.negativePrompt}</div>
              {/if}
            </div>
          </div>
          <textarea id="negative-prompt" bind:value={negativePrompt} rows="2"></textarea>
        </div>
        
        <!-- Zwei-Spalten-Layout für Parameter -->
        <div class="parameter-grid">
          <div class="parameter-grid-item">
            <div class="label-container">
              <label for="steps">Steps</label>
              <div class="info-icon" 
                  on:mouseenter={() => activeTooltip = 'steps'}
                  on:mouseleave={() => activeTooltip = null}>
                i
                {#if activeTooltip === 'steps'}
                  <div class="tooltip">{tooltips.steps}</div>
                {/if}
              </div>
            </div>
            <div class="input-with-icon">
              <input type="number" id="steps" min="1" max="50" step="1" bind:value={steps}>
              <div class="input-controls">
                <button class="control-button" on:click={() => steps = Math.max(1, steps - 1)}>-</button>
                <button class="control-button" on:click={() => steps = Math.min(50, steps + 1)}>+</button>
              </div>
            </div>
          </div>
          
          <div class="parameter-grid-item">
            <div class="label-container">
              <label for="cfg">CFG</label>
              <div class="info-icon" 
                  on:mouseenter={() => activeTooltip = 'cfg'}
                  on:mouseleave={() => activeTooltip = null}>
                i
                {#if activeTooltip === 'cfg'}
                  <div class="tooltip">{tooltips.cfg}</div>
                {/if}
              </div>
            </div>
            <div class="input-with-icon">
              <input type="number" id="cfg" min="1" max="20" step="0.1" bind:value={cfg}>
              <div class="input-controls">
                <button class="control-button" on:click={() => cfg = Math.max(1, parseFloat((cfg - 0.1).toFixed(1)))}>-</button>
                <button class="control-button" on:click={() => cfg = Math.min(20, parseFloat((cfg + 0.1).toFixed(1)))}>+</button>
              </div>
            </div>
          </div>
          
          <div class="parameter-grid-item">
            <div class="label-container">
              <label for="seed">Seed</label>
              <div class="info-icon" 
                  on:mouseenter={() => activeTooltip = 'seed'}
                  on:mouseleave={() => activeTooltip = null}>
                i
                {#if activeTooltip === 'seed'}
                  <div class="tooltip">{tooltips.seed}</div>
                {/if}
              </div>
            </div>
            <div class="input-with-buttons">
              <input type="number" id="seed" min="0" step="1" bind:value={seed}>
              <button class="seed-button" on:click={() => seed = Math.floor(Math.random() * 1000000)}>
                <span class="button-icon">🎲</span>
              </button>
            </div>
          </div>
          
          <div class="parameter-grid-item">
            <div class="label-container">
              <label for="uid">User ID</label>
              <div class="info-icon" 
                  on:mouseenter={() => activeTooltip = 'uid'}
                  on:mouseleave={() => activeTooltip = null}>
                i
                {#if activeTooltip === 'uid'}
                  <div class="tooltip">{tooltips.uid}</div>
                {/if}
              </div>
            </div>
            <input type="text" id="uid" bind:value={uid}>
          </div>
        </div>
        
        <div class="api-url-display">
          <h3>API Anfrage</h3>
          <div class="url-box">
            <span class="method">GET</span> 
            {`${apiBaseUrl}?prompt=${encodeURIComponent(prompt)}${negativePrompt ? `&negative_prompt=${encodeURIComponent(negativePrompt)}` : ''}&cfg=${cfg}&steps=${steps}&seed=${seed}&uid=${uid}`}
          </div>
        </div>
      </div>
      
      <!-- Ausgabebereich (mitte) -->
      <div class="output-area">
        <h1>Text To Image</h1>
        
        {#if loading}
          <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Generiere Bild...</p>
          </div>
        {:else if error}
          <div class="error-message">
            <p>Fehler: {error}</p>
          </div>
        {:else if imageUrl}
          <div class="image-result">
            <img src={imageUrl} alt="Generiertes Bild" />
          </div>
        {:else}
          <div class="empty-state">
            <p>Gib einen Prompt ein und klicke auf "Generieren", um ein Bild zu erzeugen.</p>
          </div>
        {/if}
      </div>
      
      <!-- Prompt-Panel (unten rechts) -->
      <div class="prompt-panel">
        <div class="label-container">
          <label for="main-prompt">Prompt</label>
          <div class="info-icon" 
              on:mouseenter={() => activeTooltip = 'prompt'}
              on:mouseleave={() => activeTooltip = null}>
            i
            {#if activeTooltip === 'prompt'}
              <div class="tooltip tooltip-bottom">{tooltips.prompt}</div>
            {/if}
          </div>
        </div>
        <textarea id="main-prompt" bind:value={prompt}></textarea>
        <button on:click={generateImage} disabled={loading}>
          {loading ? 'Generiere...' : 'Generieren'}
        </button>
      </div>
    </div>
  </main>
</div>

<style>
  .app-container {
    display: flex;
    min-height: 100vh;
    background-color: #121212;
    color: #e0e0e0;
  }
  
  main {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  h1, h2, h3 {
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
  }
  
  p {
    font-family: 'Inter', sans-serif;
    color: #b0b0b0;
  }
  
  .content-wrapper {
    display: grid;
    grid-template-columns: 300px 1fr;
    grid-template-rows: 1fr auto;
    gap: 1rem;
    height: calc(100vh - 2rem);
  }
  
  /* Parameter Panel - modernisiertes Design */
  .parameters-panel {
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 1.5rem;
    overflow-y: auto;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
  }
  
  .parameters-panel h2 {
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #333;
    font-size: 1.4rem;
  }
  
  .parameter-group {
    margin-bottom: 1.8rem;
  }
  
  .full-width {
    grid-column: 1 / span 2;
  }
  
  /* Neues Zwei-Spalten-Grid für Parameter */
  .parameter-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .parameter-grid-item {
    display: flex;
    flex-direction: column;
  }
  
  /* Label Container für Info-Icon */
  .label-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  /* Labels und Input-Styles */
  label {
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
  }
  
  /* Überarbeitetes Info-Icon ohne Kreis und ohne kursiven Stil */
  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-weight: 500;
    font-style: normal; /* Normaler Stil statt kursiv */
    cursor: help;
    position: relative;
    transition: color 0.2s;
    margin-left: 4px;
  }
  
  .info-icon:hover {
    color: #ffffff; /* Hellere Farbe beim Hover */
  }
  
  .tooltip {
    position: fixed; /* Ändert zu fixed, um Overflow zu ermöglichen */
    width: 250px;
    background-color: rgba(30, 30, 30, 0.85); /* Dunkler, transparenter Hintergrund */
    backdrop-filter: blur(10px); /* Glaseffekt */
    -webkit-backdrop-filter: blur(10px); /* Für Safari */
    color: #ffffff;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: normal;
    font-family: 'Inter', sans-serif;
    z-index: 1000; /* Höherer z-index für Overlay über alles */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 
                0 0 0 1px rgba(255, 255, 255, 0.1); /* Glasartiger Rand */
    pointer-events: none;
    line-height: 1.5;
    letter-spacing: 0.01em;
    max-width: calc(100vw - 40px); /* Verhindert Überlauf aus dem Viewport */
  }
  
  /* Entfernung der Parameter-Beschreibungstexte */
  .parameter-description {
    display: none;
  }
  
  /* Platzierung der Tooltips nahe am Info-Icon aber nicht zu weit weg */
  [class*="info-icon"]:hover + .tooltip {
    display: block;
  }
  
  /* Größerer Abstand zwischen den Parameter-Gruppen wegen entfernter Beschreibungstexte */
  .parameter-grid-item {
    margin-bottom: 1rem;
  }
  
  /* Eingabefelder */
  input[type="text"], 
  input[type="number"], 
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #444444;
    border-radius: 6px;
    font-family: 'Inter', sans-serif;
    background-color: #2a2a2a;
    color: #ffffff;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  input[type="text"]:focus, 
  input[type="number"]:focus, 
  textarea:focus {
    border-color: #FCEA2B;
    outline: none;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.3);
  }
  
  textarea {
    resize: vertical;
    min-height: 70px;
  }
  
  /* Inputs mit Icons/Buttons */
  .input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .input-with-icon input {
    padding-right: 70px;
  }
  
  .input-controls {
    position: absolute;
    right: 5px;
    display: flex;
    gap: 2px;
  }
  
  .control-button {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .control-button:hover {
    background-color: #444;
  }
  
  .input-with-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .seed-button {
    background-color: #FCEA2B;
    color: #121212;
    border: none;
    border-radius: 6px;
    padding: 0 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .seed-button:hover {
    background-color: #ffe566;
  }
  
  .button-icon {
    font-size: 1.2rem;
  }
  
  /* API URL Box */
  .api-url-display {
    margin-top: 2rem;
    padding: 1.2rem;
    background-color: #262626;
    border-radius: 8px;
  }
  
  .api-url-display h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    font-size: 1rem;
  }
  
  .url-box {
    padding: 0.75rem;
    background-color: #1a1a1a;
    border-radius: 6px;
    font-family: monospace;
    font-size: 0.85rem;
    overflow-wrap: break-word;
    word-break: break-all;
    color: #aaaaaa;
    border-left: 3px solid #FCEA2B;
  }
  
  .method {
    background-color: #FCEA2B;
    color: #121212;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    margin-right: 6px;
  }
  
  /* Prompt Panel */
  .prompt-panel {
    grid-column: 2;
    grid-row: 2;
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
  }
  
  .prompt-panel textarea {
    width: 100%;
    height: 100px;
    padding: 0.75rem;
    border: 1px solid #444444;
    border-radius: 6px;
    resize: none;
    font-family: 'Inter', sans-serif;
    margin-bottom: 1rem;
    background-color: #2a2a2a;
    color: #ffffff;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .prompt-panel button {
    padding: 0.75rem 1.5rem;
    background-color: #FCEA2B;
    color: #121212;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: background-color 0.2s;
    align-self: flex-end;
  }
  
  .prompt-panel button:hover {
    background-color: #ffe566;
  }
  
  .prompt-panel button:disabled {
    background-color: #4a4a4a;
    cursor: not-allowed;
    color: #888888;
  }
  
  /* Ausgabebereich */
  .output-area {
    grid-column: 2;
    grid-row: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #181818;
    border-radius: 8px;
  }
  
  .output-area h1 {
    align-self: flex-start;
    margin-bottom: 1.5rem;
  }
  
  .image-result {
    width: 100%;
    max-width: 768px;
    display: flex;
    justify-content: center;
  }
  
  .image-result img {
    max-width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }
  
  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333333;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-message {
    padding: 1rem;
    background-color: #3d1c1e;
    color: #ff8a8a;
    border-radius: 4px;
    width: 100%;
    max-width: 500px;
    margin: 2rem auto;
  }
  
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    color: #888888;
  }
</style>
