<script>
  import { onMount } from 'svelte';
  import { generatedImages } from '$lib/stores/generatedImages.js';
  import { navigating } from '$app/stores';
  import { assets } from '$app/paths';
  import ToastContainer from '$lib/components/ToastContainer.svelte';
  
  // Fix Typen beim ersten Laden und bei jedem Routing-Wechsel
  onMount(() => {
    console.log("[Layout] App geladen, bereite Store vor");
    generatedImages.fixTypes();
  });
  
  // Bei Navigation zwischen Routen Typen korrigieren
  $: if ($navigating) {
    console.log("[Layout] Navigation erkannt:", $navigating.to?.route?.id);
    // Verzögert ausführen, damit es nach der Navigation passiert
    setTimeout(() => {
      generatedImages.fixTypes();
    }, 50);
  }
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="{assets}/icon/icon.svg">
</svelte:head>

<slot></slot>

<!-- Toast Container für globale Notifications -->
<ToastContainer />

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
  }
  
  :global(*) {
    box-sizing: border-box;
  }
</style>
