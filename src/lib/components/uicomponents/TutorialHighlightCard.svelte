<script lang="ts">
  export let icon: string;
  export let title: string;
  export let description: string;
  export let href: string;
  export let linkText: string;
</script>

<div class="tutorial-highlight-card">
  {#if icon.endsWith('.svg')}
    <div class="highlight-icon">
      <img src={icon} alt="Tutorial Icon" class="icon-svg" />
    </div>
  {:else}
    <div class="highlight-icon">{icon}</div>
  {/if}
  <div class="highlight-content">
    <h3>{title}</h3>
    <p>{description}</p>
    <a {href} class="highlight-link">
      {linkText}
      <span class="arrow">→</span>
    </a>
  </div>
</div>

<style>
  .tutorial-highlight-card {
    display: flex;
    background-color: #1a1a1a;
    border-radius: 10px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid #333;
  }

  .tutorial-highlight-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-color: #FCEA2B;
  }

  .highlight-icon {
    font-size: 2rem;
    margin-right: 1rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 64px;
  }

  .icon-svg {
    width: 48px;
    height: 48px;
    /* Gelber Filter entfernt - natürliche SVG-Farben beibehalten */
  }

  .highlight-content {
    flex: 1;
  }

  .highlight-content h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.2rem;
    margin: 0 0 0.5rem;
    color: #e0e0e0;
  }

  .highlight-content p {
    font-size: 0.95rem;
    color: #a0a0a0;
    margin: 0 0 1rem;
    line-height: 1.5;
  }

  .highlight-link {
    display: inline-flex;
    align-items: center;
    color: #FCEA2B;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    transition: all 0.2s ease;
  }

  .highlight-link:hover {
    transform: translateX(4px);
  }

  .arrow {
    margin-left: 6px;
    transition: all 0.2s ease;
  }

  .highlight-link:hover .arrow {
    margin-left: 10px;
  }
</style>
