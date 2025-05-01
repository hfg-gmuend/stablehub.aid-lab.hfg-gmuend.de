import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// Vite lädt .env-Dateien automatisch, daher ist keine zusätzliche Konfiguration erforderlich
});
