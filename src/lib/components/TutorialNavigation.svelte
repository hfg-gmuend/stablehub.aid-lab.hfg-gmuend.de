<script>
  export let previousPath = null;
  export let previousLabel = "Zurück zum vorherigen Thema";
  export let nextPath = null;
  export let nextLabel = "Weiter zum nächsten Thema";
</script>

<div class="navigation-buttons">
  {#if previousPath}
    <a href={previousPath} class="back-button">
      <span class="arrow back-arrow">←</span>
      {previousLabel}
    </a>
  {:else}
    <div></div> <!-- Platzhalter für Flexbox-Layout -->
  {/if}
  
  {#if nextPath}
    <a href={nextPath} class="next-button">
      {nextLabel}
      <span class="arrow">→</span>
    </a>
  {/if}
</div>

<style>
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .next-button, .back-button {
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.2rem;
    border-radius: 6px;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .next-button {
    background-color: #FCEA2B;
    color: #000;
  }
  
  .back-button {
    background-color: #333;
    color: #e0e0e0;
  }
  
  .next-button:hover {
    background-color: #ffed5c;
    transform: translateX(3px);
  }
  
  .back-button:hover {
    background-color: #444;
    transform: translateX(-3px);
  }
  
  .arrow {
    margin-left: 10px;
  }
  
  .back-arrow {
    margin-left: 0;
    margin-right: 10px;
  }
  
  @media (max-width: 600px) {
    .navigation-buttons {
      flex-direction: column;
      align-items: stretch;
    }
    
    .back-button {
      order: 2;
    }
  }
</style>
