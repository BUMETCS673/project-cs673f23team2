// cypress/integration/apiTest.spec.js

describe('API Test for /addFirstClickInfo', () => {
    it('should add first click info', () => {
      // Define test data
      const testData = {
        section: 'exampleSection',
        videoDuration: 'exampleVideoDuration',
        userId: 'exampleUserId',
      };
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/addFirstClickInfo',
        qs: testData,
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.deep.equal({ status: 'ok' });
      });
  
      // Optionally, you can perform additional assertions or verifications based on the application's behavior
    });
  });
  