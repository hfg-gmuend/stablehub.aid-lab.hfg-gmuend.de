<script lang="ts">
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import PromptResultCard from "$lib/components/PromptResultCard.svelte";
  import StyleCopilot from "$lib/components/StyleCopilot.svelte";
  import PromptPanel from '$lib/components/uicomponents/PromptPanel/PromptPanel.svelte';
  import { onMount, onDestroy } from "svelte";
  import { get } from 'svelte/store';
  import { styles } from "$lib/config/styles.js";
  import { serverImages } from '$lib/stores/serverImages.js';
  import { user } from '$lib/stores/user.js';
  import { ApiService } from '$lib/services/apiService.js';
  import { assets } from '$app/paths';
  
  // Typedefinitionen
  interface Style {
    id: string;
    name: string;
    prompt: string;
    thumbnail: string;
  }

  interface GeneratedResult {
    id: number;
    prompt: string;
    imageUrls: string[];
    timestamp: Date;
    styles?: string[];
    type?: string;
  }

  interface TooltipData {
    [key: string]: string;
  }

  // Parameter für die API
  let prompt: string = "cat with dog";
  let negativePrompt: string = "";
  let variants: number = 1;
  let cfg: number = 2;
  let steps: number = 6;
  let seed: number = 0;
  
  // Ausgewählte Stile
  let selectedStyles: string[] = [];
  
  // Tooltip und Style-Operationen
  let activeTooltip: string | null = null;
  
  // Tooltip-Texte
  const tooltips: TooltipData = {
    prompt: "Describe in detail what should appear in the image. The more details (style, environment, colors, etc.), the better the result.",
    negativePrompt: "A negative prompt describes what should not appear in the image. This helps avoid unwanted elements.",
    steps: "More steps mean longer rendering time, but often a more detailed image. Common values are between 5 and 50.",
    cfg: "Controls how strongly the model should follow the prompt. Higher values mean more prompt adherence, but sometimes less creativity.",
    seed: "A specific seed always produces the same image with identical other parameters. Useful for reproducing results or generating slight variations.",
    styles: "Choose predefined styles that will be added as tags to your prompt.",
    variants: "Generate multiple image variants simultaneously. More variants mean longer loading time."
  };
  
  // Zustand der Anwendung
  let loading: boolean = false;
  let imageUrl: string | null = null;
  let error: string | null = null;
  
  // Historie der generierten Bilder
  let generatedResults: GeneratedResult[] = [];
  
  // Store subscription für Server-basierte Bilder (nur text-to-image)
  const unsubscribe = serverImages.subscribe((images: any[]) => {
    console.log("[TextToImage] Store subscription triggered, images:", images.length);
    
    // Sortiere Bilder nach Timestamp (neueste zuerst)
    const sortedImages = images.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // Gruppiere Bilder mit demselben Prompt und nahem Zeitstempel (innerhalb von 10 Sekunden)
    const groupedResults: GeneratedResult[] = [];
    const processed = new Set<number>();
    
    sortedImages.forEach((image: any, index: number) => {
      if (processed.has(index)) return;
      
      // Finde alle Bilder mit demselben Prompt innerhalb von 10 Sekunden
      const relatedImages: any[] = [image];
      const imageTime = new Date(image.timestamp).getTime();
      
      sortedImages.forEach((otherImage: any, otherIndex: number) => {
        if (otherIndex !== index && !processed.has(otherIndex)) {
          const otherTime = new Date(otherImage.timestamp).getTime();
          const timeDiff = Math.abs(imageTime - otherTime);
          
          // Gruppiere wenn: gleicher Prompt UND innerhalb von 10 Sekunden
          if (image.prompt === otherImage.prompt && timeDiff <= 10000) {
            relatedImages.push(otherImage);
            processed.add(otherIndex);
          }
        }
      });
      
      processed.add(index);
      
      // Erstelle gruppiertes Result
      const groupedResult: GeneratedResult = {
        id: image.id || Date.now() + index,
        prompt: image.prompt,
        imageUrls: relatedImages.map(img => img.imageUrl || (img.imageUrls && img.imageUrls[0])),
        timestamp: new Date(image.timestamp),
        styles: image.styles || [],
        type: "text-to-image"
      };
      
      groupedResults.push(groupedResult);
    });
    
    generatedResults = groupedResults;
    console.log("[TextToImage] Text-to-image images grouped:", generatedResults.length, "groups from", images.length, "individual images");
  });
  
  // Reaktive Variable für aktuelle UID
  $: currentUid = $user.userid || 'default';
  
  // Variable um den letzten geladenen UID zu verfolgen
  let lastLoadedUid: string | null = null;
  
  // API URL Basis (für Anzeige)
  const apiBaseUrl: string = "https://playground.transferscope.org/api/txt2img";
  
  // Funktion zum Generieren des Bildes
  async function generateImage(): Promise<void> {
    loading = true;
    error = null;
    
    try {
      // Verwende den neuen API Service
      const result = await ApiService.generateTextToImage({
        prompt,
        negativePrompt,
        cfg,
        steps,
        seed,
        variants
      });
      
      // Neues Ergebnis erstellen für die lokale Anzeige - ALLE Bilder in einer Card
      const newResult: GeneratedResult = { 
        id: Date.now(), 
        prompt: prompt,
        imageUrls: result.imageUrls, // Alle generierten Bilder in einem Array
        timestamp: new Date(),
        styles: [...selectedStyles],
        type: "text-to-image"
      };
      
      // Zur lokalen Liste hinzufügen für sofortige Anzeige (an den Anfang)
      generatedResults = [newResult, ...generatedResults.slice(0, 29)]; // Behalte nur die neuesten 30 insgesamt
      
      console.log("[TextToImage] Image generated successfully, loading server data...");
      
      // Speichere Prompt-Daten werden jetzt automatisch in der API-Service gespeichert
      // Aktualisiere den Store nach der Generierung für korrekte Server-URLs (ermöglicht Favorisierung)
      const userData = get(user);
      await serverImages.refreshAfterGenerationByType("text-to-image", userData.userid);
      
    } catch (e) {
      error = e instanceof Error ? e.message : "Unknown error";
      console.error("Error generating image:", e);
    } finally {
      loading = false;
    }
  }
  
  // Funktion zum Bearbeiten eines vorherigen Prompts
  function editPrompt(oldPrompt: string): void {
    prompt = oldPrompt;
    // Scrolle zum Prompt-Eingabefeld
    const promptElement = document.querySelector('#main-prompt');
    if (promptElement) {
      promptElement.scrollIntoView({ behavior: 'smooth' });
      (promptElement as HTMLElement).focus();
    }
  }
  
  // Parameter aus URL auslesen, wenn die Seite geladen wird
  onMount(async () => {
    console.log("[TextToImage] Component mounted, loading user images...");
    
    // Lade Bilder vom Server für die aktuelle UID mit Text-to-Image Filter
    lastLoadedUid = currentUid;
    await serverImages.loadUserImagesByType("text-to-image", currentUid);
    
    const url = new URL(window.location.href);
    
    if (url.searchParams.has("prompt")) {
      prompt = url.searchParams.get("prompt") || "cat with dog";
    }
    
    if (url.searchParams.has("negative_prompt")) {
      negativePrompt = url.searchParams.get("negative_prompt") || "";
    }
    
    if (url.searchParams.has("cfg")) {
      const cfgParam = url.searchParams.get("cfg");
      if (cfgParam) cfg = parseFloat(cfgParam);
    }
    
    if (url.searchParams.has("steps")) {
      const stepsParam = url.searchParams.get("steps");
      if (stepsParam) steps = parseInt(stepsParam);
    }
    
    if (url.searchParams.has("seed")) {
      const seedParam = url.searchParams.get("seed");
      if (seedParam) seed = parseInt(seedParam);
    }
    
    if (url.searchParams.has("variants")) {
      const variantsParam = url.searchParams.get("variants");
      if (variantsParam) variants = Math.min(3, Math.max(1, parseInt(variantsParam)));
    }
    
    // Automatisch Bild generieren, wenn Parameter in der URL vorhanden sind
    if (url.searchParams.has("prompt")) {
      generateImage();
    }
  });
  
  // Aufräumen bei Komponenten-Zerstörung
  onDestroy(() => {
    // Objekt-URLs freigeben, wenn vorhanden
    generatedResults.forEach(result => {
      if (result.imageUrls) {
        result.imageUrls.forEach(url => {
          if (url && typeof url === 'string' && url.startsWith('blob:')) {
            URL.revokeObjectURL(url);
          }
        });
      }
    });
    // Store-Subscription beenden
    unsubscribe();
  });
  
  // Reagiere auf UID-Änderungen nur wenn sich die UID tatsächlich geändert hat
  $: {
    if (currentUid && currentUid !== lastLoadedUid) {
      console.log("[TextToImage] UID changed from", lastLoadedUid, "to:", currentUid);
      lastLoadedUid = currentUid;
      // Lade Bilder für neue UID mit Text-to-Image Filter
      serverImages.loadUserImagesByType("text-to-image", currentUid);
    }
  }
  
  // Hilfsfunktion zum Anpassen des Style-Prompts
  function addStyle(style: Style): void {
    if (!selectedStyles.includes(style.id)) {
      selectedStyles = [...selectedStyles, style.id];
      
      // Style-Prompt zum Hauptprompt hinzufügen
      // Füge das Motiv-Keyword hinzu, wenn es sich um App Design handelt
      let stylePrompt = style.prompt;
      if (style.id === 'appdesign') {
        // Ersetze {Motiv} mit dem ersten Teil des aktuellen Prompts, falls vorhanden
        const mainSubject = prompt.split(',')[0].trim();
        stylePrompt = stylePrompt.replace('{Motiv}', mainSubject);
      }
      
      prompt = prompt.trim() + `, ${stylePrompt}`;
    }
  }
  
  function removeStyle(styleId: string): void {
    const styleToRemove = styles.find(s => s.id === styleId) as Style | undefined;
    if (styleToRemove) {
      // Entferne den Style-Prompt aus dem Hauptprompt
      prompt = prompt.replace(`, ${styleToRemove.prompt}`, '');
      
      // Entferne den Style aus der Liste der ausgewählten Stile
      selectedStyles = selectedStyles.filter(id => id !== styleId);
    }
  }
  
  // Copilot State
  let isStyleCopilotOpen: boolean = false;
  
  // Funktion zum Öffnen des Style-Copilots
  function openStyleCopilot(): void {
    isStyleCopilotOpen = true;
  }
  
  // Funktion zum Hinzufügen des generierten Stils zum Prompt
  function addGeneratedStyle(event: CustomEvent<{style: string}>): void {
    const style = event.detail.style;
    if (style) {
      prompt = prompt.trim() + (prompt ? ', ' : '') + style;
    }
  }
