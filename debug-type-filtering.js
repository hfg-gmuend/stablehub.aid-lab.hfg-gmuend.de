// Debug script to test type filtering
import { ApiService } from './src/lib/services/apiService.js';

async function debugTypeFiltering() {
  try {
    console.log('=== DEBUG TYPE FILTERING ===');
    
    const uid = 'default'; // Use default UID
    
    // Load all images with prompts
    console.log('\n1. Loading all images with prompts...');
    const allImages = await ApiService.loadUserImagesWithPrompts(uid);
    
    console.log(`Found ${allImages.length} total images`);
    
    // Show first few images with their types
    console.log('\n2. First 5 images and their types:');
    allImages.slice(0, 5).forEach((img, index) => {
      console.log(`  ${index + 1}. ID: ${img.id}, Type: ${img.type}, Prompt: ${img.prompt.substring(0, 50)}...`);
    });
    
    // Count by type
    console.log('\n3. Count by type:');
    const typeCounts = {};
    allImages.forEach(img => {
      const type = img.type || 'unknown';
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
    
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`  ${type}: ${count} images`);
    });
    
    // Load user data to check new vs old structure
    console.log('\n4. Checking user data structure...');
    const userData = await ApiService.loadUserData(uid);
    
    if (userData) {
      console.log(`  userData.images keys: ${userData.images ? Object.keys(userData.images).length : 0}`);
      console.log(`  userData.prompts keys: ${userData.prompts ? Object.keys(userData.prompts).length : 0}`);
      
      if (userData.images && Object.keys(userData.images).length > 0) {
        console.log('  First image in new structure:', Object.keys(userData.images)[0]);
        const firstKey = Object.keys(userData.images)[0];
        console.log('  Data:', userData.images[firstKey]);
      }
    } else {
      console.log('  No user data found');
    }
    
  } catch (error) {
    console.error('Error in debug:', error);
  }
}

debugTypeFiltering();
