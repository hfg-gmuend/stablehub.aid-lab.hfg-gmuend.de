/**
 * Test-Script für die MonthlySpotlight Komponente
 * Testet die API-Integration und zeigt das Top-Bild an
 */

import { voteService } from './src/lib/api/voteService.js';

async function testMonthlySpotlight() {
  console.log('🎯 Testing MonthlySpotlight API Integration...\n');
  
  try {
    // Simulate what the MonthlySpotlight component does
    console.log('1. Loading top image (like MonthlySpotlight component)...');
    
    const topImages = await voteService.getTopImages(1, 'total');
    
    if (topImages && topImages.length > 0) {
      const topImage = topImages[0];
      
      console.log('✅ Top image loaded successfully!');
      console.log('\n📊 Top Image Details:');
      console.log(`   Image URL: ${topImage.imageUrl}`);
      console.log(`   Votes: ${topImage.votes} ❤️`);
      console.log(`   Prompt: "${topImage.prompt || 'No prompt available'}"`);
      
      console.log('\n🎨 This would be displayed in MonthlySpotlight:');
      console.log(`   - Featured image: ${topImage.imageUrl}`);
      console.log(`   - Vote badge: ❤️ ${topImage.votes}`);
      console.log(`   - Prompt overlay: "${topImage.prompt}"`);
      
      // Test image accessibility
      console.log('\n🔍 Testing image accessibility...');
      try {
        const response = await fetch(topImage.imageUrl, { method: 'HEAD' });
        console.log(`   Image accessible: ${response.ok ? '✅ Yes' : '❌ No'} (Status: ${response.status})`);
      } catch (error) {
        console.log(`   Image accessibility test failed: ${error.message}`);
      }
      
    } else {
      console.log('❌ No top images found');
      console.log('   MonthlySpotlight would show placeholder image');
    }
    
  } catch (error) {
    console.error('❌ MonthlySpotlight test failed:', error);
    console.log('   Component would show error state');
  }
  
  console.log('\n🏁 MonthlySpotlight test completed!');
}

// Test ausführen
testMonthlySpotlight();
