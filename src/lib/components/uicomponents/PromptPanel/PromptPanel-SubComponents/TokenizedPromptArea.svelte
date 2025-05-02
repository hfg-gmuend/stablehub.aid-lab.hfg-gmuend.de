<script lang="ts">
  // Eingabe-Prompt als bindbare Eigenschaft
  export let value: string = "";
  export let placeholder: string = "Prompt eingeben...";
  export let id: string = "prompt-input";
  export let tokenLimit: number = 77; // TokenLimit als Prop

  // Für Berechnungen zugängliche Variablen
  let textareaElement: HTMLTextAreaElement;
  let overlayElement: HTMLDivElement;

  // Exportiere die Token-Anzahl
  export let tokenCount: number = 0;

  // Berechne isOverLimit basierend auf dem aktuellen tokenCount und dem Limit
  $: isOverLimit = tokenCount > tokenLimit;

  // Berechnung des tokenisierten Inhalts mit Transparenz
  $: tokenizedContent = tokenizeContent(value);
  // Aktualisiere tokenCount reaktiv
  $: tokenCount = value ? value.split(/\s+/).filter(word => word.length > 0).length : 0;

  // Funktion zur Tokenisierung des Inhalts
  function tokenizeContent(text: string): string {
    if (!text) return '';
    const words = text.split(/\s+/).filter(word => word.length > 0);
    return words.map((word, index) => {
      const opacityStartFade = 25;
      let opacity: number;
      if (index < opacityStartFade) {
        opacity = 1.0;
      } else if (index < tokenLimit) {
        const fadeRange = tokenLimit - opacityStartFade;
        opacity = fadeRange > 0 ? 1.0 - (index - opacityStartFade) * (0.6 / fadeRange) : 0.4;
      } else {
        opacity = 0.1;
      }
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
      on:input={() => { /* Trigger reactive update for tokenCount */ }}
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
</style>
