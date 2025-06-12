// Test script for debugging Image-to-Image API
async function testImageToImageAPI() {
    console.log('Testing Image-to-Image API...');
    
    // Create some test form data
    const formData = new FormData();
    formData.append('prompt', 'tree');
    formData.append('cfg', '7');
    formData.append('steps', '20');
    formData.append('seed', Math.floor(Math.random() * 1000000).toString());
    formData.append('uid', 'test-user');
    formData.append('timestamp', Date.now().toString());
    
    // Add dummy files (you would add real images here)
    const dummyFile = new Blob(['test'], { type: 'image/jpeg' });
    formData.append('image1', dummyFile, 'test1.jpg');
    formData.append('image2', dummyFile, 'test2.jpg');
    
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, typeof value === 'string' ? value : value.constructor.name);
    }
    
    try {
        const response = await fetch('https://aid-playground.hfg-gmuend.de/api/combine', {
            method: 'POST',
            body: formData
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const jsonData = await response.json();
                console.log('JSON Response:', jsonData);
            } else {
                console.log('Binary response received');
            }
        } else {
            const errorText = await response.text();
            console.log('Error response:', errorText);
        }
    } catch (error) {
        console.error('Request failed:', error);
    }
}

// Run the test
testImageToImageAPI();
