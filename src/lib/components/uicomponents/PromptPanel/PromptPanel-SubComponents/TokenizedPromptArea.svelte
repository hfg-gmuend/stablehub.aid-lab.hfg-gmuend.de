<script lang="ts">
  // Eingabe-Prompt als bindbare Eigenschaft
  export let value: string = "";
  export let placeholder: string = "Prompt eingeben...";
  export let id: string = "prompt-input";

  // Für Berechnungen zugängliche Variablen
  let textareaElement: HTMLTextAreaElement;
  let overlayElement: HTMLDivElement;
  let tokenLimit: number = 77;
  let isOverLimit: boolean = false;

  // Berechnung des tokenisierten Inhalts mit Transparenz
  $: tokenizedContent = tokenizeContent(value);
  // Explizite Typisierung für isOverLimit, obwohl sie durch die Berechnung inferiert wird
  $: isOverLimit = value ? value.split(/\s+/).filter(word => word.length > 0).length > tokenLimit : false;

  // Funktion zur Tokenisierung des Inhalts
  function tokenizeContent(text: string): string {
    if (!text) return '';

    // Text in Wörter aufteilen (leere Strings herausfiltern)
    const words = text.split(/\s+/).filter(word => word.length > 0);

    // HTML für die Anzeige mit abgestufter Transparenz generieren
    return words.map((word, index) => {
      // Progressive Transparenz:
      // - Erste 25 Tokens: 100% Opazität
      // - Token 25-77: Linear abnehmend von 100% auf 40%
      // - Ab Token 77: 10% Opazität
      let opacity: number;

      if (index < 25) {
        opacity = 1.0; // Volle Opazität für die ersten 25 Tokens
      } else if (index < tokenLimit) {
        // Linearer Übergang von 100% bis 40% für Tokens 25 bis 77
        opacity = 1.0 - (index - 25) * (0.6 / (tokenLimit - 25));
      } else {
        opacity = 0.1; // Ab 77 Tokens: 10% Opazität
      }

      // HTML-Entitäten escapen, um XSS zu verhindern, falls der Text HTML enthalten könnte
      const escapedWord = word.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<span style="opacity: ${opacity};">${escapedWord}</span>`;
    }).join(' ');
  }

  // Synchronisierung von Scroll-Position zwischen Textarea und Overlay
  function syncScroll(): void {
    if (overlayElement && textareaElement) {
      overlayElement.scrollTop = textareaElement.scrollTop;
      overlayElement.scrollLeft = textareaElement.scrollLeft;
    }
  }
</script>

<div class="tokenized-prompt-container">
  <div class="textarea-wrapper" class:over-limit={isOverLimit}>
    <!-- Original Textarea für die Eingabe -->
    <textarea
      bind:value
      bind:this={textareaElement}
      {placeholder}
      {id}
      on:scroll={syncScroll}
      on:input={syncScroll}
    ></textarea>
    
    <!-- Overlay mit tokenisierten Wörtern oder Platzhaltertext -->
    <div 
      class="textarea-overlay" 
      bind:this={overlayElement}
      aria-hidden="true"
    >
      {#if value}
        {@html tokenizedContent}
      {:else}
        <span class="placeholder">{placeholder}</span>
      {/if}
    </div>
  </div>
  
  <div class="token-counter {isOverLimit ? 'warning' : ''}">
    {value ? value.split(/\s+/).filter(word => word.length > 0).length : 0}/{tokenLimit}
  </div>
</div>

<style>
  .tokenized-prompt-container {
    position: relative;
    width: 100%;
  }
  
  .textarea-wrapper {
    position: relative;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #444;
    background-color: #2a2a2a;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .textarea-wrapper.over-limit {
    border-color: #FCEA2B;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.3);
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 0.75rem;
    background-color: transparent;
    color: transparent;
    caret-color: white; /* Cursor sichtbar machen */
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    resize: none;
    z-index: 2;
    position: relative;
  }
  
  textarea:focus {
    outline: none;
  }
  
  .textarea-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    line-height: 1.5;
    pointer-events: none;
    color: white;
    overflow: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    z-index: 1;
  }
  
  /* Stilisierung des Platzhaltertextes */
  .placeholder {
    color: #888;
    opacity: 1 !important; /* Wichtig, um die volle Opazität zu erzwingen */
  }
  
  .token-counter {
    position: absolute;
    right: 10px;
    top: -24px;
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #aaa;
  }
  
  /* Verstärkung der visuellen Hinweise auf Token-Limitierung */
  .token-counter.warning {
    color: #FCEA2B;
    background-color: rgba(252, 234, 43, 0.25);
    font-weight: bold;
  }
</style>
