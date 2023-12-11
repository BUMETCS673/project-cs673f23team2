// cypress/integration/apiTest.spec.js

describe('API Test for /reward-points', () => {
    it('should get user reward points', () => {
      // Define test data
      const userId = 'exampleUserId';
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/reward-points',
        headers: {
          userId: userId,
        },
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.have.property('rewards');
  
        // Assert that the 'rewards' property is a number
        expect(typeof response.body.rewards).to.equal('number');
      });
    });
  });
  