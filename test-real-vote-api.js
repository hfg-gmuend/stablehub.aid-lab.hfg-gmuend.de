/**
 * Test der Vote API mit echten POST-Daten
 */

console.log('🧪 Testing Vote API with real POST data...');

const baseUrl = 'https://stablehub.aid-lab.hfg-gmuend.de/api';

async function testVoteAPI() {
  
  // Test 1: POST /vote mit korrekten Daten
  console.log('\n📝 Testing POST /vote...');
  try {
    const voteData = {
      userid: "test-user-" + Date.now(),
      imageUrl: "https://stablehub.aid-lab.hfg-gmuend.de/api/gallery/images/test.jpg",
      timestamp: new Date().toISOString()
    };
    
    console.log('Sending data:', JSON.stringify(voteData, null, 2));
    
    const response = await fetch(`${baseUrl}/vote`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(voteData)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ POST /vote SUCCESS:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ POST /vote FAILED:', response.status, errorText);
    }
  } catch (error) {
    console.log('❌ POST /vote ERROR:', error.message);
  }

  // Test 2: GET /votes/stats
  console.log('\n📊 Testing GET /votes/stats...');
  try {
    const response = await fetch(`${baseUrl}/votes/stats`, { 
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ GET /votes/stats SUCCESS:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ GET /votes/stats FAILED:', response.status, errorText);
    }
  } catch (error) {
    console.log('❌ GET /votes/stats ERROR:', error.message);
  }

  // Test 3: GET /votes/top
  console.log('\n🏆 Testing GET /votes/top...');
  try {
    const response = await fetch(`${baseUrl}/votes/top?limit=5&period=total`, { 
      mode: 'cors',
      headers: {
        'Accept': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ GET /votes/top SUCCESS:', result);
    } else {
      const errorText = await response.text();
      console.log('❌ GET /votes/top FAILED:', response.status, errorText);
    }
  } catch (error) {
    console.log('❌ GET /votes/top ERROR:', error.message);
  }

  // Test 4: OPTIONS Preflight Check
  console.log('\n🔧 Testing OPTIONS /vote (CORS preflight)...');
  try {
    const response = await fetch(`${baseUrl}/vote`, {
      method: 'OPTIONS',
      mode: 'cors',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('OPTIONS Response status:', response.status);
    console.log('CORS headers:', {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
    });
  } catch (error) {
    console.log('❌ OPTIONS /vote ERROR:', error.message);
  }
}

testVoteAPI();
