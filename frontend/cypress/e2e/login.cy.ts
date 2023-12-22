/// <reference types="cypress" />

describe("Login User", () => {

    it('logs in user', () => {
        cy.visit('http://localhost:4200/login')

        cy.get('[data-cy="email"]').type('emmanuel@gmail.com')
        cy.get('[data-cy="password"]').type('@Emmanuel123')

        cy.visit('http://localhost:4200/newsfeed')
    })
})