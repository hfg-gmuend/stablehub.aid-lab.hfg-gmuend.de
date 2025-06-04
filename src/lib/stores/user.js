import { writable } from 'svelte/store';

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] &
                (15 >> (+c / 4)))
        ).toString(16),
    );
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
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
    const userid = uuidv4();
    setCookie("userid", userid, 365);
    console.log("User Store: Neue User-ID gesetzt:", userid);
    return userid;
}

const createUserStore = () => {
  const { subscribe, update, set } = writable({
    userid: getCookie("userid") || setRandomUserId()
  });

    return {
    subscribe,
    // Setzt die User-ID
    setUserId: (userid) => {
      update((state) => {
        const newState = { ...state, userid };
        console.log("User Store: User ID gesetzt:", newState);
        return newState;
      });
    },
    // Löscht die User-ID
    clearUserId: () => {
      update((state) => {
        const newState = { ...state, userid: null };
        console.log("User Store: User ID gelöscht:", newState);
        return newState;
      });
    },
    // Setzt den gesamten User-Status
    setUserStatus: (status) => {
      update((state) => {
        const newState = { ...state, ...status };
        console.log("User Store: User Status gesetzt:", newState);
        return newState;
      });
    },
    // Löscht den gesamten User-Status
    clearUserStatus: () => {
      update((state) => {
        const newState = { userid: null };
        console.log("User Store: User Status gelöscht:", newState);
        return newState;
      });
    }
  };
}

export const userStore = createUserStore();