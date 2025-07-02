/**
 * Test der korrekten Vote API-Pfade
 */

console.log('🧪 Testing correct Vote API paths...');

const baseUrl = 'https://stablehub.aid-lab.hfg-gmuend.de/api';

async function testCorrectPaths() {
  
  // 1. POST/DELETE /vote (für einzelne Votes)
  console.log('\n📝 Testing /vote endpoint...');
  try {
    const response = await fetch(`${baseUrl}/vote`, { 
      method: 'HEAD',
      mode: 'cors' 
    });
    console.log('/vote Status:', response.status);
    if (response.status === 405) {
      console.log('✅ /vote exists (Method Not Allowed = endpoint exists but HEAD not supported)');
    } else if (response.status === 404) {
      console.log('❌ /vote not found (404)');
    } else {
      console.log('✅ /vote responded with:', response.status);
    }
  } catch (error) {
    console.log('❌ /vote error:', error.message);
  }

  // 2. GET /votes/stats
  console.log('\n📊 Testing /votes/stats...');
  try {
    const response = await fetch(`${baseUrl}/votes/stats`, { mode: 'cors' });
    console.log('/votes/stats Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/stats works:', data);
    } else {
      console.log('❌ /votes/stats failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/stats error:', error.message);
  }

  // 3. GET /votes/top
  console.log('\n🏆 Testing /votes/top...');
  try {
    const response = await fetch(`${baseUrl}/votes/top?limit=5`, { mode: 'cors' });
    console.log('/votes/top Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/top works:', data);
    } else {
      console.log('❌ /votes/top failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/top error:', error.message);
  }

  // 4. GET /votes/user/{userid}
  console.log('\n👤 Testing /votes/user/testuser...');
  try {
    const response = await fetch(`${baseUrl}/votes/user/testuser`, { mode: 'cors' });
    console.log('/votes/user/testuser Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/user/testuser works:', data);
    } else if (response.status === 404) {
      console.log('✅ /votes/user/testuser returns 404 (user has no votes - normal)');
    } else {
      console.log('❌ /votes/user/testuser failed:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/user/testuser error:', error.message);
  }

  console.log('\n🎯 Korrekte API-Pfade laut Dokumentation:');
  console.log('- POST /vote (Vote abgeben)');
  console.log('- DELETE /vote (Vote entfernen)');  
  console.log('- GET /votes/top (Top-bewertete Bilder)');
  console.log('- GET /votes/user/{userid} (User-Votes)');
  console.log('- GET /votes/stats (Globale Statistiken)');
}

testCorrectPaths();
