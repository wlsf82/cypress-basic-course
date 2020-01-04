Cypress.Commands.add('fillMandatoryFields', customer => {
  cy.get('#first-name').type(customer.firstName)
  cy.get('#last-name').type(customer.lastName)
  cy.get('#email').type(customer.email)
  cy.get('#agree').click()
})
