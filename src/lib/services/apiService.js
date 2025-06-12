import { user } from '$lib/stores/user.js';
import { get } from 'svelte/store';

const API_BASE_URL = 'https://aid-playground.hfg-gmuend.de/api';

/**
 * API Service für die Kommunikation mit dem Backend
 */
export class ApiService {
  /**
   * Generiert ein Bild mit Text-to-Image
   * @param {Object} params - Parameter für die Bildgenerierung
   * @returns {Promise<{imageUrls: string[], imageIds: string[]}>} URLs und IDs der generierten Bilder
   */
  static async generateTextToImage(params) {
    const { prompt, negativePrompt, cfg, steps, seed, variants = 1 } = params;
    const uid = get(user).userid || 'default';
    
    const imageUrls = [];
    const imageIds = [];
    
    for (let i = 0; i < variants; i++) {
      const url = new URL(`${API_BASE_URL}/txt2img`);
      url.searchParams.set('prompt', prompt);
      if (negativePrompt) {
        url.searchParams.set('negative_prompt', negativePrompt);
      }
      url.searchParams.set('cfg', cfg.toString());
      url.searchParams.set('steps', steps.toString());
      url.searchParams.set('seed', (i === 0 ? seed : seed + i).toString());
      url.searchParams.set('uid', uid);
      
      console.log('API Request URL:', url.toString());
      
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error message available');
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      
      // Prüfe Content-Type der Antwort
      const contentType = response.headers.get('content-type');
      console.log('[ApiService] Response content-type:', contentType);
      
      if (contentType && contentType.includes('application/json')) {
        // Server gibt JSON zurück (wahrscheinlich eine ID)
        const jsonResponse = await response.json();
        console.log('[ApiService] JSON Response:', jsonResponse);
        
        if (jsonResponse.id) {
          // Erstelle URL für Bild-Abruf basierend auf ID und speichere ID
          const imageUrl = `${API_BASE_URL}/images/${uid}/${jsonResponse.id}`;
          console.log('[ApiService] Created image URL from ID:', imageUrl);
          imageUrls.push(imageUrl);
          imageIds.push(jsonResponse.id);
          
          // NEUE LÖSUNG: Speichere Prompt-Daten direkt mit der Image-ID am Server
          await ApiService.savePromptToServer(uid, jsonResponse.id, {
            prompt: prompt,
            negativePrompt: negativePrompt,
            parameters: { cfg, steps, seed: (i === 0 ? seed : seed + i), variants },
            type: "text-to-image",
            timestamp: new Date().toISOString()
          });
          
        } else if (jsonResponse.url) {
          imageUrls.push(jsonResponse.url);
          // Versuche ID aus URL zu extrahieren
          const idMatch = jsonResponse.url.match(/\/([^\/]+)\.(jpg|png|webp)$/);
          const extractedId = idMatch ? idMatch[1] : `generated-${Date.now()}-${i}`;
          imageIds.push(extractedId);
          
          // NEUE LÖSUNG: Speichere Prompt-Daten auch hier
          await ApiService.savePromptToServer(uid, extractedId, {
            prompt: prompt,
            negativePrompt: negativePrompt,
            parameters: { cfg, steps, seed: (i === 0 ? seed : seed + i), variants },
            type: "text-to-image",
            timestamp: new Date().toISOString()
          });
        } else {
          throw new Error('Invalid JSON response: no id or url field');
        }
      } else {
        // Server gibt direkt ein Bild zurück - lade danach die Server-Bilder um echte ID zu bekommen
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        console.log('[ApiService] Created blob URL:', imageUrl);
        imageUrls.push(imageUrl);
        
        // Verwende temporäre ID für sofortige Anzeige
        const tempId = `temp-${Date.now()}-${i}`;
        imageIds.push(tempId);
        
        // Verzögerte Speicherung mit echter Server-ID in einem Promise
        const saveWithRealId = async () => {
          try {
            // Warte 1 Sekunde damit der Server das Bild speichert
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const serverImages = await ApiService.loadUserImages(uid);
            console.log('[ApiService] Loaded server images after generation:', serverImages);
            
            // Finde das neueste Bild (sollte das gerade generierte sein)
            if (serverImages && serverImages.length > 0) {
              const latestImage = serverImages[serverImages.length - 1];
              const fileName = latestImage.split('/').pop();
              const realImageId = fileName ? fileName.replace(/\.(jpg|png|webp)$/, '') : null;
              
              if (realImageId) {
                console.log('[ApiService] Found real server image ID:', realImageId, 'for temp ID:', tempId);
                
                // Speichere Prompt-Daten mit der echten Server-ID
                await ApiService.savePromptToServer(uid, realImageId, {
                  prompt: prompt,
                  negativePrompt: negativePrompt,
                  parameters: { cfg, steps, seed: (i === 0 ? seed : seed + i), variants },
                  type: "text-to-image",
                  timestamp: new Date().toISOString()
                });
                
                console.log('[ApiService] Successfully saved prompt data for real ID:', realImageId);
              }
            }
          } catch (error) {
            console.error('[ApiService] Error finding real server image ID:', error);
          }
        };
        
        // Starte die verzögerte Speicherung (ohne await, läuft im Hintergrund)
        saveWithRealId();
      }
    }
    
    return { imageUrls, imageIds };
  }

