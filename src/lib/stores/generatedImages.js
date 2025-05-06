import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Funktion zum Laden der Bilder-Historie aus dem Local Storage
const loadGeneratedImagesHistory = () => {
  if (browser) {
    try {
      const storedHistory = localStorage.getItem('generatedImagesHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        
        // Typen-Bereinigung für alle Einträge
        const cleanedHistory = parsedHistory.map(entry => {
          // Bestimme den korrekten Typ anhand der Eigenschaften
          let correctType;
          if (entry.controlnetParams) {
            correctType = "controlnet";
          } else if (entry.sourceImages && entry.sourceImages.length > 0) {
            correctType = "image-to-image";
          } else {
            correctType = "text-to-image";
          }
          
          // Überschreibe den Typ mit dem korrekten Wert
          return {
            ...entry,
            type: correctType
          };
        });
        
        return cleanedHistory;
      }
      return [];
    } catch (e) {
      console.error("Fehler beim Laden der Bilder-Historie:", e);
      return [];
    }
  }
  return [];
};

const createGeneratedImagesStore = () => {
  // Initialisiere den Store mit geladenen Daten
  const { subscribe, update, set } = writable(loadGeneratedImagesHistory());
  
  // Log-Funktion für Debugging
  const logStoreState = (label, history) => {
    const types = {};
    history.forEach(entry => {
      const type = entry.type || "unknown";
      types[type] = (types[type] || 0) + 1;
    });
    console.log(`[GeneratedImages Store ${label}] Entries by type:`, types);
    return history;
  };

  return {
    subscribe,
    
    // Fügt ein neues generiertes Bild zur Historie hinzu
    addToHistory: async (imageData) => {
      try {
        // Stelle sicher, dass der Typ immer korrekt gesetzt ist
        if (!imageData.type) {
          if (imageData.controlnetParams) {
            imageData.type = "controlnet";
          } else if (imageData.sourceImages && imageData.sourceImages.length > 0) {
            imageData.type = "image-to-image";
          } else {
            imageData.type = "text-to-image";
          }
        }
        
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
        
        // Konvertiere sourceImage für ControlNet
        let persistentSourceImage = imageData.sourceImage;
        if (imageData.sourceImage) {
          if (typeof imageData.sourceImage === 'string' && 
              (imageData.sourceImage.startsWith('blob:') || 
               !imageData.sourceImage.startsWith('data:'))) {
            try {
              const response = await fetch(imageData.sourceImage);
              if (!response.ok) throw new Error('Fehler beim Abruf der Quellbild-URL');
              const blob = await response.blob();
              persistentSourceImage = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
              });
            } catch (error) {
              console.error("Fehler bei der Konvertierung der Quellbild-URL:", error);
            }
          }
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
        
        // Erstelle den Eintrag für die Historie mit garantiertem Typ
        const historyEntry = {
          id: Date.now().toString(),
          prompt: imageData.prompt || "",
          imageUrls: persistentImageUrls || imageData.imageUrls,
          sourceImages: persistentSourceImages || imageData.sourceImages,
          sourceImage: persistentSourceImage || imageData.sourceImage,
          controlnetParams: imageData.controlnetParams,
          type: imageData.type, // Garantierter Typ
          styles: imageData.styles || [],
          timestamp: new Date().toISOString()
        };

        update(history => {
          // Füge das neue Bild am Anfang der Liste hinzu
          const updatedHistory = [historyEntry, ...history.slice(0, 9)];
          
          logStoreState("after add", updatedHistory);
          
          // Speichere im LocalStorage
          if (browser) {
            try {
              localStorage.setItem('generatedImagesHistory', JSON.stringify(updatedHistory));
            } catch (e) {
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
    
    // Methode zum Korrigieren der Typen im Store
    fixTypes: () => {
      update(history => {
        const fixedHistory = history.map(entry => {
          // Bestimme Typ anhand vorhandener Eigenschaften
          let correctType;
          if (entry.controlnetParams) {
            correctType = "controlnet";
          } else if (entry.sourceImages && entry.sourceImages.length > 0) {
            correctType = "image-to-image";
          } else {
            correctType = "text-to-image";
          }
          
          return { ...entry, type: correctType };
        });
        
        logStoreState("after fixTypes", fixedHistory);
        
        // Speichere die korrigierte Historie
        if (browser) {
          try {
            localStorage.setItem('generatedImagesHistory', JSON.stringify(fixedHistory));
          } catch (e) {
            console.warn("Konnte korrigierte Historie nicht speichern:", e);
          }
        }
        
        return fixedHistory;
      });
    },
    
    // Methode zum Bereinigen des Stores (optional)
    resetStore: () => {
      if (browser) {
        try {
          localStorage.removeItem('generatedImagesHistory');
          set([]);
          console.log("[GeneratedImages Store] Store zurückgesetzt");
        } catch (e) {
          console.error("Fehler beim Zurücksetzen des Stores:", e);
        }
      }
    },
    
    // Löscht die Historie
    clearHistory: () => {
      if (browser) {
        localStorage.removeItem('generatedImagesHistory');
      }
      set([]);
    }
  };
};

export const generatedImages = createGeneratedImagesStore();

// Führe beim Import die Typenkorrektur durch
if (browser) {
  generatedImages.fixTypes();
}
