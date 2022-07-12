import { environment } from '../../../registrations-web/src/environments/environment';
import { selectors } from './courses.selectors';

describe('The Courses Route', () => {
  const baseUrl = environment.referencesApiUrl;
  describe('Getting there', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('allows you to get there from the home page', () => {
      cy.clickGoToCourses()
        .url()
        .should('match', /\/courses$/);
    });
  });

  describe('all the courses stuff', () => {
    beforeEach(() => {});

    describe('has data', () => {
      beforeEach(() => {
        cy.intercept(baseUrl + 'courses', {
          fixture: 'many-courses.json',
        });
        cy.intercept(baseUrl + 'offerings', {
          fixture: 'many-offerings.json',
        });

        cy.visit('/courses');
      });

      it('shows the stuff', () => {
        cy.get(selectors.getCoursesList).should('exist');
      });
      it('shows all the courses', () => {
        cy.get('[data-test-id^="courses-list-item-"]').should('have.length', 8);
      });
      it('should not show the other alerts', () => {
        cy.get('[data-test-id="courses-list-alert-no-courses"]').should(
          'not.exist'
        );
        cy.get('[data-test-id="courses-list-alert-api-error"]').should(
          'not.exist'
        );
      });
    });
    describe('No Courses Returned From Api', () => {
      beforeEach(() => {
        cy.intercept('GET', baseUrl + 'courses', {
          data: [],
        });
        cy.intercept('GET', baseUrl + 'offerings', {
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
