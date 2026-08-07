import { first } from 'lodash'
import userData from '../fixtures/userData.json'

describe('Orange HRM - Tests', () => {

  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '[type="submit"]',
    sectionTitleTopBar: '.oxd-topbar-header-breadcrumb-module',
    dashboardGrid: '.orangehrm-dashboard-grid',
    wrongCredentialAlert: '[role="alert"]',
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]',
    middleNameFiel: '[name="middleName"]',
    genericField: ".oxd-input",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']"
    
    

  }

  it.only('User Info Update - Success', () => {

    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField).type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type("Paulo")
    cy.get(selectorsList.middleNameFiel).clear().type("Pedro")
    cy.get(selectorsList.lastNameField).clear().type("Pontes")
    cy.get(selectorsList.genericField).eq(4).clear().type("1010")
    cy.get(selectorsList.genericField).eq(5).clear().type("2020")
    cy.get(selectorsList.genericField).eq(6).clear().type("3030")
    cy.get(selectorsList.genericField).eq(7).clear().type("2026-07-08")
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get('.oxd-toast-close')
  
    
  })

  it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
})