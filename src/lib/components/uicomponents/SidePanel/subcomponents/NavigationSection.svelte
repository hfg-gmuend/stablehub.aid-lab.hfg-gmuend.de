<script lang="ts">
  import NavigationButton from './NavigationButton.svelte';

  // Definiere einen Typ für die Navigationsitems
  type NavItem = {
    name: string;
    path: string;
  };

  // Definiere einen Typ für die Funktion zur Aktivitätsprüfung
  type ActiveCheckFunction = (itemPath: string, currentPath: string) => boolean;

  export let title: string = '';
  export let items: NavItem[] = []; // Array von NavItem
  export let currentPath: string = '';
  // Optionale Funktion zur Bestimmung des aktiven Zustands,
  // standardmäßig wird auf exakte Pfadübereinstimmung geprüft.
  export let activeCheckFn: ActiveCheckFunction = (itemPath, currentPath) => itemPath === currentPath;
  export let isBorderTop: boolean = false; // Für Trennlinie oben
</script>

<div class="mode-navigation" class:border-top={isBorderTop}>
  <h3>{title}</h3>
  <div class="mode-buttons">
    {#each items as item}
      <NavigationButton 
        href={item.path} 
        name={item.name}
        isActive={activeCheckFn(item.path, currentPath)}
      />
    {/each}
  </div>
</div>

<style>
  .mode-navigation {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
  }

  .mode-navigation.border-top {
     margin-top: 1.5rem;
     padding-top: 1.5rem;
     border-top: 1px solid #333333;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    color: #888888;
  }
  
  .mode-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
