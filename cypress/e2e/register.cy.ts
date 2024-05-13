describe("Cadastro de usuário", () => {
  it("deve permitir o cadastro de um novo profissional", () => {
    cy.intercept("POST", "/professional", {
      statusCode: 200,
      body: {
        name: "João Silva Teste",
        email: "joao.dasilva@example.com",
      },
    }).as("cadastroResponse");

    cy.visit("/register");
    // Verifica se o formulário de cadastro está visível
    cy.get("form").should("be.visible");

    cy.get('[data-testid="name"]').type("João da Silva");
    cy.get('[data-testid="email"]').type("joao.dasilva@example.com");
    cy.get('[data-testid="password"]').type("senha123");
    cy.get('button[type="submit"]').click();

    // Verifica se a requisição de cadastro foi enviada com os dados corretos
    cy.wait("@cadastroResponse").then((interception) => {
      expect(interception.request.body).to.have.property(
        "name",
        "João da Silva",
      );
      expect(interception.request.body).to.have.property(
        "email",
        "joao.dasilva@example.com",
      );
    });
  });
});
