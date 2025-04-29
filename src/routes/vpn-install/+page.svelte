<script>
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
</script>

<svelte:head>
  <title>VPN Installation | HfG Ai-Hub</title>
</svelte:head>

<div class="layout">
  <MinimalSidebar />
  
  <main class="main-content">
    <div class="vpn-container">
      <div class="vpn-header">
        <h1>VPN Installation</h1>
        <p class="subtitle">Hier werden zukünftig Installationsanleitungen für den VPN-Zugriff verfügbar sein.</p>
      </div>

      <div class="content-placeholder">
        <p>Diese Seite wird in Kürze mit Inhalten gefüllt.</p>
      </div>
    </div>
  </main>
</div>

<style>
  .layout {
    display: flex;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 0;
    overflow-y: auto;
  }
  
  .vpn-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .vpn-header {
    margin-bottom: 2.5rem;
  }
  
  h1 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    color: #f0f0f0;
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #a0a0a0;
  }
  
  .content-placeholder {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .content-placeholder p {
    font-family: 'IBM Plex Mono', monospace;
    color: #a0a0a0;
    font-size: 1.1rem;
  }
</style>
