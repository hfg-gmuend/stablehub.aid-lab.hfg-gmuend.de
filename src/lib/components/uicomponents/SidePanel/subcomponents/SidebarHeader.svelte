<script>
  import { base, assets } from '$app/paths';
</script>

<div class="sidebar-header">
  <a href="{base}/" class="logo">
    <img src="{assets}/icon/icon.svg" alt="Stablehub Logo" width="24" height="24" />
    <span>STABLEHUB</span>
  </a>
</div>

<style>
  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #333333;
    margin-bottom: 1rem;
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
</style>
