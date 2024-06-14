describe("Feature Login", () => {
  it("Should NOT BE able to login", () => {
    cy.visit("/login");
    cy.get("#email").type("usuario.demo@teste.com");
    cy.get("#password").type("demodemo");
    cy.get('button[type="submit"]').click();
  });

  it("Should BE able to login", () => {
    cy.visit("/login");
    cy.get("#email").type("usuario.demo@teste.com");
    cy.get("#password").type("testedemo");
    cy.get('button[type="submit"]').click();
    cy.wait(6000);
    cy.get('[data-testid="button-mobile-menu"]').click();
    cy.get('[data-testid="button-logout"]').click();
  });
});
