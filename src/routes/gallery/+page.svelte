<script>
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import NavigationBar from "$lib/components/NavigationBar.svelte";
  import { serverImages } from '$lib/stores/serverImages.js';
  import { user } from '$lib/stores/user.js';
  import { onMount } from 'svelte';
  
  // Zustand für das angezeigte Prompt
  /** @type {string | null} */
  let displayPrompt = null;
  /** @type {any[]} */
  let galleryItems = [];
  let loading = true;
  /** @type {string | null} */
  let error = null;
  
  // Reaktive Variable für aktuelle UID
  $: currentUid = $user.userid || 'default';
  
  // Funktion zum Laden der Galerie
  async function loadGallery() {
    try {
      loading = true;
      error = null;
      galleryItems = await serverImages.loadGallery();
      console.log("Gallery loaded:", galleryItems.length, "items");
    } catch (err) {
      console.error('Error loading gallery:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }
  
  // Beim Mounten der Komponente
  onMount(async () => {
    await loadGallery();
  });
  
  // Reaktion auf UID-Änderungen
  $: {
    if (currentUid) {
      console.log("[Gallery] UID changed to:", currentUid);
      loadGallery();
    }
  }
  
  // Funktion zum Kopieren des Prompts in die Zwischenablage
  /** @param {string} prompt */
  async function copyPromptToClipboard(prompt) {
    try {
      await navigator.clipboard.writeText(prompt);
      // Kurze Rückmeldung anzeigen
      alert("Prompt copied to clipboard!");
    } catch (err) {
      console.error('Error copying: ', err);
    }
  }
  
  // Funktion zum Entfernen eines Favoriten
  /** @param {any} galleryItem */
  async function removeFavorite(galleryItem) {
    try {
      await serverImages.removeFromFavorites(galleryItem);
      // Galerie neu laden
      await loadGallery();
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Error removing favorite: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }
  
  // Funktion zum Behandeln von Bildlade-Fehlern
  /** @param {Event} event */
  function handleImageError(event) {
    console.error("Error loading image:", event);
    const target = /** @type {HTMLImageElement} */ (event.target);
    target.onerror = null;
    target.style.display = 'none'; // Verstecke das Bild wenn es nicht geladen werden kann
  }
</script>

<svelte:head>
  <title>Image Gallery | HfG AI-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <NavigationBar active="gallery" />
    
    <div class="gallery-container">
      <h1>Favorite Images</h1>
      
      {#if loading}
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading gallery...</p>
        </div>
      {:else if error}
        <div class="error-state">
          <p>Error loading gallery: {error}</p>
          <button on:click={loadGallery} class="retry-button">Retry</button>
        </div>
      {:else if galleryItems.length === 0}
        <div class="empty-gallery">
          <p>No favorite images yet. Generate images and mark them as favorites.</p>
        </div>
      {:else}
        <div class="image-grid">
          {#each galleryItems as galleryItem (galleryItem.imageUrl)}
            <div class="gallery-item"
                 on:mouseenter={() => displayPrompt = galleryItem.imageUrl}
                 on:mouseleave={() => displayPrompt = null}>
              <img 
                src={galleryItem.imageUrl} 
                alt="Favorite image" 
                class="gallery-image"
                on:error={handleImageError}
              />
              
              <!-- Prompt-Overlay -->
              {#if displayPrompt === galleryItem.imageUrl && galleryItem.prompt}
                <div class="prompt-overlay">
                  <p class="prompt-text">{galleryItem.prompt}</p>
                </div>
              {/if}
              
              <!-- Action-Buttons -->
              <div class="gallery-actions">
                <button class="copy-button" on:click={() => copyPromptToClipboard(galleryItem.prompt)}>
                  <span class="copy-icon">📋</span>
                  Copy Prompt
                </button>
                <button class="remove-button" on:click={() => removeFavorite(galleryItem)}>
                  <span class="remove-icon">🗑️</span>
                  Remove
                </button>
              </div>
            </div>
          {/each}
        </div>
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
    padding: 0 1rem 1rem;
    display: flex;
    flex-direction: column;
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
    margin: 1rem 0;
    font-size: 1.75rem;
  }
  
  .gallery-container {
    flex: 1;
    padding: 0.75rem;
    background-color: #181818;
    border-radius: 8px;
    overflow-y: auto;
  }
  
  /* Loading State */
  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
    color: #888888;
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
  
  /* Error State */
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
    color: #ff8a8a;
    text-align: center;
  }
  
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #FCEA2B;
    color: #121212;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  
  .retry-button:hover {
    background-color: #ffe566;
  }
  
  .empty-gallery {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
    color: #888888;
    text-align: center;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .gallery-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
  }
  
  .gallery-item:hover {
    transform: scale(1.02);
    z-index: 10;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .prompt-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(4px);
    padding: 1rem;
    color: white;
  }
  
  .prompt-text {
    margin: 0 0 1rem 0;
    font-size: 0.9rem;
    line-height: 1.4;
    max-height: 5rem;
    overflow-y: auto;
    font-family: 'Inter', sans-serif;
  }
  
  .gallery-actions {
    display: flex;
    gap: 0.5rem;
  }
  
  .copy-button, .remove-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s;
    flex: 1;
  }
  
  .copy-button {
    background-color: #FCEA2B;
    color: #121212;
  }
  
  .copy-button:hover {
    background-color: #ffe566;
  }
  
  .remove-button {
    background-color: #444;
    color: #fff;
  }
  
  .remove-button:hover {
    background-color: #d64545;
  }
  
  .copy-icon, .remove-icon {
    font-size: 1rem;
  }
</style>
