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
    
    const englishContent = contentSlider.querySelector('.english-content');
    const germanContent = contentSlider.querySelector('.german-content');
    
    if (englishContent && germanContent) {
      const englishHeight = englishContent.scrollHeight;
      const germanHeight = germanContent.scrollHeight;
      const maxHeight = Math.max(englishHeight, germanHeight);
      
      contentSlider.style.height = `${maxHeight}px`;
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
    // Set initial height
    setTimeout(() => {
      updateSliderHeight();
    }, 100);
    
    // Update height on window resize
    const handleResize = () => updateSliderHeight();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:head>
  <title>Imprint | Stablehub</title>
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
        <h1>Imprint</h1>
        <p class="page-subtitle">Legal information and contact details</p>
        
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
            <div class="imprint-content">
              <section class="imprint-section">
                <p class="intro-text">
                  The provider and therefore responsible for the commercial and business online offering is the University of Applied Sciences Schwäbisch Gmünd, represented by Rector Maren Schmohl.
                </p>
              </section>

              <!-- ...existing English content... -->
              <section class="imprint-section">
                <h2>Legal Information</h2>
                <p class="section-subtitle">According to § 2 Para. 1 Service Information Obligations Ordinance (DL-InfoV):</p>
                <p>This online offering is an information service of the</p>
                
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
                      Email: sekretariat (ät) hfg-gmuend (dot) de<br>
                      Web: www.hfg-gmuend.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Legal Details</h2>
                <div class="legal-grid">
                  <div class="legal-item">
                    <strong>Registered Office:</strong><br>
                    73525 Schwäbisch Gmünd, Germany
                  </div>
                  <div class="legal-item">
                    <strong>Legal Form:</strong><br>
                    Public Law Corporation (KdöR)
                  </div>
                  <div class="legal-item">
                    <strong>Applicable Law:</strong><br>
                    Law of the Federal Republic of Germany
                  </div>
                  <div class="legal-item">
                    <strong>VAT ID:</strong><br>
                    DE235273485
                  </div>
                  <div class="legal-item">
                    <strong>Authorized Representative:</strong><br>
                    Maren Schmohl
                  </div>
                  <div class="legal-item">
                    <strong>Registry Court:</strong><br>
                    Amtsgericht Schwäbisch Gmünd
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Supervisory Authority</h2>
                <div class="contact-card">
                  <h3>Ministry of Science, Research and Arts Baden-Württemberg</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Address:</strong><br>
                      Königstraße 46<br>
                      70173 Stuttgart<br>
                      Germany
                    </div>
                    <div class="detail-group">
                      <strong>Contact:</strong><br>
                      Phone: +49 711 279-0<br>
                      Fax: +49 711 279-3080<br>
                      Email: poststelle (ät) mwk.bwl (dot) de<br>
                      Web: mwk.baden-wuerttemberg.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Editorial Responsibility</h2>
                <p>
                  Responsible for journalistic editorial contributions according to § 55 Para. 2 State Treaty for Broadcasting and Telemedia (RStV):<br>
                  <strong>University of Applied Sciences Schwäbisch Gmünd</strong><br>
                  Rektor-Klaus-Straße 100, 73525 Schwäbisch Gmünd, Germany
                </p>
              </section>

              <section class="imprint-section">
                <h2>External Data Protection Officer</h2>
                <p class="section-subtitle">According to Art. 37 GDPR:</p>
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
                      Email: musch (ät) ddsk (dot) de<br>
                      Web: deutsche-datenschutzkanzlei.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Liability</h2>
                <p>
                  The University of Applied Sciences Schwäbisch Gmünd may change this online offering in whole or in part at any time at its own discretion and without assuming liability and without notice, and may discontinue its operation. By setting a link to external online offerings ("hyperlinks"), the University of Applied Sciences Schwäbisch Gmünd does not make this online offering or its content its own. Furthermore, the University of Applied Sciences Schwäbisch Gmünd is not responsible for the availability of these online offerings or their contents.
                </p>
              </section>

              <section class="imprint-section">
                <h2>Copyright</h2>
                <p>
                  <strong>All rights reserved.</strong> Text, images and graphics as well as their arrangement in the online offering are subject to the protection of copyright and other protective laws. The content of this online offering may not be copied, distributed, modified or made accessible to third parties for commercial purposes.
                </p>
                <p>
                  <strong>Image Sources:</strong> All copyright holders are indicated for each respective image.
                </p>
              </section>

              <section class="imprint-section">
                <h2>Equal Treatment Note</h2>
                <p>
                  <strong>General Equal Treatment Act (AGG):</strong><br>
                  For reasons of easier readability, gender-specific differentiation is omitted. Corresponding terms apply in the sense of equal treatment for all genders.
                </p>
              </section>

              <section class="imprint-section disclaimer">
                <p class="small-text">
                  This imprint was created by: Deutsche Datenschutzkanzlei Datenschutz-Office München – deutsche-datenschutzkanzlei.de
                </p>
              </section>
            </div>
          </div>

          <!-- German Content -->
          <div class="language-content german-content">
            <div class="imprint-content">
              <section class="imprint-section">
                <p class="intro-text">
                  Anbieter und somit verantwortlich für das kommerzielle und geschäftsmäßige Onlineangebot ist die Hochschule für Gestaltung Schwäbisch Gmünd, vertreten durch die Rektorin Maren Schmohl.
                </p>
              </section>

              <section class="imprint-section">
                <h2>Rechtliche Informationen</h2>
                <p class="section-subtitle">Informationen gemäß § 2 Absatz 1 Dienstleistungs-Informationspflichten-Verordnung (DL-InfoV):</p>
                <p>Dieses Onlineangebot ist ein Informationsangebot der</p>
                
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
                      E-Mail: sekretariat (ät) hfg-gmuend (dot) de<br>
                      Web: www.hfg-gmuend.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Rechtliche Details</h2>
                <div class="legal-grid">
                  <div class="legal-item">
                    <strong>Sitz der Hochschule:</strong><br>
                    73525 Schwäbisch Gmünd, Deutschland
                  </div>
                  <div class="legal-item">
                    <strong>Rechtsform:</strong><br>
                    Körperschaft des öffentlichen Rechts (KdöR)
                  </div>
                  <div class="legal-item">
                    <strong>Anwendbares Recht:</strong><br>
                    Recht der Bundesrepublik Deutschland (BRD)
                  </div>
                  <div class="legal-item">
                    <strong>Umsatzsteuer-ID:</strong><br>
                    DE235273485
                  </div>
                  <div class="legal-item">
                    <strong>Vertretungsberechtigt:</strong><br>
                    Maren Schmohl
                  </div>
                  <div class="legal-item">
                    <strong>Amtsgericht:</strong><br>
                    Schwäbisch Gmünd
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Zuständige Aufsichtsbehörde</h2>
                <div class="contact-card">
                  <h3>Ministerium für Wissenschaft, Forschung und Kunst Baden-Württemberg</h3>
                  <div class="contact-details">
                    <div class="detail-group">
                      <strong>Adresse:</strong><br>
                      Königstraße 46<br>
                      70173 Stuttgart<br>
                      Deutschland
                    </div>
                    <div class="detail-group">
                      <strong>Kontakt:</strong><br>
                      Telefon: 0711 279 – 0<br>
                      Telefax: 0711 279‑3080<br>
                      E-Mail: poststelle (ät) mwk.bwl (dot) de<br>
                      Web: https://mwk.baden-wuerttemberg.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Redaktionelle Verantwortung</h2>
                <p>
                  Verantwortlicher für journalistisch redaktionelle Beiträge gemäß § 55 Absatz 2 Staatsvertrag für Rundfunk und Telemedien (RStV):<br>
                  <strong>Hochschule für Gestaltung Schwäbisch Gmünd</strong><br>
                  Rektor-Klaus-Straße 100, 73525 Schwäbisch Gmünd, Deutschland
                </p>
              </section>

              <section class="imprint-section">
                <h2>Externer Datenschutzbeauftragter</h2>
                <p class="section-subtitle">Gemäß Art. 37 DSGVO:</p>
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
                      E-Mail: musch (ät) ddsk (dot) de<br>
                      Web: deutsche-datenschutzkanzlei.de
                    </div>
                  </div>
                </div>
              </section>

              <section class="imprint-section">
                <h2>Haftung</h2>
                <p>
                  Die Hochschule für Gestaltung Schwäbisch Gmünd kann dieses Onlineangebot nach eigenem Ermessen und ohne Übernahme einer Haftung jederzeit ohne Ankündigung ganz oder teilweise verändern und deren Betrieb einstellen. Durch das Setzen eines Links zu fremden Onlineangeboten („Hyperlinks") macht sich die Hochschule für Gestaltung Schwäbisch Gmünd weder dieses Onlineangebot noch deren Inhalt zu Eigen. Ferner ist die Hochschule für Gestaltung Schwäbisch Gmünd nicht verantwortlich für die Verfügbarkeit dieser Onlineangebote oder von deren Inhalten.
                </p>
              </section>

              <section class="imprint-section">
                <h2>Copyright</h2>
                <p>
                  <strong>Alle Rechte vorbehalten.</strong> Text, Bilder und Grafiken sowie deren Anordnung im Onlineangebot unterliegen dem Schutz des Urheberrechts und anderer Schutzgesetze. Der Inhalt dieses Onlineangebots darf nicht zu kommerziellen Zwecken kopiert, verbreitet, verändert oder Dritten zugänglich gemacht werden.
                </p>
                <p>
                  <strong>Copyright Bildquellen:</strong> Alle Urheber bei jeweiligem Bild angegeben.
                </p>
              </section>

              <section class="imprint-section">
                <h2>Gleichbehandlungshinweis</h2>
                <p>
                  <strong>Allgemeines Gleichbehandlungsgesetz (AGG):</strong><br>
                  Aus Gründen der leichteren Lesbarkeit wird auf eine geschlechterspezifische Differenzierung verzichtet. Entsprechende Begriffe gelten im Sinne der Gleichbehandlung für alle Geschlechter.
                </p>
              </section>

              <section class="imprint-section disclaimer">
                <p class="small-text">
                  Dieses Impressum wurde erstellt von: Deutsche Datenschutzkanzlei Datenschutz-Office München – deutsche-datenschutzkanzlei.de
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
    min-height: 400px;
    height: auto;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.01);
    transition: height 0.3s ease;
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
  .imprint-section {
    transition: all 0.3s ease;
  }

  .content-slider.transitioning .imprint-section {
    transform: translateY(10px);
    opacity: 0.8;
  }

  .content-slider:not(.transitioning) .imprint-section {
    transform: translateY(0);
    opacity: 1;
  }

  .content-slider.transitioning .language-content {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Imprint Content Styles */
  .imprint-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .imprint-section {
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .imprint-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }

  .imprint-section h2 {
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

  .imprint-section h2::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #FCEA2B, transparent);
    border-radius: 1px;
  }

  .intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #c0c0c0;
    font-weight: 500;
  }

  .section-subtitle {
    color: #a0a0a0;
    font-style: italic;
    margin-bottom: 1rem;
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

  .legal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .legal-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 1.5rem;
    line-height: 1.5;
  }

  .legal-item strong {
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

    .legal-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .legal-item {
      padding: 1rem;
    }

    .contact-card {
      padding: 1.5rem;
    }

    .imprint-section h2 {
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
