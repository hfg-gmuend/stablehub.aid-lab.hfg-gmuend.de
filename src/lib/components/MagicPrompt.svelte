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
        content: "You are an expert AI prompt enhancer for image generation. Take the given prompt and creatively expand it with vivid details, interesting scenes, or atmospheric elements. Focus on enhancing the scene, setting, lighting, mood, and context. Feel free to be creative and add variations that make the prompt more visually compelling. Add up to 20 words maximum to enhance the original concept. Examples: 'car' becomes 'vintage red sports car racing through misty mountain curves at golden hour', 'woman' becomes 'elegant woman in flowing dress walking through a sunlit lavender field'. Only return the enhanced prompt, no explanations."
      };
      
      const userMessage = {
        role: "user",
        content: `Creatively enhance this prompt by adding vivid scene details, setting, or atmospheric elements (add max 20 words): "${currentPrompt}"`
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
          max_tokens: 150,
          temperature: 0.8
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
        
        // Allow longer prompts but cap at reasonable length for UI
        if (enhancedPrompt.length > 200) {
          enhancedPrompt = enhancedPrompt.substring(0, 197) + '...';
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


