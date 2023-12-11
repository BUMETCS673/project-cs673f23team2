// cypress/integration/apiTest.spec.js

describe('API Test for /getWatchVideoHistory', () => {
    it('should get watch video history', () => {
      // Define test data
      const userId = 'exampleUserId';
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/getWatchVideoHistory',
        qs: {
          userId: userId,
        },
      }).then((response) => {
        // Console log response for debugging
        console.log('Response:', response);
  
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.have.property('videoHistory');
  
        // Optionally, you can perform additional assertions or verifications based on the application's behavior
        if (response.body.videoHistory) {
          // Check if the required fields are present in the video history
          // ... (as in the previous example)
        }
      });
    });
  });
  