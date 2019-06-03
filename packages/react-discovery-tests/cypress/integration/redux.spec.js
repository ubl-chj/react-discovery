describe('Redux Store', () => {
  it('has expected state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.visit('/', {
        onBeforeLoad: win => {
          win.initialState = json
        }
      })
    })
  })
  it('has expected config state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('config').should('deep.equal', json.config)
    })
  })
  it('has expected query state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('query').should('deep.equal', json.query)
    })
  })
  it('has expected response aggregations state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('response').its('aggregations')
        .should('deep.equal', json.response.aggregations)
    })
  })
  it('has expected response hits state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('response').its('hits')
        .should('deep.equal', json.response.hits)
    })
  })
  it('has expected suggestions state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('suggestions')
        .should('deep.equal', json.suggestions)
    })
  })
})


