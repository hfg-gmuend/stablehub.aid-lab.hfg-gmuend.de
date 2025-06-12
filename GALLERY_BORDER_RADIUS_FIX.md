# Gallery Border-Radius Fix

## ❌ **Problem:**
Beim Hover über Gallery-Items verliert das Bild den Border-Radius, obwohl das Overlay korrekt abgerundet bleibt.

## 🔍 **Ursache:**
Das Bild (`gallery-image`) hatte den Border-Radius auskommentiert:
```css
.gallery-image {
  /* border-radius: 12px; */ /* ❌ Auskommentiert */
}
```

## ✅ **Lösung:**

### **1. Border-Radius für Bild aktiviert:**
```css
.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 12px; /* ✅ Aktiviert */
}
```

### **2. Border-Radius für Overlay hinzugefügt:**
```css
.prompt-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85); /* Dunkler für bessere Lesbarkeit */
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px; /* ✅ Hinzugefügt */
}
```

## 🎨 **Resultat:**

### **Konsistente Border-Radius-Hierarchie:**
```
Gallery Item Container: border-radius: 12px;
├── Gallery Image: border-radius: 12px;
└── Prompt Overlay: border-radius: 12px;
```

### **Vor dem Fix:**
- ✅ Container: Abgerundet (12px)
- ❌ Bild: Nicht abgerundet (auskommentiert)
- ❌ Overlay: Nicht abgerundet (fehlend)

### **Nach dem Fix:**
- ✅ Container: Abgerundet (12px)
- ✅ Bild: Abgerundet (12px)
- ✅ Overlay: Abgerundet (12px)

## 🚀 **Zusätzliche Verbesserungen:**

### **Overlay-Hintergrund:**
- **Vorher:** `rgba(0, 0, 0, 0.5)` (zu transparent)
- **Nachher:** `rgba(0, 0, 0, 0.85)` (bessere Lesbarkeit)

### **Visueller Effekt:**
- 🖼️ **Bild bleibt abgerundet** beim Hover
- 📝 **Overlay erscheint abgerundet** mit besserer Lesbarkeit
- ✨ **Konsistente Rundungen** bei allen States

**Status: 🎉 BORDER-RADIUS PROBLEM BEHOBEN**

Jetzt behalten Gallery-Items ihre schönen abgerundeten Ecken sowohl im normalen Zustand als auch beim Hover!
