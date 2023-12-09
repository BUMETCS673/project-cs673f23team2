// get_user_hobbies_spec.js
describe('Get User Hobbies API Test', () => {
    it('fetches hobbies for a given user', () => {
      const userId = 'someUserId'; // Replace with a valid user ID
  
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/getUserHobbies', // Replace with your server URL
        qs: { userId: userId }
      }).then((response) => {
        // Assert the status code of the response
        expect(response.status).to.eq(200);
  
        // Assert the structure of the response body
        expect(response.body).to.have.property('hobbies');
        expect(response.body.hobbies).to.be.an('array');
  
        // Additional assertions can be made based on the expected content of the hobbies array
        // For example, you can check the length of the array or specific hobby items
      });
    });
  });
  