describe('API Test for /fetchvideos', () => {
    it('should fetch videos with specified parameters', () => {
      // Define parameters for the request
      const queryParams = {
        q: 'Learn Flask',
        maxResults: 1,
        videoDuration: 'short',
      };
  
      // Make a request to the endpoint
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/fetchvideos',
        qs: queryParams,
      }).then((response) => {
        // Log the response to the Cypress console for debugging
        cy.log(response);
  
        // Assert on the response status code
        expect(response.status).to.equal(200);
  
        // Adjust the assertion based on the actual structure of your response
        // For example, if the response is an array of objects and you want to check a property of the first object:
        expect(response.body[0]).to.have.property('creator'); // Replace 'creator' with the actual property name
  
        // If the response contains an error message, log it for debugging
        if (response.body.error) {
          cy.log(`Error message: ${response.body.error}`);
        }
      });
    });
  });