describe('Account page', () => {
  beforeEach(() => {
    cy.visit('/auth');
    cy.login();
    cy.closeToastMessage();
  });

  it('should user should be able to view your data', () => {
    cy.visit('/account');
    cy.get('.sc-bBHxTw').within(() => {
      cy.findByText(/user teste/i).should('exist');
      cy.findByText(/userteste@email\.com/i).should('exist');
    });
    cy.findByRole('heading', { name: /edit your data/i }).should('exist');
  });

  it('should user should be able to update their data', () => {
    cy.visit('/account');

    cy.dataCy('name');
    cy.dataCy('email');

    cy.intercept('PUT', '**/user/update', (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(200);
        expect(res.body.name).to.eq('User Teste');
        expect(res.body.email).to.eq('userteste@email.com');
      });
    }).as('updateUser');

    cy.dataCy('button-submit').click();

    cy.wait('@updateUser');
    cy.findAllByText(/successfully updated/i).should('exist');
    cy.get('.sc-bBHxTw').within(() => {
      cy.findByText(/user teste/i).should('exist');
      cy.findByText(/userteste@email\.com/i).should('exist');
    });

    cy.closeToastMessage();
  });
});
