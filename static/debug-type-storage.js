// Debug-Script um zu verstehen was in userData gespeichert wird
const API_BASE_URL = 'https://playground.transferscope.org/api';

async function debugUserData(uid = 'default') {
  try {
    console.log(`[DEBUG] Loading user data for UID: ${uid}`);
    
    const response = await fetch(`${API_BASE_URL}/userdata/${uid}`);
    if (!response.ok) {
      console.log('[DEBUG] No user data found');
      return;
    }
    
    const userData = await response.json();
    console.log('[DEBUG] Full user data structure:', userData);
    
    if (userData.images) {
      console.log('[DEBUG] Images structure (new):');
      for (const [imageId, data] of Object.entries(userData.images)) {
        console.log(`  ${imageId}:`, {
          type: data.type,
          prompt: data.prompt?.substring(0, 50) + '...',
          timestamp: data.timestamp
        });
      }
    }
    
    if (userData.prompts) {
      console.log('[DEBUG] Prompts structure (old):');
      for (const [imageId, data] of Object.entries(userData.prompts)) {
        console.log(`  ${imageId}:`, {
          type: data.type,
          prompt: data.prompt?.substring(0, 50) + '...',
          timestamp: data.timestamp
        });
      }
    }
    
    // Lade auch Server-Bilder
    const imagesResponse = await fetch(`${API_BASE_URL}/images/${uid}`);
    if (imagesResponse.ok) {
      const imagePaths = await imagesResponse.json();
      console.log('[DEBUG] Server image paths:', imagePaths.slice(0, 5), '... (showing first 5)');
    }
    
  } catch (error) {
    console.error('[DEBUG] Error:', error);
  }
}

// Du kannst das in der Browser-Konsole ausführen
// debugUserData('deine-user-id-hier');

console.log('Debug-Script geladen. Verwende debugUserData("deine-user-id") in der Konsole.');
