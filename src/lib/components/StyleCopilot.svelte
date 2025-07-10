<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  
  const dispatch = createEventDispatcher();
  
  // Props
  export let isOpen = false;
  
  // Access the environment variable for the API key
  // With fallback in case the environment variable is not available
  const apiKey = import.meta.env.VITE_CHAT_API_KEY
  console.log(import.meta)
  
  // State
  let userPrompt: string = '';
  let isProcessing: boolean = false;
  let generatedStyle: string = '';
  let error: string | null = null;
  let messages: any[] = [];
  
  // Quick selection suggestions
  const suggestions = [
    "Cinematic portrait with dramatic lighting and bokeh background",
    "Cyberpunk neon-lit cityscape with rain reflections",
    "Watercolor painting style with soft brush strokes and pastel colors",
    "Photorealistic macro photography with shallow depth of field",
    "Art nouveau illustration with flowing organic lines",
    "Minimalist geometric composition with bold contrasting colors"
  ];
  
  // Function to close the modal
  function closeModal() {
    dispatch('close');
  }
  
  // Function to add the generated style to the prompt
  function addStyleToPrompt() {
    if (generatedStyle) {
      dispatch('addStyle', { style: generatedStyle });
      closeModal();
    }
  }
  
  // Select a suggestion
  function selectSuggestion(suggestion: string) {
    userPrompt = suggestion;
  }
  
  // Generate a style based on the prompt using AI
  async function generateStyle() {
    if (!userPrompt.trim()) {
      error = 'Please enter a description for the desired style.';
      return;
    }
    
    if (!apiKey) {
      error = 'API key not found. Please check your environment variables.';
      return;
    }
    
    error = null;
    isProcessing = true;
    generatedStyle = '';
    
    try {
      // Create system message and user message
      const systemMessage = {
        role: "system",
        content: "You are an expert AI art style consultant specializing in creating detailed, effective prompts for Stable Diffusion and other image generation models. " +
                 "Your role is to transform user style descriptions into precise, actionable prompt elements that will produce high-quality AI-generated images. " +
                 "Focus on specific artistic techniques, lighting, composition, color palettes, and visual elements. " +
                 "Generate concise but detailed style descriptions that include technical photography/art terms. " +
                 "Limit your response to 40-50 words maximum, but make every word count for visual impact."
      };
      
      const userMessage = {
        role: "user",
        content: `Transform this style description into a precise Stable Diffusion prompt enhancement: "${userPrompt}". ` +
                 "Include specific visual elements like lighting (cinematic, soft, dramatic), composition (rule of thirds, close-up), " +
                 "color palettes (warm tones, muted colors), artistic techniques (oil painting, photorealistic, impressionistic), " +
                 "and quality keywords (highly detailed, sharp focus, 8k resolution). " +
                 "Return only the enhanced style prompt, no explanations."
      };
      
      // Chat history for the API request
      messages = [systemMessage, userMessage];
      
      // API request
      const response = await fetch('https://playground.transferscope.org/api-llm/v1/chat/completions', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages: messages,
          stream: false,
          max_tokens: 300,
          temperature: 0.8
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.choices && data.choices.length > 0) {
        generatedStyle = data.choices[0].message.content.trim();
        // Add the response to the message history
        messages.push(data.choices[0].message);
      } else {
        throw new Error("Invalid response format from the API");
      }
      
    } catch (err: any) {
      console.error("Error generating style:", err);
      error = err.message || "Error connecting to the AI model";
    } finally {
      isProcessing = false;
    }
  }
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={closeModal} transition:fade={{ duration: 200 }}>
    <div class="modal-content" on:click|stopPropagation transition:scale={{ start: 0.9, duration: 200 }}>
      <div class="modal-header">
        <h2>Style Copilot</h2>
        <button class="close-button" on:click={closeModal}>×</button>
      </div>
      
      <div class="modal-body">
        <p class="description">Describe the artistic style you want, and our AI will create enhanced prompt elements:</p>
        
        <div class="input-container">
          <textarea 
            bind:value={userPrompt} 
            placeholder="e.g., Dystopian sci-fi city with neon lights in the rain"
            rows="3"
          ></textarea>
          <button class="generate-button" on:click={generateStyle} disabled={isProcessing}>
            {#if isProcessing}
              <span class="spinner"></span>
            {:else}
              Generate Style
            {/if}
          </button>
        </div>
        
        {#if error}
          <div class="error-message">
            {error}
          </div>
        {/if}
        
        <div class="suggestions">
          <h3>Quick Selection</h3>
          <div class="suggestion-tags">
            {#each suggestions as suggestion}
              <button class="suggestion-tag" on:click={() => selectSuggestion(suggestion)}>
                {suggestion}
              </button>
            {/each}
          </div>
        </div>
        
        {#if generatedStyle}
          <div class="result-container">
            <h3>Generated Style:</h3>
            <div class="generated-style">
              {generatedStyle}
            </div>
            <button class="add-style-button" on:click={addStyleToPrompt}>
              <span class="plus-icon">+</span> Add to Prompt
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    width: 90%;
    max-width: 600px;
    background-color: #1a1a1a;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    overflow: hidden;
  }
  
  .modal-header {
    background-color: #262626;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
  }
  
  h2 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.3rem;
    color: #FCEA2B;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: #a0a0a0;
    font-size: 1.8rem;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    transition: color 0.2s ease;
  }
  
  .close-button:hover {
    color: #FCEA2B;
  }
  
  .modal-body {
    padding: 1.5rem;
    overflow-y: auto;
  }
  
  .description {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #d0d0d0;
    font-size: 1rem;
  }
  
  .input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  textarea {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #333;
    border-radius: 6px;
    background-color: #222;
    color: #e0e0e0;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    resize: vertical;
  }
  
  textarea:focus {
    outline: none;
    border-color: #FCEA2B;
    box-shadow: 0 0 0 2px rgba(252, 234, 43, 0.2);
  }
  
  .generate-button {
    background-color: #FCEA2B;
    color: #000;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .generate-button:hover {
    background-color: #ffed5c;
    transform: translateY(-2px);
  }
  
  .generate-button:active {
    transform: translateY(0);
  }
  
  .generate-button:disabled {
    background-color: #666;
    cursor: not-allowed;
    transform: none;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .error-message {
    background-color: rgba(244, 67, 54, 0.1);
    border-left: 3px solid #F44336;
    color: #F44336;
    padding: 0.8rem 1rem;
    margin: 1rem 0;
    border-radius: 0 4px 4px 0;
  }
  
  .suggestions {
    margin: 1.5rem 0;
  }
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 1.1rem;
    color: #d0d0d0;
    margin: 0 0 1rem 0;
  }
  
  .suggestion-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  
  .suggestion-tag {
    background-color: #2a2a2a;
    border: 1px solid #444;
    border-radius: 20px;
    padding: 0.5rem 0.8rem;
    font-size: 0.85rem;
    color: #d0d0d0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .suggestion-tag:hover {
    background-color: #333;
    transform: translateY(-2px);
    border-color: #FCEA2B;
  }
  
  .result-container {
    margin-top: 1.5rem;
    background-color: #222;
    border-radius: 8px;
    padding: 1.2rem;
    border: 1px solid #333;
  }
  
  .generated-style {
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 1rem;
    color: #e0e0e0;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
    white-space: pre-wrap;
  }
  
  .add-style-button {
    width: 100%;
    background-color: #4da6ff;
    color: #000;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .add-style-button:hover {
    background-color: #6ab6ff;
    transform: translateY(-2px);
  }
  
  .plus-icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
</style>
