describe('Celebrity Feature Tests', () => {
  describe('Celebrity Navigation', () => {
    it('should have celebrity icon in navbar', () => {
      cy.visit('/');
      cy.get('[title="Celebrity"]').should('exist');
    });

    it('should navigate to celebrity page when clicking celebrity icon', () => {
      cy.visit('/');
      cy.get('[title="Celebrity"]').click();
      cy.url().should('include', '/celebrity');
      cy.contains('Celebrity').should('be.visible');
    });
  });

  describe('Celebrity Page Tabs', () => {
    beforeEach(() => {
      cy.visit('/celebrity');
      cy.wait(1000);
    });

    it('should display all three tabs', () => {
      cy.contains('Born Today').should('be.visible');
      cy.contains('Most Popular').should('be.visible');
      cy.contains('Celebrity News').should('be.visible');
    });

    it('should switch to Born Today tab', () => {
      cy.contains('Born Today').click();
      cy.contains('Selebriti yang Berulang Tahun Hari Ini').should('be.visible');
    });

    it('should switch to Most Popular tab', () => {
      cy.contains('Most Popular').click();
      cy.contains('Selebriti Paling Populer').should('be.visible');
    });

    it('should switch to Celebrity News tab', () => {
      cy.contains('Celebrity News').click();
      cy.contains('Berita Selebriti Terkini').should('be.visible');
    });
  });
});
