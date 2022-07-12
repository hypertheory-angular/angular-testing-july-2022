describe('course list items', () => {
  beforeEach(() => {
    cy.intercept('/api/references/courses', {
      fixture: 'course-list-variations.json',
    }).as('courses');

    cy.intercept('/api/references/offerings', {
      fixture: 'offerings-list-variations.json',
    }).as('offerings');
    cy.visit('/courses');
  });
  describe('The Common Stuff', () => {
    beforeEach(() => {
      cy.wait('@courses');
      cy.wait('@offerings');
    });
    it('Shows the Title', () => {
      cy.get('[data-test-id="courses-list-item-0"]')
        .find('[data-test-id="course-item-title"]')
        .should('contain.text', 'Underwater Basket Weaving');
    });
    it('Shows the Number of Days', () => {
      cy.get('[data-test-id="courses-list-item-0"]')
        .find('[data-test-id="course-item-days"]')
        .should('contain.text', '5');
    });
    it('Shows the Description', () => {
      cy.get('[data-test-id="courses-list-item-0"]')
        .find('[data-test-id="course-item-description"]')
        .should(
          'contain.text',
          'Learn to make baskets underwater. Warning: Moist'
        );
    });
  });
  describe('A Course With Offerings', () => {
    beforeEach(() => {
      cy.wait('@courses');
      cy.wait('@offerings');
    });
    it('The See Offerings Button Is Shown', () => {
      cy.get('[data-test-id="courses-list-item-0"]')
        .find('[data-test-id="course-item-offerings"]')
        .should('exist');

      cy.get(
        '[data-test-id="courses-list-item-0"] [data-test-id="course-item-no-offerings]"]'
      ).should('not.exist');
    });
  });
  describe('A Course Without Offerings', () => {
    beforeEach(() => {
      cy.wait('@courses');
      cy.wait('@offerings');
    });
    it('The Alert for No Offerings Should Be Shown', () => {
      cy.get(
        '[data-test-id="courses-list-item-1"] [data-test-id="course-item-offerings"]'
      ).should('not.exist');

      cy.get('[data-test-id="courses-list-item-1"]')
        .find('[data-test-id="course-item-no-offerings"]')
        .should('exist');
    });
  });
});
