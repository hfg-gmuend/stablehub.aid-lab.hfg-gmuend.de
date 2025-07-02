/**
 * Test-Script für die /votes/top API
 * Testet die getTopImages Funktion des VoteService
 */

import { voteService } from './src/lib/api/voteService.js';

async function testTopVotesAPI() {
  console.log('🚀 Starting Top Votes API Test...\n');
  
  try {
    // 1. API-Verfügbarkeit prüfen
    console.log('1. Checking API availability...');
    const isAvailable = await voteService.checkApiAvailability();
    console.log(`   API Available: ${isAvailable ? '✅ Yes' : '❌ No'}\n`);

    // 2. Test verschiedene Parameter-Kombinationen
    const testCases = [
      { limit: 5, period: 'total', description: 'Top 5 aller Zeiten' },
      { limit: 3, period: 'month', description: 'Top 3 dieses Monats' },
      { limit: 2, period: 'week', description: 'Top 2 dieser Woche' },
      { limit: 10, period: 'total', description: 'Top 10 aller Zeiten' }
    ];

    for (const testCase of testCases) {
      console.log(`2. Testing: ${testCase.description}`);
      console.log(`   Parameters: limit=${testCase.limit}, period=${testCase.period}`);
      
      try {
        const startTime = Date.now();
        const topImages = await voteService.getTopImages(testCase.limit, testCase.period);
        const duration = Date.now() - startTime;
        
        console.log(`   ✅ Success! (${duration}ms)`);
        console.log(`   📊 Results: ${topImages.length} images returned`);
        
        if (topImages.length > 0) {
          console.log('   📝 Sample data:');
          topImages.slice(0, 2).forEach((image, index) => {
            console.log(`      ${index + 1}. Votes: ${image.votes}, URL: ${image.imageUrl?.substring(0, 50)}...`);
            if (image.prompt) {
              console.log(`         Prompt: "${image.prompt.substring(0, 60)}..."`);
            }
          });
        } else {
          console.log('   ℹ️  No images returned (empty result)');
        }
        
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
      
      console.log(''); // Leerzeile für bessere Lesbarkeit
    }

    // 3. Parameter-Validierung testen
    console.log('3. Testing parameter validation...');
    
    const invalidTests = [
      { limit: -5, period: 'total', expectedLimit: 1 },
      { limit: 200, period: 'total', expectedLimit: 100 },
      { limit: 10, period: 'invalid', expectedPeriod: 'total' },
      { limit: 'abc', period: 'month', expectedLimit: 20 }
    ];

    for (const test of invalidTests) {
      try {
        console.log(`   Testing invalid params: limit=${test.limit}, period=${test.period}`);
        const result = await voteService.getTopImages(test.limit, test.period);
        console.log(`   ✅ Handled gracefully, got ${result.length} results`);
      } catch (error) {
        console.log(`   ❌ Error with invalid params: ${error.message}`);
      }
    }

    // 4. Direkte API-Anfrage zum Vergleich
    console.log('\n4. Testing direct API call for comparison...');
    try {
      const directResponse = await fetch('https://playground.transferscope.org/api/votes/top?limit=3&period=total', {
        mode: 'cors'
      });
      
      if (directResponse.ok) {
        const directData = await directResponse.json();
        console.log(`   ✅ Direct API call successful: ${directData.length} results`);
        console.log(`   📊 First result:`, directData[0] || 'No results');
      } else {
        console.log(`   ❌ Direct API call failed: ${directResponse.status} ${directResponse.statusText}`);
      }
    } catch (error) {
      console.log(`   ❌ Direct API call error: ${error.message}`);
    }

    // 5. Cache-Statistiken anzeigen
    console.log('\n5. Cache statistics:');
    const cacheStats = voteService.getCacheStats();
    console.log('   📈 Cache Stats:', JSON.stringify(cacheStats, null, 2));

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
  
  console.log('\n🏁 Test completed!');
}

// Test ausführen
testTopVotesAPI();
