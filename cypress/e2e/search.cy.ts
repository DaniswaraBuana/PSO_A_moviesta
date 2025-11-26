describe('Fitur Pencarian', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('seharusnya bisa mengetik, mencari, dan menampilkan hasil', () => {
    const searchKeyword = 'Inception';
    // Debug: screenshot sebelum mencari input
    cy.screenshot('before-search-input');
    // Debug: log isi body
    cy.document().then(doc => {
      cy.log(doc.body.innerHTML);
    });
    // Perpanjang timeout agar Next.js punya waktu render
    cy.get('[data-cy="search-input"]', { timeout: 10000 }).should('exist').type(`${searchKeyword}{enter}`);
    cy.url().should('include', `/search/${encodeURI(searchKeyword)}`);
    cy.get('[data-cy="search-results-header"]')
      .should('be.visible')
      .and('contain.text', `Hasil Pencarian Untuk ${searchKeyword}`);
  });
});
