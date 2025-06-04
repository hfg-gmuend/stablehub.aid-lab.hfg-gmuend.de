import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { user } from './user.js';

// API URL für die Gallery
const GALLERY_API_URL = 'https://aid-playground.hfg-gmuend.de/api/gallery';

// Helper function to get current user ID
const getCurrentUserId = () => {
  let currentUserId = '';
  const unsubscribe = user.subscribe(userState => {
    currentUserId = userState.userid || '';
  });
  unsubscribe();
  return currentUserId;
};

// Funktion zum Laden der Favoriten von der API
const loadFavorites = async () => {
  if (browser) {
    try {
      const response = await fetch(GALLERY_API_URL);
      if (response.ok) {
        const data = await response.json();
        const favorites = Array.isArray(data) ? data : [];
        console.log("Geladene Favoriten von API:", favorites.length);
        return favorites;
      } else {
        console.error("Fehler beim Laden der Favoriten von API:", response.status);
        return [];
      }
    } catch (e) {
      console.error("Fehler beim Laden der Favoriten:", e);
      return [];
    }
  }
  return [];
};

// Erstellen des Stores mit den gespeicherten Favoriten
const createFavoritesStore = () => {
  // Initialize with empty array and proper typing
  /** @type {Array<{prompt: string, imageUrl: string, userId: string}>} */
  const initialFavorites = [];
  const { subscribe, update, set } = writable(initialFavorites);

  // Initial load of favorites
  if (browser) {
    loadFavorites().then(favorites => {
      set(Array.isArray(favorites) ? favorites : []);
    });
  }

  return {
    subscribe,
    
    // Favoriten neu laden
    reload: async () => {
      const favorites = await loadFavorites();
      set(favorites);
      return favorites;
    },
    
    // Favorit hinzufügen oder entfernen
    toggle: async (/** @type {any} */ image) => {
      try {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
          console.error("Keine User-ID verfügbar");
          return;
        }

        // Prepare the favorite object for API
        const favoriteData = {
          prompt: image.prompt || '',
          imageUrl: image.imageUrl || '',
          userId: currentUserId
        };

        // Check if it already exists by getting current favorites
        const currentFavorites = await loadFavorites();
        const existingFavorite = currentFavorites.find(fav => 
          fav.imageUrl === favoriteData.imageUrl && fav.userId === currentUserId
        );

        if (existingFavorite) {
          // Remove favorite using DELETE request
          const response = await fetch(GALLERY_API_URL, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(existingFavorite)
          });

          if (response.ok) {
            console.log("Favorit erfolgreich entfernt");
            // Reload favorites to get updated list
            const updatedFavorites = await loadFavorites();
            set(updatedFavorites);
          } else {
            console.error("Fehler beim Entfernen des Favoriten:", response.status);
          }
        } else {
          // Add favorite using POST request
          const response = await fetch(GALLERY_API_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(favoriteData)
          });

          if (response.ok) {
            console.log("Favorit erfolgreich hinzugefügt");
            // Reload favorites to get updated list
            const updatedFavorites = await loadFavorites();
            set(updatedFavorites);
          } else {
            console.error("Fehler beim Hinzufügen des Favoriten:", response.status);
          }
        }
      } catch (error) {
        console.error("Fehler beim Umschalten des Favoriten-Status:", error);
      }
    },
    
    // Favorit entfernen (wird in der Gallerie-Ansicht verwendet)
    remove: async (/** @type {string} */ imageUrl) => {
      try {
        const currentUserId = getCurrentUserId();

        if (!currentUserId) {
          console.error("Keine User-ID verfügbar");
          return;
        }

        // Find the favorite to remove
        const currentFavorites = await loadFavorites();
        const favoriteToRemove = currentFavorites.find(fav => 
          (fav.imageUrl === imageUrl) && fav.userId === currentUserId
        );

        if (favoriteToRemove) {
          const response = await fetch(GALLERY_API_URL, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(favoriteToRemove)
          });

          if (response.ok) {
            console.log("Favorit erfolgreich entfernt");
            // Reload favorites to get updated list
            const updatedFavorites = await loadFavorites();
            set(updatedFavorites);
          } else {
            console.error("Fehler beim Entfernen des Favoriten:", response.status);
          }
        } else {
          console.log("Favorit nicht gefunden zum Entfernen");
        }
      } catch (error) {
        console.error("Fehler beim Entfernen des Favoriten:", error);
      }
    },
    
    // Prüfen, ob ein Bild bereits ein Favorit ist
    isFavorite: (/** @type {string} */ imageUrl) => {
      let result = false;
      const currentUserId = getCurrentUserId();

      update(favorites => {
        if (Array.isArray(favorites)) {
          result = favorites.some(fav => 
            fav && fav.imageUrl === imageUrl && fav.userId === currentUserId
          );
        }
        return favorites;
      });
      return result;
    }
  };
};

export const favorites = createFavoritesStore();
