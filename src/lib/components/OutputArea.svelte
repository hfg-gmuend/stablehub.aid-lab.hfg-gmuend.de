<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  // Props
  export let loading: boolean = false;
  export let images: string[] = [];
  export let prompt: string = "";
  export let error: string | null = null;
  export let imageCount: number = 1;
  
  // Event dispatcher
  const dispatch = createEventDispatcher<{
    generate: { imageCount: number };
    save: { imageUrl: string };
    share: { imageUrl: string };
  }>();
  
  // Funktion zum Generieren von Bildern
  function handleGenerateClick() {
    dispatch('generate', { imageCount });
  }
  
  // Funktionen zum Speichern und Teilen
  function handleSaveImage(imageUrl: string) {
    dispatch('save', { imageUrl });
  }
  
  function handleShareImage(imageUrl: string) {
    dispatch('share', { imageUrl });
  }
</script>

<div class="output-area">
  <div class="output-header">
    <h2>Generated Images</h2>
    <div class="generation-controls">
      <button 
        class="generate-button {loading ? 'disabled' : ''}" 
        on:click={handleGenerateClick}
        disabled={loading}
      >
        {#if loading}
          <div class="spinner"></div>
          <span>Generating...</span>
        {:else}
          <span>Generate {imageCount} Image{imageCount > 1 ? 's' : ''}</span>
        {/if}
      </button>
    </div>
  </div>
  
  {#if error}
    <div class="error-message">
      <p>{error}</p>
    </div>
  {/if}
  
  {#if images.length > 0}
    <div class="image-grid">
      {#each images as imageUrl, index}
        <div class="image-container">
          <img src={imageUrl} alt={`Generated image ${index + 1} based on prompt: ${prompt}`} />
          <div class="image-actions">
            <button class="action-button" on:click={() => handleSaveImage(imageUrl)}>
              <svg viewBox="0 0 24 24"><path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z"/></svg>
              Save
            </button>
            <button class="action-button" on:click={() => handleShareImage(imageUrl)}>
              <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
              Share
            </button>
          </div>
        </div>
      {/each}
    </div>
  {:else if !loading}
    <div class="empty-state">
      <p>Click "Generate" to create an image</p>
    </div>
  {:else}
    <div class="loading-state">
      <div class="large-spinner"></div>
      <p>Generating image...</p>
    </div>
  {/if}
</div>

<style>
  .output-area {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    position: relative;
    min-height: 200px; /* Add minimum height for centered loader space */
  }
  
  .output-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.4rem;
    margin: 0;
    color: #f0f0f0;
  }
  
  .generation-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  
  .generate-button {
    background-color: #FCEA2B;
    color: #000;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 1.5rem;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .generate-button:hover:not(.disabled) {
    background-color: #ffed5c;
    transform: translateY(-2px);
  }
  
  .generate-button.disabled {
    background-color: #555;
    color: #999;
    cursor: not-allowed;
  }
  
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border-top-color: #000;
    animation: spin 1s linear infinite;
  }
  
  .large-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    border-top-color: #FCEA2B;
    animation: spin 1s linear infinite;
    margin: 0 auto 1.5rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-message {
    background-color: rgba(255, 0, 0, 0.1);
    border-left: 3px solid #ff5252;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 0 6px 6px 0;
  }
  
  .error-message p {
    margin: 0;
    color: #ff8a8a;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }
  
  .image-container {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    background-color: #262626;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .image-container img {
    width: 100%;
    display: block;
    aspect-ratio: 1;
    object-fit: contain;
    background-color: #1e1e1e;
    transition: transform 0.3s ease;
  }
  
  .image-container:hover img {
    transform: scale(1.02);
  }
  
  .image-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    padding: 0.75rem;
    background-color: rgba(0, 0, 0, 0.7);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .image-container:hover .image-actions {
    transform: translateY(0);
  }
  
  .action-button {
    background: none;
    border: none;
    color: #fff;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    cursor: pointer;
    padding: 0.4rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .action-button svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
  
  .empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background-color: #262626;
    border-radius: 8px;
    margin: 2rem 0;
    width: 100%;
  }
  
  .empty-state p {
    color: #888;
    font-size: 1.1rem;
  }
  
  .loading-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 250px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .loading-state p {
    color: #b0b0b0;
    margin-top: 1rem;
    font-family: 'IBM Plex Mono', monospace;
  }
</style>
