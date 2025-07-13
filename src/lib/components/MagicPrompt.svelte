<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  // Access the environment variable for the API key
  const apiKey = import.meta.env.VITE_CHAT_API_KEY;
  
  // Function to enhance prompt directly without modal
  export async function enhancePromptDirect(currentPrompt: string): Promise<string> {
    if (!currentPrompt.trim()) {
      throw new Error('No prompt to enhance');
    }
    
    if (!apiKey) {
      throw new Error('API key not found');
    }
    
    try {
      const systemMessage = {
        role: "system",
        content: "You are an expert AI prompt enhancer focused on scene enhancement. Take the given prompt and add a simple, specific scene or context to make it more interesting. Examples: 'car' becomes 'car on a mountain road', 'woman' becomes 'woman in a coffee shop', 'cat' becomes 'cat sitting by a window'. Keep the enhancement to maximum 50 characters total. Only return the enhanced prompt, no explanations."
      };
      
      const userMessage = {
        role: "user",
        content: `Enhance this prompt by adding a simple scene context (max 90 chars total): "${currentPrompt}"`
      };
      
      const response = await fetch('https://playground.transferscope.org/api-llm/v1/chat/completions', {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages: [systemMessage, userMessage],
          stream: false,
          max_tokens: 100,
          temperature: 0.7
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.choices && data.choices.length > 0) {
        let enhancedPrompt = data.choices[0].message.content.trim();
        // Remove quotes if the AI added them
        enhancedPrompt = enhancedPrompt.replace(/^["']|["']$/g, '');
        
        // Ensure it's not longer than 50 characters
        if (enhancedPrompt.length > 50) {
          enhancedPrompt = enhancedPrompt.substring(0, 47) + '...';
        }
        
        return enhancedPrompt;
      } else {
        throw new Error("Invalid response format from the API");
      }
      
    } catch (err: any) {
      console.error("Error enhancing prompt:", err);
      throw err;
    }
  }
</script>


<!-- This component provides only the enhancePromptDirect function -->


