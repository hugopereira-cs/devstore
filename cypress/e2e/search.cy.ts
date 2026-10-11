describe("search products", () => {
  it("should be able to search for a products", () => {
    cy.searchByQuery('moletom')

    cy.location("pathname").should("include", "/search");

    cy.location("search").should("include", "q=moletom").should("exist");
  });

  it("should return to the home page when submitting an empty search", () => {
    cy.visit("/search?q=camiseta");

    cy.get("input[name=q]").clear().type("{enter}");

    cy.location("pathname").should("equal", "/");
  });

  it("should not be able to visit search page without a search query", () => {
    cy.on("uncaught:exception", () => {
      return false;
    });

    cy.visit("/search");

    cy.location("pathname").should("equal", "/");
  });
});
