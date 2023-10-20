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

    it('5. A "Search" button to search for the mentioned topic ', () => {
      cy.get('[data-cy=searchBarButton]').should('exist');
    });

    //TODO: To add 6 and 6.1 Acceptance test for SE-27

    it('7. Clicking on the search button should navigate the user to the "Browse Videos" page with the mentioned topic"', () => {
      cy.get('[data-cy=searchBarElement]').type('Flask tutorial');
      cy.get('[data-cy=searchBarButton]').click();
      cy.url().should('include', '/browse');
    });

    it('7.1 Clicking on the search button should do nothing if the textbox to enter the topic is empty.', () => {
      cy.get('[data-cy=searchBarButton]').click();
      cy.location('pathname').should('eq', '/search');
    });


  });