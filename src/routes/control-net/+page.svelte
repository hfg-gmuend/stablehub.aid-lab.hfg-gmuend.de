<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  // Weitere Importe und Skriptlogik hier...
</script>

<svelte:head>
  <title>ControlNet | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <main>
    <h1>ControlNet</h1>
    <p>Diese Seite wird später implementiert.</p>
  </main>
</div>

<style>
  .app-container {
    display: flex;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    padding: 2rem;
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
  }
  
  p {
    font-family: 'Inter', sans-serif;
    color: #b0b0b0;
  }
</style>
