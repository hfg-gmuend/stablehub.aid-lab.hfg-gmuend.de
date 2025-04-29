<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  import NavigationBar from "$lib/components/NavigationBar.svelte";
  import PromptResultCard from "$lib/components/PromptResultCard.svelte";
  import TokenizedPromptArea from "$lib/components/TokenizedPromptArea.svelte";
  import { onMount, onDestroy } from "svelte";
  
  // Parameter für die API
  let prompt = "More Bubbles";
  let negativePrompt = "";
  let cfg = 1.3;
  let steps = 6;
  let seed = 0;
  let uid = "default";
  
  // ControlNet-spezifische Parameter
  let controlnetStrength = 0.75;
  let startPercent = 0;
  let endPercent = 1;
  
  // Zustand für Bild
  let image = null;
  let imagePreview = null;
  
  // Zustand für Icons
  let buttonIconError = false;
  
  // Tooltip und Operationen
  let activeTooltip = null;
  
  // Tooltip-Texte
  const tooltips = {
    prompt: "Beschreibe, wie das Bild verändert werden soll.",
    negativePrompt: "Ein negativer Prompt beschreibt, was im Bild nicht erscheinen soll. Dies hilft, unerwünschte Elemente zu vermeiden.",
    steps: "Mehr Steps bedeuten eine längere Renderzeit, aber oft ein detaillierteres Bild. Übliche Werte liegen zwischen 5 und 50.",
    cfg: "Steuert, wie stark sich das Modell an den Prompt halten soll. Höhere Werte bedeuten mehr Prompt-Treue, aber manchmal weniger Kreativität.",
    seed: "Ein bestimmter Seed erzeugt immer das gleiche Bild bei identischen anderen Parametern. Nützlich, um Ergebnisse zu reproduzieren.",
    uid: "Identifiziert den Benutzer für die API. Kann für Tracking und Limitierungen verwendet werden.",
    controlnetStrength: "Steuert, wie stark sich das Modell an die Vorlage halten soll. Höhere Werte bedeuten mehr Kontrolle durch die Vorlage.",
    startPercent: "Prozentualer Wert, ab dem die Kontrolle durch die Vorlage beginnen soll (0 bedeutet direkt zu Beginn der Bildgenerierung).",
    endPercent: "Prozentualer Wert, bis zu dem die Kontrolle durch die Vorlage angewendet werden soll (1 bedeutet bis zum Ende der Bildgenerierung).",
    image: "Lade ein Bild hoch, das als Vorlage/Kontrolle für den ControlNet-Prozess dienen soll."
  };
  
  // Zustand der Anwendung
  let loading = false;
  let imageUrl = null;
  let error = null;
  
  // Historie der generierten Bilder
  let generatedResults = [];
  
  // API URL Basis
  const apiBaseUrl = "https://aid-playground.hfg-gmuend.de/api/controlnet";
  
  // Funktionen zum Verarbeiten des Bild-Uploads
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function handleImageDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      image = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  // Funktion zum Behandeln von Icon-Ladefehlern
  function handleIconError() {
    buttonIconError = true;
  }
  
  // Funktion zum Generieren des ControlNet-Bildes
  async function processWithControlNet() {
    if (!image) {
      error = "Bitte lade ein Bild hoch, um ControlNet zu nutzen.";
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
      formData.append("image1", image);
      
      // URL mit Parametern erstellen
      const url = new URL(apiBaseUrl);
      url.searchParams.append("controlnet_strength", controlnetStrength);
      url.searchParams.append("start_percent", startPercent);
      url.searchParams.append("end_percent", endPercent);
      url.searchParams.append("prompt", prompt);
      url.searchParams.append("cfg", cfg);
      url.searchParams.append("steps", steps);
      url.searchParams.append("seed", seed);
      url.searchParams.append("uid", uid);
      if (negativePrompt) url.searchParams.append("negative_prompt", negativePrompt);
      
      // POST-Request mit FormData
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`API Fehler: ${response.status}`);
      }
      
      // Die Antwort als Blob behandeln (Binärdaten/Bild)
      const blob = await response.blob();
      
      // Objekt-URL für den Blob erstellen
      const resultUrl = URL.createObjectURL(blob);
      
      // Zum Verlauf hinzufügen
      generatedResults = [
        { 
          id: Date.now(), 
          prompt: prompt,
          imageUrls: [resultUrl],
          sourceImage: imagePreview, // Speichern des Quellbilds für die Anzeige
          controlnetParams: { // Speichern der ControlNet-Parameter für die Anzeige
            strength: controlnetStrength,
            startPercent: startPercent,
            endPercent: endPercent
          },
          timestamp: new Date()
        },
        ...generatedResults
      ];
      
    } catch (e) {
      error = e.message;
      console.error("Fehler bei der ControlNet-Verarbeitung:", e);
    } finally {
      loading = false;
    }
  }
  
  // Funktion zum Bearbeiten eines vorherigen Prompts
  function editPrompt(oldPrompt) {
    prompt = oldPrompt;
    document.querySelector('#main-prompt').scrollIntoView({ behavior: 'smooth' });
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
    
    if (url.searchParams.has("controlnet_strength")) {
      controlnetStrength = parseFloat(url.searchParams.get("controlnet_strength"));
    }
    
    if (url.searchParams.has("start_percent")) {
      startPercent = parseFloat(url.searchParams.get("start_percent"));
    }
    
    if (url.searchParams.has("end_percent")) {
      endPercent = parseFloat(url.searchParams.get("end_percent"));
    }
  });
  
  // Aufräumen bei Komponenten-Zerstörung
  onDestroy(() => {
    // Objekt-URL freigeben, wenn vorhanden
    generatedResults.forEach(result => {
      if (result.imageUrls) {
        result.imageUrls.forEach(url => {
          if (url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      }
    });
  });
</script>

<svelte:head>
  <title>ControlNet | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <NavigationBar active="controlnet" />
    
    <div class="content-wrapper">
      <!-- Parameter Panel (links) -->
      <div class="parameters-panel">
        <h2>Parameter</h2>
        
        <!-- Bild-Upload-Bereich -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label>ControlNet Vorlage</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'image'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'image'}
                <div class="tooltip">{tooltips.image}</div>
              {/if}
            </div>
          </div>
          
          <div 
            class="image-upload-area" 
            class:has-image={imagePreview}
            on:dragover={preventDefaults}
            on:dragenter={preventDefaults}
            on:drop={handleImageDrop}
          >
            {#if imagePreview}
              <img src={imagePreview} alt="Bild Vorschau" class="image-preview" />
              <button class="remove-image" on:click={() => { image = null; imagePreview = null; }}>×</button>
            {:else}
              <div class="upload-placeholder">
                <span class="upload-icon">+</span>
                <span>Vorlage hochladen</span>
                <span class="upload-hint">Klicken oder ziehen</span>
                <input 
                  type="file" 
                  id="controlnet-image" 
                  accept="image/*" 
                  on:change={handleImageUpload} 
                  class="file-input" 
                />
              </div>
            {/if}
          </div>
        </div>
        
        <!-- ControlNet-spezifische Parameter -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label for="controlnet-strength">ControlNet Stärke</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'controlnetStrength'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'controlnetStrength'}
                <div class="tooltip">{tooltips.controlnetStrength}</div>
              {/if}
            </div>
          </div>
          <div class="range-slider-container">
            <input 
              type="range" 
              id="controlnet-strength" 
              min="0" 
              max="1" 
              step="0.05" 
              bind:value={controlnetStrength} 
              class="range-slider"
            >
            <div class="range-value">{controlnetStrength.toFixed(2)}</div>
          </div>
        </div>
        
        <div class="parameter-group full-width">
          <div class="label-container">
            <label>Anwendungsbereich</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'percentRange'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'percentRange'}
                <div class="tooltip">Bestimmt, in welchem Bereich des Generierungsprozesses die Kontrolle angewendet wird.</div>
              {/if}
            </div>
          </div>
          <div class="dual-range-slider">
            <div class="label-container small">
              <label for="start-percent">Start</label>
              <input 
                type="number" 
                id="start-percent" 
                min="0" 
                max="1" 
                step="0.05" 
                bind:value={startPercent}
                class="small-input"
              >
            </div>
            <div class="range-slider-container">
              <input 
                type="range" 
                id="start-percent-slider" 
                min="0" 
                max="1" 
                step="0.05" 
                bind:value={startPercent} 
                class="range-slider"
              >
            </div>
            
            <div class="label-container small">
              <label for="end-percent">Ende</label>
              <input 
                type="number" 
                id="end-percent" 
                min="0" 
                max="1" 
                step="0.05" 
                bind:value={endPercent}
                class="small-input"
              >
            </div>
            <div class="range-slider-container">
              <input 
                type="range" 
                id="end-percent-slider" 
                min="0" 
                max="1" 
                step="0.05" 
                bind:value={endPercent} 
                class="range-slider"
              >
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
        
        <!-- Zwei-Spalten-Layout für Standard-Parameter -->
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
            <span class="method">POST</span> 
            {`${apiBaseUrl}?controlnet_strength=${controlnetStrength}&start_percent=${startPercent}&end_percent=${endPercent}&prompt=${encodeURIComponent(prompt)}${negativePrompt ? `&negative_prompt=${encodeURIComponent(negativePrompt)}` : ''}&cfg=${cfg}&steps=${steps}&seed=${seed}&uid=${uid}`}
            <div class="post-data">
              <span class="post-label">Form Data:</span>
              <span class="post-field">image1: {image ? image.name : 'Kein Bild ausgewählt'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ausgabebereich (mitte) -->
      <div class="output-area">
        <h1>ControlNet</h1>
        
        {#if loading}
          <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Wende ControlNet an...</p>
          </div>
        {:else if error}
          <div class="error-message">
            <p>Fehler: {error}</p>
          </div>
        {:else if generatedResults.length > 0}
          <div class="results-container">
            {#each generatedResults as result (result.id)}
              <div class="result-card">
                <div class="controlnet-info">
                  <div class="source-image-container">
                    <img src={result.sourceImage} alt="Quellbild" class="source-image" />
                    <div class="arrow-icon">→</div>
                  </div>
                  <div class="params-display">
                    <div class="param-item">
                      <span class="param-label">Stärke:</span>
                      <span class="param-value">{result.controlnetParams.strength.toFixed(2)}</span>
                    </div>
                    <div class="param-item">
                      <span class="param-label">Bereich:</span>
                      <span class="param-value">{result.controlnetParams.startPercent.toFixed(2)} - {result.controlnetParams.endPercent.toFixed(2)}</span>
                    </div>
                  </div>
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
              <p>Lade ein Bild hoch und klicke auf "Anwenden", um ControlNet zu nutzen.</p>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Prompt-Panel (unten rechts) -->
      <div class="prompt-panel">
        <div class="prompt-input-container">
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
          
          <TokenizedPromptArea
            bind:value={prompt}
            id="main-prompt"
            placeholder="Beschreibe, wie das Bild verändert werden soll..."
          />
        </div>
        
        <div class="generate-button-container">
          <button 
            on:click={processWithControlNet}
            disabled={loading || !image}
            class={!image ? "disabled" : ""}
          >
            <img 
              src={buttonIconError ? "/icon/rightIcon.svg" : "/icon/controlnetIcon.svg"} 
              alt="ControlNet Icon" 
              class="button-icon-inside" 
              on:error={handleIconError}
            />
            <span>{loading ? 'Verarbeite...' : 'Anwenden'}</span>
          </button>
        </div>
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
    padding: 0 1rem 1rem;
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
  
  /* Bild-Upload-Bereich */
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
  
  /* Range Slider Styles */
  .range-slider-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .range-slider {
    flex: 1;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: #444;
    border-radius: 2px;
    outline: none;
  }
  
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #FCEA2B;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .range-slider::-webkit-slider-thumb:hover {
    background: #ffe566;
  }
  
  .range-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #FCEA2B;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .range-slider::-moz-range-thumb:hover {
    background: #ffe566;
  }
  
  .range-value {
    width: 40px;
    text-align: right;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
  }
  
  /* Dual Range Slider */
  .dual-range-slider {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .dual-range-slider .range-slider-container {
    margin-bottom: 0.5rem;
  }
  
  .label-container.small {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 0.25rem;
  }
  
  .small-input {
    width: 60px;
    padding: 0.25rem 0.5rem;
    text-align: center;
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
  
  [class*="info-icon"]:hover + .tooltip {
    display: block;
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
  
  .prompt-panel button {
    padding: 0.85rem 1.25rem;
    background-color: #FCEA2B;
    color: #121212;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(252, 234, 43, 0.2);
  }
  
  .prompt-panel button:hover:not(.disabled) {
    background-color: #ffe566;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(252, 234, 43, 0.3);
  }
  
  .prompt-panel button:active:not(.disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(252, 234, 43, 0.2);
  }
  
  .prompt-panel button.disabled {
    background-color: #444;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
  }
  
  .button-icon-inside {
    width: 18px;
    height: 18px;
    margin-right: 8px;
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
  
  /* ControlNet Info Display */
  .controlnet-info {
    display: flex;
    padding: 1rem;
    gap: 1rem;
    border-bottom: 1px solid #333;
    align-items: center;
  }
  
  .source-image-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .source-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #444;
  }
  
  .arrow-icon {
    font-size: 1.5rem;
    color: #FCEA2B;
  }
  
  .params-display {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  .param-item {
    background-color: rgba(255, 255, 255, 0.05);
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  
  .param-label {
    color: #888;
  }
  
  .param-value {
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
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
