describe("Feature Homepage", () => {
  it("Should visit homepage", () => {
    cy.visit("/");
    cy.contains("PsiBoard");
  });
});
