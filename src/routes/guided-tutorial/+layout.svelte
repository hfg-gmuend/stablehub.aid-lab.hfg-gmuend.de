<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  import TutorialSidebar from "$lib/components/TutorialSidebar.svelte";
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="app-container">
  <MinimalSidebar />
  <TutorialSidebar />
  <main>
    <slot />
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
  }

  .app-container {
    display: flex;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
    padding: 0;
    background-color: #121212;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(60, 60, 60, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(40, 40, 40, 0.15) 0%, transparent 50%);
  }
</style>
