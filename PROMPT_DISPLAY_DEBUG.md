# Prompt Display Problem Debug Guide

## Problem
Nach dem Fix für Blob-URL Favoriten zeigt die Gallery "Generated Image 1" statt den echten Prompt (z.B. "cat and dog").

## Ursache
Das `refreshAfterGenerationByType` wird zu früh aufgerufen, bevor die Prompt-Daten am Server gespeichert sind:

1. **Text-to-Image generiert** → Blob-URLs für sofortige Anzeige
2. **savePromptToServer()** speichert Prompt-Daten asynchron
3. **refreshAfterGenerationByType()** wird SOFORT aufgerufen
4. **API findet keine Prompt-Daten** → Fallback: "Generated Image 1"

## Debugging Commands

### 1. In Browser DevTools Console:
```javascript
// Prüfe aktuelle Prompt-Daten auf dem Server
fetch('https://playground.transferscope.org/api/userdata/testuser')
  .then(r => r.json())
  .then(data => {
    console.log('User prompts:', data.prompts);
    console.log('User images:', data.images);
  });

// Prüfe Server-Bilder
fetch('https://playground.transferscope.org/api/images/testuser')
  .then(r => r.json())
  .then(images => console.log('Server images:', images));

// Force reload mit Debug-Info
$serverImages.loadUserImagesByType("text-to-image", "testuser");
```

### 2. Timing Test:
```javascript
// Nach Bild-Generierung sofort prüfen
console.log("=== TIMING TEST ===");
console.log("Current store:", $serverImages);

// Nach 1 Sekunde
setTimeout(() => {
  console.log("After 1s:", $serverImages);
}, 1000);

// Nach 3 Sekunden  
setTimeout(() => {
  console.log("After 3s:", $serverImages);
}, 3000);
```

## Fix Status

### ✅ Implementiert: Retry-Logik
```javascript
refreshAfterGenerationByType: async (type, uid = null) => {
  // Retry-Logik: Exponential backoff 500ms, 1s, 1.5s, 2s, 2.5s
  let attempts = 0;
  const maxAttempts = 5;
  
  while (attempts < maxAttempts) {
    const images = await store.loadUserImagesByType(type, uid);
    
    // Prüfe ob neuestes Bild echten Prompt hat
    if (images.length > 0) {
      const latestImage = images[0];
      const hasRealPrompt = latestImage.prompt && !latestImage.prompt.match(/^Generated Image \d+$/);
      
      if (hasRealPrompt) {
        return images; // ✅ Erfolg!
      }
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 500 * (attempts + 1)));
  }
}
```

## Monitoring

### Console-Logs beachten:
- ✅ `[ServerImages] Found real prompt after X attempts: cat and dog`
- ❌ `[ServerImages] Warning: Could not find real prompt data after 5 attempts`

### Gallery Check:
1. Generiere Bild mit Prompt "cat and dog"
2. Warte 3-5 Sekunden
3. Gehe zur Gallery 
4. ✅ **Erwartet**: "cat and dog" wird angezeigt
5. ❌ **Bug**: "Generated Image 1" wird angezeigt

## Weitere Debug-Hilfen

### API Direkt testen:
```bash
# Prüfe ob Prompt-Daten gespeichert werden
curl "https://playground.transferscope.org/api/userdata/testuser" | jq .
```

### Store State Monitoring:
```javascript
// Store-Änderungen verfolgen
let subscription = $serverImages.subscribe(images => {
  console.log('Store updated:', images.map(img => ({
    prompt: img.prompt,
    type: img.type,
    timestamp: img.timestamp
  })));
});
```

## Expected Timeline
1. **0ms**: User klickt "Generate"
2. **500-2000ms**: Bild wird generiert
3. **500-2000ms**: savePromptToServer() läuft
4. **1000-3000ms**: refreshAfterGenerationByType() startet
5. **1500-8500ms**: Retry-Logik findet echte Prompt-Daten  
6. **✅ Success**: Store enthält echte Prompts, Gallery zeigt korrekte Daten
