//SE-14
describe('As a user, I want to view a list of recommended entertainment videos as per my hobbies/interests', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/search')
		cy.get('[data-cy=EntertainmentMode]')
		.click();
	});

	it('1. User can search for entertainment videos', () => {
		cy.get('[data-cy=searchBarElement]')
		.should('exist')
		.type('guitar');
		cy.get('[data-cy=searchBarButton]').click();
		cy.get('[data-cy=videoTitleElement]').should('contain', 'guitar');
	});

	it('2. Displays the user\'s list of hobbies ', () => {
		cy.get('[data-cy=hobbyButtons]').should('exist');
	})

	it('3. User can filter based on their hobbies for entertainment videos', () => {
		cy.get('[data-cy=hobbyButton0]')
		.should('exist')
		.click();
	});

	
});