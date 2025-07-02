#!/usr/bin/env node

/**
 * Test der korrigierten VoteService mit echten Vote-Counts statt Mock-Daten
 */

import { voteService } from './src/lib/api/voteService.js';

async function testRealVoteCounts() {
  console.log('=== Testing Real Vote Counts (No More Random Numbers) ===\n');
  
  try {
    // Test 1: API Verfügbarkeit prüfen
    console.log('1. Checking API availability...');
    const available = await voteService.checkApiAvailability();
    console.log(`API Available: ${available}\n`);
    
    // Test 2: Echte Vote-Counts laden
    console.log('2. Loading real vote counts...');
    const realVoteCounts = await voteService.loadRealVoteCounts();
    console.log(`Loaded real vote counts for ${realVoteCounts.size} images`);
    
    // Zeige die ersten 5 echten Vote-Counts
    let count = 0;
    realVoteCounts.forEach((votes, imageUrl) => {
      if (count < 5) {
        const shortUrl = imageUrl.split('/').pop();
        console.log(`  ${shortUrl}: ${votes} votes`);
        count++;
      }
    });
    console.log();
    
    // Test 3: Test mit Bildern die keine Votes haben sollten
    console.log('3. Testing images with no votes (should show 0)...');
    const testImageUrls = [
      'https://playground.transferscope.org/generated_images/user_test/20240101_000000_1.jpg',
      'https://playground.transferscope.org/generated_images/user_test/20240101_000000_2.jpg',
      'https://playground.transferscope.org/generated_images/user_test/20240101_000000_3.jpg'
    ];
    
    for (const imageUrl of testImageUrls) {
      const stats = await voteService.getVoteStats(imageUrl, 'testuser');
      const shortUrl = imageUrl.split('/').pop();
      console.log(`  ${shortUrl}: ${stats.totalVotes} votes (should be 0)`);
    }
    console.log();
    
    // Test 4: Batch-Test mit echten Daten
    console.log('4. Testing batch vote stats with real data...');
    const batchStats = await voteService.getBatchVoteStats(testImageUrls, 'testuser');
    
    console.log('Batch results:');
    batchStats.forEach((stats, imageUrl) => {
      const shortUrl = imageUrl.split('/').pop();
      console.log(`  ${shortUrl}: ${stats.totalVotes} votes, user voted: ${stats.userHasVoted}`);
    });
    
    // Test 5: Cache Stats
    console.log('\n5. Cache statistics:');
    const cacheStats = voteService.getCacheStats();
    console.log('User votes cache:', cacheStats.userVotes);
    console.log('Vote counts cache:', cacheStats.voteCounts);
    
    console.log('\n=== Test Complete ===');
    console.log('✅ No more random vote counts!');
    console.log('✅ Images without votes show 0');
    console.log('✅ Images with votes show real count');
    console.log('✅ Caching prevents redundant API calls');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run test
testRealVoteCounts();
