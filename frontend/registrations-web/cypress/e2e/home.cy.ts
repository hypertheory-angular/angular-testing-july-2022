describe('The Home Page', () =>{


  describe("the banner", () => {
    it('shows the banner thing', () => {
      cy.visit('/');
      cy.get('[data-testid="banner"]')
        .find('.title').should('exist')
        .contains('HYPERTHEORY TRAINING', { matchCase: false})
    });

    it('shows the login button', () => {
      cy.get('[data-test="login-indicator-logged-out"]').should('exist');
      cy.get('[data-test="login-indicator-logged-in"]').should('not.exist');
    });
  })

  describe("the content portion", () => {
    it('does this work')
  });

});
