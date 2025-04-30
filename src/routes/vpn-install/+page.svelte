<script lang="ts">
  import MinimalSidebar from "$lib/components/MinimalSidebar.svelte";
  import { onMount } from 'svelte';
  
  // Types
  interface Step {
    id: number;
    title: string;
  }
  
  interface DownloadLinks {
    mac: string;
    windows: string;
  }
  
  interface ConfigLinks {
    client201: string;
    client202: string;
  }
  
  type OperatingSystem = 'mac' | 'windows';
  type ConfigType = 'client201' | 'client202';
  
  // Aktiver Schritt des Steppers
  let activeStep: number = 0;
  
  // Definition der Schritte
  const steps: Step[] = [
    { id: 0, title: "VPN Client\ninstallieren" },
    { id: 1, title: "Dateien\nherunterladen" },
    { id: 2, title: "Profil\nimportieren" },
    { id: 3, title: "Verbinden" }
  ];
  
  // Navigation zwischen den Schritten
  function nextStep(): void {
    if (activeStep < steps.length - 1) {
      activeStep++;
    }
  }
  
  function prevStep(): void {
    if (activeStep > 0) {
      activeStep--;
    }
  }
  
  // Download-Links für VPN-Clients
  const downloadLinks: DownloadLinks = {
    mac: "https://tunnelblick.net/iprelease/Latest_Tunnelblick_Stable.dmg",
    windows: "https://openvpn.net/downloads/openvpn-connect-v3-windows.msi"
  };
  
  // Download-Links für VPN-Konfigurationsdateien
  const configLinks: ConfigLinks = {
    client201: "https://intranet.hfg-gmuend.de/vpn-clients/client.201.zip",
    client202: "https://intranet.hfg-gmuend.de/vpn-clients/client.202.zip"
  };
  
  // Herunterladen der Client-Software
  function downloadClient(os: OperatingSystem): void {
    // Direkte Weiterleitung zur Download-URL
    if (os === 'mac' || os === 'windows') {
      window.open(downloadLinks[os], '_blank');
    }
  }
  
  // Herunterladen der Konfigurationsdateien
  function downloadConfig(client: ConfigType): void {
    // Direkte Weiterleitung zur Download-URL
    window.open(configLinks[client], '_blank');
  }
</script>

<svelte:head>
  <title>VPN Installation | HfG Ai-Hub</title>
</svelte:head>

