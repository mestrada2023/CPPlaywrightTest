const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Function to generate a simple 4-character unique ID
function generateSimpleID() {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  
  // Generate one letter
  const letter = letters[Math.floor(Math.random() * letters.length)];
  
  // Generate one number
  const number = numbers[Math.floor(Math.random() * numbers.length)];
  
  // Generate two random characters (letters or numbers)
  const chars = letters + numbers;
  let randomChars = '';
  for (let i = 0; i < 2; i++) {
    randomChars += chars[Math.floor(Math.random() * chars.length)];
  }
  
  // Combine all parts
  return letter + number + randomChars;
}

test.describe(' POST API Tests for Todo Items', () => {

  // Valid and bad request data
  const validRequestData = [
    { description: "Go to school" },
    { description: "Go to work" },
    { description: "Bake a cake" }
  ];

  test('Verify that POST API tests can add Todo Items', async ({ request }) => {

    // Test valid request data
    for (const baseRequestBody of validRequestData) {
      const uniqueRequestBody = {
        ...baseRequestBody,
        description: `${baseRequestBody.description}_${generateSimpleID()}`
      };

      // Send POST request to the API
      const apiResponse = await request.post('http://localhost:3002/api/todoItems', {
        data: uniqueRequestBody
      });

      // Extract status code and content type
      const statusCode = apiResponse.status();
      const contentType = apiResponse.headers()['content-type'] || '';

      if (statusCode === 201) {
        // Success response handling
        const responseBody = await apiResponse.text();
        
        // Log the success response body
        console.log('Success Response Body:', responseBody);
        console.log('Status Code:', statusCode);
        // No need to validate ID format if length is within 255 characters
        expect(responseBody.length).toBeLessThanOrEqual(255);

      } else if (statusCode === 404) {
        // Bad Request response handling
        if (contentType.includes('application/json')) {
          const responseBody = await apiResponse.json();
          
          // Log and check for validation errors
          console.log('Bad Request JSON:', responseBody);
          expect(responseBody).toHaveProperty('title', 'One or more validation errors occurred.');
          expect(responseBody).toHaveProperty('status', 404);
          expect(responseBody.errors).toHaveProperty('Description');
          expect(responseBody.errors.Description).toContain('Description field can not be empty');

        } else {
          // Handle non-JSON responses
          const responseBody = await apiResponse.text();
          console.log('Bad Request Text:', responseBody);
          console.log('Status Code:', statusCode);
        }

      } else if (statusCode === 409) {
        // Conflict response handling
        if (contentType.includes('application/json')) {
          const responseBody = await apiResponse.json();
          
          // Log and validate conflict response
          console.log('Conflict JSON:', responseBody);
          expect(responseBody).toHaveProperty('type');
          expect(responseBody).toHaveProperty('title');
          expect(responseBody).toHaveProperty('status');
          expect(responseBody).toHaveProperty('detail');
          expect(responseBody).toHaveProperty('instance');
          expect(responseBody).toHaveProperty('additionalProp1');
          expect(responseBody).toHaveProperty('additionalProp2');
          expect(responseBody).toHaveProperty('additionalProp3');

        } else {
          // 
          const responseBody = await apiResponse.text();
          console.log('Conflict Text:', responseBody);
        }

      } else {
        // Handle unexpected status codes
        throw new Error(`Unexpected status code: ${statusCode}`);
      }

      // Validate the length of the description field
      if (uniqueRequestBody.description) {
        expect(uniqueRequestBody.description.length).toBeLessThanOrEqual(255);
      } else {
        console.log('Invalid request data:', uniqueRequestBody);
      }
    }

    // Test bad request scenario 
    const badRequestBody = { description: "" };
    const badRequestResponse = await request.post('http://localhost:3002/api/todoItems', {
      data: badRequestBody
    });

    // Check the response for bad request
    const badRequestStatusCode = badRequestResponse.status();
    const badRequestContentType = badRequestResponse.headers()['content-type'] || '';

    expect(badRequestStatusCode).toBe(400);

    if (badRequestContentType.includes('application/json')) {
      const badRequestResponseBody = await badRequestResponse.json();
      
      // Log and check for validation errors
      console.log('Bad Request JSON:', badRequestResponseBody);
      expect(badRequestResponseBody).toHaveProperty('type', 'https://tools.ietf.org/html/rfc7231#section-6.5.1');
      expect(badRequestResponseBody).toHaveProperty('title', 'One or more validation errors occurred.');
      expect(badRequestResponseBody).toHaveProperty('status', 400);
      expect(badRequestResponseBody.errors).toHaveProperty('Description');
      expect(badRequestResponseBody.errors.Description).toContain('Description field can not be empty');

    } else {
      // 
      const badRequestResponseBody = await badRequestResponse.text();
      console.log('Bad Request Text:', badRequestResponseBody);
      console.log('Status Code:', badRequestStatusCode);
    }
  });
});
