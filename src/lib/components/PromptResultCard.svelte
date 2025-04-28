<script>
  export let prompt = "";
  export let imageUrls = []; // Mehrere Bilder als Array
  export let onEdit = () => {};
  
  // Funktion zum Herunterladen eines Bildes
  function downloadImage(imageUrl) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `ai-image-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div class="prompt-result-card">
  <div class="card-header">
    <img src="/icon/icon.svg" alt="AI Hub Icon" class="ai-icon" />
    <h3 class="prompt-text">{prompt}</h3>
  </div>
  
  <div class="images-grid" style="grid-template-columns: repeat({imageUrls.length}, 1fr);">
    {#each imageUrls as imageUrl, index}
      <div class="image-container">
        <img src={imageUrl} alt="Generiertes Bild {index + 1}" class="generated-image" />
        
        <div class="image-overlay">
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
  }
  
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1; /* Quadratische Thumbnails */
    margin: 0 auto;
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
</style>
