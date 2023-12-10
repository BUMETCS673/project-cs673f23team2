//SE - 29
describe('Clicking on the "See all" button under any section should navigate the user to "See more videos" page', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/search')
		cy.get('[data-cy=searchBarElement]').type('Flask tutorial')
		cy.get('[data-cy=searchBarButton]').click();
		cy.get('[data-cy=seeAllButton]').click();
	});

	it('1. List of videos on the topic from the chosen section', () => {
		cy.get('[data-cy=videoItem]')
		.should('have.length', 50)
	});

	it('2. Every video from the chosen section must have a thumbnail and info containing title, channel name, date, and views.', () => {
		cy.get('[data-cy=videoItem]').each(($element, $index, $list) => {
			cy.wrap($element)
			cy.get('[data-cy=videoInfo]').should('exist');
		})
	});
});