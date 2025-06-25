<script>
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import { serverImages } from '$lib/stores/serverImages.js';
  import { user } from '$lib/stores/user.js';
  import { onMount } from 'svelte';
  
  // Zustand für die Gallery
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
      const rawGalleryItems = await serverImages.loadGallery();
      
      // Filtere nur wirklich ungültige URLs heraus und erstelle eindeutige Keys
      galleryItems = rawGalleryItems
        .filter(item => {
          // Erlaube HTTP/HTTPS URLs und Blob URLs
          const isValidUrl = item.imageUrl && 
            typeof item.imageUrl === 'string' &&
            (item.imageUrl.startsWith('http://') || 
             item.imageUrl.startsWith('https://') || 
             item.imageUrl.startsWith('blob:'));
          
          // Zusätzliche Validierung für Blob URLs - nur aktuelle Origin erlauben
          if (item.imageUrl && item.imageUrl.startsWith('blob:')) {
            const currentOrigin = window.location.origin;
            const isCurrentOrigin = item.imageUrl.startsWith(`blob:${currentOrigin}`);
            
            if (!isCurrentOrigin) {
              console.warn('[Gallery] Filtering out cross-origin blob URL:', item.imageUrl);
              return false;
            }
          }
          
          if (!isValidUrl) {
            console.warn('[Gallery] Filtering out invalid image URL:', item.imageUrl);
          }
          return isValidUrl;
        })
        .map((item, index) => ({
          ...item,
          uniqueKey: `${item.imageUrl}-${index}` // Eindeutiger Key für Svelte each
        }));
      
      console.log("Gallery loaded:", galleryItems.length, "valid items (from", rawGalleryItems.length, "total)");
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
    // Prüfe ob es ein Bild des aktuellen Benutzers ist
    if (galleryItem.userid !== currentUid) {
      alert('You can only remove your own favorites!');
      return;
    }
    
    try {
      // Entferne uniqueKey vor dem Senden an den Server - Server erwartet originales Format
      const { uniqueKey, ...imageData } = galleryItem;
      
      console.log('Original galleryItem:', galleryItem);
      console.log('Sending to server (without uniqueKey):', imageData);
      
      await serverImages.removeFromFavorites(imageData);
      // Galerie neu laden
      await loadGallery();
    } catch (err) {
      console.error('Error removing favorite:', err);
      alert('Error removing favorite: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }

  // Funktion zum Herunterladen eines Bildes
  /** 
   * @param {string} imageUrl 
   * @param {string} prompt 
   */
  async function downloadImage(imageUrl, prompt) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Erstelle einen Download-Link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      // Generiere Dateinamen aus dem Prompt (die ersten 50 Zeichen, bereinigt)
      const fileName = prompt ? 
        prompt.substring(0, 50).replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.jpg' :
        'favorite_image.jpg';
      
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
      alert('Error downloading image: ' + (err instanceof Error ? err.message : 'Unknown error'));
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
  <title>Image Gallery | Stablehub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <div class="gallery-container">
      <h1>Community Gallery</h1>
      <p class="gallery-description">Discover favorite images from all users. Click to copy prompts and download images you like!</p>
      
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
          <p>No favorite images yet. Generate images and mark them as favorites to see them here.</p>
        </div>
      {:else}
        <div class="image-grid">
          {#each galleryItems as galleryItem (galleryItem.uniqueKey)}
            <div class="gallery-item">
              <img 
                src={galleryItem.imageUrl} 
                alt="Favorite image" 
                class="gallery-image"
                on:error={handleImageError}
              />
              
              <!-- User Info Badge - bleibt immer sichtbar -->
              <div class="user-badge">
                <span class="user-id">{galleryItem.userid}</span>
                <span class="image-type">{galleryItem.type || 'text-to-image'}</span>
              </div>
              
              <!-- Action-Buttons - nur diese erscheinen beim Hover -->
              <div class="gallery-actions">
                <button class="action-button copy-button" on:click={() => copyPromptToClipboard(galleryItem.prompt)} title="Copy Prompt">
                  <img src="/icon/penIcon.svg" alt="Copy" />
                </button>
                <button class="action-button download-button" on:click={() => downloadImage(galleryItem.imageUrl, galleryItem.prompt)} title="Download Image">
                  <img src="/icon/downloadIcon.svg" alt="Download" />
                </button>
                <!-- Nur eigene Bilder löschen -->
                {#if galleryItem.userid === currentUid}
                  <button class="action-button remove-button" on:click={() => removeFavorite(galleryItem)} title="Remove from Favorites">
                    <img src="/icon/delete.svg" alt="Remove" />
                  </button>
                {/if}
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
    
    .gallery-container {
      padding: 0; /* Remove extra padding on mobile */
    }
    
    .image-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
      gap: 1rem !important;
    }
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
    margin: 1rem 0;
    font-size: 1.75rem;
  }
  
  .gallery-description {
    margin: 0 0 2rem 0;
    color: #888888;
    font-size: 1rem;
    line-height: 1.5;
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
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    padding: 1rem 0;
  }
  
  @media (min-width: 1400px) {
    .image-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  @media (max-width: 1200px) {
    .image-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 900px) {
    .image-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 600px) {
    .image-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
  
  .gallery-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: #1e1e1e;
  }
  
  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 12px;
  }
  
  .user-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-end;
    z-index: 20;
  }
  
  .user-id {
    background-color: rgba(252, 234, 43, 0.9);
    color: #121212;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    font-weight: 600;
    backdrop-filter: blur(5px);
  }
  
  .image-type {
    background-color: rgba(30, 30, 30, 0.9);
    color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.7rem;
    font-weight: 500;
    backdrop-filter: blur(5px);
  }
  
  .gallery-actions {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
    z-index: 10;
  }
  
  .gallery-item:hover .gallery-actions {
    opacity: 1;
    transform: translateY(0);
  }
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    background-color: rgba(30, 30, 30, 0.85);
  }
  
  .action-button:hover {
    background-color: rgba(40, 40, 40, 0.95);
    transform: scale(1.05);
  }
  
  .action-button img {
    width: 18px;
    height: 18px;
    filter: brightness(0) invert(1); /* Macht alle SVGs weiß */
  }
  
  /* Mobile: Buttons immer sichtbar auf Touch-Geräten */
  @media (hover: none) and (pointer: coarse) {
    .gallery-actions {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 600px) {
    .gallery-actions {
      flex-direction: row;
      gap: 0.5rem;
      bottom: 0.75rem;
      right: 0.75rem;
    }
    
    .action-button {
      width: 36px;
      height: 36px;
    }
  }
</style>
