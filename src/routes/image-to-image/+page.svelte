<script>
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import NavigationBar from "$lib/components/NavigationBar.svelte";
  import PromptResultCard from "$lib/components/PromptResultCard.svelte";
  import { onMount, onDestroy } from "svelte";
  import PromptPanel from '$lib/components/uicomponents/PromptPanel/PromptPanel.svelte';
  import StyleCopilot from "$lib/components/StyleCopilot.svelte"; 
  import { generatedImages } from "$lib/stores/generatedImages.js"; // Import des Stores
  import { assets } from '$app/paths';
  
  // Parameter für die API
  let prompt = "combine these images";
  let negativePrompt = "";
  let cfg = 1.3;
  let steps = 6;
  let seed = 0;
  
  // Zustand für Bilder
  let image1 = null;
  let image2 = null;
  let image1Preview = null;
  let image2Preview = null;
  
  // Tooltip und Operationen
  let activeTooltip = null;
  
  // Tooltip-Texte
  const tooltips = {
    prompt: "Beschreibe, wie die Bilder kombiniert werden sollen.",
    negativePrompt: "Ein negativer Prompt beschreibt, was im Bild nicht erscheinen soll. Dies hilft, unerwünschte Elemente zu vermeiden.",
    steps: "Mehr Steps bedeuten eine längere Renderzeit, aber oft ein detaillierteres Bild. Übliche Werte liegen zwischen 5 und 50.",
    cfg: "Steuert, wie stark sich das Modell an den Prompt halten soll. Höhere Werte bedeuten mehr Prompt-Treue, aber manchmal weniger Kreativität.",
    seed: "Ein bestimmter Seed erzeugt immer das gleiche Bild bei identischen anderen Parametern. Nützlich, um Ergebnisse zu reproduzieren.",
    image1: "Lade das erste Bild hoch, das kombiniert werden soll.",
    image2: "Lade das zweite Bild hoch, das kombiniert werden soll."
  };
  
  // Zustand der Anwendung
  let loading = false;
  let imageUrl = null;
  let error = null;
  
  // Historie der generierten Bilder
  let generatedResults = [];
  
  // Verbesserte Filterung mit Logging
  const unsubscribe = generatedImages.subscribe(history => {
    // Nur exakt vom Typ "image-to-image" anzeigen
    generatedResults = history.filter(entry => entry.type === "image-to-image");
    console.log("[ImageToImage] Filtered results:", generatedResults.length, 
                "von insgesamt", history.length);
  });
  
  // API URL Basis
  const apiBaseUrl = "https://aid-playground.hfg-gmuend.de/api/combine";
  
  // Funktionen zum Verarbeiten des Bild-Uploads
  function handleImage1Upload(event) {
    const file = event.target.files[0];
    if (file) {
      image1 = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        image1Preview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function handleImage2Upload(event) {
    const file = event.target.files[0];
    if (file) {
      image2 = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        image2Preview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function handleImageDrop(event, imageNumber) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (imageNumber === 1) {
        image1 = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          image1Preview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        image2 = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          image2Preview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  
  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Funktion zum Generieren des kombinierten Bildes
  async function combineImages() {
    if (!image1 || !image2) {
      error = "Bitte lade zwei Bilder hoch, um sie zu kombinieren.";
      return;
    }
    
    loading = true;
    error = null;
    
    // Alte Bild-URL bereinigen, falls vorhanden
    if (imageUrl && imageUrl.startsWith('blob:')) {
      URL.revokeObjectURL(imageUrl);
      imageUrl = null;
    }
    
    try {
      // FormData für den POST-Request erstellen
      const formData = new FormData();
      formData.append("image1", image1);
      formData.append("image2", image2);
      
      // URL mit Parametern erstellen
      const url = new URL(apiBaseUrl);
      url.searchParams.append("cfg", cfg.toString());
      url.searchParams.append("steps", steps.toString());
      url.searchParams.append("seed", seed.toString());
      url.searchParams.append("uid", "default"); // Standardwert verwenden
      if (prompt) url.searchParams.append("prompt", encodeURIComponent(prompt));
      if (negativePrompt) url.searchParams.append("negative_prompt", encodeURIComponent(negativePrompt));
      
      console.log("API Request URL:", url.toString()); // Debugging
      
      // POST-Request mit FormData
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      
      // Erweiterte Fehlerbehandlung
      if (!response.ok) {
        const errorText = await response.text().catch(() => "Keine Fehlermeldung verfügbar");
        console.error("API Fehlerdetails:", errorText);
        throw new Error(`API Fehler: ${response.status} - ${errorText}`);
      }
      
      // Die Antwort als Blob behandeln (Binärdaten/Bild)
      const blob = await response.blob();
      
      // Objekt-URL für den Blob erstellen
      const resultUrl = URL.createObjectURL(blob);
      
      // In den Store speichern mit explizitem Typ
      const historyEntry = {
        prompt: prompt,
        imageUrls: [resultUrl],
        sourceImages: [image1Preview, image2Preview],
        type: "image-to-image" // Expliziten Typ definieren
      };
      
      generatedImages.addToHistory(historyEntry);
      
    } catch (e) {
      error = e.message;
      console.error("Fehler beim Kombinieren der Bilder:", e);
    } finally {
      loading = false;
    }
  }
  
  // Funktion zum Bearbeiten eines vorherigen Prompts
  function editPrompt(oldPrompt) {
    prompt = oldPrompt;
    document.querySelector('#main-prompt').scrollIntoView({ behavior: 'smooth' });
  }
  
  // --- Copilot State ---
  let isStyleCopilotOpen = false;

  // --- Copilot Functions ---
  function openStyleCopilot() {
    isStyleCopilotOpen = true;
  }

  function addGeneratedStyle(event) {
    const style = event.detail.style;
    if (style) {
      prompt = prompt.trim() + (prompt ? ', ' : '') + style;
    }
  }

  // Parameter aus URL auslesen, wenn die Seite geladen wird
  onMount(() => {
    // Fix Store-Typen beim Laden
    generatedImages.fixTypes();
    
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
  });
  
  // Aufräumen bei Komponenten-Zerstörung
  onDestroy(() => {
    // Store-Subscription beenden
    unsubscribe();
  });
</script>

<svelte:head>
  <title>Image To Image | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <NavigationBar active="image-to-image" />
    
    <div class="content-wrapper">
      <!-- Parameter Panel (links) -->
      <div class="parameters-panel">
        <h2>Parameter</h2>
        
        <!-- Bild-Upload-Bereiche -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label>Bilder zum Kombinieren</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'images'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'images'}
                <div class="tooltip">Lade zwei Bilder hoch, die kombiniert werden sollen.</div>
              {/if}
            </div>
          </div>
          
          <div class="image-upload-container">
            <!-- Bild 1 Upload -->
            <div 
              class="image-upload-area" 
              class:has-image={image1Preview}
              on:dragover={preventDefaults}
              on:dragenter={preventDefaults}
              on:drop={(e) => handleImageDrop(e, 1)}
            >
              {#if image1Preview}
                <img src={image1Preview} alt="Bild 1 Vorschau" class="image-preview" />
                <button class="remove-image" on:click={() => { image1 = null; image1Preview = null; }}>×</button>
              {:else}
                <div class="upload-placeholder">
                  <span class="upload-icon">+</span>
                  <span>Bild 1</span>
                  <span class="upload-hint">Klicken oder ziehen</span>
                  <input 
                    type="file" 
                    id="image1" 
                    accept="image/*" 
                    on:change={handleImage1Upload} 
                    class="file-input" 
                  />
                </div>
              {/if}
            </div>
            
            <!-- Bild 2 Upload -->
            <div 
              class="image-upload-area" 
              class:has-image={image2Preview}
              on:dragover={preventDefaults}
              on:dragenter={preventDefaults}
              on:drop={(e) => handleImageDrop(e, 2)}
            >
              {#if image2Preview}
                <img src={image2Preview} alt="Bild 2 Vorschau" class="image-preview" />
                <button class="remove-image" on:click={() => { image2 = null; image2Preview = null; }}>×</button>
              {:else}
                <div class="upload-placeholder">
                  <span class="upload-icon">+</span>
                  <span>Bild 2</span>
                  <span class="upload-hint">Klicken oder ziehen</span>
                  <input 
                    type="file" 
                    id="image2" 
                    accept="image/*" 
                    on:change={handleImage2Upload} 
                    class="file-input" 
                  />
                </div>
              {/if}
            </div>
          </div>
        </div>
        
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
        </div>
        
        <div class="api-url-display">
          <h3>API Anfrage</h3>
          <div class="url-box">
            <span class="method">POST</span> 
            {`${apiBaseUrl}?cfg=${cfg}&steps=${steps}&seed=${seed}&uid=default${prompt ? `&prompt=${encodeURIComponent(prompt)}` : ''}${negativePrompt ? `&negative_prompt=${encodeURIComponent(negativePrompt)}` : ''}`}
            <div class="post-data">
              <span class="post-label">Form Data:</span>
              <span class="post-field">image1: {image1 ? image1.name : 'Kein Bild ausgewählt'}</span>
              <span class="post-field">image2: {image2 ? image2.name : 'Kein Bild ausgewählt'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ausgabebereich (mitte) -->
      <div class="output-area">
        <h1>Image To Image</h1>
        
        {#if loading}
          <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Kombiniere Bilder...</p>
          </div>
        {:else if error}
          <div class="error-message">
            <p>Fehler: {error}</p>
          </div>
        {:else if generatedResults.length > 0}
          <div class="results-container">
            {#each generatedResults as result (result.id)}
              <div class="result-card">
                <div class="source-images">
                  {#if result.sourceImages && result.sourceImages.length === 2}
                    <img src={result.sourceImages[0]} alt="Quellbild 1" class="source-image" />
                    <span class="plus-icon">+</span>
                    <img src={result.sourceImages[1]} alt="Quellbild 2" class="source-image" />
                    <span class="equals-icon">=</span>
                  {/if}
                </div>
                <PromptResultCard 
                  prompt={result.prompt}
                  imageUrls={result.imageUrls}
                  onEdit={editPrompt}
                />
              </div>
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            <div class="empty-state-content">
              <p>Lade zwei Bilder hoch und klicke auf "Kombinieren", um sie zu mischen.</p>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Prompt-Panel (unten rechts) -->
      <PromptPanel
        bind:promptValue={prompt}
        generateLabel="Generate"
        generateLoadingLabel="Generating..."
        generateIconSrc="{assets}/icon/rightIcon.svg"
        generateFallbackIconSrc="{assets}/icon/rightIcon.svg"
        generateLoading={loading}
        generateDisabled={loading || !image1 || !image2} 
        on:generate={combineImages}
        on:copilot={openStyleCopilot} 
        placeholder="Describe how the images should be combined or modified..."
        promptId="main-prompt"
      />

      <!-- Style Copilot Modal -->
      {#if isStyleCopilotOpen}
        <StyleCopilot
          isOpen={isStyleCopilotOpen}
          on:close={() => isStyleCopilotOpen = false}
          on:addStyle={addGeneratedStyle}
        />
      {/if}
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
    padding: 0 1rem 1rem; /* Entfernt den oberen Abstand, behält aber die Seitenränder */
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
    gap: 0.75rem;
    height: calc(100vh - 3.5rem);
  }
  
  /* Parameter Panel - modernisiertes Design */
  .parameters-panel {
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 1.25rem;
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
  
  /* Bild-Upload-Bereiche */
  .image-upload-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .image-upload-area {
    position: relative;
    border: 2px dashed #444;
    border-radius: 8px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.2s;
  }
  
  .image-upload-area:hover {
    border-color: #FCEA2B;
  }
  
  .image-upload-area.has-image {
    border-style: solid;
    border-color: #333;
  }
  
  .upload-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #888;
  }
  
  .upload-icon {
    font-size: 2rem;
    line-height: 1;
    color: #666;
  }
  
  .upload-hint {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .file-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  
  .image-preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.5rem;
  }
  
  .remove-image {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .remove-image:hover {
    background: rgba(220, 53, 69, 0.8);
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
  
  /* Info-Icon */
  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-weight: 500;
    font-style: normal;
    cursor: help;
    position: relative;
    transition: color 0.2s;
    margin-left: 4px;
  }
  
  .info-icon:hover {
    color: #ffffff;
  }
  
  .tooltip {
    position: fixed;
    width: 250px;
    background-color: rgba(30, 30, 30, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #ffffff;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: normal;
    font-family: 'Inter', sans-serif;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 
                0 0 0 1px rgba(255, 255, 255, 0.1);
    pointer-events: none;
    line-height: 1.5;
    letter-spacing: 0.01em;
    max-width: calc(100vw - 40px);
  }
  

  

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
  
  /* API URL Display */
  .api-url-display {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #262626;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
    border-left: 3px solid #FCEA2B;
  }
  
  .api-url-display h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #FCEA2B;
    letter-spacing: 0.03em;
  }
  
  .url-box {
    padding: 1rem;
    background-color: rgba(26, 26, 26, 0.5);
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    overflow-wrap: break-word;
    word-break: break-all;
    color: #aaaaaa;
    line-height: 1.5;
    border: 1px solid #333333;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  .post-data {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .post-label {
    color: #888;
    font-size: 0.8rem;
  }
  
  .post-field {
    padding-left: 1rem;
    color: #aaa;
  }
  
  .method {
    display: inline-block;
    background-color: #FCEA2B;
    color: #121212;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    margin-right: 8px;
    letter-spacing: 0.05em;
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  
  /* Prompt Panel mit 2-Spalten-Layout */
  .prompt-panel {
    grid-column: 2;
    grid-row: 2;
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
    align-items: center;
  }
  
  .prompt-input-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  .generate-button-container {
    display: flex;
    align-items: center;
    height: 100%;
  }

  

  
  /* Ausgabebereich */
  .output-area {
    grid-column: 2;
    grid-row: 1;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #181818;
    border-radius: 8px;
  }
  
  .output-area h1 {
    align-self: flex-start;
    margin-bottom: 1rem;
    font-size: 1.75rem;
  }
  
  .results-container {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .result-card {
    background-color: #1e1e1e;
    border-radius: 12px;
    overflow: hidden;
  }
  
  /* Source Images Display */
  .source-images {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
    border-bottom: 1px solid #333;
  }
  
  .source-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #444;
  }
  
  .plus-icon, .equals-icon {
    font-size: 1.5rem;
    color: #FCEA2B;
    margin: 0 0.5rem;
  }
  
  /* Loading Indicator */
  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333333;
    border-top: 4px solid #FCEA2B;
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
    height: 250px;
    width: 100%;
    color: #888888;
  }
  
  .empty-state-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
    background-color: rgba(30, 30, 30, 0.5);
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .empty-state-content p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
