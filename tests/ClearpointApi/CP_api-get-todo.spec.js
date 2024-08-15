const { test, expect } = require('@playwright/test');

test.describe('GET /api/todoItems', () => {
  test('Verify that GET API display all items', async ({ request }) => {
    try {
      // GET request
      const response = await request.get('http://localhost:3002/api/todoItems');
      const statusCode = response.status();
     
            if (response.status() === 200) {

        // Parse JSON response body
        const items = await response.json();
        
        const responseBody = await response.text();
        console.log('Status Code:', statusCode);
       

        // Verify that the response is an array
        expect(Array.isArray(items)).toBe(true);
        // If there are any items in the list, check their structure
        if (items.length > 0) {
          items.forEach(item => {
            // Verify that each item has the expected properties
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('description');
            expect(item).toHaveProperty('isCompleted');

            // Verify the types of each property
            expect(typeof item.id).toBe('string');
            expect(typeof item.description).toBe('string');
            expect(typeof item.isCompleted).toBe('boolean');
          });
        }
      } else {
        // If the status code is not 200, log an error message
        console.error(`Failed to retrieve items. Status code: ${response.status()}`);
        expect(response.status()).toBe(200); 
      }
    } catch (error) {
      // Handle any errors that occur during the request or assertion
      console.error('An error occurred while making the request or processing the response:', error);
      }
  });
});
