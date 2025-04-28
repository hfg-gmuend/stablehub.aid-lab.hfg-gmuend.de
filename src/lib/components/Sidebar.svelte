<script>
  import { page } from '$app/stores';
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div class="logo">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M12 2l9 5v10l-9 5-9-5V7l9-5zm0 2.5L5.5 8 12 11.5 18.5 8 12 4.5zm-6.5 6.5v4.7L11 19v-4.9L5.5 11zm13 0l-5.5 3.1V19l5.5-2.8v-4.7z"/>
      </svg>
      <span>HfG Ai-Hub</span>
    </div>
  </div>
  
  <nav>
    <div class="section">
      <h3>Collection</h3>
      <ul>
        <li><a href="/" class:active={$page.url.pathname === '/'}>Dashboard</a></li>
        <li><a href="/text-to-image" class:active={$page.url.pathname === '/text-to-image'}>Text To Image</a></li>
        <li><a href="/image-to-image" class:active={$page.url.pathname === '/image-to-image'}>Image To Image</a></li>
        <li><a href="/control-net" class:active={$page.url.pathname === '/control-net'}>ControlNet</a></li>
      </ul>
    </div>
    
    <div class="section">
      <h3>Tutorials</h3>
      <ul>
        <li><a href="/tutorials/basics">Grundlagen</a></li>
        <li><a href="/tutorials/advanced">Fortgeschritten</a></li>
      </ul>
    </div>
    
    <div class="section">
      <h3>Links</h3>
      <ul>
        <li><a href="https://hfg.design" target="_blank" rel="noopener">HfG Website</a></li>
        <li><a href="https://github.com/CompVis/stable-diffusion" target="_blank" rel="noopener">Stable Diffusion</a></li>
      </ul>
    </div>
  </nav>
  
  <div class="vpn-section">
    <h3>VPN Setup</h3>
    <p>Verbinde dich zum Hochschulnetzwerk für volle Funktionalität</p>
    <a href="/vpn-setup" class="vpn-button">VPN einrichten</a>
  </div>
</aside>

<style>
  .sidebar {
    width: 280px;
    background-color: #1a1a1a; /* Dunklerer Hintergrund */
    border-right: 1px solid #333333; /* Dunklere Trennlinie */
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #333333; /* Dunklere Trennlinie */
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.2rem;
    color: #ffffff; /* Weiße Textfarbe */
  }
  
  nav {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
  }
  
  .section {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
    color: #888888; /* Gedämpftes Grau für Überschriften */
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    text-decoration: none;
    color: #b0b0b0; /* Hellgrau für Links */
    font-family: 'Inter', sans-serif;
    transition: background-color 0.2s, color 0.2s;
  }
  
  a:hover {
    background-color: #333333; /* Dunkleres Hover */
    color: #ffffff; /* Weiß beim Hover */
  }
  
  a.active {
    background-color: #333333; /* Dunkleres Grau für aktiven Zustand */
    color: #ffffff; /* Weiß für aktiven Zustand */
    font-weight: 500;
  }
  
  .vpn-section {
    padding: 1.5rem;
    border-top: 1px solid #333333; /* Dunklere Trennlinie */
    margin-top: auto;
    background-color: #1e1e1e; /* Etwas hellerer Hintergrund */
  }
  
  .vpn-button {
    display: inline-block;
    background-color: #FCEA2B; /* Gelbe Akzentfarbe */
    color: #121212; /* Dunkle Textfarbe für Kontrast */
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-align: center;
    margin-top: 0.5rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  
  .vpn-button:hover {
    background-color: #ffe566; /* Helleres Gelb beim Hover */
  }
</style>
