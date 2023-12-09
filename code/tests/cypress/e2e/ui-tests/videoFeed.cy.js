
describe('Video Feed Tests', () => {
    
beforeEach(() => {
    cy.visit('http://localhost:3000/search');
});
it('7. Clicking on the search button should navigate the user to the "Browse Videos" page with the mentioned topic"', () => {
    cy.get('[data-cy=searchBarElement]').type('Flask tutorial');
    cy.get('[data-cy=searchBarButton]').click();
    cy.url().should('include', '/browse');
  });

it('1. Loads with initial state and displays video sections', () => {
    cy.get('.NavigationStackContainer').should('exist');
    cy.get('[data-cy=shortDurationVideos]').should('be.visible');
    cy.get('[data-cy=mediumDurationVideos]').should('be.visible');
    cy.get('[data-cy=longDurationVideos]').should('be.visible');
});


it('2. Search bar updates on typing and performs search on enter', () => {
const searchTerm = 'science';
cy.get('input[type="text"]').type(`${searchTerm}{enter}`);

// Check if the short video list is updated
cy.get('[data-cy=shortDurationVideos]').children().should('have.length.greaterThan', 0);

// Check if the medium video list is updated
cy.get('[data-cy=mediumDurationVideos]').children().should('have.length.greaterThan', 0);

// Check if the long video list is updated
cy.get('[data-cy=longDurationVideos]').children().should('have.length.greaterThan', 0);

// Additional verifications can be added to check for the accuracy of the search results
});
}) 
 
