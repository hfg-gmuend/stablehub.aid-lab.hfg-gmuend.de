import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Funktion zum Laden der Bilder-Historie aus dem Local Storage
const loadGeneratedImagesHistory = () => {
  if (browser) {
    try {
      const storedHistory = localStorage.getItem('generatedImagesHistory');
      return storedHistory ? JSON.parse(storedHistory) : [];
    } catch (e) {
      console.error("Fehler beim Laden der Bilder-Historie:", e);
      return [];
    }
  }
  return [];
};

const createGeneratedImagesStore = () => {
  const { subscribe, update } = writable(loadGeneratedImagesHistory());

  return {
    subscribe,
    
    // Fügt ein neues generiertes Bild zur Historie hinzu
    addToHistory: async (imageData) => {
      try {
        // Konvertiere Blob-URLs zu Base64-Strings für die persistente Speicherung
        let persistentImageUrls = [];
        
        if (imageData.imageUrls && imageData.imageUrls.length > 0) {
          persistentImageUrls = await Promise.all(
            imageData.imageUrls.map(async (url) => {
              // Wenn es eine Blob-URL ist, konvertiere sie zu Base64
              if (url.startsWith('blob:')) {
                try {
                  const response = await fetch(url);
                  if (!response.ok) throw new Error('Fehler beim Abruf der Blob-URL');
                  const blob = await response.blob();
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                  });
                } catch (error) {
                  console.error("Fehler bei der Konvertierung der Blob-URL:", error);
                  return url; // Fallback zur Original-URL
                }
              }
              return url;
            })
          );
        }
        
        // Konvertiere auch die sourceImages (für Image-to-Image) zu Base64, wenn vorhanden
        let persistentSourceImages = [];
        if (imageData.sourceImages && imageData.sourceImages.length > 0) {
          persistentSourceImages = await Promise.all(
            imageData.sourceImages.map(async (url) => {
              if (url.startsWith('blob:') || url.startsWith('data:')) {
                try {
                  // Wenn es bereits ein Data-URL ist, benutze es direkt
                  if (url.startsWith('data:')) return url;
                  
                  const response = await fetch(url);
                  if (!response.ok) throw new Error('Fehler beim Abruf der Quellbild-URL');
                  const blob = await response.blob();
                  return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                  });
                } catch (error) {
                  console.error("Fehler bei der Konvertierung der Quellbild-URL:", error);
                  return url;
                }
              }
              return url;
            })
          );
        }
        
        // Erstelle den Eintrag für die Historie
        const historyEntry = {
          id: Date.now().toString(),
          prompt: imageData.prompt || "",
          imageUrls: persistentImageUrls,
          sourceImages: persistentSourceImages, // Füge sourceImages hinzu für Image-to-Image
          type: imageData.type || "text-to-image", // Typ des Eintrags (text-to-image oder image-to-image)
          styles: imageData.styles || [],
          timestamp: new Date().toISOString()
        };

        update(history => {
          // Füge das neue Bild am Anfang der Liste hinzu
          const updatedHistory = [historyEntry, ...history.slice(0, 9)]; // Begrenze auf 10 Einträge
          
          // Speichere im LocalStorage
          if (browser) {
            try {
              localStorage.setItem('generatedImagesHistory', JSON.stringify(updatedHistory));
            } catch (e) {
              // Bei Überschreitung des Speicherplatzes versuche mit weniger Einträgen
              console.warn("Speicherplatz möglicherweise überschritten, reduziere Historie", e);
              const reducedHistory = [historyEntry, ...history.slice(0, 4)];
              localStorage.setItem('generatedImagesHistory', JSON.stringify(reducedHistory));
              return reducedHistory;
            }
          }
          
          return updatedHistory;
        });
      } catch (error) {
        console.error("Fehler beim Hinzufügen zur Bilder-Historie:", error);
      }
    },
    
    // Löscht die Historie
    clearHistory: () => {
      if (browser) {
        localStorage.removeItem('generatedImagesHistory');
      }
      update(() => []);
    }
  };
};

export const generatedImages = createGeneratedImagesStore();
