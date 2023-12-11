// cypress/integration/apiTest.spec.js

describe('API Test for /addwatchhistory', () => {
    it('should update watch time and add to watch history', () => {
      // Define test data
      const testData = {
        watchtime: 100,
        keyword: 'exampleKeyword',
        userId: 'exampleUserId',
        section: 'exampleSection',
        videoDetails: '{"id": "exampleVideoId", "title": "Example Video"}', // Example video details in JSON format
      };
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/addwatchhistory',
        qs: testData,
      }).then((response) => {
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Optionally, you can perform additional assertions or verifications based on the application's behavior
  
        // Verify modifications in the Firebase Realtime Database
        cy.visitFirebaseDatabase((database) => {
          // Check the watch time for the specified keyword
          database
            .ref(`users/${testData.userId}/keywords/${testData.section}/${testData.keyword}/watchTime`)
            .should('equal', testData.watchtime);
  
          // Check the watch history entry for the specified date, section, and video ID
          const today = Cypress.moment().format('YYYYMMDD');
          database
            .ref(`users/${testData.userId}/watchHistory/${today}/${testData.section}/${JSON.parse(testData.videoDetails).id}/watchTime`)
            .should('equal', testData.watchtime);
        });
      });
    });
  });
  