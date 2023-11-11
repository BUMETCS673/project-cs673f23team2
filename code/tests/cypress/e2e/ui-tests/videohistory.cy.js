//SE - 29
describe('Clicking on the "See all" button under any section should navigate the user to "See more videos" page', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/videoHistory')
	});

	it('1. Every video from the video history section must have a thumbnail and info containing title, and watch time', () => {
		cy.get('[data-cy=videoHistoryElement]').each(($element, $index, $list) => {
			cy.wrap($element)
			cy.get('[data-cy=videoTitleElement]').should('exist');
			cy.get('[data-cy=videoElement]').should('exist');
			cy.get('[data-cy=watchTimeElement]').should('exist');
		})
	});

	it('2. Contains "Video History" title', () => {
		cy.get('[data-cy=TitleElement]').should('exist');
	})
});