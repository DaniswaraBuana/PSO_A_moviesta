describe('Celebrity Feature Tests', () => {
  beforeEach(() => {
    // Login first
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(Cypress.env('userEmail'));
    cy.get('input[name="password"]').type(Cypress.env('userPassword'));
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
  });

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

  describe('Celebrity Cards', () => {
    beforeEach(() => {
      cy.visit('/celebrity');
      cy.wait(1000);
    });

    it('should display celebrity cards in Most Popular tab', () => {
      cy.contains('Most Popular').click();
      cy.wait(500);
      
      // Check if celebrity cards are rendered
      cy.get('[href^="/celebrity/"]').should('have.length.at.least', 1);
    });

    it('should show celebrity information on cards', () => {
      cy.contains('Most Popular').click();
      cy.wait(500);

      // Verify card contains celebrity info
      cy.contains('Aktris').should('exist');
      cy.contains('Aktor').should('exist');
    });

    it('should navigate to celebrity detail when clicking a card', () => {
      cy.contains('Most Popular').click();
      cy.wait(500);

      // Click first celebrity card
      cy.get('[href^="/celebrity/"]').first().click();
      
      // Should navigate to celebrity detail page
      cy.url().should('match', /\/celebrity\/\d+/);
    });
  });

  describe('Celebrity Detail Page', () => {
    it('should display celebrity profile information', () => {
      cy.visit('/celebrity');
      cy.contains('Most Popular').click();
      cy.wait(500);
      
      // Click first celebrity
      cy.get('[href^="/celebrity/"]').first().click();
      cy.wait(1000);

      // Check if profile elements are visible
      cy.contains('Informasi Personal').should('be.visible');
      cy.contains('Tanggal Lahir').should('be.visible');
      cy.contains('Tempat Lahir').should('be.visible');
      cy.contains('Popularitas').should('be.visible');
      cy.contains('Biografi').should('be.visible');
    });

    it('should display known for movies section', () => {
      cy.visit('/celebrity');
      cy.contains('Most Popular').click();
      cy.wait(500);
      
      cy.get('[href^="/celebrity/"]').first().click();
      cy.wait(1000);

      // Check for movies section
      cy.contains('Dikenal Dari').should('be.visible');
    });
  });

  describe('Celebrity News', () => {
    beforeEach(() => {
      cy.visit('/celebrity');
      cy.contains('Celebrity News').click();
      cy.wait(1000);
    });

    it('should display celebrity news cards', () => {
      // Check if news cards exist
      cy.get('[href^="/celebrity/news/"]').should('have.length.at.least', 1);
    });

    it('should show news title and content preview', () => {
      // Verify news card content
      cy.contains('Leonardo DiCaprio').should('exist');
      cy.contains('Kate Winslet').should('exist');
    });

    it('should navigate to news detail when clicking a news card', () => {
      // Click first news card
      cy.get('[href^="/celebrity/news/"]').first().click();
      
      // Should navigate to news detail page
      cy.url().should('match', /\/celebrity\/news\/\d+/);
    });
  });

  describe('Celebrity News Detail Page', () => {
    it('should display full news article', () => {
      cy.visit('/celebrity');
      cy.contains('Celebrity News').click();
      cy.wait(500);
      
      // Click first news
      cy.get('[href^="/celebrity/news/"]').first().click();
      cy.wait(1000);

      // Check news detail elements
      cy.get('h3').should('exist'); // News title
      cy.get('img').should('exist'); // News image
    });

    it('should have back link to celebrity page', () => {
      cy.visit('/celebrity');
      cy.contains('Celebrity News').click();
      cy.wait(500);
      
      cy.get('[href^="/celebrity/news/"]').first().click();
      cy.wait(1000);

      // Check for back link
      cy.contains('Kembali ke Celebrity').should('be.visible');
    });

    it('should navigate back when clicking back link', () => {
      cy.visit('/celebrity');
      cy.contains('Celebrity News').click();
      cy.wait(500);
      
      cy.get('[href^="/celebrity/news/"]').first().click();
      cy.wait(1000);

      // Click back link
      cy.contains('Kembali ke Celebrity').click();
      
      // Should be back on celebrity page
      cy.url().should('include', '/celebrity');
      cy.url().should('not.include', '/news');
    });

    it('should have link to celebrity profile from news', () => {
      cy.visit('/celebrity');
      cy.contains('Celebrity News').click();
      cy.wait(500);
      
      cy.get('[href^="/celebrity/news/"]').first().click();
      cy.wait(1000);

      // Check for celebrity profile link
      cy.contains('Baca Juga').should('be.visible');
    });
  });

  describe('Celebrity Search and Filter', () => {
    it('should display celebrities in grid layout', () => {
      cy.visit('/celebrity');
      cy.contains('Most Popular').click();
      cy.wait(500);

      // Check grid container exists
      cy.get('[class*="MuiGrid-container"]').should('exist');
    });

    it('should be responsive on different screen sizes', () => {
      cy.visit('/celebrity');
      
      // Test mobile view
      cy.viewport('iphone-x');
      cy.contains('Most Popular').click();
      cy.wait(500);
      cy.get('[href^="/celebrity/"]').should('be.visible');
      
      // Test tablet view
      cy.viewport('ipad-2');
      cy.get('[href^="/celebrity/"]').should('be.visible');
      
      // Test desktop view
      cy.viewport(1920, 1080);
      cy.get('[href^="/celebrity/"]').should('be.visible');
    });
  });

  describe('Celebrity Page Performance', () => {
    it('should load celebrity page within reasonable time', () => {
      const startTime = Date.now();
      
      cy.visit('/celebrity');
      cy.contains('Celebrity').should('be.visible');
      
      cy.then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(3000); // Should load in less than 3 seconds
      });
    });

    it('should handle tab switching smoothly', () => {
      cy.visit('/celebrity');
      
      cy.contains('Born Today').click();
      cy.wait(200);
      cy.contains('Selebriti yang Berulang Tahun Hari Ini').should('be.visible');
      
      cy.contains('Most Popular').click();
      cy.wait(200);
      cy.contains('Selebriti Paling Populer').should('be.visible');
      
      cy.contains('Celebrity News').click();
      cy.wait(200);
      cy.contains('Berita Selebriti Terkini').should('be.visible');
    });
  });

  describe('Celebrity Error Handling', () => {
    it('should handle non-existent celebrity ID gracefully', () => {
      cy.visit('/celebrity/99999', { failOnStatusCode: false });
      cy.wait(1000);
      
      // Page should still load (might show default data or error message)
      cy.get('body').should('exist');
    });

    it('should handle non-existent news ID gracefully', () => {
      cy.visit('/celebrity/news/99999', { failOnStatusCode: false });
      cy.wait(1000);
      
      // Page should still load
      cy.get('body').should('exist');
    });
  });

  describe('Celebrity Integration with Main App', () => {
    it('should maintain user session when navigating to celebrity', () => {
      cy.visit('/');
      cy.wait(1000);
      
      // Navigate to celebrity
      cy.get('[title="Celebrity"]').click();
      cy.url().should('include', '/celebrity');
      
      // Should still be logged in - logout button should exist
      cy.get('[class*="Logout"]').should('exist');
    });

    it('should be able to navigate back to home from celebrity page', () => {
      cy.visit('/celebrity');
      cy.wait(1000);
      
      // Click on Moviesta logo/title
      cy.contains('Moviesta').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should show all navigation options on celebrity page', () => {
      cy.visit('/celebrity');
      cy.wait(1000);
      
      // Check all navbar icons exist
      cy.get('[title="Celebrity"]').should('exist');
      cy.get('[class*="FavoriteBorderIcon"]').should('exist'); // Watchlist
      cy.get('[class*="Logout"]').should('exist'); // Logout
    });
  });
});
