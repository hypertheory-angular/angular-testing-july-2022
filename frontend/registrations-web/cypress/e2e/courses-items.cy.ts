describe('course list items', () => {
  beforeEach(() => {
    cy.intercept('/api/references/courses', {
      fixture: 'course-list-variations.json',
    });

    cy.intercept('/api/references/offerings', {
      fixture: 'offerings-list-variations.json',
    });
    cy.visit('/courses');
  });

  describe('The Common Stuff', () => {
    it('Shows the Title', () => {});
    it('Shows the Number of Days', () => {});
    it('Shows the Description', () => {});
  });
  describe('A Course With Offerings', () => {
    it('The See Offerings Button Is Shown', () => {
      cy.get('[data-test-id="courses-list-item-0"]').should('exist');

      // it shows the button, but not the alert
    });
  });
  describe('A Course Without Offerings', () => {
    it('The Alert for No Offerings Should Be Shown', () => {
      cy.get('[data-test-id="courses-list-item-1"]').should('exist');

      // it shows the alert, but not the button.
    });
  });
});
