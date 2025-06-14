import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Generiert eine UUID v4
 * @returns {string} UUID v4 String
 */
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] &
                (15 >> (+c / 4)))
        ).toString(16),
    );
}

/**
 * Setzt ein Cookie
 * @param {string} cname - Cookie-Name
 * @param {string} cvalue - Cookie-Wert
 * @param {number} exdays - Anzahl Tage bis Ablauf
 */
function setCookie(cname, cvalue, exdays) {
    if (!browser) return; // Skip if not in browser
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**
 * Liest ein Cookie aus
 * @param {string} cname - Cookie-Name
 * @returns {string} Cookie-Wert oder leerer String
 */
function getCookie(cname) {
    if (!browser) return ""; // Return empty string if not in browser
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setRandomUserId() {
    if (!browser) return ""; // Return empty string if not in browser
    const userid = uuidv4();
    setCookie("userid", userid, 365);
    console.log("User Store: Neue User-ID gesetzt:", userid);
    return userid;
}

const createUserStore = () => {
  // Generiere eine zufällige UUID wenn keine gespeichert ist
  const getOrCreateUserId = () => {
    if (!browser) return "default"; // Fallback für Server-Side Rendering
    
    const existingUserId = getCookie("userid");
    if (existingUserId) {
      console.log("User Store: Existierende User ID gefunden:", existingUserId);
      return existingUserId;
    }
    
    // Generiere neue UUID im gewünschten Format
    const newUserId = uuidv4();
    setCookie("userid", newUserId, 365);
    console.log("User Store: Neue User ID generiert:", newUserId);
    return newUserId;
  };

  const { subscribe, update, set } = writable({
    userid: getOrCreateUserId()
  });

    return {
    subscribe,
    /**
     * Setzt die User-ID
     * @param {string} userid - Die neue User-ID
     */
    setUserId: (userid) => {
      if (browser) {
        setCookie("userid", userid, 365);
      }
      update((state) => {
        const newState = { ...state, userid };
        console.log("User Store: User ID gesetzt:", newState);
        return newState;
      });
    },
    // Löscht die User-ID
    clearUserId: () => {
      if (browser) {
        setCookie("userid", "", -1); // Expire the cookie
      }
      update((state) => {
        const newState = { ...state, userid: "" };
        console.log("User Store: User ID gelöscht:", newState);
        return newState;
      });
    },
    /**
     * Setzt den gesamten User-Status
     * @param {Object} status - Der neue User-Status
     */
    setUserStatus: (status) => {
      update((state) => {
        const newState = { ...state, ...status };
        console.log("User Store: User Status gesetzt:", newState);
        return newState;
      });
    },
    // Löscht den gesamten User-Status
    clearUserStatus: () => {
      if (browser) {
        setCookie("userid", "", -1); // Expire the cookie
      }
      update((state) => {
        const newState = { userid: "" };
        console.log("User Store: User Status gelöscht:", newState);
        return newState;
      });
    }
  };
}

export const user = createUserStore();
