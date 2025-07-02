/**
 * Quick API Test - Testen der Vote API-Endpunkte
 */

console.log('🧪 Testing Vote API endpoints...');

const baseUrl = 'https://stablehub.aid-lab.hfg-gmuend.de/api';

async function testEndpoints() {
  
  // 1. Test /votes/stats (sollte funktionieren)
  console.log('\n📊 Testing /votes/stats...');
  try {
    const response = await fetch(`${baseUrl}/votes/stats`, { mode: 'cors' });
    console.log('Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/stats works:', data);
    } else {
      console.log('❌ /votes/stats failed:', response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/stats error:', error.message);
  }

  // 2. Test /votes/top (sollte funktionieren)
  console.log('\n🏆 Testing /votes/top...');
  try {
    const response = await fetch(`${baseUrl}/votes/top?limit=5`, { mode: 'cors' });
    console.log('Status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/top works:', data);
    } else {
      console.log('❌ /votes/top failed:', response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/top error:', error.message);
  }

  // 3. Test /votes/user/nonexistent (sollte 404 geben - normal)
  console.log('\n👤 Testing /votes/user/nonexistent...');
  try {
    const response = await fetch(`${baseUrl}/votes/user/nonexistent`, { mode: 'cors' });
    console.log('Status:', response.status);
    if (response.status === 404) {
      console.log('✅ /votes/user/nonexistent correctly returns 404 (user has no votes)');
    } else if (response.ok) {
      const data = await response.json();
      console.log('✅ /votes/user/nonexistent works:', data);
    } else {
      console.log('❌ /votes/user/nonexistent unexpected status:', response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/user/nonexistent error:', error.message);
  }

  // 4. Test /votes/user/Milkshake (der aus den Logs)
  console.log('\n🥤 Testing /votes/user/Milkshake...');
  try {
    const response = await fetch(`${baseUrl}/votes/user/Milkshake`, { mode: 'cors' });
    console.log('Status:', response.status);
    if (response.status === 404) {
      console.log('✅ User "Milkshake" has no votes yet (404 is normal)');
    } else if (response.ok) {
      const data = await response.json();
      console.log('✅ User "Milkshake" votes:', data);
    } else {
      console.log('❌ Unexpected status for user Milkshake:', response.statusText);
    }
  } catch (error) {
    console.log('❌ /votes/user/Milkshake error:', error.message);
  }

  console.log('\n🎯 Summary:');
  console.log('- 404 für /votes/user/{userid} ist NORMAL wenn der User keine Votes hat');
  console.log('- Das sollte NICHT dazu führen, dass die API als "nicht verfügbar" markiert wird');
  console.log('- Nur echte Netzwerk-/CORS-Fehler sollten Mock-Mode aktivieren');
}

testEndpoints();
