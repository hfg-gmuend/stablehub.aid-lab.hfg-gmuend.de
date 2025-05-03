<script lang="ts">
  // Props mit korrekten TypeScript-Typen
  export let nextPath: string | undefined | null = undefined;
  export let previousPath: string | undefined | null = undefined;
  export let nextLabel: string = "Next";
  export let previousLabel: string = "Back";
</script>

<div class="navigation-controls">
  {#if previousPath}
    <a href={previousPath} class="nav-button previous">
      <svg viewBox="0 0 24 24" class="nav-icon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
      {previousLabel}
    </a>
  {:else}
    <div></div> <!-- Platzhalter für die Flex-Ausrichtung -->
  {/if}
  
  {#if nextPath}
    <a href={nextPath} class="nav-button next">
      {nextLabel}
      <svg viewBox="0 0 24 24" class="nav-icon"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"/></svg>
    </a>
  {/if}
</div>

<style>
  .navigation-controls {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  
  .nav-button {
    display: inline-flex;
    align-items: center;
    padding: 0.8rem 1.2rem;
    border-radius: 6px;
    text-decoration: none;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: all 0.2s;
  }
  
  .nav-button.previous {
    background-color: #333;
    color: #d0d0d0;
  }
  
  .nav-button.next {
    background-color: #FCEA2B;
    color: #000;
  }
  
  .nav-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .nav-button.previous:hover {
    background-color: #444;
  }
  
  .nav-button.next:hover {
    background-color: #ffed5c;
  }
  
  .nav-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
  
  .previous .nav-icon {
    margin-right: 8px;
  }
  
  .next .nav-icon {
    margin-left: 8px;
  }
</style>
