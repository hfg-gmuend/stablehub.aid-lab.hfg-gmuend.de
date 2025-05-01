<script>
  //MrNoLook
  import { favorites } from '$lib/stores/favorites';
  import { styles } from "$lib/config/styles.js";
  
  export let prompt = "";
  export let imageUrls = [];
  export let onEdit = () => {};
  // Neue Prop für die Styles
  export let usedStyles = [];
  
  // Funktion zum Herunterladen eines Bildes
  function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Initialisierung des Favoriten-Status für jedes Bild
  let favoriteStatus = imageUrls.map(url => $favorites.some(fav => fav.imageUrl === url));
  
  // Funktion zum Umschalten des Favoriten-Status
  function toggleFavorite(imageUrl, index) {
    const isFavorite = $favorites.some(fav => fav.imageUrl === imageUrl);
    
    if (isFavorite) {
      favorites.remove(imageUrl);
    } else {
      favorites.add({
        imageUrl,
        prompt,
        timestamp: new Date().toISOString()
      });
    }
    
    // Favoriten-Status aktualisieren
    favoriteStatus[index] = !favoriteStatus[index];
  }
</script>

<div class="prompt-result-card">
  <div class="card-header">
    <img src="/icon/icon.svg" alt="AI Hub Icon" class="ai-icon" />
    <h3 class="prompt-text">{prompt}</h3>
  </div>
  
  <div class="images-grid" class:single-image={imageUrls.length === 1}>
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
            <button class="action-button edit-button" on:click={() => onEdit(prompt)}>
              <img src="/icon/penIcon.svg" alt="Bearbeiten" />
            </button>
            <button class="action-button download-button" on:click={() => downloadImage(imageUrl)}>
              <img src="/icon/downloadIcon.svg" alt="Herunterladen" />
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
            {styles.find(s => s.id === styleId).name}
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
