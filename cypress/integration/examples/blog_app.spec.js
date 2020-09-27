describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 
      'http://localhost:3003/api/users',
      {
        'username' : 'root',
        'password' : 'PasswordDePuma',
        'name' : 'El señor puma'
      })
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
    // cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('PasswordDePuma')
      cy.get('#login-button').click()

      cy.contains('El señor puma logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('PasswordDePuma2')
      cy.get('#login-button').click()

      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })

})