<div class="layout">
  <MinimalSidebar />
  
  <main class="main-content">
    <div class="vpn-container">
      <div class="vpn-header">
        <h1>VPN installieren</h1>
        <p class="subtitle">Virtual Private Network</p>
      </div>

      <div class="vpn-content">
        <p class="instruction-text">So richtest du das HfG-VPN in vier einfachen Schritten ein:</p>
        
        <!-- Stepper -->
        <div class="stepper">
          {#each steps as step, index}
            <button 
              type="button"
              class="step" 
              class:active={activeStep === index}
              class:completed={activeStep > index}
              on:click={() => activeStep = index}
              aria-label={`Step ${index + 1}: ${step.title}`}
            >
              <div class="step-number">
                {#if activeStep > index}
                  <svg viewBox="0 0 24 24" class="check-icon"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                {:else}
                  {index + 1}
                {/if}
              </div>
              <div class="step-title">{@html step.title.replace('\n', '<br>')}</div>
              {#if index < steps.length - 1}
                <div class="step-line"></div>
              {/if}
            </button>
          {/each}
        </div>
        
        <!-- Inhalt je nach aktivem Schritt -->
        <div class="step-content">
          <!-- Schritt 1: VPN Client installieren -->
          {#if activeStep === 0}
            <div class="step-panel">
              <h2>Installiere den VPN-Client</h2>
              <p>Wähle dein Betriebssystem und lade den entsprechenden VPN-Client herunter:</p>
              
              <div class="os-selection">
                <button class="os-card" on:click={() => downloadClient('mac')} on:keydown={e => e.key === 'Enter' && downloadClient('mac')}>
                  <img src="/vpn/apple-icon.svg" alt="Apple Logo" class="os-icon">
                  <div class="os-info">
                    <h3>macOS</h3>
                    <p>Tunnelblick</p>
                  </div>
                </button>
                
                <button class="os-card" on:click={() => downloadClient('windows')} on:keydown={e => e.key === 'Enter' && downloadClient('windows')}>
                  <img src="/vpn/windows-icon.svg" alt="Windows Logo" class="os-icon">
                  <div class="os-info">
                    <h3>Windows</h3>
                    <p>OpenVPN</p>
                  </div>
                </button>
              </div>
              
              <p class="help-text">Folge den Installationsanweisungen des Installers. Nach der Installation kannst du zum nächsten Schritt übergehen.</p>
            </div>
          {/if}
          
          <!-- Schritt 2: Dateien herunterladen -->
          {#if activeStep === 1}
            <div class="step-panel">
              <h2>Dateien herunterladen</h2>
              <p>Lade die VPN-Konfigurationsdateien für dein Profil herunter. Du benötigst beide Dateien für die vollständige Konfiguration:</p>
              
              <div class="download-section">
                <div class="config-downloads">
                  <a href={configLinks.client201} class="download-button" target="_blank">
                    <svg viewBox="0 0 24 24" class="download-icon"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    Client.201.zip herunterladen
                  </a>
                  
                  <a href={configLinks.client202} class="download-button" target="_blank">
                    <svg viewBox="0 0 24 24" class="download-icon"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    Client.202.zip herunterladen
                  </a>
                </div>
                
                <div class="download-info">
                  <p>Diese ZIP-Dateien enthalten die notwendigen Konfigurationen (.ovpn-Dateien) für den Zugang zum HfG-Netzwerk.</p>
                  <p>Nachdem du beide Dateien heruntergeladen hast, entpacke sie und bewahre sie für den nächsten Schritt auf.</p>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Schritt 3: Profil importieren -->
          {#if activeStep === 2}
            <div class="step-panel">
              <h2>Profile importieren</h2>
              <p>Importiere die heruntergeladenen und entpackten .ovpn-Dateien in deinen VPN-Client:</p>
              
              <div class="import-instructions">
                <div class="instruction-card">
                  <h3>Für macOS (Tunnelblick):</h3>
                  <ol>
                    <li>Doppelklicke auf die heruntergeladene .ovpn-Datei</li>
                    <li>Tunnelblick wird automatisch geöffnet</li>
                    <li>Bestätige den Import, indem du auf "Installieren" klickst</li>
                    <li>Gib dein Systempasswort ein, wenn du dazu aufgefordert wirst</li>
                  </ol>
                </div>
                
                <div class="instruction-card">
                  <h3>Für Windows (OpenVPN):</h3>
                  <ol>
                    <li>Öffne OpenVPN GUI mit Administratorrechten</li>
                    <li>Kopiere die .ovpn-Datei in den Ordner "config" im OpenVPN-Installationsverzeichnis</li>
                    <li>Starte OpenVPN neu, um das neue Profil zu laden</li>
                  </ol>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Schritt 4: Verbinden -->
          {#if activeStep === 3}
            <div class="step-panel">
              <h2>Mit dem VPN verbinden</h2>
              <p>Jetzt kannst du dich mit dem HfG-Netzwerk verbinden:</p>
              
              <div class="connect-instructions">
                <div class="instruction-card">
                  <h3>Für macOS (Tunnelblick):</h3>
                  <ol>
                    <li>Klicke auf das Tunnelblick-Symbol in der Menüleiste</li>
                    <li>Wähle "HfG VPN" aus der Liste</li>
                    <li>Klicke auf "Verbinden"</li>
                    <li>Gib deine HfG-Zugangsdaten ein, wenn du dazu aufgefordert wirst</li>
                    <li>Bestätige die 2-Faktor-Authentifizierung (siehe unten)</li>
                  </ol>
                </div>
                
                <div class="instruction-card">
                  <h3>Für Windows (OpenVPN):</h3>
                  <ol>
                    <li>Rechtsklicke auf das OpenVPN-Symbol im Systemtray</li>
                    <li>Wähle "HfG VPN" und klicke auf "Verbinden"</li>
                    <li>Gib deine HfG-Zugangsdaten ein, wenn du dazu aufgefordert wirst</li>
                    <li>Bestätige die 2-Faktor-Authentifizierung (siehe unten)</li>
                  </ol>
                </div>
                
                <div class="instruction-card auth-info">
                  <h3>2-Faktor-Authentifizierung</h3>
                  <p>Für die sichere Verbindung zum HfG-Netzwerk ist eine Zwei-Faktor-Authentifizierung notwendig:</p>
                  <ol>
                    <li>Nach Eingabe deiner Zugangsdaten wird eine Anfrage an die Microsoft Authenticator App auf deinem Smartphone gesendet</li>
                    <li>Öffne die App und bestätige die Anfrage mit dem angezeigten Code</li>
                    <li>Es erscheint ein Popup-Fenster, das dich auffordert, zwei Zahlen einzugeben</li>
                    <li>Gib die angeforderten Zahlen ein, um die Verbindung herzustellen</li>
                  </ol>
                  
                  <div class="auth-note">
                    <h4>Hinweis zur 2-Faktor-Authentifizierung:</h4>
                    <p>Falls du eine andere 2-Faktor-Methode wie SMS oder Anruf eingerichtet hast, kann es zu Problemen kommen. In diesem Fall:</p>
                    <ol>
                      <li>Besuche <a href="https://mysignins.microsoft.com/security-info" target="_blank">mysignins.microsoft.com/security-info</a></li>
                      <li>Melde dich mit deinem HfG-Konto an</li>
                      <li>Passe deine Sicherheitseinstellungen an und aktiviere die Authentifizierung per App (Kennwort)</li>
                    </ol>
                  </div>
                </div>
                
                <div class="success-message">
                  <h3>Erfolg!</h3>
                  <p>Nach erfolgreicher Authentifizierung bist du mit dem HfG-Netzwerk verbunden und kannst auf alle internen Ressourcen zugreifen.</p>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Navigation -->
          <div class="step-navigation">
            <button class="nav-button back" on:click={prevStep} disabled={activeStep === 0}>
              <svg viewBox="0 0 24 24" class="nav-icon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
              Zurück
            </button>
            <div class="step-indicator">{activeStep + 1} von {steps.length}</div>
            <button class="nav-button next" on:click={nextStep} disabled={activeStep === steps.length - 1}>
              Weiter
              <svg viewBox="0 0 24 24" class="nav-icon"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"/></svg>
            </button>
          </div>
        </div>
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
    margin-bottom: 1.5rem;
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
  
  .instruction-text {
    font-size: 1.1rem;
    color: #d0d0d0;
    margin-bottom: 2rem;
  }
  
  /* Stepper Styles */
  .stepper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    position: relative;
  }
  
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;
    outline: none;
  }
  
  /* .step:hover .step-number {
    background-color: #444;
    color: #ffffff;
  } */
  
  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #333; /* Dunkler Hintergrund wieder hergestellt */
    color: #a0a0a0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: bold;
    margin-bottom: 0.75rem;
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  .step.active .step-number {
    background-color: #FCEA2B;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(252, 234, 43, 0.4);
  }
  
  .step.completed .step-number {
    background-color: #4CAF50;
    color: #fff;
  }
  
  .check-icon {
    fill: #fff;
    width: 20px;
    height: 20px;
  }
  
  .step-title {
    font-size: 0.85rem;
    font-family: 'IBM Plex Mono', monospace;
    color: #888;
    text-align: center;
    line-height: 1.3;
    transition: all 0.3s ease;
  }
  
  .step.active .step-title {
    color: #FCEA2B;
    font-weight: bold;
  }
  
  .step.completed .step-title {
    color: #4CAF50;
  }
  
  .step-line {
    position: absolute;
    top: 20px;
    right: -50%;
    width: 100%;
    height: 2px;
    background-color: #333;
    z-index: 1;
  }
  
  .step.completed .step-line {
    background-color: #4CAF50;
  }
  
  /* Schritt-Inhalte */
  .step-content {
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  .step-panel {
    animation: fadeIn 0.5s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .step-panel h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.6rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: #e0e0e0;
  }
  
  .step-panel p {
    color: #b0b0b0;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  /* OS Auswahl Karten */
  .os-selection {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .os-card {
    display: flex;
    align-items: center;
    background-color: #222;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .os-card:hover {
    transform: translateY(-5px);
    border-color: #FCEA2B;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .os-icon {
    width: 48px;
    height: 48px;
    margin-right: 1rem;
  }
  
  .os-info {
    flex: 1;
  }
  
  .os-info h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
    color: #e0e0e0;
  }
  
  .os-info p {
    margin: 0;
    color: #a0a0a0;
    font-size: 0.9rem;
  }
  
  .help-text {
    color: #888;
    font-style: italic;
    margin-top: 1rem;
  }
  
  /* Download Sektion */
  .download-section {
    background-color: #222;
    border-radius: 8px;
    padding: 2rem;
    text-align: center;
    margin: 2rem 0;
  }
  
  .config-downloads {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .config-downloads {
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
    }
  }
  
  .download-button {
    display: inline-flex;
    align-items: center;
    background-color: #FCEA2B;
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .download-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(252, 234, 43, 0.2);
  }
  
  .download-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: currentColor;
  }
  
  .download-info {
    margin-top: 1rem;
    color: #888;
    font-size: 0.9rem;
  }
  
  /* Import & Connect Instructions */
  .import-instructions,
  .connect-instructions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
  
  .instruction-card {
    background-color: #222;
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid #333;
  }
  
  .instruction-card h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.1rem;
    margin-top: 0;
    margin-bottom: 1rem;
    color: #e0e0e0;
  }
  
  .instruction-card ol {
    margin: 0;
    padding-left: 1.2rem;
    color: #b0b0b0;
  }
  
  .instruction-card li {
    margin-bottom: 0.5rem;
  }
  
  .success-message {
    background-color: rgba(76, 175, 80, 0.1);
    border-left: 4px solid #4CAF50;
    padding: 1.5rem;
    border-radius: 0 8px 8px 0;
    grid-column: 1 / -1;
    margin-top: 1rem;
  }
  
  .success-message h3 {
    color: #4CAF50;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  
  .success-message p {
    color: #b0b0b0;
    margin: 0;
  }
  
  /* Navigation */
  .step-navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 3rem;
    border-top: 1px solid #333;
    padding-top: 1.5rem;
  }
  
  .nav-button {
    display: inline-flex;
    align-items: center;
    background: none;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.75rem 1.2rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #d0d0d0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .nav-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .nav-button:not(:disabled):hover {
    background-color: #222;
  }
  
  .nav-button.next {
    background-color: #FCEA2B;
    color: #000;
    border: none;
  }
  
  .nav-button.next:not(:disabled):hover {
    background-color: #ffed5c;
    transform: translateX(3px);
  }
  
  .nav-button.back:not(:disabled):hover {
    transform: translateX(-3px);
  }
  
  .nav-icon {
    width: 18px;
    height: 18px;
    fill: currentColor;
  }
  
  .back .nav-icon {
    margin-right: 8px;
  }
  
  .next .nav-icon {
    margin-left: 8px;
  }
  
  .step-indicator {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    color: #888;
  }
  
  /* Responsive Styling */
  @media (max-width: 768px) {
    .stepper {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
    }
    
    .step {
      flex: 0 0 40%;
    }
    
    .step-line {
      display: none;
    }
    
    .os-selection,
    .import-instructions,
    .connect-instructions {
      grid-template-columns: 1fr;
    }
  }
  
  /* Auth Info Styles */
  .auth-info {
    grid-column: 1 / -1;
    background-color: #222;
    border: 1px solid #4da6ff;
    border-left: 4px solid #4da6ff;
  }
  
  .auth-note {
    margin-top: 1.5rem;
    background-color: rgba(255, 193, 7, 0.1);
    border-left: 4px solid #FFC107;
    padding: 1rem;
    border-radius: 0 4px 4px 0;
  }
  
  .auth-note h4 {
    margin-top: 0;
    margin-bottom: 0.7rem;
    color: #FFC107;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1rem;
  }
  
  .auth-note a {
    color: #4da6ff;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .auth-note a:hover {
    color: #FCEA2B;
    text-decoration: underline;
  }
</style>
