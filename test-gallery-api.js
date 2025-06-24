// Test script for testing Gallery API endpoints
const API_BASE_URL = 'https://playground.transferscope.org/api';

async function testGalleryAPI() {
  console.log('Testing Gallery API...');
  
  try {
    // 1. Test GET /gallery
    console.log('\n=== Testing GET /gallery ===');
    const getResponse = await fetch(`${API_BASE_URL}/gallery`);
    console.log('GET Gallery Status:', getResponse.status);
    
    if (getResponse.ok) {
      const galleryData = await getResponse.json();
      console.log('Gallery data:', galleryData);
      console.log('Number of items:', Array.isArray(galleryData) ? galleryData.length : 'Not an array');
    } else {
      const errorText = await getResponse.text();
      console.log('GET Gallery Error:', errorText);
    }
    
    // 2. Test POST /gallery (Add to favorites)
    console.log('\n=== Testing POST /gallery ===');
    const testEntry = {
      prompt: "Test favorite from API test",
      imageUrl: "https://playground.transferscope.org/api/images/testuser/test-image.jpg",
      type: "text-to-image",
      styles: [],
      userid: "test-api-user",
      timestamp: new Date().toISOString()
    };
    
    const postResponse = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testEntry)
    });
    
    console.log('POST Gallery Status:', postResponse.status);
    
    if (postResponse.ok) {
      const postResult = await postResponse.json();
      console.log('POST Gallery Result:', postResult);
    } else {
      const postErrorText = await postResponse.text();
      console.log('POST Gallery Error:', postErrorText);
    }
    
    // 3. Test GET /gallery again to see if entry was added
    console.log('\n=== Testing GET /gallery after POST ===');
    const getResponse2 = await fetch(`${API_BASE_URL}/gallery`);
    if (getResponse2.ok) {
      const galleryData2 = await getResponse2.json();
      console.log('Gallery data after POST:', galleryData2);
      console.log('Number of items after POST:', Array.isArray(galleryData2) ? galleryData2.length : 'Not an array');
    }
    
    // 4. Test DELETE /gallery
    console.log('\n=== Testing DELETE /gallery ===');
    const deleteResponse = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testEntry)
    });
    
    console.log('DELETE Gallery Status:', deleteResponse.status);
    
    if (deleteResponse.ok) {
      const deleteResult = await deleteResponse.json();
      console.log('DELETE Gallery Result:', deleteResult);
    } else {
      const deleteErrorText = await deleteResponse.text();
      console.log('DELETE Gallery Error:', deleteErrorText);
    }
    
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

// Run the test
testGalleryAPI();
