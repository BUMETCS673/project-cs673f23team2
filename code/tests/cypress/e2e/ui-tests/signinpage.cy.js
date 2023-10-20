<<<<<<< HEAD
// SE-23
=======
>>>>>>> 17f3921fe149f02dbe890c8bf3d38b968bcef9ab
describe('As a user, When I visit www.focusedstudy.com, I want to see a login page so that I can login and start using the webapp', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
      });

    it('1. A title "Focused Study" with the logo should exist"', () => {
        cy.get('[data-cy=appBanner]')
        .should('exist')
      });
    
    it('2. A button should exist with text "Sign-in with Google"', () => {
      cy.get('[data-cy=signInButton]')
      .should('exist')
      .should('contain', 'Sign-In with Google');
    });

    it('3. Clicking the "Sign-in with Google" button should navigate to a new blank page', () => {
        cy.get('[data-cy=signInButton]').should('exist');
        cy.get('[data-cy=signInButton]').click();
        cy.url().should('include', '/search');
    });
  });