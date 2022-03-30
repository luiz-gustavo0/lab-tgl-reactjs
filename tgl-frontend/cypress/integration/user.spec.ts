describe('User', () => {
  context('Register', () => {
    it.skip('should to be able to register', () => {
      cy.visit('/auth/register');
      cy.findByRole('heading', { name: /registration/i }).should('exist');

      cy.get('#name').type('User Teste');
      cy.get('#email').type('userteste@email.com');
      cy.get('#password').type('123456');

      cy.get('.sc-bdvvtL').click();

      cy.findAllByText(/cadastrado com sucesso/i).should('exist');
      cy.url().should('eq', `${Cypress.config().baseUrl}/auth`);
    });

    it('should return an error message when trying to register an email already registered', () => {
      cy.visit('/auth/register');
      cy.dataCy('name').type('User teste');
      cy.dataCy('email').type('userteste@email.com');
      cy.dataCy('password').type('123456');

      cy.intercept('POST', '**/create', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.eq(400);
          expect(res.body.error.message).to.eq('Email already exists');
        });
      }).as('register');
      cy.dataCy('button-submit').click();

      cy.wait('@register');
      cy.findAllByText(/email already exists/i).should('exist');
    });
  });

  context('Login e Logout', () => {
    it('should be able to login', () => {
      cy.visit('/auth');
      cy.findByRole('heading', { name: /authentication/i }).should('exist');

      cy.login();

      cy.findAllByText(/bem vindo user teste/i).should('exist');
      cy.closeToastMessage();

      cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
    it('should be able to logout ', () => {
      cy.visit('/auth');
      cy.login();

      cy.findAllByText(/bem vindo user teste/i).should('exist');
      cy.closeToastMessage();
      cy.url().should('eq', `${Cypress.config().baseUrl}/`);

      cy.dataCy('btn-logout').click();
      cy.url().should('eq', `${Cypress.config().baseUrl}/auth`);
    });

    it('should return error message when sending invalid password or email', () => {
      cy.visit('/auth');

      cy.intercept('POST', '**/login', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.eq(401);
          expect(res.body.message).to.eq('Senha ou e-mail inválidos');
        });
      }).as('login');

      cy.login('error@eamil.com', '1234567');

      cy.wait('@login');
      cy.findAllByText(/senha ou e-mail inválidos/i).should('exist');
    });

    it('should show error message when entering invalid email', () => {
      cy.visit('/auth');
      cy.login('error@eamil', '1234567');
      cy.findAllByText(/enter a valid email\./i).should('exist');
    });

    it('should show error message when entering password less than 6 characters ', () => {
      cy.visit('/auth');

      cy.login('error@eamil.com', '1234');
      cy.findAllByText(/Password must be at least 6 characters long/i).should(
        'exist'
      );
    });
  });

  context('Reset password', () => {
    it('should be able to send email to change password', () => {
      cy.visit('/auth');
      cy.dataCy('link-reset-password').click();

      cy.dataCy('email').type('userteste@email.com');

      cy.intercept('POST', '**/reset', (req) => {
        expect(req.body).has.ownProperty('email').to.eq('userteste@email.com');

        req.continue((res) => {
          expect(res.body).has.ownProperty('token');
          Cypress.env('token', res.body.token);
        });
      }).as('resetPassword');

      cy.dataCy('button-submit').click();
      cy.wait('@resetPassword');

      cy.findAllByText(/email sent successfully!/i).should('exist');
      cy.findByRole('heading', { name: /change password/i }).should('exist');
      cy.closeToastMessage();
    });

    it('should return user not found message', () => {
      cy.visit('/auth/forgot-password');
      cy.dataCy('email').type('error@mail.com');
      cy.intercept('POST', '**/reset', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.eq(404);
          expect(res.body.message).to.eq(
            'Usuário não encontrado em nossa base de dados'
          );
        });
      }).as('resetPassword');
      cy.dataCy('button-submit').click();
      cy.wait('@resetPassword');
      cy.findAllByText(/usuário não encontrado em nossa base de dados/i).should(
        'exist'
      );
      cy.closeToastMessage();
    });
  });

  context('Change password', () => {
    it('should be able to change password', () => {
      cy.visit(`/auth/reset-password/${Cypress.env('token')}`);
      cy.get('#password').type('123456');
      cy.get('.sc-bdvvtL').click();

      cy.findAllByText(/password changed successfully!/i).should('exist');
      cy.closeToastMessage();
      cy.url().should('eq', `${Cypress.config().baseUrl}/auth`);
    });

    it('should return error when sending wrong token ', () => {
      cy.visit(`/auth/reset-password/234oslwo222error`);
      cy.dataCy('password').type('123456');
      cy.intercept('POST', '**/reset/*', (req) => {
        req.continue((res) => {
          expect(res.statusCode).to.eq(404);
        });
      }).as('resetPassword');
      cy.dataCy('button-submit').click();
      cy.wait('@resetPassword');

      cy.findAllByText(/failed to change password/i).should('exist');
      cy.closeToastMessage();
    });
  });
});
