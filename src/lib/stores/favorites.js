import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Funktion zum Laden der gespeicherten Favoriten aus dem LocalStorage
const loadFavorites = () => {
  if (browser) {
    const storedFavorites = localStorage.getItem('favoriteImages');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

// Erstellen des Stores mit den gespeicherten Favoriten
const createFavoritesStore = () => {
  const { subscribe, update } = writable(loadFavorites());

  return {
    subscribe,
    
    // Favorit hinzufügen
    add: (item) => {
      update(favorites => {
        // Prüfen, ob das Bild bereits in den Favoriten ist
        if (!favorites.some(fav => fav.imageUrl === item.imageUrl)) {
          const updatedFavorites = [...favorites, item];
          
          // Im LocalStorage speichern
          if (browser) {
            localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
          }
          
          return updatedFavorites;
        }
        return favorites;
      });
    },
    
    // Favorit entfernen
    remove: (imageUrl) => {
      update(favorites => {
        const updatedFavorites = favorites.filter(fav => fav.imageUrl !== imageUrl);
        
        // Im LocalStorage speichern
        if (browser) {
          localStorage.setItem('favoriteImages', JSON.stringify(updatedFavorites));
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
