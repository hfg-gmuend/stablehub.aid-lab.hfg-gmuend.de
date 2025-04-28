<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
</script>

<svelte:head>
  <title>VPN Setup | HfG Ai-Hub</title>
</svelte:head>

<div class="app-container">
  <Sidebar />
  <main>
    <h1>VPN Einrichtung</h1>
    <div class="content">
      <p>
        Um alle Funktionen des HfG Ai-Hubs nutzen zu können, solltest du dich mit dem Hochschul-VPN verbinden.
        Hier findest du eine Schritt-für-Schritt-Anleitung:
      </p>
      
      <div class="step">
        <h2>1. VPN-Client herunterladen</h2>
        <p>Lade den offiziellen VPN-Client der Hochschule herunter.</p>
        <a href="#" class="button">Download für Windows</a>
        <a href="#" class="button">Download für macOS</a>
        <a href="#" class="button">Download für Linux</a>
      </div>
      
      <div class="step">
        <h2>2. Installation durchführen</h2>
        <p>Installiere den VPN-Client und folge den Anweisungen des Installationsassistenten.</p>
      </div>
      
      <div class="step">
        <h2>3. Mit deinen Hochschul-Anmeldedaten verbinden</h2>
        <p>
          Starte den VPN-Client und gib deine Hochschul-Zugangsdaten ein.
          Der Server sollte bereits voreingestellt sein (vpn.hfg.edu).
        </p>
      </div>
      
      <div class="step">
        <h2>4. Verbindung testen</h2>
        <p>
          Nach erfolgreicher Verbindung solltest du auf alle internen Ressourcen der Hochschule
          zugreifen können.
        </p>
      </div>
      
      <div class="support">
        <h2>Brauchst du Hilfe?</h2>
        <p>
          Bei Problemen mit der VPN-Verbindung wende dich an den IT-Support der Hochschule:
          <a href="mailto:it-support@hfg.edu">it-support@hfg.edu</a>
        </p>
      </div>
    </div>
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
    margin-bottom: 2rem;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.25rem;
    margin: 1.5rem 0 1rem;
  }
  
  p {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
  }
  
  .content {
    max-width: 800px;
  }
  
  .step {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e9ecef;
  }
  
  .button {
    display: inline-block;
    background-color: #FCEA2B; /* Gelbe Akzentfarbe */
    color: #121212; /* Dunkle Textfarbe für Kontrast */
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    font-family: 'Inter', sans-serif;
  }
  
  .button:hover {
    background-color: #ffe566; /* Helleres Gelb beim Hover */
  }
  
  .support {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
  }
  
  .support a {
    color: #0066cc;
  }
</style>
