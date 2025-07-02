/**
 * Test-Script für das Vote API System
 * Testet die Kompatibilität zwischen VoteService und der echten API
 */

import { voteService } from './src/lib/api/voteService.js';

async function testVoteAPI() {
  console.log('🧪 Testing Vote API...');
  
  const testImageUrl = 'https://stablehub.aid-lab.hfg-gmuend.de/api/gallery/images/test-image.jpg';
  const testUserId = 'test-user-' + Date.now();
  
  try {
    // 1. API-Verfügbarkeit testen
    console.log('\n📡 Testing API availability...');
    const isAvailable = await voteService.checkApiAvailability();
    console.log('API available:', isAvailable);
    
    // 2. Vote abgeben testen
    console.log('\n👍 Testing vote submission...');
    await voteService.addVote(testImageUrl, testUserId);
    console.log('✅ Vote submitted successfully');
    
    // 3. Vote-Statistiken testen
    console.log('\n📊 Testing vote stats...');
    const stats = await voteService.getVoteStats(testImageUrl, testUserId);
    console.log('Vote stats:', stats);
    
    // 4. User-Votes testen
    console.log('\n👤 Testing user votes...');
    const userVotes = await voteService.getUserVotes(testUserId);
    console.log('User votes:', userVotes);
    
    // 5. Vote entfernen testen
    console.log('\n👎 Testing vote removal...');
    await voteService.removeVote(testImageUrl, testUserId);
    console.log('✅ Vote removed successfully');
    
    // 6. Top-Images testen
    console.log('\n🏆 Testing top images...');
    const topImages = await voteService.getTopImages(5, 'total');
    console.log('Top images:', topImages);
    
    // 7. Globale Stats testen
    console.log('\n🌍 Testing global stats...');
    const globalStats = await voteService.getGlobalVoteStats();
    console.log('Global stats:', globalStats);
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    
    if (!voteService.isApiAvailable) {
      console.log('\n🤖 Running in mock mode due to API unavailability');
      
      // Test mock functions
      console.log('\n🎭 Testing mock mode...');
      const mockStats = await voteService.getVoteStats(testImageUrl, testUserId);
      console.log('Mock stats:', mockStats);
      
      const mockBatchStats = await voteService.getBatchVoteStats([testImageUrl], testUserId);
      console.log('Mock batch stats:', mockBatchStats);
    }
  }
}

// Führe Tests aus wenn direkt ausgeführt
if (import.meta.url === `file://${process.argv[1]}`) {
  testVoteAPI();
}

export { testVoteAPI };
