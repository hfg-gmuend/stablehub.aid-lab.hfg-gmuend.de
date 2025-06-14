<script lang="ts">
  import { page } from '$app/stores';
  import { user } from '$lib/stores/user.js';
  import { serverImages } from '$lib/stores/serverImages.js';
  import UidSwitcher from '../../UidSwitcher.svelte';
  // Annahme: SidebarHeader.svelte und NavigationSection.svelte befinden sich 
  // weiterhin in einem Unterordner 'subcomponents' relativ zu dieser Datei.
  import SidebarHeader from './subcomponents/SidebarHeader.svelte';
  import NavigationSection from './subcomponents/NavigationSection.svelte';
  
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

<aside class="minimal-sidebar">
  <SidebarHeader />
  
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

  .sidebar-footer {
    margin-top: auto;
    padding: 1rem;
    border-top: 1px solid #333;
    background-color: rgba(42, 42, 42, 0.3);
  }

  /* Styles für .sidebar-header, .logo, .mode-navigation, h3, 
     .mode-buttons, .mode-button wurden in die 
     Unterkomponenten verschoben. */

  /* Style für .tutorial-section wurde durch isBorderTop in NavigationSection ersetzt */
</style>
