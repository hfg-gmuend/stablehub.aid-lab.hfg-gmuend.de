<script>
  export let href = '';
  export let name = '';
  export let isActive = false;
</script>

<a 
  {href} 
  class="mode-button" 
  class:active={isActive}
>
  {name}
</a>

<style>
  .mode-button {
    padding: 0.75rem 1rem;
    background-color: #262626;
    border-radius: 6px;
    color: #b0b0b0;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
    border-right: 0 solid transparent; /* Änderung: Border rechts statt links */
  }
  
  .mode-button:hover {
    background-color: #2a2a2a;
    color: #ffffff;
    border-right: 3px solid rgba(252, 234, 43, 0.5); /* Gelber Border mit Transparenz beim Hover */
    box-shadow: 0 0 10px rgba(252, 234, 43, 0.2); /* Subtiler Glow-Effekt */
  }
  
  .mode-button.active {
    background-color: #1e1e1e;
    color: #ffffff;
    border-right: 3px solid #FCEA2B; /* Änderung: Border rechts statt links */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
</style>
