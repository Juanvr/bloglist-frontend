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
    cy.request('POST',
      'http://localhost:3003/api/users',
      {
        'username' : 'root2',
        'password' : 'PasswordDePuma',
        'name' : 'El señor puma 2'
      })

    cy.request('POST',
      'http://localhost:3003/api/login',
      {
        'username': 'root',
        'password': 'PasswordDePuma'
      })
      .then( function( response ) {
        cy.request(
          {
            'method': 'POST',
            'url' : 'http://localhost:3003/api/blogs',
            'auth': {
              'bearer': response.body.token
            },
            'body' : {
              'title': 'Christmas',
              'author': 'Santa',
              'url': 'http://awesome.com',
              'likes': 1
            }
          }
        )
        cy.request(
          {
            'method': 'POST',
            'url' : 'http://localhost:3003/api/blogs',
            'auth': {
              'bearer': response.body.token
            },
            'body' : {
              'title': 'Halloween',
              'author': 'Santa Claws',
              'url': 'http://awesome.com',
              'likes': 5
            }
          }
        )
        cy.request(
          {
            'method': 'POST',
            'url' : 'http://localhost:3003/api/blogs',
            'auth': {
              'bearer': response.body.token
            },
            'body' : {
              'title': 'Hannukah',
              'author': 'Armadillo',
              'url': 'http://awesome.com',
              'likes': 10
            }
          }
        )

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
      cy.get('#username').type('root')
      cy.get('#password').type('PasswordDePuma')
      cy.get('#login-button').click()

      cy.contains('El señor puma logged-in')
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('El blog de caza')
      cy.get('#author').type('Don Leon')
      cy.get('#url').type('http://dafsaf')

      cy.get('#save').click()

      cy.contains('El blog de caza')
    })

    it('User can like a blog', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('El blog de caza')
      cy.get('#author').type('Don Leon')
      cy.get('#url').type('http://dafsaf')

      cy.get('#save').click()

      cy.contains('El blog de caza')

      cy.contains('show').click()
      cy.contains('0')

      cy.contains('like!').click()
      cy.contains('1')

    })
    it('User can delete a blog', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('El blog de caza')
      cy.get('#author').type('Don Leon')
      cy.get('#url').type('http://dafsaf')

      cy.get('#save').click()

      cy.contains('El blog de caza')

      cy.contains('show').click()
      cy.contains('delete').click()

      cy.contains('El blog de caza').not()

    })

    it('Another user cannot delete a blog', function() {

      cy.contains('New Blog').click()
      cy.get('#title').type('El blog de caza')
      cy.get('#author').type('Don Leon')
      cy.get('#url').type('http://dafsaf')

      cy.get('#save').click()

      cy.contains('El blog de caza')

      cy.contains('logout').click()

      cy.get('#username').type('root2')
      cy.get('#password').type('PasswordDePuma')
      cy.get('#login-button').click()

      cy.contains('El señor puma 2 logged-in')

      cy.contains('El blog de caza')

      cy.contains('show').click()
      cy.contains('delete').click()

      cy.contains('El blog de caza')

    })

    it.only('Blogs are ordered by likes', function() {
      let likes = cy.get('.likes')
      likes.should('have.length', 3)

      cy.get('.likes')
        .then($items => {
          return $items.map((index, html) => Cypress.$(html).text()).get()
        })
        .should('deep.eq', ['10', '5', '1'])
    })


  })

})