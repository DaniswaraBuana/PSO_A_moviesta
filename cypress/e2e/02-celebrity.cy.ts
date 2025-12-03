describe('Celebrity Feature Tests', () => {
  describe('Celebrity Navigation', () => {
    it('should have celebrity icon in navbar', () => {
      cy.visit('/', { timeout: 10000 });
      cy.wait(2000);
      cy.get('[data-cy="celebrity-nav-button"]', { timeout: 10000 }).should('be.visible');
    });

    it('should navigate to celebrity page when clicking celebrity icon', () => {
      cy.visit('/', { timeout: 10000 });
      cy.wait(2000);
      cy.get('[data-cy="celebrity-nav-button"]', { timeout: 10000 }).should('be.visible').click();
      cy.url({ timeout: 10000 }).should('include', '/celebrity');
      cy.contains('Celebrity', { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Celebrity Page Tabs', () => {
    beforeEach(() => {
      cy.visit('/celebrity', { timeout: 10000 });
      cy.wait(3000); // Wait for page to fully load
    });

    it('should display all three tabs', () => {
      cy.get('[id="celebrity-tab-0"]', { timeout: 10000 }).should('be.visible');
      cy.get('[id="celebrity-tab-1"]', { timeout: 10000 }).should('be.visible');
      cy.get('[id="celebrity-tab-2"]', { timeout: 10000 }).should('be.visible');
    });

    it('should switch to Born Today tab', () => {
      cy.get('[id="celebrity-tab-0"]', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000);
      cy.contains('Selebriti yang Berulang Tahun Hari Ini', { timeout: 10000 }).should('be.visible');
    });

    it('should switch to Most Popular tab', () => {
      cy.get('[id="celebrity-tab-1"]', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000);
      cy.contains('Selebriti Paling Populer', { timeout: 10000 }).should('be.visible');
    });

    it('should switch to Celebrity News tab', () => {
      cy.get('[id="celebrity-tab-2"]', { timeout: 10000 }).should('be.visible').click();
      cy.wait(1000);
      cy.contains('Berita Selebriti Terkini', { timeout: 10000 }).should('be.visible');
    });
  });
});
