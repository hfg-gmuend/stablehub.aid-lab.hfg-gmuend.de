<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/stores/user.js';
  import { serverImages } from '$lib/stores/serverImages.js';
  import UidSwitcher from '../../UidSwitcher.svelte';
  // Annahme: SidebarHeader.svelte und NavigationSection.svelte befinden sich 
  // weiterhin in einem Unterordner 'subcomponents' relativ zu dieser Datei.
  import SidebarHeader from './subcomponents/SidebarHeader.svelte';
  import NavigationSection from './subcomponents/NavigationSection.svelte';
  
  // Mobile responsive state
  let isMobileMenuOpen = false;
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
  
  // Close mobile menu when clicking on a navigation item
  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }
  
  // Handle clicks on navigation wrapper - only close for navigation items, not UidSwitcher
  function handleNavigationClick(event: MouseEvent) {
    const target = event.target as Element;
    // Nur schließen wenn es ein Link (Navigation) ist, aber nicht der UidSwitcher
    if (target.closest('a') && !target.closest('.uid-switcher')) {
      closeMobileMenu();
    }
  }
  
  // Close mobile menu when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (isMobileMenuOpen && 
        !target.closest('.sidebar') && 
        !target.closest('.mobile-menu-button') &&
        !target.closest('.uid-dropdown')) { // UidSwitcher Dropdown berücksichtigen
      isMobileMenuOpen = false;
    }
  }
  
  // Definiere den Typ für Navigationsitems (könnte auch aus NavigationSection importiert werden, falls dort exportiert)
  type NavItem = {
    name: string;
    path: string;
  };

  // Definiere den Typ für die Funktion zur Aktivitätsprüfung (könnte auch aus NavigationSection importiert werden)
  type ActiveCheckFunction = (itemPath: string, currentPath: string) => boolean;

  // Aktuelle Route für Hervorhebung
  $: currentPath = $page.url.pathname;
  
  // Navigation für die Modi (Routenpfade bleiben unverändert)
  const modes: NavItem[] = [
    { name: 'Text To Image', path: '/text-to-image' },
    { name: 'Image To Image', path: '/image-to-image' },
    { name: 'ControlNet', path: '/control-net' }
  ];

  // Community-Bereich Daten
  const communityItems: NavItem[] = [
    { name: 'Gallery', path: '/gallery' }
  ];
  const isCommunityActive: ActiveCheckFunction = (itemPath, currentPath) => currentPath === itemPath;

  // Tutorial-Bereich Daten (Routenpfade bleiben unverändert)
  const tutorialItems: NavItem[] = [
    { name: 'Guided Tutorials', path: '/guided-tutorial' }
  ];
  const isTutorialActive: ActiveCheckFunction = (itemPath, currentPath) => currentPath.startsWith(itemPath);

  // VPN-Bereich Daten (Routenpfade bleiben unverändert)
  const vpnItems: NavItem[] = [
    { name: 'VPN Install', path: '/vpn-install' }
  ];
  const isVpnActive: ActiveCheckFunction = (itemPath, currentPath) => currentPath === itemPath;

  function handleUidChanged(event: CustomEvent) {
    console.log('[MinimalSidebar] UID changed:', event.detail);
    // Leere den lokalen Cache - jede Seite lädt ihre eigenen type-spezifischen Bilder
    serverImages.clearLocalData();
  }

</script>

<svelte:window on:click={handleClickOutside} />

<!-- Mobile Burger Menu Button -->
<button class="mobile-menu-button" class:hidden={isMobileMenuOpen} on:click={toggleMobileMenu}>
  <span class="burger-line"></span>
  <span class="burger-line"></span>
  <span class="burger-line"></span>
</button>

<!-- Mobile Overlay -->
{#if isMobileMenuOpen}
  <div class="mobile-overlay" on:click={closeMobileMenu}></div>
{/if}

<aside class="sidebar" class:mobile-open={isMobileMenuOpen}>
  <SidebarHeader />
  
  <div class="navigation-wrapper" on:click={handleNavigationClick}>
    <NavigationSection 
      title="Generation Tools" 
      items={modes} 
      {currentPath} 
    />
    
    <NavigationSection 
      title="Community" 
      items={communityItems} 
      {currentPath} 
      activeCheckFn={isCommunityActive}
      isBorderTop={true}
    />
    
    <NavigationSection 
      title="Learn & Explore" 
      items={tutorialItems} 
      {currentPath} 
      activeCheckFn={isTutorialActive}
      isBorderTop={true}
    />
    
    <NavigationSection 
      title="USE FROM HOME" 
      items={vpnItems} 
      {currentPath} 
      activeCheckFn={isVpnActive}
      isBorderTop={true}
    />

    <!-- User ID Switcher am unteren Ende -->
    <div class="sidebar-footer">
      <UidSwitcher on:uidChanged={handleUidChanged} />
    </div>
  </div>

</aside>

<style>
  /* Mobile Burger Menu Button */
  .mobile-menu-button {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 1001;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 0.75rem;
    cursor: pointer;
    flex-direction: column;
    gap: 0.25rem;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }

  .mobile-menu-button:hover {
    background-color: #333;
    border-color: #FCEA2B;
  }

  .mobile-menu-button.hidden {
    display: none; /* Vollständiges Ausblenden statt nur Transparenz */
  }

  .burger-line {
    width: 20px;
    height: 2px;
    background-color: #e0e0e0;
    transition: all 0.3s ease;
    border-radius: 1px;
  }

  /* Mobile Overlay */
  .mobile-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  /* Sidebar */
  .sidebar {
    width: 280px;
    background-color: #1a1a1a;
    border-right: 1px solid #333333;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
    transition: transform 0.3s ease;
  }

  .navigation-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    /* Kein overflow für Desktop - UidSwitcher kann überfließen */
  }

  .sidebar-footer {
    margin-top: auto;
    padding: 1rem;
    border-top: 1px solid #333;
    background-color: rgba(42, 42, 42, 0.3);
    flex-shrink: 0; /* Verhindert Komprimierung des Footer */
  }

  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .mobile-menu-button {
      display: flex;
    }

    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      transform: translateX(-100%);
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
      height: 100vh;
      height: 100dvh; /* Dynamic viewport height for mobile */
      overflow: hidden; /* Prevent body scroll */
    }

    .sidebar.mobile-open {
      transform: translateX(0);
    }

    .navigation-wrapper {
      overflow-y: auto;
      overflow-x: hidden;
      padding-bottom: 1rem; /* Extra padding for better scroll experience */
      scrollbar-width: thin;
      scrollbar-color: #FCEA2B #333;
    }

    /* Custom scrollbar for WebKit browsers */
    .navigation-wrapper::-webkit-scrollbar {
      width: 6px;
    }

    .navigation-wrapper::-webkit-scrollbar-track {
      background: #333;
    }

    .navigation-wrapper::-webkit-scrollbar-thumb {
      background-color: #FCEA2B;
      border-radius: 3px;
    }

    .mobile-overlay {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .sidebar {
      width: 100%;
      max-width: 300px;
    }
  }

  /* Styles für .sidebar-header, .logo, .mode-navigation, h3, 
     .mode-buttons, .mode-button wurden in die 
     Unterkomponenten verschoben. */

  /* Style für .tutorial-section wurde durch isBorderTop in NavigationSection ersetzt */
</style>
