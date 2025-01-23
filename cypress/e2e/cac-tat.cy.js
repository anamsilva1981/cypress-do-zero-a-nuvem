
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatórios e envia o formulário', () => {
    // Preenchimento do formulario
    cy.get('#firstName').type('Valmir')
    cy.get('#lastName').type('Soriano')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone').type('11000000000')
    cy.get('#open-text-area').type('Texto teste para preenchimento do campo de texto ')
    cy.get('button[type="submit"]').click()

    // Verifica o retorno do formulário enviado 
    cy.get('.success').should('be.visible')
  })
})
