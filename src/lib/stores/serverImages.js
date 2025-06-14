import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { ApiService } from '$lib/services/apiService.js';
import { user } from './user.js';
import { get } from 'svelte/store';

/**
 * Store für Server-basierte Bildverwaltung
 * Dieser Store ersetzt die lokale Speicherung und nutzt die API-Endpunkte
 */
const createServerImagesStore = () => {
  /** @type {import('svelte/store').Writable<any[]>} */
  const { subscribe, update, set } = writable([]);
  
  const store = {
    subscribe,
    
    /**
     * Lädt die Bilder für den aktuellen Benutzer vom Server mit Prompt-Daten
     * @param {string|null} [uid] - User ID
     * @returns {Promise<any[]>} Array von Bildern mit Prompt-Daten
     */
    loadUserImages: async (uid = null) => {
      try {
        const userId = uid || get(user).userid || 'default';
        console.log('[ServerImages] Loading images with prompts for UID:', userId);
        
        // Verwende die neue kombinierte API-Funktion
        const imagesWithPrompts = await ApiService.loadUserImagesWithPrompts(userId);
        
        console.log('[ServerImages] Successfully loaded', imagesWithPrompts.length, 'images with prompt data');
        
        set(imagesWithPrompts);
        return imagesWithPrompts;
        
      } catch (error) {
        console.error('[ServerImages] Error loading user images with prompts:', error);
        
        // Fallback: Versuche die alte Methode
        try {
          console.log('[ServerImages] Falling back to separate API calls...');
          const userId = uid || get(user).userid || 'default';
          
          const serverImages = await ApiService.loadUserImages(userId);
          console.log('[ServerImages] Raw server response:', serverImages);
          
          // Konvertiere Server-Format zu lokalem Format (alter Code als Fallback)
          const convertedImages = Array.isArray(serverImages) ? serverImages.map((imagePath, index) => {
            console.log('[ServerImages] Processing image path:', imagePath);
            
            /** @type {string[]} */
            let imageUrls = [];
            let imageId = '';
            let prompt = '';
            let timestamp = new Date();
            
            if (typeof imagePath === 'string') {
              imageUrls = [`https://aid-playground.hfg-gmuend.de/api/${imagePath}`];
              const pathParts = imagePath.split('/');
              const fileName = pathParts[pathParts.length - 1];
              imageId = fileName ? fileName.replace('.jpg', '').replace('.png', '') : `generated-${Date.now()}-${index}`;
              prompt = `Generated Image ${index + 1}`;
              
              if (pathParts.length >= 3) {
                const datePart = pathParts[2];
                if (datePart && datePart.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  timestamp = new Date(datePart);
                }
              }
            }
            
            return {
              id: imageId || `generated-${Date.now()}-${index}`,
              prompt: prompt,
              imageUrls: imageUrls,
              timestamp: timestamp,
              type: 'text-to-image',
              styles: [],
              userid: userId
            };
          }) : [];
          
          const sortedImages = convertedImages
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 30);
          
          set(sortedImages);
          return sortedImages;
          
        } catch (fallbackError) {
          console.error('[ServerImages] Fallback also failed:', fallbackError);
          set([]);
          return [];
        }
      }
    },
    
    /**
     * NEUE FUNKTION: Lädt Bilder gefiltert nach Generierungstyp
     * @param {string} type - "text-to-image", "controlnet", "image-to-image"
     * @param {string|null} [uid] - User ID (optional)
     * @returns {Promise<any[]>} Gefilterte Bilder nach Typ
     */
    loadUserImagesByType: async (type, uid = null) => {
      try {
        const userId = uid || get(user).userid || 'default';
        console.log(`[ServerImages] Loading ${type} images for UID:`, userId);
        
        // Verwende die kombinierte API-Funktion
        const allImages = await ApiService.loadUserImagesWithPrompts(userId);
        
        // Filtere nach Typ
        const filteredImages = allImages.filter(image => {
          /** @type {any} */
          const imageObj = image;
          const imageType = imageObj.type || 'text-to-image'; // Fallback für alte Bilder
          return imageType === type;
        });
        
        console.log(`[ServerImages] Successfully loaded ${filteredImages.length} ${type} images (from ${allImages.length} total)`);
        
        // Speichere nur die gefilterten Bilder im Store
        set(filteredImages);
        return filteredImages;
        
      } catch (error) {
        console.error(`[ServerImages] Error loading ${type} images:`, error);
        set([]);
        return [];
      }
    },
    
    /**
     * NEUE FUNKTION: Aktualisiert nach einer Generierung - lädt nur den spezifischen Typ neu
     * @param {string} type - "text-to-image", "controlnet", "image-to-image"
     * @param {string|null} [uid] - User ID (optional)
     * @returns {Promise<any[]>} Aktualisierte Bilder
     */
    refreshAfterGenerationByType: async (type, uid = null) => {
      console.log(`[ServerImages] Refreshing ${type} images after generation...`);
      
      // Retry-Logik: Exponential backoff 500ms, 1s, 1.5s, 2s, 2.5s
      let attempts = 0;
      const maxAttempts = 5;
      
      while (attempts < maxAttempts) {
        const images = await store.loadUserImagesByType(type, uid);
        
        // Prüfe ob neuestes Bild echten Prompt hat
        if (images.length > 0) {
          /** @type {any} */
          const latestImage = images[0];
          const hasRealPrompt = latestImage.prompt && !latestImage.prompt.match(/^Generated Image \d+$/);
          
          if (hasRealPrompt) {
            console.log(`[ServerImages] Found real prompt after ${attempts + 1} attempts:`, latestImage.prompt);
            return images; // ✅ Erfolg!
          }
        }
        
        attempts++;
        const delay = 500 * (attempts + 1); // 1000ms, 1500ms, 2000ms, 2500ms, 3000ms
        console.log(`[ServerImages] Attempt ${attempts}/${maxAttempts} - waiting ${delay}ms for prompt data...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      
      console.warn(`[ServerImages] Warning: Could not find real prompt data after ${maxAttempts} attempts`);
      return await store.loadUserImagesByType(type, uid);
    },

    /**
     * Speichert Benutzerdaten auf dem Server
     * @param {any} data - Die zu speichernden Daten
     * @param {string|null} [uid] - User ID
     * @returns {Promise<any>} Antwort vom Server
     */
    saveUserData: async (data, uid = null) => {
      try {
        const userId = uid || get(user).userid || 'default';
        console.log('[ServerImages] Saving user data for UID:', userId);
        
        return await ApiService.saveUserData(data, userId);
      } catch (error) {
        console.error('[ServerImages] Error saving user data:', error);
        throw error;
      }
    },
    
    /**
     * Lädt Benutzerdaten vom Server
     * @param {string|null} [uid] - User ID
     * @returns {Promise<any|null>} Benutzerdaten oder null
     */
    loadUserData: async (uid = null) => {
      try {
        const userId = uid || get(user).userid || 'default';
        console.log('[ServerImages] Loading user data for UID:', userId);
        
        return await ApiService.loadUserData(userId);
      } catch (error) {
        console.error('[ServerImages] Error loading user data:', error);
        return null;
      }
    },
    
    /**
     * Aktualisiert die Bilder-Liste nach einer Generierung
     * (Die Bilder werden automatisch über die UID auf dem Server gespeichert)
     */
    refreshAfterGeneration: async (uid = null) => {
      // Lade die aktuellen Bilder vom Server neu
      return await store.loadUserImages(uid);
    },

    /**
     * Speichert Prompt-Daten für ein generiertes Bild mit Image-ID als Schlüssel
     * @param {any} promptData - Die Prompt-Daten mit imageId
     * @param {string|null} [uid] - User ID
     * @returns {Promise<any>} Antwort vom Server
     */
    savePromptData: async (promptData, uid = null) => {
      try {
        const userId = uid || get(user).userid || 'default';
        console.log('[ServerImages] Saving prompt data for UID:', userId, 'ImageID:', promptData.imageId);
        
        // Lade bestehende Benutzerdaten
        /** @type {any} */
        let userData = await ApiService.loadUserData(userId) || {};
        
        // Stelle sicher, dass prompts Objekt existiert (nicht Array!)
        if (!userData.prompts || Array.isArray(userData.prompts)) {
          userData.prompts = {};
        }
        
        // Speichere Prompt-Daten mit Image-ID als Schlüssel
        userData.prompts[promptData.imageId] = {
          prompt: promptData.prompt,
          negativePrompt: promptData.negativePrompt,
          parameters: promptData.parameters,
          styles: promptData.styles,
          type: promptData.type,
          timestamp: new Date().toISOString()
        };
        
        console.log('[ServerImages] Saving prompt data:', userData.prompts[promptData.imageId]);
        
        // Speichere zurück
        return await ApiService.saveUserData(userData, userId);
      } catch (error) {
        console.error('[ServerImages] Error saving prompt data:', error);
        throw error;
      }
    },
    
    /**
     * Fügt ein Bild zu den Favoriten hinzu (Galerie)
     * @param {any} imageData - Die Bild-Daten
     * @returns {Promise<any>} Antwort vom Server
     */
    addToFavorites: async (imageData) => {
      try {
        // Prüfe ob es eine gültige Server-URL ist
        const imageUrl = imageData.imageUrl || (imageData.imageUrls && imageData.imageUrls[0]);
        
        if (!imageUrl || imageUrl.startsWith('blob:')) {
          console.warn('[ServerImages] Cannot add blob URL to favorites, skipping:', imageUrl);
          throw new Error('Cannot add temporary blob URLs to favorites. Please wait for the image to be uploaded to the server.');
        }
        
        const favoriteEntry = {
          prompt: imageData.prompt,
          imageUrl: imageUrl,
          type: imageData.type || 'text-to-image',
          styles: imageData.styles || []
        };
        
        console.log('[ServerImages] Adding to favorites:', favoriteEntry);
        
        return await ApiService.addToGallery(favoriteEntry);
      } catch (error) {
        console.error('[ServerImages] Error adding to favorites:', error);
        throw error;
      }
    },
    
    /**
     * Entfernt ein Bild aus den Favoriten
     * @param {any} imageData - Die Bild-Daten
     * @returns {Promise<any>} Antwort vom Server
     */
    removeFromFavorites: async (imageData) => {
      try {
        console.log('[ServerImages] Removing from favorites:', imageData);
        
        return await ApiService.removeFromGallery(imageData);
      } catch (error) {
        console.error('[ServerImages] Error removing from favorites:', error);
        throw error;
      }
    },
    
    /**
     * Lädt alle Galerie-Einträge (Favoriten aller Benutzer)
     * @returns {Promise<any[]>} Array von Galerie-Einträgen
     */
    loadGallery: async () => {
      try {
        console.log('[ServerImages] Loading global gallery');
        
        const galleryData = await ApiService.loadGallery();
        console.log('[ServerImages] Raw gallery data:', galleryData);
        
        // Begrenze auf maximal 100 Einträge und sortiere nach Timestamp
        const limitedGallery = Array.isArray(galleryData) 
          ? galleryData
              .sort((a, b) => {
                /** @type {any} */
                const itemA = a;
                /** @type {any} */
                const itemB = b;
                return new Date(itemB.timestamp || 0).getTime() - new Date(itemA.timestamp || 0).getTime();
              })
              .slice(0, 100)
          : [];
        
        console.log('[ServerImages] Gallery loaded:', limitedGallery.length, 'total items from all users');
        
        return limitedGallery;
      } catch (error) {
        console.error('[ServerImages] Error loading gallery:', error);
        return [];
      }
    },
    
    /**
     * Löscht alle lokalen Daten (für UID-Wechsel)
     */
    clearLocalData: () => {
      set([]);
      console.log('[ServerImages] Local data cleared');
    }
  };
  
  return store;
};

export const serverImages = createServerImagesStore();
