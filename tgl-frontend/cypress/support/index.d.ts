/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    dataCy(value: string): Chainable<Element>;

    /**
     * Custom command to login the user.
     * @example cy.login(email, password)
     */
    login(email?: string, password?: string): Chainable<Element>;

    /**
     * Custom command to close toast message.
     * @example cy.closeToastMessage()
     */
    closeToastMessage(): Chainable<Element>;

    /**
     * Custom command to verify rendered games.
     * @example cy.renderedGames(value)
     */
    renderedGames(value: string): Chainable<Element>;

    /**
     * Custom command to complete game and add to cart.
     * @example cy.completeGameAndAddToCart(gameName)
     */
    completeGameAndAddToCart(gameName: string): Chainable<Element>;
  }
}
