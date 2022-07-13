import { expect } from 'chai';
import { environment } from 'src/environments/environment';

describe('Making a Registration Request', () => {
  const bffUrl = environment.bffApiUrl;
  const referencesUrl = environment.referencesApiUrl;
  beforeEach(() => {
    cy.login({
      root: 'http://localhost:8080',
      realm: 'hypertheory',
      username: 'test@hypertheory.com',
      password: 'WordPass',
      client_id: 'web',
      redirect_uri: 'http://localhost:4200',
      path_prefix: '',
    });
  });
  it('should show the page', () => {
    // /api/bff/offerings/offering-1/registration-requests
    const url = bffUrl + 'offerings/offering-1/registration-requests';
    console.log(url);
    cy.intercept(url, ({ reply, body, headers }) => {
      // make sure the request has an authorization header.
      expect(headers['authorization']).to.exist;
      expect(headers['authorization']).to.match(/^Bearer/);
      const expectedBody = {
        agreesToParticipate: true,
        agreesToPay: true,
        comments: 'I hear the teacher is handsome!',
        amount: 323.28,
      };

      expect(body).to.deep.equal(expectedBody);
      // did the body of the post request contain:
      // -- offering id (offering-1)
      // -- {
      //     "agreesToParticipate": true,
      //     "agreesToPay": true,
      //     "comments": "I hear the teacher is handsome!",
      //     "amount": 323.28
      // }
      // if all that is true, send back a response with:
      // {"id":"97936b49-1e01-4b9c-a052-da99187561f6","createdAt":"2022-07-13T19:17:15.4775239Z","userSub":"945276db-c854-4cc5-a5bb-a1d73c94bd8f","agreesToPayment":true,"agreesToParticipate":true,"amount":323.28,"comments":"Looks Good!"}
      const stubbedResponse = {
        id: '97936b49-1e01-4b9c-a052-da99187561f6',
        createdAt: '2022-07-13T19:17:15.4775239Z',
        userSub: '45276db-c854-4cc5-a5bb-a1d73c94bd8f',
        agreesToPayment: true,
        agreesToParticipate: true,
        amount: 323.28,
        comments: 'Looks Good!',
      };

      reply({
        body: stubbedResponse,
      });
    }).as('registration-request');
    // but we need to intercept our calls to the courses/offerings thing again.
    cy.intercept(referencesUrl + 'courses', {
      fixture: 'course-list-variations.json',
    }).as('courses');
    cy.intercept(referencesUrl + 'offerings', {
      fixture: 'offerings-list-variations.json',
    }).as('offerings');

    // go to http://localhost:4200/courses/offerings/course-1
    // http://localhost:4200/courses/enrollments/offering-1/register

    cy.visit('/courses/enrollments/offering-1/register');
    cy.wait(['@courses', '@offerings']);

    cy.get('[data-test-id="register-agree-to-terms"]').click();
    cy.get('[data-test-id="register-agree-to-pay"]').click();
    cy.get('[data-test-id="register-comments"]').type(
      'I hear the teacher is handsome!'
    );

    cy.get('button[type="submit"]').click();
    cy.wait('@registration-request', { log: true, responseTimeout: 8000 });
    // THEN WHAT?!?!
  });
});
