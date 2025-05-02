<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TokenizedPromptArea from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/TokenizedPromptArea.svelte';
  import GenerateButton from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/GenerateButton.svelte';
  import CopilotButton from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/CopilotButton.svelte'; // Assuming this component exists

  // --- Props ---
  // Bindable prop for the prompt text
  export let promptValue: string = "";

  // Props for GenerateButton
  export let generateLabel: string = "Generate";
  export let generateLoadingLabel: string = "Generating...";
  export let generateIconSrc: string = "/icon/rightIcon.svg";
  export let generateFallbackIconSrc: string = "/icon/rightIcon.svg";
  export let generateLoading: boolean = false;
  export let generateDisabled: boolean = false;

  // Props for TokenizedPromptArea
  export let placeholder: string = "Describe what you want to generate...";
  export let promptId: string = "main-prompt";

  // Props for CopilotButton (adjust as needed) - Removed showCopilot
  // export let showCopilot: boolean = true;

  // --- Events ---
  const dispatch = createEventDispatcher();

  function handleGenerateClick() {
    dispatch('generate');
  }

  function handleCopilotClick() {
    dispatch('copilot');
  }

  // Propagate input events for two-way binding
  function handleInput(event: CustomEvent<{ value: string }>) {
    promptValue = event.detail.value;
    dispatch('input', { value: promptValue });
  }

</script>

<div class="prompt-panel-component">
  <div class="prompt-input-container">
    <div class="label-container">
      <label for={promptId}>Prompt</label>
      <!-- Optional: Add Info Icon here if needed -->
      <!-- Removed #if showCopilot -->
      <CopilotButton on:click={handleCopilotClick} />
    </div>

    <TokenizedPromptArea
      bind:value={promptValue}
      id={promptId}
      {placeholder}
      on:input={handleInput}
    />
  </div>

  <div class="generate-button-container">
    <GenerateButton
      label={generateLabel}
      loadingLabel={generateLoadingLabel}
      iconSrc={generateIconSrc}
      fallbackIconSrc={generateFallbackIconSrc}
      loading={generateLoading}
      disabled={generateDisabled}
      on:click={handleGenerateClick}
    />
  </div>
</div>

<style>
  .prompt-panel-component {
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
    align-items: center;
  }

  .prompt-input-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .label-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  label {
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
    flex-grow: 1; /* Allow label to take space */
  }

  /* Style for CopilotButton might need adjustment depending on its implementation */
  .label-container :global(.copilot-button-component) { /* Example selector */
     margin-left: auto; /* Push copilot button to the right */
  }

  .generate-button-container {
    display: flex;
    align-items: center;
    height: 100%;
  }
</style>