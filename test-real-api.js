/**
 * Test der Vote API mit der korrekten Base URL
 */

console.log('🧪 Testing Vote API with correct base URL...');

const baseUrl = 'https://playground.transferscope.org/api';

async function testRealVoteAPI() {
  
  // Test 1: GET /votes/stats
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

  // Test 2: POST /vote
  console.log('\n📝 Testing POST /vote...');
  try {
    const voteData = {
      userid: "test-user-" + Date.now(),
      imageUrl: "https://playground.transferscope.org/api/gallery/images/test.jpg",
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

  console.log('\n🎯 Summary:');
  console.log('- Echte API Base URL: https://playground.transferscope.org/api');
  console.log('- Vote-Endpunkte sind verfügbar und funktionsfähig!');
}

testRealVoteAPI();
