<script>
  import MinimalSidebar from "$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte";
  import NavigationBar from "$lib/components/NavigationBar.svelte";
  import { favorites } from '$lib/stores/favorites';
  
  // Zustand für das angezeigte Prompt
  let displayPrompt = null;
  
  // Funktion zum Kopieren des Prompts in die Zwischenablage
  async function copyPromptToClipboard(prompt) {
    try {
      await navigator.clipboard.writeText(prompt);
      // Kurze Rückmeldung anzeigen
      alert("Prompt in die Zwischenablage kopiert!");
    } catch (err) {
      console.error('Fehler beim Kopieren: ', err);
    }
  }
  
  // Funktion zum Entfernen eines Favoriten
  function removeFavorite(imageUrl) {
    favorites.remove(imageUrl);
  }
</script>

<svelte:head>
  <title>Bildergalerie | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <NavigationBar active="gallery" />
    
    <div class="gallery-container">
      <h1>Favorisierte Bilder</h1>
      
      {#if $favorites.length === 0}
        <div class="empty-gallery">
          <p>Noch keine favorisierten Bilder. Generiere Bilder und markiere sie als Favoriten.</p>
        </div>
      {:else}
        <div class="image-grid">
          {#each $favorites as favorite (favorite.imageUrl)}
            <div class="gallery-item"
                 on:mouseenter={() => displayPrompt = favorite.imageUrl}
                 on:mouseleave={() => displayPrompt = null}>
              <img src={favorite.imageUrl} alt="Favorisiertes Bild" class="gallery-image" />
              
              {#if displayPrompt === favorite.imageUrl}
                <div class="prompt-overlay">
                  <p class="prompt-text">{favorite.prompt}</p>
                  <div class="action-buttons">
                    <button class="copy-button" on:click={() => copyPromptToClipboard(favorite.prompt)}>
                      <span class="copy-icon">📋</span> Kopieren
                    </button>
                    <button class="remove-button" on:click={() => removeFavorite(favorite.imageUrl)}>
                      <span class="remove-icon">🗑️</span> Entfernen
                    </button>
                  </div>
                </div>
              {/if}
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
  
  .action-buttons {
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
