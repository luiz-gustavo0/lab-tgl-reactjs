describe('Bets page', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.login();
    cy.closeToastMessage();
  });

  it.skip('should be able to access the betting page', () => {
    cy.visit('/new-bet');
    cy.get('.game-name').should('exist').and('contain', 'Lotofácil');
    cy.dataCy('cart').should('exist').and('contain', 'No bets added to cart.');
  });

  it.skip('should be possible to select game and add to cart', () => {
    cy.visit('/new-bet');
    cy.completeGameAndAddToCart('Mega-Sena');
  });

  it('should be possible to remove game from cart', () => {
    cy.visit('/new-bet');
    cy.dataCy('Quina').should('exist').click();
    cy.completeGameAndAddToCart('Quina');

    cy.dataCy('btn-remove-item').click();
    cy.get('.confirm-buttom').should('exist').click();
    cy.findAllByText(/game removed from cart\./i).should('exist');
    cy.findAllByText(/No bets added to cart\./i).should('exist');
  });

  it.skip('should show empty cart message when trying to register empty bet', () => {
    cy.visit('/new-bet');
    cy.dataCy('btn-save-bet').should('exist').click();
    cy.findAllByText(/the cart is empty/i).should('exist');
    cy.closeToastMessage();
  });

  it('should display minimum bet amount message', () => {
    cy.visit('/new-bet');
    cy.dataCy('Lotofácil').should('exist').click();
    cy.completeGameAndAddToCart('Lotofácil');
    cy.dataCy('btn-save-bet').should('exist').click();
    cy.findAllByText(/the value min authorized is R\$ 30,00/i).should('exist');
    cy.closeToastMessage();
  });

  it.skip('should be possible to register bet', () => {
    cy.visit('/new-bet');
    cy.dataCy('Lotofácil').should('exist').click();
    cy.completeGameAndAddToCart('Lotofácil');
    cy.completeGameAndAddToCart('Lotofácil');
    cy.completeGameAndAddToCart('Lotofácil');

    cy.dataCy('Mega-Sena').should('exist').click();
    cy.completeGameAndAddToCart('Mega-Sena');
    cy.completeGameAndAddToCart('Mega-Sena');
    cy.completeGameAndAddToCart('Mega-Sena');
    cy.completeGameAndAddToCart('Mega-Sena');

    cy.dataCy('Quina').should('exist').click();
    cy.completeGameAndAddToCart('Quina');
    cy.completeGameAndAddToCart('Quina');
    cy.completeGameAndAddToCart('Quina');

    cy.dataCy('total-cart')
      .should('exist')
      .findAllByText(/total: R\$ 31,50/i);

    cy.dataCy('btn-save-bet').should('exist').click();
    cy.findAllByText(/bet save successfully/i).should('exist');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.renderedGames('Quina');
    cy.renderedGames('Mega-Sena');
    cy.renderedGames('Lotofácil');
  });
});
