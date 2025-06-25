import { writable } from 'svelte/store';

/**
 * @typedef {Object} ToastData
 * @property {string} id - Eindeutige ID
 * @property {string} message - Toast-Nachricht
 * @property {'success' | 'error' | 'info'} type - Toast-Typ
 * @property {number} duration - Anzeigedauer in ms
 */

/** @type {import('svelte/store').Writable<ToastData[]>} */
export const toasts = writable([]);

let toastId = 0;

/**
 * Zeigt einen neuen Toast an
 * @param {string} message - Die anzuzeigende Nachricht
 * @param {'success' | 'error' | 'info'} type - Der Toast-Typ
 * @param {number} duration - Anzeigedauer in Millisekunden
 */
export function showToast(message, type = 'success', duration = 3000) {
  const id = `toast-${++toastId}`;
  
  const toast = {
    id,
    message,
    type,
    duration
  };

  toasts.update(currentToasts => [...currentToasts, toast]);

  // Automatisches Entfernen nach der angegebenen Zeit
  setTimeout(() => {
    removeToast(id);
  }, duration);
}

/**
 * Entfernt einen Toast
 * @param {string} id - Die ID des zu entfernenden Toasts
 */
export function removeToast(id) {
  toasts.update(currentToasts => 
    currentToasts.filter(toast => toast.id !== id)
  );
}

/**
 * Hilfsfunktionen für häufig verwendete Toast-Typen
 */
export const toast = {
  /** @param {string} message @param {number} duration */
  success: (message, duration = 3000) => showToast(message, 'success', duration),
  /** @param {string} message @param {number} duration */
  error: (message, duration = 4000) => showToast(message, 'error', duration),
  /** @param {string} message @param {number} duration */
  info: (message, duration = 3000) => showToast(message, 'info', duration)
};
