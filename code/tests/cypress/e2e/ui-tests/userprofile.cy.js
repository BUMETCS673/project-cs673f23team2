// SE-34
describe('As a user, I want to have a User Profile page', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/userProfile');
	});

	it('1. User profile picture fetched from their Google Account (Default profile image if there is no profile picture on their google account) "', () => {
		cy.get('[data-cy=ProfilePictureElement]')
		.should('exist')
	});

	it('2. A label to indicate user\'s name', () => {
		cy.get('[data-cy=ProfileNameElement]')
		.should('exist')
	});

	it('3. List of all the user hobbies', () => {
		cy.get('[data-cy=HobbiesElement]').should('exist');
	});

	it('4. A "List of all the watched videos where each element in the list is has video thumbnail, title and creator name ', () => {
		cy.get('[data-cy=VideoHistoryElement]').should('exist');
	});

});