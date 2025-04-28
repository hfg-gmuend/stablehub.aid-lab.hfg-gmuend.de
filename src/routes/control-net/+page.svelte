<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<svelte:head>
  <title>ControlNet | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <Sidebar />
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
  }
  
  p {
    font-family: 'Inter', sans-serif;
  }
</style>
