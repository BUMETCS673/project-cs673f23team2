// SE-38
describe('As a user, When I login to the webapp, I want to see an onboarding page so that I can mention my hobbies and see my reward points', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/onboarding');
      });

    it('1. User profile picture fetched from their Google Account (Default profile image if there is no profile picture on their google account) ) "', () => {
        cy.get('[data-cy=userProfileSearch]')
        .should('exist')
      });
    
    it('2.A label to indicate users name', () => {
        cy.get('[data-cy=userNameSearch]')
        .should('exist')
     });

    it('4. A textbox to mention users hobbies', () => {
        cy.get('[data-cy=Userhobbies]')
        .should('exist');
    });

    it('5.  A "Done" button to indicate the activity of adding hobbies is done  ', () => {
      cy.get('[data-cy=Addhobbies]')
      .should('exist');
    });


  });
