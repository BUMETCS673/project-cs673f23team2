//SE-52
describe('As a user, I want to a search videos page so that I can search for topics to learn', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/search');
      });

      it('A "Search" button to search for the mentioned topic ', () => {
        cy.get('[data-cy=searchBarButton]').should('exist');
      })

      it('Clicking on the search button should navigate the user to the "Browse Videos" page with the mentioned topic"', () => {
        cy.get('[data-cy=searchBarElement]').type('Flask tutorial');
        cy.get('[data-cy=searchBarButton]').click();
        cy.url().should('include', '/browse');
      });
  
      it('Clicking on the search button should do nothing if the textbox to enter the topic is empty.', () => {
        cy.get('[data-cy=searchBarButton]').click();
        cy.location('pathname').should('eq', '/search');
      });
      });