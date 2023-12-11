// cypress/integration/apiTest.spec.js

describe('API Test for /write-reward-points', () => {
    it('should write user reward points', () => {
      // Define test data
      const userId = 'exampleUserId';
      const rewards = 100; // Replace with the desired reward points
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/write-reward-points',
        headers: {
          userId: userId,
          rewards: rewards,
        },
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Optionally, you can perform additional assertions or verifications based on the application's behavior
      });
  
      // Verify the reward points in the Firebase Realtime Database
      cy.visitFirebaseDatabase((database) => {
        // Check the reward points for the specified user ID
        database
          .ref(`users/${userId}/reward-points`)
          .should('equal', rewards);
      });
    });
  });
  