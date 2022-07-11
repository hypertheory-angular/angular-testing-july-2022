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

   beforeEach(() => {


   });

   describe('No Courses Returned From Api', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/references/courses', {
        data: []
      } );
      cy.intercept('GET', '/api/references/offerings', {
        data: []
      } );

      cy.visit('/courses');
    });

    it('should display the "no courses" alert', () => {

    });
   });

   describe('Api Has An Error', () => {

  });

  describe('API Returns some courses', () => {

  });


  });

});
