/// <reference types="Cypress" />

describe('Ticketbox', () => {
  beforeEach(() => cy.visit('https://bit.ly/2XSuwCW'))

  it('fills all the text input fields', () => {
    const firstName = 'John'
    const lastName = 'Doe'

    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('johndoe@example.com')
    cy.get('#requests').type('IPA beer')
    cy.get('#signature').type(`${firstName} ${lastName}`)
  })

  it('selects two tickets', () => {
    cy.get('#ticket-quantity').select("2")
  })

  it('selects the VIP ticket type', () => {
    cy.get('#vip').check()
  })

  it('selects the Social Media checkbox', () => {
    cy.get('#social-media').check()
  })

  it('checks Friend, and Publication, then unchecks Friend', () => {
    cy.get('#friend').check()
    cy.get('#publication').check()
    cy.get('#friend').uncheck()
  })

  it('resets the form after filling the first name', () => {
    const firstName = 'John'

    cy.get('#first-name').type(firstName)

    cy.get('.agreement > fieldset').should('contain', firstName)

    cy.get('.reset').click()

    cy.get('.agreement > fieldset').should('not.contain', firstName)
  })

  it('has TICKETBOX heading', () => {
    cy.get('h1').should('contain', 'TICKETBOX')
  })

  it('successfully submits the form', () => {
    const firstName = 'John'
    const lastName = 'Doe'
    const fullName = `${firstName} ${lastName}`

    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('johndoe@example.com')
    cy.get('#ticket-quantity').select("3")
    cy.get('#vip').check()

    cy.get('.agreement > fieldset')
      .should("contain", `I, ${fullName}, wish to buy 3 VIP tickets.`)

    cy.get('#friend').check()
    cy.get('#requests').type('IPA beer')
    cy.get('#agree').click()
    cy.get('#signature').type(fullName)
    cy.contains('Confirm Tickets').click()

    cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
  })

  it('successfully submits the form using a support command', () => {
    const customer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com'
    }

    cy.fillMandatoryFields(customer)

    cy.contains('Confirm Tickets').click()

    cy.get('.success > p').should('contain', 'Ticket(s) successfully ordered.')
  })
})