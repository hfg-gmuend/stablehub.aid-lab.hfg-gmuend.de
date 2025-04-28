<script>
  import { page } from '$app/stores';
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <a href="/" class="logo">
      <img src="/icon/icon.svg" alt="HfG Ai-Hub Logo" width="24" height="24" />
      <span>HfG Ai-Hub</span>
    </a>
  </div>
  
  <nav>
    <div class="section">
      <h3>Collection</h3>
      <ul>
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
    background-color: #1a1a1a;
    border-right: 1px solid #333333;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
  }
  
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #333333;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    font-size: 1.2rem;
    color: #ffffff;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  
  .logo:hover {
    opacity: 0.8;
  }
  
  .logo img {
    object-fit: contain;
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
    color: #888888;
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
    color: #b0b0b0;
    font-family: 'Inter', sans-serif;
    transition: background-color 0.2s, color 0.2s;
  }
  
  a:hover {
    background-color: #333333;
    color: #ffffff;
  }
  
  a.active {
    background-color: #333333;
    color: #ffffff;
    font-weight: 500;
  }
  
  .vpn-section {
    padding: 1.5rem;
    border-top: 1px solid #333333;
    margin-top: auto;
    background-color: #1e1e1e;
  }
  
  .vpn-button {
    display: inline-block;
    background-color: #FCEA2B;
    color: #121212;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-align: center;
    margin-top: 0.5rem;
    font-weight: 500;
    transition: background-color 0.2s;
  }
  
  .vpn-button:hover {
    background-color: #ffe566;
  }
</style>
