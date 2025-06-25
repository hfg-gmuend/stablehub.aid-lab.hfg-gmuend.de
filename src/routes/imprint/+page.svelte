<script>
  import { base } from '$app/paths';
  import MinimalSidebar from '$lib/components/uicomponents/SidePanel/MinimalSidebar.svelte';
  
  let sidebarCollapsed = false;

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
  }
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
      </div>
      
      <div class="content-section">
        <p>Content will be added soon...</p>
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
