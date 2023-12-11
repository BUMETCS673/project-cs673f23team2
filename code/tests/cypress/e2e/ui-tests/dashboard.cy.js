describe('Dashboard Page', () => {
    beforeEach(() => {
      // Assuming your app is hosted on 'http://localhost:3000'
      cy.visit('http://localhost:3000/dashboard');
    });
  
    it('1. It should render the FirstClicksCharts on the Dashboard', () => {
      // Verify that the ChartsContainer exists
        cy.get('.ChartsContainer').should('exist');
  
      // Verify that the FirstClicksCharts component is rendered
      cy.get('.ChartsContainer')
        .find('.FirstClicksCharts') // Assuming there is a specific class for FirstClicksCharts
        .should('exist');

    });
  });
  