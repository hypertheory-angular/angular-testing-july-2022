describe('The Courses Route', () => {
  describe('Getting there', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('allows you to get there from the home page', () => {
      cy.get('[data-testid="go-to-courses"]')
        .click()
        .url()
        .should('match', /\/courses$/);
    });
  });

  describe('all the courses stuff', () => {
    beforeEach(() => {});

    describe('has data', () => {
      beforeEach(() => {
        cy.intercept('/api/references/courses', {
          fixture: 'many-courses.json',
        });
        cy.intercept('GET', '/api/references/offerings', {
          data: [],
        });

        cy.visit('/courses');
      });

      it('shows the stuff', () => {});
    });
    describe('No Courses Returned From Api', () => {
      beforeEach(() => {
        cy.intercept('GET', '/api/references/courses', {
          data: [],
        });
        cy.intercept('GET', '/api/references/offerings', {
          data: [],
        });

        cy.visit('/courses');
      });

      it('should display the "no courses" alert', () => {
        cy.get('[data-test-id="courses-list-alert-no-courses"]')
          .should('exist')
          .contains('No courses found.');
      });

      it('`not show the courses api error dialog`', () => {
        cy.get('[data-test-id="courses-list-alert-api-error"]').should(
          'not.exist'
        );
      });
    });

    describe('Api Has An Error', () => {
      beforeEach(() => {
        cy.intercept('GET', '/api/references/courses', {
          statusCode: 503,
          body: undefined,
        });
        cy.intercept('GET', '/api/references/offerings', {
          statusCode: 503,
        });

        cy.visit('/courses');
      });

      it('displays the error message', () => {
        cy.get('[data-test-id="courses-list-alert-api-error"]')
          .should('exist')
          .contains('Sorry, there was an API Error.');
      });

      it('does not display the no courses notification', () => {
        cy.get('[data-test-id="courses-list-alert-no-courses"]').should(
          'not.exist'
        );
      });
    });
  });
});
