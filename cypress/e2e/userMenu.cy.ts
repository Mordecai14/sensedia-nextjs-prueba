describe("User Menu", () => {
  beforeEach(() => {
    cy.intercept("GET", `${process.env.API_LOCAL}/api/usermenu`, {
      statusCode: 200,
      body: {
        user: {
          name: "Aramen Meza Mendozaaaa",
          email: "aramen@mail.com",
          avatar: "",
        },
      },
    }).as("getUserProfile");

    cy.visit("/");
  });

  it("should display user info correctly and interact with menu", () => {
    cy.wait("@getUserProfile");

    cy.contains("Aramen Meza Mendozaaaa").should("be.visible");

    cy.get(".cursor-pointer").click();

    cy.contains("Lista de amigos").should("be.visible");
    cy.contains("Artículos guardados").should("be.visible");
    cy.contains("Notificaciones").should("be.visible");
    cy.contains("Preferencias").should("be.visible");
    cy.contains("Cerrars sesión").should("be.visible");
  });
});
