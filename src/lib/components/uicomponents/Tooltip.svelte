<script lang="ts">
  export let text: string;
  export let visible: boolean = false;
  export let maxWidth: number | null = null; // Prop für maximale Breite
  export let minWidth: number | null = null; // Prop für minimale Breite

  // Berechne den Style basierend auf den Props
  $: tooltipStyle = [
    maxWidth ? `max-width: ${maxWidth}px;` : 'max-width: 300px;', // Standard max-width
    minWidth ? `min-width: ${minWidth}px;` : '' // min-width, falls gesetzt
  ].filter(Boolean).join(' '); // Filtere leere Strings und verbinde
</script>

{#if visible}
  <div class="simple-tooltip" style={tooltipStyle}>
    {text}
  </div>
{/if}

<style>
  .simple-tooltip {
    position: absolute;
    /* Angepasster Hintergrund und Blur */
    background-color: rgba(30, 30, 30, 0.85);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* Für Safari */
    color: #ffffff; /* Heller Text */
    padding: 10px 12px; /* Angepasstes Padding */
    border-radius: 8px; /* Angepasster Radius */
    font-size: 0.85rem; /* Angepasste Schriftgröße */
    font-weight: normal; /* Normale Schriftstärke */
    font-family: 'Inter', sans-serif;
    white-space: normal; /* Textumbruch erlauben */
    text-align: left;
    z-index: 1000; /* Höherer z-index */
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-8px); /* Beibehaltung der Positionierung */
    /* Angepasster Schatten */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.1);
    pointer-events: none;
    line-height: 1.5; /* Angepasste Zeilenhöhe */
    letter-spacing: 0.01em; /* Angepasster Buchstabenabstand */
    /* max-width und min-width werden jetzt über 'style' gesetzt */
  }

  /* Pfeil entfernt */
  /* .simple-tooltip::after { ... } */
</style>
