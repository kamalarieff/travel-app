beforeEach(() => {
  cy.visit("/");
});

describe("E2E Tests", () => {
  it("calculate debt", () => {
    cy.get("#item").type("test");
    cy.get("#item-value")
      .clear()
      .parent()
      .should("have.class", "Mui-error");
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
    cy.get("#result-table").should("not.be.visible");
  });

  it("calculate debt with 4 users", () => {
    cy.get("#item").type("test");
    cy.get("#item-value")
      .clear()
      .type("60");

    cy.get("#calculate").should("be.disabled");
    cy.get("#add-user").click();
    cy.get("#add-user").click();
    cy.get("#add-user").click();
    cy.get("#add-user").click();
    cy.get(".userform").should("have.length", 4);

    cy.get(".userform")
      .get('[data-testid="username"]')
      .eq(0)
      .type("kamal");
    cy.get(".userform")
      .get('[data-testid="debt"]')
      .eq(0)
      .type("10");

    cy.get(".userform")
      .get('[data-testid="username"]')
      .eq(1)
      .type("megat");
    cy.get(".userform")
      .get('[data-testid="debt"]')
      .eq(1)
      .type("20");

    cy.get(".userform")
      .get('[data-testid="username"]')
      .eq(2)
      .type("jimmy");
    cy.get(".userform")
      .get('[data-testid="debt"]')
      .eq(2)
      .type("30");

    cy.get(".userform")
      .get('[data-testid="username"]')
      .eq(3)
      .type("bakar");

    cy.get("#calculate").should("be.enabled");
    cy.get("#calculate").click();

    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "kamal"
    );
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "megat"
    );
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "RM 5"
    );

    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "bakar"
    );
    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(2)").should(
      "contain",
      "jimmy"
    );
    cy.get(".MuiTableBody-root > :nth-child(2) > :nth-child(3)").should(
      "contain",
      "RM 15"
    );
  });
});
