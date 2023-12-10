describe('API Test for reward-points', () => {
    it('should get user reward points', () => {
      const userId = 'test_userrewardpoints';
  
      
      cy.request({
        method: 'GET',
        url: `http://localhost:5000/reward-points?userId=${userId}`, 
      }).then((response) => {
        
        expect(response.status).to.equal(200);
  
        
        expect(response.body).to.have.property('rewards');
  
        
        if (response.body.rewards.length > 0) {
          expect(response.body.rewards).to.be.a('number'); 
        } else {
          
          expect(response.body.rewards).to.deep.equal([]);
        }
      });
    });
  });
  