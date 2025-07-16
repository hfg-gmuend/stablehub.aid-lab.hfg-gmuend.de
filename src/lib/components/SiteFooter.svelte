<script>
  import { base } from "$app/paths";
</script>

<!-- Footer -->
<footer class="site-footer">
  <div class="footer-content">
    <div class="footer-section footer-legal">
      <h3>Legal</h3>
      <ul class="footer-links">
        <li><a href="{base}/imprint">Imprint</a></li>
        <li><a href="{base}/data-privacy">Data Privacy</a></li>
      </ul>
    </div>
    
    <div class="footer-section footer-powered">
      <h3>Powered by</h3>
      <div class="powered-grid">
        <div class="powered-item">
          <span class="institution-name">HfG Schwäbisch Gmünd</span>
          <span class="institution-name">AI+D Lab</span>
        </div>
        <div class="powered-item">
          <span class="institution-name">Federal Ministry of<br>Research, Technology<br>and Space</span>
        </div>
        <div class="powered-item">
          <span class="institution-name">Ministerium für Wissenschaft,<br>Forschung und Kunst<br>Baden-Württemberg</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="footer-bottom">
    <p>&copy; 2025 Stablehub. All rights reserved.</p>
  </div>
</footer>

<style>
  /* Footer */
  .site-footer {
    background: rgba(18, 18, 18, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem 2rem 1.5rem;
    margin-top: 4rem;
    backdrop-filter: blur(10px);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 8rem;
    margin-bottom: 2rem;
  }

  .footer-legal {
    min-width: 160px;
  }

  .footer-powered {
    flex: 1;
    max-width: 800px;
  }

  .footer-section h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #FCEA2B;
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-links a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
  }

  .footer-links a:hover {
    color: #FCEA2B;
  }

  .powered-grid {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .powered-item {
    position: relative;
    padding-left: 1.2rem;
    flex: 1;
    min-width: 200px;
  }

  .powered-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.4rem;
    width: 6px;
    height: 6px;
    background: #FCEA2B;
    border-radius: 50%;
  }

  .institution-name {
    color: #a0a0a0;
    font-size: 0.9rem;
    line-height: 1.4;
    display: block;
    transition: color 0.3s ease;
  }

  .powered-item:hover .institution-name {
    color: #c0c0c0;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
  }

  .footer-bottom p {
    color: #666;
    font-size: 0.85rem;
    margin: 0;
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .site-footer {
      padding: 2rem 1rem 1rem;
    }
    
    .footer-content {
      flex-direction: column;
      gap: 2.5rem;
      align-items: stretch;
    }

    .footer-legal {
      min-width: auto;
    }

    .footer-powered {
      max-width: none;
    }
    
    .powered-grid {
      flex-direction: column;
      gap: 1.5rem;
    }

    .powered-item {
      min-width: auto;
    }
    
    .institution-name {
      font-size: 0.85rem;
      line-height: 1.3;
    }
  }
</style>
