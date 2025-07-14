<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TokenizedPromptArea from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/TokenizedPromptArea.svelte';
  import GenerateButton from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/GenerateButton.svelte';
  import CopilotButton from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/CopilotButton.svelte';
  import GenerateIconButton from '$lib/components/uicomponents/PromptPanel/PromptPanel-SubComponents/GenerateIconButton.svelte';
  import Tooltip from '$lib/components/uicomponents/Tooltip.svelte'; // Importiere die neue Komponente
  import MagicPrompt from '$lib/components/MagicPrompt.svelte';
  import { checkForBlacklistWords } from '$lib/stores/blacklistStore';

  // --- Props ---
  export let promptValue: string = "";
  export let generateLabel: string = "Generate";
  export let generateLoadingLabel: string = "Generating...";
  export let generateIconSrc: string = "/icon/rightIcon.svg";
  export let generateFallbackIconSrc: string = "/icon/rightIcon.svg";
  export let generateLoading: boolean = false;
  export let generateDisabled: boolean = false;
  export let placeholder: string = "Describe what you want to generate...";
  export let promptId: string = "main-prompt";

  // --- Token Counter Logic ---
  let tokenCount: number = 0; // Variable zum Binden
  const tokenLimit: number = 77; // Definiere das Limit hier
  $: isOverLimit = tokenCount > tokenLimit; // Berechne den Überlimit-Status

  // --- Tooltip State ---
  let isTokenCounterHovered: boolean = false;
  const tokenTooltipText = `Shows token count (max ${tokenLimit}). Each token has progressively less weight/importance than the previous one in generation.`;
  let isCopilotHovered: boolean = false; // State for Copilot tooltip
  const copilotTooltipText = "Use Style Copilot to easily generate and insert a Stable Diffusion prompt."; // English tooltip text
  let isGenerateIconHovered: boolean = false; // State for Generate Icon tooltip
  const generateIconTooltipText = "Enhance your prompt with AI magic"; // Tooltip text for the new button
  
  // Magic Prompt Enhancement
  let magicPromptComponent: any; // Reference to the MagicPrompt component
  let isMagicPromptLoading: boolean = false; // Loading state for magic prompt

  // --- Blacklist Validation ---
  let blacklistValidation: { hasBlacklistWords: boolean; foundWords: string[] } = { hasBlacklistWords: false, foundWords: [] };
  $: {
    blacklistValidation = checkForBlacklistWords(promptValue);
  }
  $: isGenerateBlocked = generateDisabled || blacklistValidation.hasBlacklistWords;

  // --- Events ---
  const dispatch = createEventDispatcher();

  function handleGenerateClick() {
    // Verhindere Generation wenn Blacklist-Wörter erkannt wurden
    if (blacklistValidation.hasBlacklistWords) {
      return;
    }
    dispatch('generate');
  }

  function handleCopilotClick() {
    dispatch('copilot');
  }

  async function handleGenerateIconClick() {
    if (!promptValue.trim() || isMagicPromptLoading) {
      return; // Do nothing if prompt is empty or already loading
    }
    
    try {
      isMagicPromptLoading = true;
      const enhancedPrompt = await magicPromptComponent.enhancePromptDirect(promptValue);
      promptValue = enhancedPrompt;
      dispatch('input', { value: promptValue });
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      // Could show a toast notification here
    } finally {
      isMagicPromptLoading = false;
    }
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
      <!-- Token Counter Wrapper -->
      <div
        class="tooltip-wrapper"
        on:mouseenter={() => isTokenCounterHovered = true}
        on:mouseleave={() => isTokenCounterHovered = false}
        role="status"
      >
        <div
          class="token-counter {isOverLimit ? 'warning' : ''}"
          aria-describedby="token-counter-tooltip"
        >
          {tokenCount}/{tokenLimit}
        </div>
        <Tooltip id="token-counter-tooltip" text={tokenTooltipText} visible={isTokenCounterHovered} minWidth={200} />
      </div> <!-- Korrektes Schließen des ersten Wrappers -->

      <!-- Generate Icon Button Wrapper -->
      <div
        class="tooltip-wrapper"
        on:mouseenter={() => isGenerateIconHovered = true}
        on:mouseleave={() => isGenerateIconHovered = false}
        role="group"
      >
        <GenerateIconButton on:click={handleGenerateIconClick} ariaDescribedby="generate-icon-tooltip" loading={isMagicPromptLoading} />
        <Tooltip id="generate-icon-tooltip" text={generateIconTooltipText} visible={isGenerateIconHovered} maxWidth={450} minWidth={200} />
      </div>

      <!-- Copilot Button Wrapper -->
      <div
        class="tooltip-wrapper"
        on:mouseenter={() => isCopilotHovered = true}
        on:mouseleave={() => isCopilotHovered = false}
        role="group"
      >
        <CopilotButton on:click={handleCopilotClick} ariaDescribedby="copilot-tooltip" />
        <Tooltip id="copilot-tooltip" text={copilotTooltipText} visible={isCopilotHovered} maxWidth={450} minWidth={200} />
      </div>
    </div>

    <TokenizedPromptArea
      bind:value={promptValue}
      bind:tokenCount={tokenCount}
      tokenLimit={tokenLimit}
      id={promptId}
      {placeholder}
      on:input={handleInput}
    />

    <!-- Blacklist Warning -->
    {#if blacklistValidation.hasBlacklistWords}
      <div class="blacklist-warning" role="alert">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>
          Your prompt contains prohibited terms: <strong>{blacklistValidation.foundWords.join(', ')}</strong>. 
          Please remove these words to continue.
        </span>
      </div>
    {/if}
  </div>

  <div class="generate-button-container">
    <GenerateButton
      label={generateLabel}
      loadingLabel={generateLoadingLabel}
      iconSrc={generateIconSrc}
      fallbackIconSrc={generateFallbackIconSrc}
      loading={generateLoading}
      disabled={isGenerateBlocked}
      on:click={handleGenerateClick}
    />
  </div>
</div>

<!-- Magic Prompt Component (hidden, used for function only) -->
<MagicPrompt bind:this={magicPromptComponent} />

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

  /* Mobile Layout */
  @media (max-width: 768px) {
    .prompt-panel-component {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      gap: 1rem;
      align-items: stretch;
    }
    
    .generate-button-container {
      width: 100%;
    }
    
    .generate-button-container :global(button) {
      width: 100%;
      justify-content: center;
    }
  }

  .prompt-input-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0; /* Verhindert Überlaufen */
  }

  .label-container {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
    flex-wrap: nowrap;
  }
  
  /* Mobile Label Layout */
  @media (max-width: 768px) {
    .label-container {
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  }

  label {
    font-weight: 500;
    font-family: 'IBM Plex Mono', monospace;
    color: #ffffff;
    white-space: nowrap;
  }

  /* Wrapper für Tooltip-Positionierung */
  .tooltip-wrapper {
    position: relative; /* Wichtig für absolute Positionierung des Tooltips */
    display: flex; /* Stellt sicher, dass der Wrapper die Größe des Inhalts hat */
    flex-shrink: 0;
  }

  /* Spezifische Anpassung für den Token Counter Wrapper, um ihn nach rechts zu schieben */
  .tooltip-wrapper:has(.token-counter) {
      margin-left: auto;
  }

  .token-counter {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #aaa;
    white-space: nowrap;
    /* margin-left: auto; <- Wird jetzt vom Wrapper übernommen */
    flex-shrink: 0;
    cursor: default; /* Zeigt Standard-Cursor, da es kein Link ist */
  }

  .token-counter.warning {
    color: #FCEA2B;
    background-color: rgba(252, 234, 43, 0.25);
    font-weight: bold;
  }

  /* Style for CopilotButton */
  .generate-button-container {
    display: flex;
    align-items: center;
  }

  /* Blacklist Warning Styles */
  .blacklist-warning {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.75rem;
    background-color: rgba(255, 59, 48, 0.1);
    border: 1px solid rgba(255, 59, 48, 0.3);
    border-radius: 6px;
    color: #ff3b30;
    font-size: 0.875rem;
    line-height: 1.4;
  }

  .blacklist-warning svg {
    flex-shrink: 0;
    margin-top: 0.1rem;
    color: #ff3b30;
  }

  .blacklist-warning strong {
    font-weight: 600;
  }

  /* Mobile adjustments for warning */
  @media (max-width: 768px) {
    .blacklist-warning {
      font-size: 0.8rem;
      padding: 0.6rem;
    }
  }
</style>