  /**
   * Generiert ein Bild mit ControlNet
   * @returns {Promise<{imageUrl: string, imageId: string}>} URL und ID des generierten Bildes
   */
  static async generateControlNet(params) {
    const { prompt, negativePrompt, cfg, steps, seed, image, controlnetStrength, startPercent, endPercent } = params;
    const uid = get(user).userid || 'default';
    
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (negativePrompt) {
      formData.append('negative_prompt', negativePrompt);
    }
    formData.append('cfg', cfg.toString());
    formData.append('steps', steps.toString());
    formData.append('seed', seed.toString());
    formData.append('strength', controlnetStrength.toString());
    formData.append('start_percent', startPercent.toString());
    formData.append('end_percent', endPercent.toString());
    formData.append('uid', uid);
    formData.append('image', image);
    
    const response = await fetch(`${API_BASE_URL}/controlnet`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error message available');
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    // Prüfe Content-Type der Antwort
    const contentType = response.headers.get('content-type');
    console.log('[ApiService] ControlNet response content-type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      // Server gibt JSON zurück (wahrscheinlich eine ID)
      const jsonResponse = await response.json();
      console.log('[ApiService] ControlNet JSON Response:', jsonResponse);
      
      if (jsonResponse.id) {
        // Erstelle URL für Bild-Abruf basierend auf ID
        const imageUrl = `${API_BASE_URL}/images/${uid}/${jsonResponse.id}`;
        
        // NEUE LÖSUNG: Speichere Prompt-Daten direkt mit der Image-ID am Server
        await ApiService.savePromptToServer(uid, jsonResponse.id, {
          prompt: prompt,
          negativePrompt: negativePrompt,
          parameters: { cfg, steps, seed, controlnetStrength, startPercent, endPercent },
          type: "controlnet",
          timestamp: new Date().toISOString()
        });
        
        return { imageUrl, imageId: jsonResponse.id };
      } else if (jsonResponse.url) {
        // Versuche ID aus URL zu extrahieren
        const idMatch = jsonResponse.url.match(/\/([^\/]+)\.(jpg|png|webp)$/);
        const extractedId = idMatch ? idMatch[1] : `generated-${Date.now()}`;
        
        // NEUE LÖSUNG: Speichere Prompt-Daten auch hier
        await ApiService.savePromptToServer(uid, extractedId, {
          prompt: prompt,
          negativePrompt: negativePrompt,
          parameters: { cfg, steps, seed, controlnetStrength, startPercent, endPercent },
          type: "controlnet",
          timestamp: new Date().toISOString()
        });
        
        return { 
          imageUrl: jsonResponse.url, 
          imageId: extractedId
        };
      } else {
        throw new Error('Invalid JSON response: no id or url field');
      }
    } else {
      // Server gibt direkt ein Bild zurück
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return { imageUrl, imageId: `blob-${Date.now()}` };
    }
  }

  /**
   * Kombiniert zwei Bilder
   * @returns {Promise<{imageUrl: string, imageId: string}>} URL und ID des kombinierten Bildes
   */
  static async combineImages(params) {
    const { prompt, negativePrompt, cfg, steps, seed, image1, image2 } = params;
    const uid = get(user).userid || 'default';
    
    const formData = new FormData();
    formData.append('prompt', prompt);
    if (negativePrompt) {
      formData.append('negative_prompt', negativePrompt);
    }
    formData.append('cfg', cfg.toString());
    formData.append('steps', steps.toString());
    formData.append('seed', seed.toString());
    formData.append('uid', uid);
    formData.append('image1', image1);
    formData.append('image2', image2);
    
    const response = await fetch(`${API_BASE_URL}/combine`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error message available');
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    // Prüfe Content-Type der Antwort
    const contentType = response.headers.get('content-type');
    console.log('[ApiService] Combine response content-type:', contentType);
    
    if (contentType && contentType.includes('application/json')) {
      // Server gibt JSON zurück (wahrscheinlich eine ID)
      const jsonResponse = await response.json();
      console.log('[ApiService] Combine JSON Response:', jsonResponse);
      
      if (jsonResponse.id) {
        // Erstelle URL für Bild-Abruf basierend auf ID
        const imageUrl = `${API_BASE_URL}/images/${uid}/${jsonResponse.id}`;
        
        // NEUE LÖSUNG: Speichere Prompt-Daten direkt mit der Image-ID am Server
        await ApiService.savePromptToServer(uid, jsonResponse.id, {
          prompt: prompt,
          negativePrompt: negativePrompt,
          parameters: { cfg, steps, seed },
          type: "image-to-image",
          timestamp: new Date().toISOString()
        });
        
        return { imageUrl, imageId: jsonResponse.id };
      } else if (jsonResponse.url) {
        // Versuche ID aus URL zu extrahieren
        const idMatch = jsonResponse.url.match(/\/([^\/]+)\.(jpg|png|webp)$/);
        const extractedId = idMatch ? idMatch[1] : `generated-${Date.now()}`;
        
        // NEUE LÖSUNG: Speichere Prompt-Daten auch hier
        await ApiService.savePromptToServer(uid, extractedId, {
          prompt: prompt,
          negativePrompt: negativePrompt,
          parameters: { cfg, steps, seed },
          type: "image-to-image",
          timestamp: new Date().toISOString()
        });
        
        return { 
          imageUrl: jsonResponse.url, 
          imageId: extractedId
        };
      } else {
        throw new Error('Invalid JSON response: no id or url field');
      }
    } else {
      // Server gibt direkt ein Bild zurück
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return { imageUrl, imageId: `blob-${Date.now()}` };
    }
  }

  /**
   * Lädt alle Bilder für eine UID
   */
  static async loadUserImages(uid = null) {
    const userId = uid || get(user).userid || 'default';
    
    const response = await fetch(`${API_BASE_URL}/images/${userId}`);
    if (!response.ok) {
      throw new Error(`Failed to load user images: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Lädt Bilder mit zugehörigen Prompt-Daten in einem Request
   * @param {string} uid - User ID
   * @returns {Promise<Array>} Bilder mit Prompt-Daten
   */
  static async loadUserImagesWithPrompts(uid = null) {
    const userId = uid || get(user).userid || 'default';
    
    try {
      // Lade Bilder und UserData parallel
      const [imagesResponse, userDataResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/images/${userId}`),
        fetch(`${API_BASE_URL}/userdata/${userId}`)
      ]);
      
      if (!imagesResponse.ok) {
        throw new Error(`Failed to load user images: ${imagesResponse.status}`);
      }
      
      const imagePaths = await imagesResponse.json();
      let userData = null;
      
      if (userDataResponse.ok) {
        userData = await userDataResponse.json();
      }
      
      console.log('[ApiService] Loaded image paths:', imagePaths.length, 'images');
      console.log('[ApiService] Available prompt data keys:', userData?.prompts ? Object.keys(userData.prompts) : 'none');
      
      // Kombiniere Bild-Daten mit Prompt-Informationen  
      const imagesWithPrompts = Array.isArray(imagePaths) ? imagePaths.map((imagePath, index) => {
        // Extrahiere Basis-Informationen
        const imageUrl = `${API_BASE_URL}/${imagePath}`;
        const pathParts = imagePath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        // VEREINFACHT: Verwende den Dateinamen ohne Endung direkt als ID
        // Das ist der Schlüssel, den der Server als Image-ID zurückgibt
        const imageId = fileName ? fileName.replace(/\.(jpg|png|webp)$/, '') : `generated-${Date.now()}-${index}`;
        
        console.log('[ApiService] Processing image:', fileName, '-> ID:', imageId);
        
        // Datum aus Pfad extrahieren
        let timestamp = new Date();
        if (pathParts.length >= 3) {
          const datePart = pathParts[2]; // "2024-12-06"
          if (datePart && datePart.match(/^\d{4}-\d{2}-\d{2}$/)) {
            timestamp = new Date(datePart);
          }
        }
        
        // VEREINFACHT: Direkte Suche mit der Image-ID
        let promptData = null;
        if (userData && userData.prompts && typeof userData.prompts === 'object') {
          promptData = userData.prompts[imageId];
          console.log('[ApiService] Prompt lookup for ID:', imageId, '-> Found:', promptData ? 'YES' : 'NO');
          
          if (!promptData) {
            console.log('[ApiService] Available prompt IDs:', Object.keys(userData.prompts));
          }
        }
        
        // Erstelle kombiniertes Objekt
        const imageWithPrompt = {
          id: imageId,
          imageUrl: imageUrl,
          imageUrls: [imageUrl],
          timestamp: promptData?.timestamp ? new Date(promptData.timestamp) : timestamp,
          prompt: promptData?.prompt || `Generated Image ${index + 1}`,
          negativePrompt: promptData?.negativePrompt || '',
          styles: promptData?.styles || [],
          parameters: promptData?.parameters || {},
          type: promptData?.type || 'text-to-image',
          userid: userId
        };
        
        return imageWithPrompt;
      }) : [];
      
      // Sortiere nach Timestamp (neueste zuerst) und limitiere auf 30
      return imagesWithPrompts
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 30);
        
    } catch (error) {
      console.error('[ApiService] Error loading images with prompts:', error);
      throw error;
    }
  }

  /**
   * Lädt Benutzerdaten für eine UID
   */
  static async loadUserData(uid = null) {
    const userId = uid || get(user).userid || 'default';
    
    const response = await fetch(`${API_BASE_URL}/userdata/${userId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Keine Daten vorhanden
      }
      throw new Error(`Failed to load user data: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Speichert Benutzerdaten für eine UID
   */
  static async saveUserData(data, uid = null) {
    const userId = uid || get(user).userid || 'default';
    
    const response = await fetch(`${API_BASE_URL}/userdata/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save user data: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Lädt die Galerie-Einträge
   */
  static async loadGallery() {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    if (!response.ok) {
      throw new Error(`Failed to load gallery: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Fügt einen Eintrag zur Galerie hinzu
   */
  static async addToGallery(entry) {
    const uid = get(user).userid || 'default';
    
    const galleryEntry = {
      ...entry,
      userid: uid,
      timestamp: new Date().toISOString()
    };
    
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(galleryEntry)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add to gallery: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Entfernt einen Eintrag aus der Galerie
   */
  static async removeFromGallery(entry) {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to remove from gallery: ${response.status}`);
    }
    
    return await response.json();
  }

  /**
   * Speichert Prompt-Daten direkt am Server
   * @param {string} uid - User ID
   * @param {string} imageId - Image ID
   * @param {object} promptData - Prompt-Daten (prompt, negativePrompt, parameters, etc.)
   */
  static async savePromptToServer(uid, imageId, promptData) {
    try {
      console.log(`[ApiService] Saving prompt data to server for image ${imageId}:`, promptData);
      
      // Lade aktuelle Benutzerdaten
      let userData = { prompts: {} };
      try {
        const userDataResponse = await fetch(`${API_BASE_URL}/userdata/${uid}`);
        if (userDataResponse.ok) {
          const existingData = await userDataResponse.json();
          userData = existingData && typeof existingData === 'object' ? existingData : { prompts: {} };
          if (!userData.prompts || typeof userData.prompts !== 'object') {
            userData.prompts = {};
          }
        }
      } catch (error) {
        console.log('[ApiService] No existing user data found, creating new');
        userData = { prompts: {} };
      }
      
      // Speichere Prompt-Daten unter der Image-ID
      if (userData.prompts && typeof userData.prompts === 'object') {
        Object.assign(userData.prompts, { [imageId]: promptData });
      } else {
        userData.prompts = { [imageId]: promptData };
      }
      
      // Sende aktualisierte Daten zurück an den Server
      const response = await fetch(`${API_BASE_URL}/userdata/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save prompt data: ${response.status}`);
      }
      
      console.log(`[ApiService] Successfully saved prompt data for image ${imageId}`);
      return true;
      
    } catch (error) {
      console.error(`[ApiService] Error saving prompt data for image ${imageId}:`, error);
      return false;
    }
  }
}
