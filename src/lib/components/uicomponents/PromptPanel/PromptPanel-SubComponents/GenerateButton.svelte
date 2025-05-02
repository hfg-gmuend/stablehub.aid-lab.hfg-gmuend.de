<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let label: string = 'Generieren';
  export let loadingLabel: string = 'Generiere...';
  export let iconSrc: string = '/icon/rightIcon.svg';
  export let fallbackIconSrc: string = '/icon/rightIcon.svg'; // Fallback Icon
  export let loading: boolean = false;
  export let disabled: boolean = false;

  const dispatch = createEventDispatcher();

  let iconLoadError = false; // State to track icon loading error

  function handleIconError() {
    iconLoadError = true;
  }

  function handleClick() {
    if (!disabled && !loading) {
      dispatch('click');
    }
  }

  // Determine the icon source based on error state
  $: currentIconSrc = iconLoadError ? fallbackIconSrc : iconSrc;

</script>

<button
  type="button"
  on:click={handleClick}
  disabled={disabled || loading}
  aria-busy={loading}
  class:disabled={disabled && !loading}
>
  <img
    src={currentIconSrc}
    alt=""
    aria-hidden="true"
    class="button-icon-inside"
    on:error={handleIconError}
  />
  <span>
    {loading ? loadingLabel : label}
  </span>
</button>

<style>
  button {
    padding: 0.85rem 1.25rem;
    background-color: #FCEA2B;
    color: #121212;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    white-space: nowrap;
    box-shadow: 0 2px 5px rgba(252, 234, 43, 0.2);
  }

  button:hover:not(:disabled) {
    background-color: #ffe566;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(252, 234, 43, 0.3);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(252, 234, 43, 0.2);
  }

  button:disabled,
  button.disabled {
    background-color: #444;
    color: #888;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .button-icon-inside {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
</style>
