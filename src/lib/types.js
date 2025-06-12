// Global types for the StableHub application

/**
 * @typedef {Object} GeneratedResult
 * @property {number} id
 * @property {string} prompt
 * @property {string[]} imageUrls
 * @property {ControlNetParams} [controlnetParams]
 * @property {any} [parameters]
 * @property {Date} timestamp
 */

/**
 * @typedef {Object} ControlNetParams
 * @property {number} strength
 * @property {number} startPercent
 * @property {number} endPercent
 */

/**
 * @typedef {Object.<string, string>} TooltipData
 */

// Export types for TypeScript support
export const GeneratedResult = {};
export const ControlNetParams = {};
export const TooltipData = {};
