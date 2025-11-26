describe('Login Page', () => {
  beforeEach(() => {
    // Kunjungi halaman login
    cy.visit('/auth/login');
  });

  it('menampilkan halaman login dengan field dan tombol', () => {
    cy.get('[data-cy="login-email-input"]').should('exist');
    cy.get('[data-cy="login-password-input"]').should('exist');
    cy.get('[data-cy="login-button"]').should('exist');
  });

  it('gagal login jika email atau password kosong', () => {
    cy.get('[data-cy="login-button"]').click();

    // Karena di UI kamu pakai alert()
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Email dan password wajib diisi.');
    });
  });

  // it('berhasil login dengan kredensial yang valid', () => {
  //   // Ambil dari cypress.env.json → userEmail & userPassword
  //   cy.get('[data-cy="login-email-input"]').type(Cypress.env('userEmail'));
  //   cy.get('[data-cy="login-password-input"]').type(Cypress.env('userPassword'));

  //   cy.get('[data-cy="login-button"]').click();

  //   // Setelah login, diarahkan ke "/"
  //   cy.url().should('eq', Cypress.config().baseUrl + '/');
  // });
});