</script>

<svelte:head>
  <title>Text To Image | Stablehub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <div class="content-wrapper">
      <!-- Parameter Panel (links) -->
      <div class="parameters-panel">
        <h2>Parameter</h2>
        
        <!-- Varianten-Auswahl (volle Breite, ganz oben) -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label for="variants">Variants</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'variants'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'variants'}
                <div class="tooltip">Generate multiple image variants simultaneously. More variants mean longer loading time.</div>
              {/if}
            </div>
          </div>
          <div class="variant-selector">
            <button class="variant-button {variants === 1 ? 'active' : ''}" on:click={() => variants = 1}>1</button>
            <button class="variant-button {variants === 2 ? 'active' : ''}" on:click={() => variants = 2}>2</button>
            <button class="variant-button {variants === 3 ? 'active' : ''}" on:click={() => variants = 3}>3</button>
          </div>
        </div>
        
        <!-- Negatives Prompt (volle Breite) -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label for="negative-prompt">Negative Prompt</label>
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
        
        <!-- Styles-Auswahl -->
        <div class="parameter-group full-width">
          <div class="label-container">
            <label for="styles">Styles</label>
            <div class="info-icon" 
                on:mouseenter={() => activeTooltip = 'styles'}
                on:mouseleave={() => activeTooltip = null}>
              i
              {#if activeTooltip === 'styles'}
                <div class="tooltip">{tooltips.styles}</div>
              {/if}
            </div>
          </div>
          
          <div class="styles-grid">
            {#each styles as style}
              <div 
                class="style-thumbnail {selectedStyles.includes(style.id) ? 'selected' : ''}" 
                on:click={() => addStyle(style)}
              >
                <img src={style.thumbnail} alt={style.name} />
                
                {#if selectedStyles.includes(style.id)}
                  <button 
                    class="remove-style-btn" 
                    on:click|stopPropagation={() => removeStyle(style.id)}
                  >×</button>
                {/if}
              </div>
            {/each}
          </div>
          
          <!-- Ausgewählte Stil-Tags -->
          {#if selectedStyles && selectedStyles.length > 0}
            <div class="selected-styles">
              {#each selectedStyles as styleId}
                {#if styles.find(s => s.id === styleId)}
                  <div class="style-tag">
                    {styles.find(s => s.id === styleId)?.name}
                    <button class="tag-remove-btn" on:click={() => removeStyle(styleId)}>×</button>
                  </div>
                {/if}
              {/each}
            </div>
          {/if}
        </div>
        
        <!-- API URL Anzeige aktualisieren -->
        <div class="api-url-display">
          <h3>API Request</h3>
          <div class="url-box">
            <span class="method">GET</span> 
            {`${apiBaseUrl}?prompt=${encodeURIComponent(prompt)}${negativePrompt ? `&negative_prompt=${encodeURIComponent(negativePrompt)}` : ''}&cfg=${cfg}&steps=${steps}&seed=${seed}&variants=${variants}&uid=${currentUid}`}
          </div>
        </div>
      </div>
      
      <!-- Ausgabebereich (mitte) -->
      <div class="output-area">
        <h1>Text To Image</h1>
        
        {#if loading}
          <div class="loading-indicator">
            <div class="spinner"></div>
            <p>Generate {variants} picture{variants > 1 ? 's' : ''}...</p>
          </div>
        {:else if error}
          <div class="error-message">
            <p>Error: {error}</p>
          </div>
        {:else if generatedResults.length > 0}
          <div class="results-container">
            {#each generatedResults as result (result.id)}
              <PromptResultCard 
                prompt={result.prompt}
                imageUrls={result.imageUrls}
                onEdit={editPrompt}
                usedStyles={result.styles || []}
                type="text-to-image"
              />
            {/each}
          </div>
        {:else}
          <div class="empty-state">
            <div class="empty-state-content">
              <p>Enter a prompt and click "Generate" to create an image.</p>
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
        generateLoading={loading}
        generateDisabled={loading}
        on:generate={generateImage}
        on:copilot={openStyleCopilot}
        placeholder="Describe what you want to generate..."
        promptId="main-prompt"
      />

      <!-- Style Copilot Modal bleibt -->
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
    padding: 1rem; /* Konsistentes Padding für besseren Abstand ohne NavigationBar */
    display: flex;
    flex-direction: column;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .app-container {
      flex-direction: column;
    }
    
    main {
      padding: 80px 1rem 1rem; /* Extra top padding for burger menu */
      min-height: calc(100vh - 80px);
    }
    
    .content-wrapper {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto auto auto !important;
      gap: 1rem !important;
      height: auto !important;
    }
    
    .parameters-panel {
      grid-column: 1 !important;
      grid-row: 1 !important;
      margin-bottom: 1rem;
    }
    
    .output-area {
      grid-column: 1 !important;
      grid-row: 2 !important;
      min-height: 300px;
    }
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
    gap: 0.75rem; /* Reduziert von 1rem auf 0.75rem */
    height: calc(100vh - 3.5rem); /* Angepasst für mehr Platz für das Prompt-Panel */
  }
  
  /* Parameter Panel - modernisiertes Design */
  .parameters-panel {
    grid-column: 1;
    grid-row: 1 / span 2;
    background-color: #1e1e1e;
    border-radius: 12px;
    padding: 1.25rem; /* Reduziert von 1.5rem auf 1.25rem */
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
  
  
  /* Größerer Abstand zwischen den Parameter-Gruppen wegen entfernter Beschreibungstexte */
  .parameter-grid-item {
    margin-bottom: 1rem;
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
  

  
  /* Ausgabebereich */
  .output-area {
    grid-column: 2;
    grid-row: 1;
    padding: 0.75rem; /* Reduziert von 1rem auf 0.75rem */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #181818;
    border-radius: 8px;
  }
  
  .output-area h1 {
    align-self: flex-start;
    margin-bottom: 1rem; /* Reduziert von 1.5rem auf 1rem */
    font-size: 1.75rem; /* Leicht verkleinert */
  }
  
  .results-container {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  

  
  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px; /* Reduziert von 300px */
  }
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333333;
    border-top: 4px solid #FCEA2B; /* Geändert von #3498db zu #FCEA2B für das HfG-Gelb */
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
    height: 250px; /* Reduziert von 300px */
    width: 100%;
    color: #888888;
  }
  
  .empty-state-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
    background-color: rgba(30, 30, 30, 0.5); /* Subtiler Hintergrund */
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .empty-state-content p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }
  
  /* Varianten-Auswahl */
  .variant-selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .variant-button {
    flex: 1;
    padding: 0.75rem;
    background-color: #262626;
    border: none;
    border-radius: 6px;
    color: #b0b0b0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .variant-button:hover {
    background-color: #333;
    color: white;
  }
  
  .variant-button.active {
    background-color: #FCEA2B;
    color: #121212;
    box-shadow: 0 2px 8px rgba(252, 234, 43, 0.3);
  }
  
  /* Styles-Grid mit 3 Elementen pro Zeile */
  .styles-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* Genau 3 Spalten pro Zeile */
    gap: 0.75rem;
    margin-bottom: 1rem;
    width: 100%;
  }
  
  .style-thumbnail {
    position: relative;
    background-color: #2a2a2a;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    width: 100%; /* Nutzt die verfügbare Breite */
    aspect-ratio: 1.2; /* Etwas höher als breit */
    transition: all 0.2s;
    border: 2px solid transparent;
    box-sizing: border-box; /* Stellt sicher, dass Padding und Border in die Größe eingerechnet werden */
    max-width: 75px; /* Etwas größer, da nur 3 pro Zeile */
    margin: 0 auto; /* Zentrieren */
  }
  
  .style-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.2s;
  }
  
  .style-thumbnail:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .style-thumbnail.selected {
    border-color: #FCEA2B;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.3);
  }
  

  
  /* Remove-Button */
  .remove-style-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px; /* Kleinerer Button */
    height: 20px; /* Kleinerer Button */
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px; /* Kleinere Schrift */
    cursor: pointer;
    transition: all 0.2s;
    padding: 0; /* Kein Padding */
  }
  
  .remove-style-btn:hover {
    background: rgba(220, 53, 69, 0.8);
  }
  
  /* Ausgewählte Style-Tags */
  .selected-styles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .style-tag {
    background-color: rgba(252, 234, 43, 0.15);
    color: #FCEA2B;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(252, 234, 43, 0.3);
  }
  
  .tag-remove-btn {
    background: none;
    border: none;
    color: #FCEA2B;
    cursor: pointer;
    padding: 0;
    font-size: 1.2rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .tag-remove-btn:hover {
    color: #fff;
  }
  
  /* API URL Box mit verbessertem Design */
  .api-url-display {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: #262626;
    border-radius: 10px; /* Erhöht für weicheres Erscheinungsbild */
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2); /* Subtiler Schatten für Tiefe */
    border-left: 3px solid #FCEA2B; /* Gelber Akzent auf der linken Seite */
  }
  
  .api-url-display h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 600;
    color: #FCEA2B; /* Überschrift in Akzentfarbe */
    letter-spacing: 0.03em;
  }
  
  .url-box {
    padding: 1rem;
    background-color: rgba(26, 26, 26, 0.5); /* Transparenter Hintergrund */
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace; /* Konsistente Schriftart für Code */
    font-size: 0.85rem;
    overflow-wrap: break-word;
    word-break: break-all;
    color: #aaaaaa;
    line-height: 1.5;
    border: 1px solid #333333; /* Subtile Umrandung */
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3); /* Innerer Schatten für Tiefe */
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
  
</style>
