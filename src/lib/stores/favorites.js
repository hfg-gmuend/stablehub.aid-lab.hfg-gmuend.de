import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Funktion zum Laden der gespeicherten Favoriten aus dem Local Storage
const loadFavorites = () => {
  if (browser) {
    try {
      const storedFavorites = localStorage.getItem('favoriteImages');
      console.log("Geladene Favoriten:", storedFavorites);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (e) {
      console.error("Fehler beim Laden der Favoriten:", e);
      return [];
    }
  }
  return [];
};

// Erstellen des Stores mit den gespeicherten Favoriten
const createFavoritesStore = () => {
  const { subscribe, update, set } = writable(loadFavorites());

  return {
    subscribe,
    
    // Favorit hinzufügen oder entfernen
    toggle: (image) => {
      update(favorites => {
        console.log("Toggle Favorit:", image);
        
        // Prüfen, ob das Bild bereits in den Favoriten ist
        const existingIndex = favorites.findIndex(fav => fav.imageUrl === image.imageUrl);
        
        if (existingIndex >= 0) {
          // Bild aus Favoriten entfernen
          const updatedFavorites = [
            ...favorites.slice(0, existingIndex),
            ...favorites.slice(existingIndex + 1)
          ];
          
          // Im Local Storage speichern
          if (browser) {
            try {
              localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
              console.log("Favorit entfernt, neue Liste:", updatedFavorites);
            } catch (e) {
              console.error("Fehler beim Speichern der Favoriten:", e);
            }
          }
          
          return updatedFavorites;
        } else {
          // Bild zu Favoriten hinzufügen
          const updatedFavorites = [...favorites, image];
          
          // Im Local Storage speichern
          if (browser) {
            try {
              localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
              console.log("Favorit hinzugefügt, neue Liste:", updatedFavorites);
            } catch (e) {
              console.error("Fehler beim Speichern der Favoriten:", e);
            }
          }
          
          return updatedFavorites;
        }
      });
    },
    
    // Favorit entfernen (wird in der Gallerie-Ansicht verwendet)
    remove: (imageUrl) => {
      update(favorites => {
        console.log("Entferne Favorit mit URL:", imageUrl);
        
        const updatedFavorites = favorites.filter(fav => fav.imageUrl !== imageUrl);
        
        // Im Local Storage speichern
        if (browser) {
          try {
            localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
            console.log("Favorit entfernt, neue Liste:", updatedFavorites);
          } catch (e) {
            console.error("Fehler beim Speichern der Favoriten:", e);
          }
        }
        
        return updatedFavorites;
      });
    },
    
    // Prüfen, ob ein Bild bereits ein Favorit ist
    isFavorite: (imageUrl) => {
      let result = false;
      update(favorites => {
        result = favorites.some(fav => fav.imageUrl === imageUrl);
        return favorites;
      });
      return result;
    }
  };
};

export const favorites = createFavoritesStore();
