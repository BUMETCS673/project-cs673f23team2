// cypress/integration/apiTest.spec.js

describe('API Test for /getUserProfile', () => {
    it('should get user profile from Firestore', () => {
      // Define test data
      const testData = {
        userId: 'exampleUserId',
      };
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/getUserProfile',
        qs: testData,
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.have.property('userDetails');
  
        // Assert that the 'userDetails' property is an object
        if (response.body.userDetails && typeof response.body.userDetails === 'object') {
          // Assert that the 'userId' property exists within 'userDetails'
          expect(response.body.userDetails).to.have.property(userId);
        } else {
          // If 'userDetails' is empty or not an object, log a message for debugging
          cy.log('User details are empty or not an object');
        }
      });
    });
  });
  