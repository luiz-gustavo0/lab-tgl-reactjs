// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('dataCy', (value) => {
  cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add(
  'login',
  (email = 'userteste@email.com', password = '123456') => {
    cy.dataCy('email').type(email);
    cy.dataCy('password').type(password);
    cy.dataCy('button-submit').click();
  }
);

Cypress.Commands.add('closeToastMessage', () => {
  cy.get('.Toastify__close-button > svg').click({
    multiple: true,
    force: true,
  });
});

Cypress.Commands.add('renderedGames', (value) => {
  cy.dataCy('games-container').findAllByTestId(value).should('exist');
});

Cypress.Commands.add('completeGameAndAddToCart', (gameName) => {
  cy.dataCy(gameName).should('exist').click();
  cy.dataCy('btn-complete-game').should('exist').click();
  cy.dataCy('btn-add-cart').should('exist').click();

  cy.dataCy('cart')
    .should('exist')
    .within(() => {
      cy.findAllByTestId(gameName).should('exist');
    });
  cy.findAllByText(/game added to cart/i).should('exist');
  cy.closeToastMessage();
});
