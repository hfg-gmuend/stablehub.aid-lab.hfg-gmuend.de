<script>
  //MrNoLook
  import { createEventDispatcher } from 'svelte';
  import { serverImages } from '$lib/stores/serverImages.js';
  import { user } from '$lib/stores/user.js';
  import { styles } from "$lib/config/styles.js";
  import { assets } from '$app/paths';
  import { onMount } from 'svelte';
  import { toast } from '$lib/stores/toastStore.js';
  
  const dispatch = createEventDispatcher();
  
  /** @type {string} */
  export let prompt = "";
  /** @type {string[]} */
  export let imageUrls = [];
  /** @type {string[]} */
  export let usedStyles = [];
  /** @type {string} */
  export let type = "text-to-image"; // Neuer Type-Parameter
  
  // Funktion zum Herunterladen eines Bildes
  /** @param {string} imageUrl */
  async function downloadImage(imageUrl) {
    try {
      // Generiere Dateinamen aus dem Prompt (die ersten 30 Zeichen, bereinigt)
      const fileName = prompt ? 
        prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.png' :
        `ai-image-${new Date().getTime()}.png`;

      // Für Blob-URLs: Direkter Download
      if (imageUrl.startsWith('blob:')) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Image downloaded successfully!');
        return;
      }

      // Für externe URLs: Fetch und Download als Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      
      // Erstelle Blob-URL für Download
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup Blob-URL
      URL.revokeObjectURL(blobUrl);
      
      // Success toast
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      // Fallback: Öffne in neuem Tab
      window.open(imageUrl, '_blank');
    }
  }
  
  // Initialisierung des Favoriten-Status für jedes Bild
  /** @type {boolean[]} */
  let favoriteStatus = imageUrls.map(() => false);
  /** @type {any[]} */
  let galleryItems = [];
  let galleryLoaded = false;
  
  // Lade die Galerie-Items beim Mounten
  async function loadGalleryStatus() {
    if (galleryLoaded) return; // Verhindere mehrfache Ladungen
    
    try {
      console.log('[PromptResultCard] Loading gallery status...');
      galleryItems = await serverImages.loadGallery();
      galleryLoaded = true;
      console.log('[PromptResultCard] Gallery loaded:', galleryItems.length, 'items');
      
      // Aktualisiere den Favoriten-Status
      favoriteStatus = imageUrls.map(url => {
        const isFavorite = galleryItems.some(item => item.imageUrl === url);
        console.log('[PromptResultCard] Image', url, 'is favorite:', isFavorite);
        return isFavorite;
      });
      console.log('[PromptResultCard] Favorite status updated:', favoriteStatus);
    } catch (error) {
      console.error('[PromptResultCard] Error loading gallery status:', error);
    }
  }
  
  // Lade den Status nur beim ersten Mount
  onMount(() => {
    loadGalleryStatus();
  });
  
  // Funktion zum Umschalten des Favoriten-Status
  /** @param {string} imageUrl @param {number} index */
  async function toggleFavorite(imageUrl, index) {
    console.log("Favorit umschalten:", imageUrl);
    
    // Wenn es eine Blob-URL ist, versuche die entsprechende Server-URL zu finden
    let serverImageUrl = imageUrl;
    if (imageUrl.startsWith('blob:')) {
      console.log('[PromptResultCard] Blob URL detected, trying to find server URL...');
      
      try {
        // Lade aktuelle Server-Bilder für den Benutzer
        const currentUserId = $user.userid || 'default';
        await serverImages.refreshAfterGenerationByType(type || 'text-to-image', currentUserId);
        
        // Warte kurz auf Store-Update
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Versuche das entsprechende Server-Bild zu finden (neuestes Bild mit gleichem Prompt)
        const allImages = $serverImages;
        const matchingImage = allImages.find(img => 
          img.prompt === prompt && 
          img.type === (type || 'text-to-image') &&
          !img.imageUrl?.startsWith('blob:')
        );
        
        if (matchingImage && matchingImage.imageUrl) {
          serverImageUrl = matchingImage.imageUrl;
          console.log('[PromptResultCard] Found matching server URL:', serverImageUrl);
        } else {
          toast.error('Please wait for the image to be uploaded to the server before adding it to favorites.');
          return;
        }
      } catch (error) {
        console.error('[PromptResultCard] Error finding server URL:', error);
        toast.error('Please wait for the image to be uploaded to the server before adding it to favorites.');
        return;
      }
    }
    
    try {
      const isCurrentlyFavorite = favoriteStatus[index];
      
      if (isCurrentlyFavorite) {
        // Entferne aus Favoriten
        const galleryItem = galleryItems.find(item => item.imageUrl === serverImageUrl);
        if (galleryItem) {
          // Entferne uniqueKey vor dem Senden an den Server - Server erwartet originales Format
          const { uniqueKey, ...imageData } = galleryItem;
          
          console.log('PromptResultCard - Original galleryItem:', galleryItem);
          console.log('PromptResultCard - Sending to server (without uniqueKey):', imageData);
          
          await serverImages.removeFromFavorites(imageData);
          // Aktualisiere nur den lokalen Status ohne neu zu laden
          favoriteStatus[index] = false;
          favoriteStatus = [...favoriteStatus]; // Trigger Svelte reactivity
          
          // Success toast
          toast.success('Removed from HfG Gallery');
        }
      } else {
        // Füge zu Favoriten hinzu
        await serverImages.addToFavorites({
          prompt,
          imageUrl: serverImageUrl,
          type: type || 'text-to-image', // Verwende den korrekten Typ
          styles: usedStyles
        });
        // Aktualisiere nur den lokalen Status ohne neu zu laden
        favoriteStatus[index] = true;
        favoriteStatus = [...favoriteStatus]; // Trigger Svelte reactivity
        
        // Success toast
        toast.success('Added to HfG Gallery as Favorite!');
        console.log('[PromptResultCard] Successfully added to favorites!');
      }
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('Error updating favorites: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }
  
  // Funktion zum Kopieren des Prompts in die Zwischenablage
  async function copyPromptToClipboard() {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success('Prompt copied to clipboard!');
      
      // Dispatch event to add prompt to prompt area
      dispatch('copyPrompt', { prompt: prompt });
    } catch (error) {
      console.error('Error copying prompt:', error);
      toast.error('Failed to copy prompt');
    }
  }
</script>

<div class="prompt-result-card">
  <div class="card-header">
    <img src="{assets}/icon/icon.svg" alt="Stablehub Icon" class="ai-icon" />
    <h3 class="prompt-text">{prompt}</h3>
  </div>
  
  <div class="images-grid" 
       class:single-image={imageUrls.length === 1}
       class:two-images={imageUrls.length === 2}
       class:three-images={imageUrls.length === 3}
       class:multiple-images={imageUrls.length > 3}>
    {#each imageUrls as imageUrl, index}
      <div class="image-container">
        <img src={imageUrl} alt="Generiertes Bild {index + 1}" class="generated-image" />
        
        <div class="image-overlay">
          <div class="action-buttons top-left">
            <button class="action-button favorite-button {favoriteStatus[index] ? 'active' : ''}" 
                    on:click={() => toggleFavorite(imageUrl, index)}>
              <span class="favorite-icon">{favoriteStatus[index] ? '★' : '☆'}</span>
            </button>
          </div>
          
          <div class="action-buttons">
            <button class="action-button copy-button" on:click={copyPromptToClipboard} title="Copy Prompt">
              <img src="/icon/penIcon.svg" alt="Copy Prompt" />
            </button>
            <button class="action-button download-button" on:click={() => downloadImage(imageUrl)} title="Download Image">
              <img src="/icon/downloadIcon.svg" alt="Download" />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Anzeige der verwendeten Stile -->
  {#if usedStyles && usedStyles.length > 0}
    <div class="used-styles">
      {#each usedStyles as styleId}
        {#if styles.find(s => s.id === styleId)}
          <div class="used-style-tag">
            {styles.find(s => s.id === styleId)?.name}
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .prompt-result-card {
    background-color: #1e1e1e;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #333;
  }
  
  .ai-icon {
    width: 24px;
    height: 24px;
    margin-right: 1rem;
  }
  
  .prompt-text {
    margin: 0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
    color: #ffffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .images-grid {
    display: grid;
    gap: 8px;
    padding: 8px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  /* Spezielles Styling für einzelne Bilder */
  .single-image {
    grid-template-columns: 1fr;
    max-width: 65%; /* Kleinere Skalierung für einzelne Bilder */
    margin: 0 auto; /* Zentrieren des einzelnen Bildes */
    padding: 1.5rem; /* Mehr Padding für ein einzelnes Bild */
  }
  
  /* 2 Bilder: Nebeneinander in gleicher Größe */
  .two-images {
    grid-template-columns: 1fr 1fr;
    max-width: 80%;
    margin: 0 auto;
  }
  
  /* 3 Bilder: Alle nebeneinander */
  .three-images {
    grid-template-columns: 1fr 1fr 1fr;
    max-width: 90%;
    margin: 0 auto;
  }
  
  /* Mehr als 3 Bilder: Responsives Grid */
  .multiple-images {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    max-width: 100%;
  }
  
  /* Mobile Responsive Anpassungen */
  @media (max-width: 768px) {
    .single-image {
      max-width: 90%;
      padding: 1rem;
    }
    
    .two-images {
      grid-template-columns: 1fr 1fr;
      max-width: 95%;
      gap: 6px;
      padding: 6px;
    }
    
    .three-images {
      grid-template-columns: 1fr 1fr 1fr;
      max-width: 100%;
      gap: 4px;
      padding: 4px;
    }
    
    .multiple-images {
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 4px;
      padding: 4px;
    }
    
    .image-container {
      aspect-ratio: 1;
    }
  }
  
  @media (max-width: 480px) {
    .three-images {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
    
    .three-images .image-container:nth-child(3) {
      grid-column: 1 / -1;
      max-width: 60%;
      margin: 0 auto;
    }
  }
  
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1; /* Quadratische Thumbnails */
    overflow: hidden;
  }
  
  .generated-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Bilder gleichmäßig füllen */
    display: block;
    transition: transform 0.2s ease;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent);
    opacity: 0;
    transition: opacity 0.2s ease;
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }
  
  .action-button {
    background-color: rgba(30, 30, 30, 0.85);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  
  .action-button:hover {
    background-color: rgba(40, 40, 40, 0.95);
    transform: scale(1.05);
  }
  
  .action-button img {
    width: 18px;
    height: 18px;
  }
  
  .image-container:hover .generated-image {
    transform: scale(1.02);
    box-shadow: 0 0 0 2px #ffffff;
  }
  
  .image-container:hover .image-overlay {
    opacity: 1;
  }
  
  .top-left {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }
  
  .favorite-button {
    color: #FCEA2B;
  }
  
  .favorite-button.active {
    background-color: rgba(252, 234, 43, 0.2);
  }
  
  .favorite-icon {
    font-size: 1.2rem;
    line-height: 1;
  }
  
  .action-button img {
    width: 18px;
    height: 18px;
  }
  
  /* Stil-Tags unter dem Bild */
  .used-styles {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.75rem;
    border-top: 1px solid #333;
  }
  
  .used-style-tag {
    background-color: rgba(252, 234, 43, 0.15);
    color: #FCEA2B;
    padding: 0.3rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    display: inline-flex;
    align-items: center;
    border: 1px solid rgba(252, 234, 43, 0.3);
  }
</style>
