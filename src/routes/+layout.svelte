<script>
  // Layout script kann später erweitert werden
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="/icon/icon.svg">
</svelte:head>

<slot />

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
