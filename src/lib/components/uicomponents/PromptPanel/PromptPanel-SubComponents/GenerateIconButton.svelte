<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let ariaDescribedby: string | null = null; // Prop für aria-describedby
  export let loading: boolean = false; // New prop for loading state
</script>

<div class="generate-icon-button-container">
  <button
    class="generate-icon-button {loading ? 'loading' : ''}"
    on:click={() => dispatch('click')}
    aria-label="Generate with AI"
    aria-describedby={ariaDescribedby}
    disabled={loading}
  >
    {#if loading}
      <div class="spinner"></div>
    {:else}
      <svg viewBox="0 0 24 24" class="generate-icon" aria-hidden="true">
        <path d="M6.859 3.51601L6.413 4.84501C6.24677 5.34983 5.9645 5.80864 5.58886 6.18463C5.21322 6.56062 4.75466 6.84331 4.25 7.01001L2.905 7.45601C2.85956 7.47073 2.81996 7.49947 2.79187 7.53809C2.76378 7.57672 2.74865 7.62325 2.74865 7.67101C2.74865 7.71877 2.76378 7.7653 2.79187 7.80393C2.81996 7.84256 2.85956 7.87129 2.905 7.88601L4.25 8.33301C4.75007 8.49957 5.20441 8.78044 5.57693 9.15332C5.94946 9.52619 6.2299 9.98079 6.396 10.481L6.842 11.826C6.85672 11.8714 6.88545 11.9111 6.92408 11.9391C6.96271 11.9672 7.00924 11.9824 7.057 11.9824C7.10476 11.9824 7.15129 11.9672 7.18992 11.9391C7.22855 11.9111 7.25728 11.8714 7.272 11.826L7.734 10.498C7.90079 9.99817 8.18148 9.54393 8.55391 9.17115C8.92633 8.79838 9.38031 8.51727 9.88 8.35001L11.225 7.90301C11.2704 7.88829 11.31 7.85956 11.3381 7.82093C11.3662 7.7823 11.3814 7.73577 11.3814 7.68801C11.3814 7.64025 11.3662 7.59372 11.3381 7.55509C11.31 7.51647 11.2704 7.48773 11.225 7.47301L9.897 7.01001C9.39196 6.84402 8.93303 6.56157 8.55729 6.18548C8.18155 5.80939 7.89953 5.35021 7.734 4.84501L7.288 3.49901C7.27157 3.45407 7.24131 3.41549 7.20155 3.38885C7.1618 3.36221 7.11462 3.34887 7.0668 3.35076C7.01899 3.35265 6.973 3.36967 6.93548 3.39937C6.89796 3.42907 6.87083 3.46991 6.858 3.51601M14.92 8.79701L14.296 10.657C14.0638 11.364 13.6687 12.0066 13.1425 12.5329C12.6164 13.0592 11.9739 13.4545 11.267 13.687L9.385 14.313C9.32156 14.3336 9.26628 14.3738 9.22707 14.4278C9.18787 14.4818 9.16675 14.5468 9.16675 14.6135C9.16675 14.6802 9.18787 14.7452 9.22707 14.7992C9.26628 14.8532 9.32156 14.8934 9.385 14.914L11.267 15.54C11.9674 15.7727 12.6038 16.1657 13.1255 16.6877C13.6472 17.2098 14.0398 17.8464 14.272 18.547L14.897 20.43C14.9184 20.4926 14.9588 20.5469 15.0126 20.5854C15.0664 20.6239 15.1309 20.6446 15.197 20.6446C15.2631 20.6446 15.3276 20.6239 15.3814 20.5854C15.4352 20.5469 15.4756 20.4926 15.497 20.43L16.146 18.57C16.3789 17.8698 16.7717 17.2335 17.2933 16.7116C17.8149 16.1896 18.451 15.7964 19.151 15.563L21.032 14.938C21.0954 14.9174 21.1507 14.8772 21.1899 14.8232C21.2291 14.7692 21.2502 14.7042 21.2502 14.6375C21.2502 14.5708 21.2291 14.5058 21.1899 14.4518C21.1507 14.3978 21.0954 14.3576 21.032 14.337L19.174 13.687C18.4669 13.4551 17.8242 13.06 17.2982 12.5336C16.7721 12.0072 16.3774 11.3643 16.146 10.657L15.521 8.77301C15.4972 8.71115 15.4547 8.65828 15.3993 8.62185C15.344 8.58541 15.2786 8.56725 15.2124 8.56989C15.1462 8.57254 15.0825 8.59588 15.0302 8.63661C14.9779 8.67735 14.9387 8.73345 14.92 8.79701Z" stroke="#FCEA2B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    {/if}
  </button>
</div>

<style>
  .generate-icon-button-container {
    position: relative;
    display: inline-block;
  }
  
  .generate-icon-button {
    background-color: #2a2a2a;
    border: 1px solid #444;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .generate-icon-button:hover {
    background-color: #333;
    border-color: #FCEA2B;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(252, 234, 43, 0.2);
  }
  
  .generate-icon-button.loading {
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  .generate-icon-button.loading:hover {
    transform: none;
    background-color: #2a2a2a;
    border-color: #444;
    box-shadow: none;
  }
  
  .generate-icon-button:disabled {
    cursor: not-allowed;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(252, 234, 43, 0.3);
    border-top: 2px solid #FCEA2B;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .generate-icon {
    width: 20px;
    height: 20px;
    stroke: #FCEA2B;
    fill: none;
  }
</style>
