describe("SEO test: Does the homepage contain a H1 element?", () => {
  it("loads", () => {
    cy.visit("/");
    cy.get("h1").should("be.visible");
  });
});
