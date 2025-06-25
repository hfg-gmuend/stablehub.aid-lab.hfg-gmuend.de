<script>
  import { base } from '$app/paths';
  import MinimalSidebar from '$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte';
  import { onMount } from 'svelte';
  
  let sidebarCollapsed = false;
  let isGerman = false;
  let isTransitioning = false;
  /** @type {HTMLDivElement | undefined} */
  let contentSlider;

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }

  function updateSliderHeight() {
    if (!contentSlider) return;
    
    /** @type {HTMLElement | null} */
    const englishContent = contentSlider.querySelector('.english-content');
    /** @type {HTMLElement | null} */
    const germanContent = contentSlider.querySelector('.german-content');
    
    if (englishContent && germanContent) {
      // Temporarily make both visible to measure their actual heights
      const originalEnglishStyles = {
        position: englishContent.style.position,
        opacity: englishContent.style.opacity,
        transform: englishContent.style.transform
      };
      const originalGermanStyles = {
        position: germanContent.style.position,
        opacity: germanContent.style.opacity,
        transform: germanContent.style.transform
      };
      
      // Reset styles to get accurate measurements
      englishContent.style.position = 'static';
      englishContent.style.opacity = '1';
      englishContent.style.transform = 'none';
      germanContent.style.position = 'static';
      germanContent.style.opacity = '1';
      germanContent.style.transform = 'none';
      
      const englishHeight = englishContent.offsetHeight;
      const germanHeight = germanContent.offsetHeight;
      const activeHeight = isGerman ? germanHeight : englishHeight;
      
      // Restore original styles
      englishContent.style.position = originalEnglishStyles.position;
      englishContent.style.opacity = originalEnglishStyles.opacity;
      englishContent.style.transform = originalEnglishStyles.transform;
      germanContent.style.position = originalGermanStyles.position;
      germanContent.style.opacity = originalGermanStyles.opacity;
      germanContent.style.transform = originalGermanStyles.transform;
      
      // Set the height to match the active content
      contentSlider.style.height = `${activeHeight}px`;
    }
  }

  function toggleLanguage() {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Add transition class for animation
    if (contentSlider) {
      contentSlider.classList.add('transitioning');
      
      // Update height before transition
      updateSliderHeight();
    }
    
    // Toggle language after a small delay for smoother animation
    setTimeout(() => {
      isGerman = !isGerman;
      
      // Update height after language change
      setTimeout(() => {
        updateSliderHeight();
      }, 50);
    }, 100);
    
    // Reset transition after animation completes
    setTimeout(() => {
      isTransitioning = false;
      if (contentSlider) {
        contentSlider.classList.remove('transitioning');
      }
    }, 900);
  }

  onMount(() => {
    // Multiple attempts to set initial height to ensure it works
    const setInitialHeight = () => {
      updateSliderHeight();
    };
    
    // Try immediately
    setInitialHeight();
    
    // Try after DOM is fully rendered
    setTimeout(setInitialHeight, 50);
    setTimeout(setInitialHeight, 200);
    setTimeout(setInitialHeight, 500);
    
    // Update height on window resize
    const handleResize = () => {
      setTimeout(() => updateSliderHeight(), 50);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:head>
  <title>Data Privacy | Stablehub</title>
</svelte:head>

<div class="app-container" class:sidebar-collapsed={sidebarCollapsed}>
  {#if !sidebarCollapsed}
    <MinimalSidebar />
  {/if}
  
  <!-- Sidebar Expand Button -->
  {#if sidebarCollapsed}
    <button class="sidebar-expand-btn" on:click={toggleSidebar} aria-label="Expand sidebar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  {/if}
  
  <main class:expanded={sidebarCollapsed}>
    <div class="content-container">
      <div class="page-header">
        <h1>Data Privacy</h1>
        <p class="page-subtitle">Information about data processing and your rights</p>
        
        <!-- Language Toggle -->
        <div class="language-toggle">
          <button 
            class="lang-btn" 
            class:active={!isGerman}
            on:click={toggleLanguage}
            disabled={isTransitioning}
          >
            🇬🇧 English
          </button>
          <button 
            class="lang-btn" 
            class:active={isGerman}
            on:click={toggleLanguage}
            disabled={isTransitioning}
          >
            🇩🇪 Deutsch
          </button>
        </div>
      </div>
      
      <div class="content-section">
        <div class="content-slider" class:german={isGerman} class:transitioning={isTransitioning} bind:this={contentSlider}>
          <!-- English Content -->
          <div class="language-content english-content">
            <div class="privacy-content">
              <section class="privacy-section">
                <p class="intro-text">
                  We, the University of Applied Sciences Schwäbisch Gmünd, are responsible for this online offering and, as the provider of a telemedia service, are required to inform you at the beginning of your visit to our online offering about the nature, scope and purposes of the collection and use of personal data in a precise, transparent, understandable and easily accessible form in clear and simple language.
                </p>
              </section>

              <section class="privacy-section">
                <h2>Contact Details of the Controller</h2>
                <div class="contact-card">
                  <h3>University of Applied Sciences Schwäbisch Gmünd</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Address:</strong><br>
                      Rektor-Klaus-Straße 100<br>
                      73525 Schwäbisch Gmünd<br>
                      Germany
                    </div>
                    <div class="detail-group">
                      <strong>Contact:</strong><br>
                      Phone: +49 7171 602-600<br>
                      Fax: +49 7171 69259<br>
                      Email: sekretariat@hfg-gmuend.de<br>
                      Web: www.hfg-gmuend.de<br>
                      Authorized Representative: Maren Schmohl
                    </div>
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <h2>Contact Details of the Data Protection Officer</h2>
                <div class="contact-card">
                  <h3>Deutsche Datenschutzkanzlei</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Maximilian Musch</strong><br>
                      Richard-Wagner-Straße 2<br>
                      88094 Oberteuringen<br>
                      Germany
                    </div>
                    <div class="detail-group">
                      <strong>Contact:</strong><br>
                      Email: musch@ddsk.de<br>
                      Web: www.ddsk.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <h2>Data Processing Information</h2>
                <h3>Automated Data Processing (Log Files etc.)</h3>
                <p>
                  Our website can be visited without actively providing personal information. However, we automatically store access data (server log files) with every call to the website, such as the name of the Internet Service Provider, the operating system used, the website from which the user visits us, the date and duration of the visit or the name of the requested file, as well as the IP address of the device used for security reasons for a period of 7 days.
                </p>
                <p>
                  <strong>Legal basis:</strong> Art. 6 para. 1 lit. f) GDPR<br>
                  <strong>Legitimate interests:</strong> Ensuring functionality and error-free operation of the website
                </p>
              </section>

              <section class="privacy-section">
                <h3>Use of Cookies</h3>
                <p>
                  To make visiting our website attractive and to enable the use of certain functions, we use so-called cookies on our website. Cookies are small text files that are stored on the end device. They enable us to store user settings so that our website can be displayed in a format tailored to the user device.
                </p>
                <p>
                  <strong>Categories of affected persons:</strong> Website visitors, users of online services<br>
                  <strong>Legal basis:</strong> Consent (Art. 6 para. 1 lit. a) GDPR); legitimate interests (Art. 6 para. 1 lit. f) GDPR)
                </p>
              </section>

              <section class="privacy-section">
                <h2>Web Analysis and Optimization</h2>
                <p>
                  In order to evaluate visitor flows on our online offering, we use tools for web analysis and reach measurement. We collect information about the behavior, interests or demographic information of our visitors. This helps us to recognize at what time our online offering, its functions or content are most frequently used.
                </p>
                <p>
                  <strong>Legal basis:</strong> Consent (Art. 6 para. 1 lit. a) GDPR); legitimate interests (Art. 6 para. 1 lit. f) GDPR)
                </p>
              </section>

              <section class="privacy-section">
                <h2>Your Rights</h2>
                <div class="rights-grid">
                  <div class="right-item">
                    <strong>Right to Information:</strong><br>
                    You have the right to request confirmation as to whether we process data concerning you (Art. 15 GDPR).
                  </div>
                  <div class="right-item">
                    <strong>Right to Rectification:</strong><br>
                    You have the right to demand the correction or completion of data concerning you (Art. 16 GDPR).
                  </div>
                  <div class="right-item">
                    <strong>Right to Deletion:</strong><br>
                    You have the right to demand the immediate deletion of data concerning you (Art. 17 GDPR).
                  </div>
                  <div class="right-item">
                    <strong>Right to Data Portability:</strong><br>
                    You have the right to demand the provision of data you have made available to us (Art. 20 GDPR).
                  </div>
                  <div class="right-item">
                    <strong>Right to Object:</strong><br>
                    You have the right to object to the processing of your personal data (Art. 21 GDPR).
                  </div>
                  <div class="right-item">
                    <strong>Right to Complaint:</strong><br>
                    You have the right to lodge a complaint with the competent supervisory authority (Art. 77 GDPR).
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <h2>Data Retention</h2>
                <p>
                  We store the data of visitors to our online offering as long as this is necessary for the provision of our service or if this has been provided for by the European directive and regulation giver or another legislator in laws or regulations to which we are subject.
                </p>
              </section>

              <section class="privacy-section">
                <h2>Contact</h2>
                <p>
                  If you have any questions about data protection, you can contact our data protection officer or us directly:
                </p>
                <p>
                  <strong>Email:</strong> info@hfg-gmuend.de<br>
                  <strong>Revocation:</strong> You can revoke consent given at any time by sending an informal message to the above email address.
                </p>
              </section>

              <section class="privacy-section disclaimer">
                <p class="small-text">
                  This privacy policy was created by: Deutsche Datenschutzkanzlei – Maximilian Musch
                </p>
              </section>
            </div>
          </div>

          <!-- German Content -->
          <div class="language-content german-content">
            <div class="privacy-content">
              <section class="privacy-section">
                <p class="intro-text">
                  Wir, die Hochschule für Gestaltung Schwäbisch Gmünd, sind Verantwortliche für dieses Onlineangebot und haben als Anbieter eines Teledienstes Sie zu Beginn Ihres Besuches auf unserem Onlineangebot über Art, Umfang und Zwecke der Erhebung und Verwendung personenbezogener Daten in präziser, transparenter, verständlicher und leicht zugänglicher Form in einer klaren und einfachen Sprache zu unterrichten.
                </p>
              </section>

              <section class="privacy-section">
                <h2>Kontaktdaten der Verantwortlichen</h2>
                <div class="contact-card">
                  <h3>Hochschule für Gestaltung Schwäbisch Gmünd</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Adresse:</strong><br>
                      Rektor-Klaus-Straße 100<br>
                      73525 Schwäbisch Gmünd<br>
                      Deutschland
                    </div>
                    <div class="detail-group">
                      <strong>Kontakt:</strong><br>
                      Telefon: 07171 602 – 600<br>
                      Telefax: 07171 69259<br>
                      E-Mail: sekretariat@hfg-gmuend.de<br>
                      Web: www.hfg-gmuend.de<br>
                      Vertretungsberechtigt: Maren Schmohl
                    </div>
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <h2>Kontaktdaten des Datenschutzbeauftragten</h2>
                <div class="contact-card">
                  <h3>Deutsche Datenschutzkanzlei</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Maximilian Musch</strong><br>
                      Richard-Wagner-Straße 2<br>
                      88094 Oberteuringen<br>
                      Deutschland
                    </div>
                    <div class="detail-group">
                      <strong>Kontakt:</strong><br>
                      E-Mail: musch@ddsk.de<br>
                      Web: www.ddsk.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <p class="intro-text">
                  Zur besseren Verständlichkeit wird in unserer Datenschutzerklärung auf eine geschlechterspezifische Differenzierung verzichtet. Im Sinne der Gleichbehandlung gelten entsprechende Begriffe für beide Geschlechter.
                </p>
                <p>
                  Was die verwendeten Begrifflichkeiten wie z. B. „personenbezogene Daten" oder deren „Verarbeitung" bedeuten, kann Artikel 4 der EU-Datenschutzgrundverordnung (DSGVO) entnommen werden.
                </p>
              </section>

              <section class="privacy-section">
                <h2>Hinweise zur Datenverarbeitung</h2>
                <h3>Automatisierte Datenverarbeitung (Log-Files etc.)</h3>
                <p>
                  Unsere Seite kann ohne aktive Angaben zur Person der Nutzer besucht werden. Wir speichern jedoch automatisch mit jedem Aufruf der Webseite Zugriffsdaten (Server-Log-Dateien) wie z. B. den Namen des Internet Service Providers, das verwendete Betriebssystem, die Webseite, von der aus der Nutzer uns besucht, das Datum und die Dauer des Besuchs oder den Namen der angeforderten Datei, sowie aus Sicherheitsgründen, z. B. zur Erkennung von Angriffen auf unsere Webseite, die IP-Adresse des verwendeten Endgeräts für die Dauer von 7 Tagen.
                </p>
                <p>
                  Diese Daten werden ausschließlich zur Verbesserung unseres Angebotes ausgewertet und erlauben keine Rückschlüsse auf die Person des Nutzers. Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 lit. f) DSGVO.
                </p>
              </section>

              <section class="privacy-section">
                <h3>Einsatz von Cookies</h3>
                <p>
                  Um den Besuch unserer Webseite attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir auf unserer Webseite sogenannte Cookies. Bei Cookies handelt es sich um eine Standard-Internettechnologie zum Speichern und Abrufen von Login- und anderen Nutzungsinformationen für alle Nutzer der Webseite.
                </p>
                <p>
                  <strong>Kategorien Betroffener:</strong> Webseitenbesucher, Nutzer von Onlinediensten<br>
                  <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 lit. a) DSGVO); berechtigte Interessen (Art. 6 Abs. 1 lit. f) DSGVO)
                </p>
              </section>

              <section class="privacy-section">
                <h3>Consent Management Tool</h3>
                <p>
                  Wir setzen auf unserem Onlineangebot ein Verfahren zum Einwilligungs-Management ein, um die von Besuchern unseres Onlineangebots erteilte Einwilligung nachweisbar nach den Anforderungen der DSGVO speichern und verwalten zu können.
                </p>
                <p>
                  <strong>Rechtsgrundlagen:</strong> gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c) DSGVO i.V.m. Art. 7 DSGVO)
                </p>
              </section>

              <section class="privacy-section">
                <h2>Hosting</h2>
                <p>
                  Unser Onlineangebot wird bei einem externen Dienstleister gehostet. Personenbezogene Daten der Besucher unseres Onlineangebots, insbesondere sog. Logfiles, werden auf den Servern unseres Dienstleisters gespeichert.
                </p>
                <p>
                  <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 lit. a) DSGVO); berechtigte Interessen (Art. 6 Abs. 1 lit. f) DSGVO)
                </p>
              </section>

              <section class="privacy-section">
                <h2>Webanalyse und Optimierung</h2>
                <p>
                  Damit wir Besucherströme auf unserem Onlineangebot auswerten können, setzen wir Tools zur Webanalyse bzw. Reichweitenmessung ein. Hierfür erheben wir Informationen über das Verhalten, die Interessen oder demografische Informationen zu unseren Besuchern.
                </p>
                <p>
                  <strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 lit. a) DSGVO); berechtigte Interessen (Art. 6 Abs. 1 lit. f) DSGVO)
                </p>
              </section>

              <section class="privacy-section">
                <h2>Ihre Rechte</h2>
                <div class="rights-grid">
                  <div class="right-item">
                    <strong>Recht auf Auskunft:</strong><br>
                    Sie haben das Recht, eine Bestätigung zu verlangen, ob wir Sie betreffende Daten verarbeiten (Art. 15 DSGVO).
                  </div>
                  <div class="right-item">
                    <strong>Recht auf Berichtigung:</strong><br>
                    Sie haben das Recht, die Berichtigung oder Vervollständigung der Sie betreffenden Daten zu verlangen (Art. 16 DSGVO).
                  </div>
                  <div class="right-item">
                    <strong>Recht auf Löschung:</strong><br>
                    Sie haben das Recht, die unverzügliche Löschung der Sie betreffenden Daten zu verlangen (Art. 17 DSGVO).
                  </div>
                  <div class="right-item">
                    <strong>Recht auf Datenübertragbarkeit:</strong><br>
                    Sie haben das Recht, die Bereitstellung der uns durch Sie zur Verfügung gestellten Daten zu fordern (Art. 20 DSGVO).
                  </div>
                  <div class="right-item">
                    <strong>Recht auf Widerspruch:</strong><br>
                    Sie haben das Recht, Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen (Art. 21 DSGVO).
                  </div>
                  <div class="right-item">
                    <strong>Beschwerderecht:</strong><br>
                    Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren (Art. 77 DSGVO).
                  </div>
                </div>
              </section>

              <section class="privacy-section">
                <h2>Speicherdauer</h2>
                <p>
                  Wir speichern die Daten von Besuchern unseres Onlineangebots grundsätzlich solange, wie dies zur Erbringung unserer Leistung erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen wir unterliegen, vorgesehen wurde.
                </p>
              </section>

              <section class="privacy-section">
                <h2>Kontakt</h2>
                <p>
                  Bei Fragen zum Datenschutz können Sie sich an unseren Datenschutzbeauftragten oder direkt an uns wenden:
                </p>
                <p>
                  <strong>E-Mail:</strong> info@hfg-gmuend.de<br>
                  <strong>Widerruf:</strong> Sie können eine erteilte Einwilligung jederzeit durch eine formlose Mitteilung an die obige E-Mail-Adresse widerrufen.
                </p>
              </section>

              <section class="privacy-section disclaimer">
                <p class="small-text">
                  Diese Datenschutzerklärung wurde erstellt von: Deutsche Datenschutzkanzlei – Maximilian Musch
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .app-container {
    display: flex;
    min-height: 100vh;
    background-color: #121212;
    color: #e0e0e0;
  }

  .app-container.sidebar-collapsed {
    display: block;
  }

  main {
    flex: 1;
    padding: 2rem 3rem;
    transition: all 0.3s ease;
    overflow-y: auto;
  }

  main.expanded {
    padding: 2rem 4rem;
  }

  .content-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .page-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .page-header h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, #FCEA2B 0%, #F7DC6F 50%, #FCEA2B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FCEA2B;
    margin-bottom: 1rem;
  }

  .page-subtitle {
    font-size: 1.2rem;
    color: #a0a0a0;
    margin: 0;
  }

  .content-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Language Toggle */
  .language-toggle {
    display: flex;
    gap: 0;
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 4px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .lang-btn {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    color: #a0a0a0;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    overflow: hidden;
    transform: scale(1);
  }

  .lang-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(252, 234, 43, 0.1), transparent);
    transition: left 0.6s ease;
  }

  .lang-btn:hover::before {
    left: 100%;
  }

  .lang-btn:hover {
    color: #e0e0e0;
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.05);
  }

  .lang-btn.active {
    background: linear-gradient(135deg, #FCEA2B 0%, #F7DC6F 100%);
    color: #121212;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(252, 234, 43, 0.4);
    transform: scale(1.1);
  }

  .lang-btn.active::before {
    display: none;
  }

  .lang-btn:disabled {
    pointer-events: none;
    opacity: 0.7;
    transform: scale(0.95);
  }

  /* Content Slider */
  .content-slider {
    position: relative;
    overflow: hidden;
    min-height: 200px;
    height: auto;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.01);
    transition: height 0.3s ease-in-out;
  }

  .language-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 1;
    transform: translateX(0);
  }

  /* English Content States */
  .content-slider:not(.german) .english-content {
    opacity: 1;
    transform: translateX(0) scale(1);
    z-index: 2;
    filter: blur(0px);
  }

  .content-slider:not(.german) .german-content {
    opacity: 0;
    transform: translateX(100%) scale(0.95);
    z-index: 1;
    filter: blur(2px);
  }

  /* German Content States */
  .content-slider.german .english-content {
    opacity: 0;
    transform: translateX(-100%) scale(0.95);
    z-index: 1;
    filter: blur(2px);
  }

  .content-slider.german .german-content {
    opacity: 1;
    transform: translateX(0) scale(1);
    z-index: 2;
    filter: blur(0px);
  }

  /* Transitioning Animation */
  .content-slider.transitioning .language-content {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Add a subtle glow effect during transition */
  .content-slider.transitioning {
    box-shadow: 0 0 30px rgba(252, 234, 43, 0.1);
  }

  /* Loading animation during transition */
  .content-slider.transitioning::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(252, 234, 43, 0.05), 
      transparent
    );
    animation: shimmer 0.8s ease-in-out;
    z-index: 10;
    pointer-events: none;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Text animation effects */
  .privacy-section {
    transition: all 0.3s ease;
  }

  .content-slider.transitioning .privacy-section {
    transform: translateY(10px);
    opacity: 0.8;
  }

  .content-slider:not(.transitioning) .privacy-section {
    transform: translateY(0);
    opacity: 1;
  }

  /* Privacy Content Styles */
  .privacy-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .privacy-section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .privacy-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .privacy-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #FCEA2B 0%, #F7DC6F 50%, #FCEA2B 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #FCEA2B;
    margin-bottom: 1rem;
    position: relative;
  }

  .privacy-section h2::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #FCEA2B, transparent);
    border-radius: 1px;
  }

  .privacy-section h3 {
    color: #FCEA2B;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    margin-top: 2rem;
  }

  .intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #c0c0c0;
    font-weight: 500;
  }

  .contact-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 2rem;
    margin: 1.5rem 0;
  }

  .contact-card h3 {
    color: #FCEA2B;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .contact-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .detail-group {
    line-height: 1.6;
  }

  .detail-group strong {
    color: #e0e0e0;
    display: block;
    margin-bottom: 0.5rem;
  }

  .rights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .right-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1.5rem;
    line-height: 1.5;
  }

  .right-item strong {
    color: #FCEA2B;
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .disclaimer {
    opacity: 0.7;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 2rem;
    margin-top: 3rem;
  }

  .small-text {
    font-size: 0.85rem;
    color: #888;
    line-height: 1.4;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .contact-details {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .rights-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .right-item {
      padding: 1rem;
    }

    .contact-card {
      padding: 1.5rem;
    }

    .privacy-section h2 {
      font-size: 1.3rem;
    }
  }

  /* Sidebar Control Buttons */
  .sidebar-expand-btn {
    position: fixed;
    top: 2rem;
    left: 2rem;
    z-index: 1001;
    width: 50px;
    height: 50px;
    background: rgba(18, 18, 18, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: #e0e0e0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .sidebar-expand-btn:hover {
    background: rgba(252, 234, 43, 0.1);
    border-color: rgba(252, 234, 43, 0.3);
    color: #FCEA2B;
  }

  .sidebar-expand-btn svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    main {
      padding: 2rem;
    }

    main.expanded {
      padding: 2rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
    }

    .sidebar-expand-btn {
      top: 1rem;
      left: 1rem;
      width: 45px;
      height: 45px;
    }
  }
</style>
