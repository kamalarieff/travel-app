beforeEach(() => {
  cy.visit("/");
});

it("calculate debt", () => {
  cy.get("#item").type("test");
  cy.get("#item-value")
    .clear()
    .type("100");

  cy.get("#calculate").should("be.disabled");
  cy.get("#add-user").click();
  cy.get("#add-user").click();
  cy.get(".userform").should("have.length", 2);
  cy.get(".userform")
    .get('[data-testid="username"]')
    .eq(0)
    .type("kamal");
  cy.get(".userform")
    .get('[data-testid="debt"]')
    .eq(0)
    .type("80");
  cy.get(".userform")
    .get('[data-testid="username"]')
    .eq(1)
    .type("arieff");
  cy.get(".userform")
    .get('[data-testid="debt"]')
    .eq(1)
    .type("20");
  cy.get("#calculate").should("be.enabled");
  cy.get("#calculate").click();
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(1)").should(
    "contain",
    "arieff"
  );
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(2)").should(
    "contain",
    "kamal"
  );
  cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").should(
    "contain",
    "RM 30"
  );
  cy.get('[data-testid="delete-user-1"]').click();
  cy.get(".userform").should("have.length", 1);
  cy.get("#clear").click();
  cy.get(".userform").should("have.length", 0);
});
