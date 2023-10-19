describe("Backend Health Check Test", () => {
  it("Checks the health endpoint", () => {
    cy.request("http://localhost:5000/health").as("healthCheck");
    cy.get("@healthCheck").its("status").should("eq", 200);
  });
});
