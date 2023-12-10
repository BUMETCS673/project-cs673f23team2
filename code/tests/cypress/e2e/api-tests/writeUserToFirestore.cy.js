describe('API Test for /writeUserToFirestore', () => {
    it('should write user details to Firestore', () => {
      // Define the user details to be sent in the request
      const userDetails = {
        userId: 'test_usertofirestore',
        // Add other user details as needed
      };
  
      // Make a request to the Flask endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/writeUserToFirestore', // Update the URL with your Flask app's URL
        qs: {
          userDetails: JSON.stringify(userDetails),
        },
      }).then((response) => {
        // Log the response to the Cypress console for debugging
        cy.log(response);
  
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Assert on the response body
        expect(response.body).to.deep.equal({ status: 'ok' });
      });
    });
  });
  