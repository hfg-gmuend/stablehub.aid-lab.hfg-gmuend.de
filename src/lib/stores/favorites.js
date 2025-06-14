import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Funktion zum Laden der gespeicherten Favoriten aus dem Local Storage
 * @returns {any[]} Array von Favoriten-Objekten
 */
const loadFavorites = () => {
  if (browser) {
    try {
      const storedFavorites = localStorage.getItem('favoriteImages');
      console.log("Geladene Favoriten:", storedFavorites ? JSON.parse(storedFavorites).length : 0);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
      console.error("Fehler beim Laden der Favoriten:", e);
      return [];
    }
  }
  return [];
};

/**
 * Erstellen des Stores mit den gespeicherten Favoriten
 * @returns {Object} Favorites Store mit Methoden
 */
const createFavoritesStore = () => {
  const { subscribe, update, set } = writable(loadFavorites());

  return {
    subscribe,
    
    /**
     * Favorit hinzufügen oder entfernen mit Blob-zu-Base64-Konvertierung
     * @param {any} image - Das Bild-Objekt
     */
    toggle: async (image) => {
      try {
        // Prüfen, ob das Bild bereits in den Favoriten ist
        let existingIndex = -1;
        
        update(favorites => {
          /** @type {any} */
          existingIndex = favorites.findIndex(fav => fav.imageUrl === image.imageUrl);
          return favorites;
        });
        
        if (existingIndex >= 0) {
          // Wenn das Bild existiert, entferne es
          update(favorites => {
            const updatedFavorites = [
              ...favorites.slice(0, existingIndex),
              ...favorites.slice(existingIndex + 1)
            ];
            
            if (browser) {
              try {
                localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
                console.log("Favorit entfernt, neue Anzahl:", updatedFavorites.length);
              } catch (e) {
                console.error("Fehler beim Speichern der Favoriten:", e);
              }
            }
            
            return updatedFavorites;
          });
        } else {
          // Wenn es nicht existiert, füge es hinzu und konvertiere es zu Base64
          let imageData = null;
          
          if (image.imageUrl.startsWith('blob:')) {
            try {
              const response = await fetch(image.imageUrl);
              if (response.ok) {
                const blob = await response.blob();
                
                // Konvertiere Blob zu Base64
                imageData = await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result);
                  reader.readAsDataURL(blob);
                });
                
                console.log("Bild erfolgreich zu Base64 konvertiert");
              } else {
                console.error("Fehler beim Abrufen des Blob:", response.statusText);
              }
            } catch (error) {
              console.error("Fehler bei der Konvertierung zu Base64:", error);
            }
          }
          
          // Füge das Bild hinzu (mit Base64-Daten, wenn verfügbar)
          update(favorites => {
            const newFavorite = {
              ...image,
              imageData: imageData || image.imageUrl,
              timestamp: new Date().toISOString()
            };
            
            const updatedFavorites = [...favorites, newFavorite];
            
            if (browser) {
              try {
                localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
                console.log("Favorit hinzugefügt, neue Anzahl:", updatedFavorites.length);
              } catch (e) {
                console.error("Fehler beim Speichern der Favoriten:", e);
              }
            }
            
            return updatedFavorites;
          });
        }
      } catch (error) {
        console.error("Fehler beim Umschalten des Favoriten-Status:", error);
      }
    },
    
    /**
     * Favorit entfernen (wird in der Gallerie-Ansicht verwendet)
     * @param {string} imageUrl - Die URL des zu entfernenden Bildes
     */
    remove: (imageUrl) => {
      update(favorites => {
        console.log("Entferne Favorit mit URL:", imageUrl);
        
        /** @type {any[]} */
        const updatedFavorites = favorites.filter(fav => 
          fav.imageUrl !== imageUrl && fav.imageData !== imageUrl
        );
        
        if (browser) {
          try {
            localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
            console.log("Favorit entfernt, neue Anzahl:", updatedFavorites.length);
          } catch (e) {
            console.error("Fehler beim Speichern der Favoriten:", e);
          }
        }
        
        return updatedFavorites;
      });
    },
    
    /**
     * Prüfen, ob ein Bild bereits ein Favorit ist
     * @param {string} imageUrl - Die URL des zu prüfenden Bildes
     * @returns {boolean} True wenn das Bild ein Favorit ist
     */
    isFavorite: (imageUrl) => {
      let result = false;
      update(favorites => {
        /** @type {any} */
        result = favorites.some(fav => fav.imageUrl === imageUrl);
        return favorites;
      });
      return result;
    }
  };
};

export const favorites = createFavoritesStore();
