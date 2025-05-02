<script>
  import { page } from '$app/stores';
  // Annahme: SidebarHeader.svelte und NavigationSection.svelte befinden sich 
  // weiterhin in einem Unterordner 'subcomponents' relativ zu dieser Datei.
  import SidebarHeader from './subcomponents/SidebarHeader.svelte';
  import NavigationSection from './subcomponents/NavigationSection.svelte';
  
  // Aktuelle Route für Hervorhebung
  $: currentPath = $page.url.pathname;
  
  // Navigation für die Modi (Routenpfade bleiben unverändert)
  const modes = [
    { name: 'Text To Image', path: '/text-to-image' },
    { name: 'Image To Image', path: '/image-to-image' },
    { name: 'ControlNet', path: '/control-net' }
  ];

  // Tutorial-Bereich Daten (Routenpfade bleiben unverändert)
  const tutorialItems = [
    { name: 'Guided Tutorials', path: '/guided-tutorial' }
  ];
  const isTutorialActive = (itemPath, currentPath) => currentPath.startsWith(itemPath);

  // VPN-Bereich Daten (Routenpfade bleiben unverändert)
  const vpnItems = [
    { name: 'VPN Install', path: '/vpn-install' }
  ];
  const isVpnActive = (itemPath, currentPath) => currentPath === itemPath;

</script>

<aside class="minimal-sidebar">
  <SidebarHeader />
  
  <NavigationSection 
    title="Modi Auswahl" 
    items={modes} 
    {currentPath} 
  />
  
  <NavigationSection 
    title="Lernbereich" 
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

</aside>

<style>
  .minimal-sidebar {
    width: 280px;
    background-color: #1a1a1a;
    border-right: 1px solid #333333;
    display: flex;
    flex-direction: column;
    height: 100vh;
    position: sticky;
    top: 0;
  }

  /* Styles für .sidebar-header, .logo, .mode-navigation, h3, 
     .mode-buttons, .mode-button wurden in die 
     Unterkomponenten verschoben. */

  /* Style für .tutorial-section wurde durch isBorderTop in NavigationSection ersetzt */
</style>
