// SE-27
describe('As a user, I want to a search videos page so that I can search for topics to learn', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
      });

    it('1. User profile picture fetched from their Google Account (Default profile image if there is no profile picture on their google account) "', () => {
        cy.get('[data-cy=userProfileOnSearch]')
        .should('exist')
      });
    
    it('2. A label to indicate user\'s name', () => {
        cy.get('[data-cy=userNameOnSearch]')
        .should('exist')
     });

    it('3. A label to indicate user\'s reward points', () => {
      cy.get('[data-cy=userRewardPointsOnSearch]')
      .should('exist')
      .should('contain', '✨');
    });

    it('4. A textbox to enter topic to learn', () => {
        cy.get('[data-cy=searchBarElement]').should('exist');
    });

  });