<script>
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import LikeButton from "$lib/components/LikeButton.svelte";
  import GalleryFilters from "$lib/components/GalleryFilters.svelte";
  import { serverImages } from '$lib/stores/serverImages.js';
  import { user } from '$lib/stores/user.js';
  import { voteService } from '$lib/api/voteService.js';
  import { onMount } from 'svelte';
  import { toast } from '$lib/stores/toastStore.js';
  
  // Zustand für die Gallery
  /** @type {any[]} */
  let galleryItems = [];
  /** @type {any[]} */
  let filteredGalleryItems = [];
  let loading = true;
  /** @type {string | null} */
  let error = null;
  
  // Vote-System State
  /** @type {Map<string, boolean>} */
  let userVotes = new Map(); // imageUrl -> boolean (liked/not liked)
  /** @type {Map<string, number>} */
  let voteCounts = new Map(); // imageUrl -> count
  /** @type {Set<string>} */
  let votingInProgress = new Set(); // imageUrls currently being voted on
  
  // Filter State
  /** @type {'all' | 'my' | 'liked' | 'newest'} */
  let activeFilter = 'all';
  
  // Set für Bilder, die gerade gelöscht werden
  /** @type {Set<string>} */
  let deletingImages = new Set();
  
  // Overlay-State für Bildanzeige
  let showImageOverlay = false;
  let currentImageIndex = 0;
  /** @type {any} */
  let currentImage = null;
  
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
          // Strikt nur HTTP/HTTPS URLs erlauben - keine Blob URLs mehr!
          const isValidUrl = item.imageUrl && 
            typeof item.imageUrl === 'string' &&
            (item.imageUrl.startsWith('http://') || 
             item.imageUrl.startsWith('https://'));
          
          // Blob URLs komplett ausschließen
          if (item.imageUrl && item.imageUrl.startsWith('blob:')) {
            console.warn('[Gallery] Filtering out blob URL (not allowed):', item.imageUrl);
            return false;
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
      
      // Vote-Daten laden
      await loadVoteData();
      
      // Filter anwenden
      applyFilter();
      
      // Zusätzliche Bereinigung nach dem Laden
      cleanGalleryData();
    } catch (err) {
      console.error('Error loading gallery:', err);
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }

  // Vote-System Funktionen
  async function loadVoteData() {
    try {
      console.log('[Gallery] Loading vote data...');
      
      // Verwende vollständige imageUrls statt extrahierte IDs
      const imageUrls = galleryItems.map(item => item.imageUrl).filter(url => url);
      
      if (imageUrls.length === 0) {
        console.log('[Gallery] No images to load votes for');
        return;
      }
      
      // Lade Vote-Counts für alle Bilder (mit imageUrls als "imageId")
      // getBatchVoteStats lädt jetzt User-Votes nur EINMAL intern
      const voteStatsMap = await voteService.getBatchVoteStats(imageUrls, $user.userid || undefined);
      
      // ENTFERNT: Separater getUserVotes Aufruf da das bereits in getBatchVoteStats passiert
      // Das reduziert API-Calls von 66+ auf nur 1!
      
      // Vote-Maps aktualisieren
      voteCounts.clear();
      userVotes.clear();
      
      voteStatsMap.forEach((stats, imageUrl) => {
        voteCounts.set(imageUrl, stats.totalVotes);
        userVotes.set(imageUrl, stats.userHasVoted);
      });
      
      // Trigger reactivity
      voteCounts = voteCounts;
      userVotes = userVotes;
      
      console.log('[Gallery] Vote data loaded:', {
        voteCounts: voteCounts.size,
        userVotes: userVotes.size
      });
      
    } catch (error) {
      console.error('[Gallery] Error loading vote data:', error);
      // Nicht kritisch, weiter machen
    }
  }

  /** @param {any} imageUrl */
  function extractImageId(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') return null;
    
    try {
      const url = new URL(imageUrl);
      const pathname = url.pathname;
      const filename = pathname.split('/').pop();
      
      if (filename) {
        // Entferne Dateiendung
        return filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
      }
      
      return null;
    } catch (error) {
      console.warn('[Gallery] Error extracting image ID from URL:', imageUrl, error);
      return null;
    }
  }

  /** @param {any} event */
  async function handleVoteToggle(event) {
    const { imageId, isLiked } = event.detail;
    
    if (!$user.userid || $user.userid === 'default') {
      toast.error('Please log in to like images');
      return;
    }
    
    // imageId ist hier eigentlich die imageUrl
    const imageUrl = imageId;
    
    if (votingInProgress.has(imageUrl)) {
      return; // Already processing
    }
    
    try {
      votingInProgress.add(imageUrl);
      votingInProgress = votingInProgress;
      
      if (isLiked) {
        // Remove vote
        await voteService.removeVote(imageUrl, $user.userid);
        userVotes.delete(imageUrl);
        voteCounts.set(imageUrl, Math.max(0, (voteCounts.get(imageUrl) || 0) - 1));
        toast.success('Removed like');
      } else {
        // Add vote
        await voteService.addVote(imageUrl, $user.userid);
        userVotes.set(imageUrl, true);
        voteCounts.set(imageUrl, (voteCounts.get(imageUrl) || 0) + 1);
        toast.success('Added like');
      }
      
      // Trigger reactivity
      userVotes = userVotes;
      voteCounts = voteCounts;
      
      // Filter neu anwenden falls nötig
      if (activeFilter === 'liked') {
        applyFilter();
      }
      
    } catch (error) {
      console.error('[Gallery] Error toggling vote:', error);
      toast.error('Failed to update like: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      votingInProgress.delete(imageUrl);
      votingInProgress = votingInProgress;
    }
  }

  // Funktion zum Bereinigen der Galerie-Daten
  function cleanGalleryData() {
    const originalLength = galleryItems.length;
    galleryItems = galleryItems.filter(item => {
      // Entferne alle Bilder mit Blob URLs
      if (item.imageUrl && item.imageUrl.startsWith('blob:')) {
        console.warn('[Gallery] Removing blob URL from gallery:', item.imageUrl);
        return false;
      }
      // Entferne alle Bilder ohne gültige imageUrl
      if (!item.imageUrl || !item.imageUrl.startsWith('http')) {
        console.warn('[Gallery] Removing invalid image URL:', item.imageUrl);
        return false;
      }
      return true;
    });
    
    if (originalLength !== galleryItems.length) {
      console.log(`[Gallery] Cleaned ${originalLength - galleryItems.length} invalid images from gallery`);
      toast.info(`Removed ${originalLength - galleryItems.length} invalid images from gallery`);
    }
  }
  
  // Beim Mounten der Komponente
  onMount(async () => {
    await loadGallery();
  });
  
  // Reaktive Statements
  $: {
    if (currentUid) {
      console.log("[Gallery] UID changed to:", currentUid);
      loadGallery();
    }
  }

  // Automatisch Filter anwenden wenn sich die Gallery Items ändern
  $: if (galleryItems.length > 0) {
    applyFilter();
  }
  
  // Funktion zum Kopieren des Prompts in die Zwischenablage
  /** @param {string} prompt */
  async function copyPromptToClipboard(prompt) {
    try {
      await navigator.clipboard.writeText(prompt);
      // Toast-Notification statt Alert
      toast.success('Prompt copied to clipboard!');
    } catch (err) {
      console.error('Error copying: ', err);
      toast.error('Failed to copy prompt');
    }
  }
  
  // Funktion zum Entfernen eines Favoriten
  /** @param {any} galleryItem */
  async function removeFavorite(galleryItem) {
    // Prüfe ob es ein Bild des aktuellen Benutzers ist
    if (galleryItem.userid !== currentUid) {
      toast.error('You can only remove your own favorites!');
      return;
    }
    
    // Sofortiges Ausblenden: Bild zum deletingImages Set hinzufügen
    deletingImages.add(galleryItem.uniqueKey);
    deletingImages = deletingImages; // Trigger Reactivity
    
    try {
      // Entferne uniqueKey vor dem Senden an den Server - Server erwartet originales Format
      const { uniqueKey, ...imageData } = galleryItem;
      
      console.log('Original galleryItem:', galleryItem);
      console.log('Sending to server (without uniqueKey):', imageData);
      
      await serverImages.removeFromFavorites(imageData);
      
      // Erfolgreiche Toast-Notification
      toast.success('Deleted from HfG Gallery');
      
      // Galerie neu laden
      await loadGallery();
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast.error('Error removing favorite: ' + (err instanceof Error ? err.message : 'Unknown error'));
      
      // Bei Fehler: Bild wieder anzeigen
      deletingImages.delete(galleryItem.uniqueKey);
      deletingImages = deletingImages; // Trigger Reactivity
    } finally {
      // Nach erfolgreichem Löschen oder Fehler: aus deletingImages entfernen
      deletingImages.delete(galleryItem.uniqueKey);
      deletingImages = deletingImages; // Trigger Reactivity
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
      
      // Erfolgreiche Toast-Notification
      toast.success('Image downloaded successfully!');
    } catch (err) {
      console.error('Error downloading image:', err);
      toast.error('Error downloading image: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  }
  
  // Funktion zum Behandeln von Bildlade-Fehlern
  /** @param {Event} event */
  function handleImageError(event) {
    console.error("Error loading image:", event);
    const target = /** @type {HTMLImageElement} */ (event.target);
    
    // Log the problematic URL to debug
    console.error('Failed to load image URL:', target.src);
    
    // Remove the problematic image from gallery if it's a blob URL
    if (target.src.startsWith('blob:')) {
      console.warn('Removing blob URL image from gallery:', target.src);
      
      // Remove from galleryItems array
      galleryItems = galleryItems.filter(item => {
        if (item.imageUrl && item.imageUrl.startsWith('blob:')) {
          console.warn('Filtering out blob URL:', item.imageUrl);
          return false;
        }
        return true;
      });
      
      toast.error('Removed invalid image from gallery');
    }
    
    target.onerror = null;
    target.style.display = 'none'; // Verstecke das Bild wenn es nicht geladen werden kann
  }
  
  // Overlay-Funktionen
  /** @param {any} galleryItem @param {number} index */
  function openImageOverlay(galleryItem, index) {
    currentImage = galleryItem;
    currentImageIndex = index;
    showImageOverlay = true;
    document.body.style.overflow = 'hidden'; // Verhindere Scrollen im Hintergrund
  }
  
  function closeImageOverlay() {
    showImageOverlay = false;
    currentImage = null;
    document.body.style.overflow = 'auto';
  }
  
  function nextImage() {
    if (currentImageIndex < galleryItems.length - 1) {
      currentImageIndex++;
      currentImage = galleryItems[currentImageIndex];
    }
  }
  
  function prevImage() {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      currentImage = galleryItems[currentImageIndex];
    }
  }
  
  // Keyboard Navigation
  /** @param {KeyboardEvent} event */
  function handleKeydown(event) {
    if (!showImageOverlay) return;
    
    switch(event.key) {
      case 'Escape':
        closeImageOverlay();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }
  
  // Funktion zum Behandeln von Filteränderungen
  /** @param {CustomEvent} event */
  function handleFilterChange(event) {
    activeFilter = event.detail;
    applyFilter();
  }

  // Funktion zum Anwenden des Filters
  function applyFilter() {
    let filtered = [...galleryItems];
    
    switch (activeFilter) {
      case 'my':
        if ($user.userid && $user.userid !== 'default') {
          filtered = filtered.filter(item => item.userid === $user.userid);
        } else {
          filtered = [];
        }
        break;
        
      case 'liked':
        // Sortiere nach Vote-Count (absteigend)
        filtered = filtered.sort((a, b) => {
          const aCount = voteCounts.get(a.imageUrl) || 0;
          const bCount = voteCounts.get(b.imageUrl) || 0;
          return bCount - aCount;
        });
        break;
        
      case 'newest':
        // Sortiere nach Timestamp (neueste zuerst)
        filtered = filtered.sort((a, b) => {
          return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
        });
        break;
        
      default: // 'all'
        // Standard-Sortierung (neueste zuerst)
        filtered = filtered.sort((a, b) => {
          return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
        });
        break;
    }
    
    filteredGalleryItems = filtered;
    console.log(`[Gallery] Applied filter '${activeFilter}': ${filtered.length} items`);
  }
</script>

<svelte:head>
  <title>Image Gallery | Stablehub</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="app-container">
  <MinimalSidebar />
  <main>
    <div class="gallery-container">
      <div class="gallery-header">
        <div>
          <h1>Community Gallery</h1>
          <p class="gallery-description">Discover favorite images from all users. Click to copy prompts and download images you like!</p>
        </div>
        <div class="gallery-controls">
          <button on:click={loadGallery} class="control-button" title="Refresh Gallery">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
            Refresh
          </button>
          <button on:click={cleanGalleryData} class="control-button" title="Clean Invalid Images">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              <path d="M10 11v6"/>
              <path d="M14 11v6"/>
            </svg>
            Clean
          </button>
        </div>
      </div>
      
      <!-- Gallery Filters -->
      <GalleryFilters 
        {activeFilter}
        isLoggedIn={Boolean($user.userid && $user.userid !== 'default')}
        on:filterChange={handleFilterChange}
      />
      
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
      {:else if filteredGalleryItems.length === 0}
        <div class="empty-gallery">
          {#if activeFilter === 'my' && (!$user.userid || $user.userid === 'default')}
            <p>Please log in to see your favorite images.</p>
          {:else if activeFilter === 'my'}
            <p>You haven't added any images to your favorites yet.</p>
          {:else if activeFilter === 'liked'}
            <p>No highly liked images found.</p>
          {:else}
            <p>No favorite images yet. Generate images and mark them as favorites to see them here.</p>
          {/if}
        </div>
      {:else}
        <div class="image-grid">
          {#each filteredGalleryItems as galleryItem, index (galleryItem.uniqueKey)}
            <div class="gallery-item" class:deleting={deletingImages.has(galleryItem.uniqueKey)}>
              {#if deletingImages.has(galleryItem.uniqueKey)}
                <!-- Loading Placeholder während des Löschens -->
                <div class="delete-placeholder">
                  <div class="delete-spinner"></div>
                  <p>Deleting...</p>
                </div>
              {:else}
                <button 
                  class="gallery-image-button"
                  on:click={() => openImageOverlay(galleryItem, index)}
                  aria-label="View image in fullscreen"
                >
                  <img 
                    src={galleryItem.imageUrl} 
                    alt={galleryItem.prompt || 'Generated image'} 
                    class="gallery-image"
                    on:error={handleImageError}
                  />
                </button>
              {/if}
              
              <!-- User Info Badge - bleibt immer sichtbar -->
              <div class="user-badge">
                <span class="user-id">{galleryItem.userid}</span>
                <span class="image-type">{galleryItem.type || 'text-to-image'}</span>
              </div>
              
              <!-- Like-Button - oben links -->
              <div class="like-button-container">
                <LikeButton
                  imageId={galleryItem.imageUrl}
                  isLiked={userVotes.get(galleryItem.imageUrl) || false}
                  likeCount={voteCounts.get(galleryItem.imageUrl) || 0}
                  loading={votingInProgress.has(galleryItem.imageUrl)}
                  disabled={deletingImages.has(galleryItem.uniqueKey)}
                  on:toggle={handleVoteToggle}
                />
              </div>
              
              <!-- Action-Buttons - nur diese erscheinen beim Hover -->
              <div class="gallery-actions">
                <button 
                  class="action-button copy-button" 
                  on:click={() => copyPromptToClipboard(galleryItem.prompt)} 
                  title="Copy Prompt"
                  disabled={deletingImages.has(galleryItem.uniqueKey)}
                >
                  <img src="/icon/penIcon.svg" alt="Copy" />
                </button>
                <button 
                  class="action-button download-button" 
                  on:click={() => downloadImage(galleryItem.imageUrl, galleryItem.prompt)} 
                  title="Download Image"
                  disabled={deletingImages.has(galleryItem.uniqueKey)}
                >
                  <img src="/icon/downloadIcon.svg" alt="Download" />
                </button>
                <!-- Nur eigene Bilder löschen -->
                {#if galleryItem.userid === currentUid}
                  <button 
                    class="action-button remove-button" 
                    on:click={() => removeFavorite(galleryItem)} 
                    title="Remove from Favorites"
                    disabled={deletingImages.has(galleryItem.uniqueKey)}
                  >
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

<!-- Image Overlay -->
{#if showImageOverlay && currentImage}
  <div class="image-overlay" on:click={closeImageOverlay} on:keydown={handleKeydown} role="dialog" aria-modal="true" tabindex="-1">>
    <div class="overlay-background"></div>
    
    <!-- Overlay Layout Container -->
    <div class="overlay-layout">
      <!-- Left Navigation Button -->
      {#if currentImageIndex > 0}
        <button class="nav-button nav-prev" on:click|stopPropagation={prevImage} aria-label="Previous image">>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      {:else}
        <div class="nav-spacer"></div>
      {/if}
      
      <!-- Main Content -->
      <div class="overlay-content" role="main" tabindex="-1">>
        <div class="overlay-image-container">
          <img 
            src={currentImage.imageUrl} 
            alt="Enlarged view" 
            class="overlay-image"
          />
        </div>
        
        <!-- Image Info -->
        <div class="overlay-info">
          <div class="overlay-header">
            <div class="overlay-user-info">
              <span class="overlay-user-id">{currentImage.userid}</span>
              <span class="overlay-image-type">{currentImage.type || 'text-to-image'}</span>
            </div>
            <div class="overlay-counter">
              {currentImageIndex + 1} / {galleryItems.length}
            </div>
          </div>
          
          {#if currentImage.prompt}
            <div class="overlay-prompt">
              <div class="prompt-label">Prompt:</div>
              <div class="prompt-text">{currentImage.prompt}</div>
            </div>
          {/if}
          
          <!-- Action Buttons -->
          <div class="overlay-actions">
            <button 
              class="overlay-action-button copy-btn" 
              on:click={() => copyPromptToClipboard(currentImage.prompt)}
              title="Copy Prompt"
            >
              <img src="/icon/penIcon.svg" alt="Copy" />
              Copy Prompt
            </button>
            <button 
              class="overlay-action-button download-btn" 
              on:click={() => downloadImage(currentImage.imageUrl, currentImage.prompt)}
              title="Download Image"
            >
              <img src="/icon/downloadIcon.svg" alt="Download" />
              Download
            </button>
            {#if currentImage.userid === currentUid}
              <button 
                class="overlay-action-button remove-btn" 
                on:click={() => removeFavorite(currentImage)}
                title="Remove from Favorites"
              >
                <img src="/icon/delete.svg" alt="Remove" />
                Remove
              </button>
            {/if}
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation (only visible on mobile) -->
      <div class="mobile-nav-container">
        <button 
          class="mobile-nav-button" 
          class:disabled={currentImageIndex === 0}
          on:click|stopPropagation={prevImage}
          disabled={currentImageIndex === 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          Previous
        </button>
        <button 
          class="mobile-nav-button" 
          class:disabled={currentImageIndex === galleryItems.length - 1}
          on:click|stopPropagation={nextImage}
          disabled={currentImageIndex === galleryItems.length - 1}
        >
          Next
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      <!-- Right Navigation Button -->
      {#if currentImageIndex < galleryItems.length - 1}
        <button class="nav-button nav-next" on:click|stopPropagation={nextImage} aria-label="Next image">>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      {:else}
        <div class="nav-spacer"></div>
      {/if}
    </div>
    
    <!-- Close Button -->
    <div class="overlay-close-container">
      <button class="close-button" on:click={closeImageOverlay} aria-label="Close fullscreen view">>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
{/if}

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

  /* Mobile Navigation */
  .mobile-nav-container {
    display: none; /* Hidden on desktop */
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    background: rgba(18, 18, 18, 0.9);
    border-top: 1px solid rgba(68, 68, 68, 0.5);
  }
  
  .mobile-nav-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(30, 30, 30, 0.9);
    border: 2px solid rgba(252, 234, 43, 0.5);
    color: #FCEA2B;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    flex: 1;
    justify-content: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .mobile-nav-button:hover:not(:disabled) {
    background: rgba(252, 234, 43, 0.9);
    color: #121212;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(252, 234, 43, 0.4);
  }
  
  .mobile-nav-button:disabled,
  .mobile-nav-button.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    background: rgba(30, 30, 30, 0.5);
    border-color: rgba(68, 68, 68, 0.3);
    color: #666;
  }
  
  .mobile-nav-button:disabled:hover,
  .mobile-nav-button.disabled:hover {
    background: rgba(30, 30, 30, 0.5);
    color: #666;
    transform: none;
    box-shadow: none;
  }
  
  /* === GLOBAL STYLES === */
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
  
  .gallery-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .gallery-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .control-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: rgba(30, 30, 30, 0.8);
    color: #e0e0e0;
    border: 1px solid rgba(68, 68, 68, 0.6);
    border-radius: 8px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .control-button:hover {
    background: rgba(252, 234, 43, 0.15);
    border-color: #FCEA2B;
    color: #FCEA2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(252, 234, 43, 0.2);
  }
  
  .control-button svg {
    transition: transform 0.3s ease;
  }
  
  .control-button:hover svg {
    transform: scale(1.1);
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
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
  
  .gallery-item {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease;
    background-color: #1e1e1e;
  }
  
  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }
  
  /* Deleting State */
  .gallery-item.deleting {
    opacity: 0.7;
    transform: scale(0.95);
    pointer-events: none;
  }
  
  /* Delete Placeholder */
  .delete-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
    color: #888888;
  }
  
  .delete-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #333333;
    border-top: 3px solid #FCEA2B;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.5rem;
  }
  
  .delete-placeholder p {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    margin: 0;
  }
  
  .gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .gallery-image-button {
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .gallery-image-button:focus {
    outline: 2px solid #FCEA2B;
    outline-offset: 2px;
  }
  
  .gallery-image:hover,
  .gallery-image-button:hover .gallery-image {
    transform: scale(1.02);
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
  
  /* Like-Button Container */
  .like-button-container {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
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
  
  .action-button:hover:not(:disabled) {
    background-color: rgba(40, 40, 40, 0.95);
    transform: scale(1.05);
  }
  
  .action-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .action-button img {
    width: 18px;
    height: 18px;
    filter: brightness(0) invert(1); /* Macht alle SVGs weiß */
  }
  
  .action-button:disabled img {
    filter: brightness(0) invert(1) opacity(0.5);
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
  
  /* === IMAGE OVERLAY STYLES === */
  .image-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: overlayFadeIn 0.3s ease-out;
  }
  
  .overlay-layout {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
    max-width: 100vw;
    z-index: 1001;
    position: relative;
  }
  
  .overlay-close-container {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 1003;
  }
  
  .nav-spacer {
    width: 60px;
    flex-shrink: 0;
  }
  
  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  .overlay-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(20px);
  }
  
  .overlay-content {
    position: relative;
    z-index: 1001;
    max-width: 80vw;
    max-height: 95vh;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background: rgba(24, 24, 24, 0.95);
    border-radius: 16px;
    border: 1px solid rgba(252, 234, 43, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    overflow-y: auto;
    overflow-x: hidden;
    animation: overlaySlideIn 0.4s ease-out;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  
  /* Custom Scrollbar für das Overlay */
  .overlay-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .overlay-content::-webkit-scrollbar-track {
    background: rgba(30, 30, 30, 0.8);
    border-radius: 4px;
  }
  
  .overlay-content::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #FCEA2B, #FFE566);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  .overlay-content::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #FFE566, #FCEA2B);
  }
  
  /* Firefox Scrollbar */
  .overlay-content {
    scrollbar-width: thin;
    scrollbar-color: #FCEA2B rgba(30, 30, 30, 0.8);
  }
  
  @keyframes overlaySlideIn {
    from {
      transform: scale(0.9) translateY(20px);
      opacity: 0;
    }
    to {
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }
  
  .overlay-image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    width: 100%;
    height: 70vh;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  
  .overlay-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    display: block;
  }
  
  .overlay-info {
    padding: 1.5rem;
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(68, 68, 68, 0.5);
    max-width: 100%;
    min-width: 600px;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  
  .overlay-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .overlay-user-info {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .overlay-user-id {
    background: linear-gradient(135deg, #FCEA2B, #FFE566);
    color: #121212;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 700;
  }
  
  .overlay-image-type {
    background: rgba(46, 46, 46, 0.8);
    color: #e0e0e0;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    border: 1px solid rgba(68, 68, 68, 0.5);
  }
  
  .overlay-counter {
    background: rgba(30, 30, 30, 0.8);
    color: #FCEA2B;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid rgba(252, 234, 43, 0.3);
  }
  
  .overlay-prompt {
    margin-bottom: 1.5rem;
  }
  
  .prompt-label {
    color: #FCEA2B;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .prompt-text {
    color: #e0e0e0;
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 1rem;
    background: rgba(30, 30, 30, 0.6);
    border-radius: 8px;
    border-left: 3px solid #FCEA2B;
    font-family: system-ui, -apple-system, sans-serif;
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    hyphens: auto;
    overflow: hidden;
  }
  
  .overlay-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  
  .overlay-action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .copy-btn {
    background: linear-gradient(135deg, #FCEA2B, #FFE566);
    color: #121212;
    border: 1px solid rgba(252, 234, 43, 0.3);
  }
  
  .download-btn {
    background: linear-gradient(135deg, #4caf50, #81e785);
    color: #121212;
    border: 1px solid rgba(76, 175, 80, 0.3);
  }
  
  .remove-btn {
    background: linear-gradient(135deg, #f44336, #ff7961);
    color: #121212;
    border: 1px solid rgba(244, 67, 54, 0.3);
  }
  
  .overlay-action-button:hover {
    filter: brightness(1.1);
  }
  
  /* Mobile Styles for Overlay */
  @media (max-width: 600px) {
    .overlay-info {
      min-width: auto;
      width: 100%;
    }
    
    .prompt-text {
      font-size: 0.8rem;
    }
  }
</style>
