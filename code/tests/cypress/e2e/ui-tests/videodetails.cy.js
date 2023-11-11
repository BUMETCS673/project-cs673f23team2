//SE - 30
describe('Clicking on a video results in opening the video details for that video', () => {

	beforeEach(() => {
		cy.visit('http://localhost:3000/search')
		cy.get('[data-cy=searchBarElement]').type('Flask tutorial')
		cy.get('[data-cy=searchBarButton]').click();
		cy.get('[data-cy=videoLink]').click({multiple: true});
	});

    it('Video Player should be visible', () => {
        cy.get('[data-cy=videoElement]').should('exist');
    })

    it('A label indicating video title', () => {
        cy.get('[data-cy=videoTitleElement]').should('exist');
    })

    it('A label indicating video creator', () => {
        cy.get('[data-cy=videoCreatorElement]').should('exist');
    })
});