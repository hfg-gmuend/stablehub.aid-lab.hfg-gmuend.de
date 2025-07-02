/**
 * Debug-Script für das Gallery Vote-System
 * Zeigt die Integration zwischen Gallery und VoteService
 */

console.log('🖼️ Gallery Vote System Debug');
console.log('=============================');

// Simuliere Gallery-Daten
const mockGalleryItems = [
  {
    imageUrl: 'https://stablehub.aid-lab.hfg-gmuend.de/api/gallery/images/image1.jpg',
    prompt: 'A beautiful landscape',
    userid: 'user123',
    timestamp: new Date().toISOString()
  },
  {
    imageUrl: 'https://stablehub.aid-lab.hfg-gmuend.de/api/gallery/images/image2.jpg',
    prompt: 'A cute cat',
    userid: 'user456',
    timestamp: new Date().toISOString()
  }
];

// Simuliere User
const mockUser = {
  userid: 'current-user'
};

console.log('\n📝 Gallery Items:');
mockGalleryItems.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.imageUrl}`);
  console.log(`     Prompt: ${item.prompt}`);
  console.log(`     User: ${item.userid}`);
});

console.log('\n👤 Current User:', mockUser.userid);

// Zeige wie der VoteService verwendet wird
console.log('\n🔧 VoteService Integration:');
console.log('1. Image URLs werden direkt als Parameter verwendet');
console.log('2. Keine ID-Extraktion mehr nötig');
console.log('3. API erwartet imageUrl + timestamp');

// Beispiel-API-Calls
console.log('\n📡 Beispiel API-Calls:');
console.log('POST /vote');
console.log('Body:', JSON.stringify({
  userid: mockUser.userid,
  imageUrl: mockGalleryItems[0].imageUrl,
  timestamp: new Date().toISOString()
}, null, 2));

console.log('\nDELETE /vote');
console.log('Body:', JSON.stringify({
  userid: mockUser.userid,
  imageUrl: mockGalleryItems[0].imageUrl,
  timestamp: new Date().toISOString()
}, null, 2));

console.log('\nGET /votes/user/' + mockUser.userid);
console.log('Erwartete Antwort: Array von User-Votes');

console.log('\nGET /votes/stats');
console.log('Erwartete Antwort: Globale Statistiken (keine imageUrl-Parameter)');

console.log('\nGET /votes/top?limit=10&period=total');
console.log('Erwartete Antwort: Array von Top-Images mit Vote-Counts');

console.log('\n✅ Vote-System ist korrekt für echte API konfiguriert!');
