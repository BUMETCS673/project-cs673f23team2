describe('Search Component Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/search'); // Replace with the actual URL of your application
    });
  
    it('1. Renders user profile information correctly', () => {
      cy.get('[data-cy=userProfileOnSearch]').should('be.visible');
      cy.get('[data-cy=userNameOnSearch]').should('contain', 'Default User');
      cy.get('[data-cy=userRewardPointsOnSearch]').should('contain', '✨ 3000 points');
    });
    
    it('2. Navigates to entertainment browse page on entertainment mode click', () => {
      cy.get('[data-cy=EntertainmentMode]').click();
      cy.url().should('include', '/entertainment-browse');
    });
  
    it('3. Navigates to user profile page on user profile image click', () => {
      cy.get('[data-cy=userProfileOnSearch]').click();
      cy.url().should('include', '/userProfile');
    });
  });
  