// cypress/integration/apiTest.spec.js

describe('API Test for /addtosearchhistory', () => {
    it('should add to search history', () => {
      // Define test data
      const testData = {
        section: 'exampleSection',
        keyword: 'exampleKeyword',
        userId: 'exampleUserId',
      };
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/addtosearchhistory',
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
  