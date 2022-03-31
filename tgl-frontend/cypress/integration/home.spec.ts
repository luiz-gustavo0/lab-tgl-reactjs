describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should contain a game filter', () => {
    cy.login();
    cy.closeToastMessage();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.dataCy('filter-buttons')
      .should('exist')
      .within(() => {
        cy.dataCy('filter-button').should('have.length.at.least', 4);
      });
  });

  it('should show all registered bets', () => {
    cy.login();
    cy.closeToastMessage();

    cy.renderedGames('Lotofácil');
    cy.renderedGames('Mega-Sena');
    cy.renderedGames('Quina');
  });

  it('should be able to filter for a single game', () => {
    cy.login();
    cy.closeToastMessage();

    cy.findByRole('button', { name: /lotofácil/i }).click();
    cy.renderedGames('Lotofácil');

    cy.findByRole('button', { name: /lotofácil/i }).click();
    cy.findByRole('button', { name: /mega-sena/i }).click();
    cy.renderedGames('Mega-Sena');

    cy.findByRole('button', { name: /mega-sena/i }).click();
    cy.findByRole('button', { name: /quina/i }).click();
    cy.renderedGames('Quina');

    cy.findByRole('button', { name: /quina/i }).click();
    cy.findByRole('button', { name: /timemania/i }).click();
    cy.get('.sc-llYSUQ > span')
      .should('exist')
      .findByText('No bets registred.')
      .should('exist');
  });

  it('should display No bets registred message', () => {
    cy.login('userteste2@email.com', '123456');
    cy.closeToastMessage();
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.get('.sc-llYSUQ > span')
      .should('exist')
      .findByText('No bets registred.')
      .should('exist');
  });
});
