describe('The Courses Route', () => {
  describe('Getting there', () => {

    beforeEach(() => {
      cy.visit('/');

    });

    it('allows you to get there from the home page', () => {

      cy.get('[data-testid="go-to-courses"]')
      .click().url().should('match', /\/courses$/)
    })
  })


  describe('all the courses stuff', () => {
    cy.visit('/courses')
  })
});
