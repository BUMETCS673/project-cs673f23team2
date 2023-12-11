// cypress/integration/apiTest.spec.js

describe('API Test for /getFirstClicksData', () => {
    it('should get first click data', () => {
      // Define test data
      const userId = 'exampleUserId';
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/getFirstClicksData',
        qs: {
          userId: userId,
        },
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.have.property('firstClickData');
  
        // Optionally, you can perform additional assertions or verifications based on the application's behavior
        if (response.body.firstClickData) {
          // Check if the required fields are present in the first click data
          expect(response.body.firstClickData[0]).to.have.property('name');
          expect(response.body.firstClickData[0]).to.have.property('count');
          expect(response.body.firstClickData[0]).to.have.property('feed');
          // Add more assertions as needed
        }
      });
    });
  });
  