
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {

    // const longText = Cypress._.repeat('texto que sera repetido', 10)
    // Preenchimento do formulario
    cy.get('#firstName').type('Valmir')
    cy.get('#lastName').type('Soriano')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone').type('11000000000')
    // cy.get('#open-text-area').type(longText, {delay: 0}) 
    // utiliza a variavel longText, no lugar de textos muito longos
    // {delay: 0} -> Determina o delay na execução de 0 a 10.
    cy.get('#open-text-area').type('Texto teste para preenchimento do campo de texto ') 
    cy.get('button[type="submit"]').click()

    // Verifica o retorno do formulário enviado 
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Valmir')
    cy.get('#lastName').type('Soriano')
    cy.get('#email').type('teste@teste.com,br')
    cy.get('#phone').type('11000000000')
    cy.get('#open-text-area').type('Texto teste para preenchimento do campo de texto ') 
    cy.get('button[type="submit"]').click()

    // Verifica o retorno do formulário enviado 
    cy.get('.error').should('be.visible')
  })

  it('valida se um campo continua vazio se digitado por um valor não numérico', ()=> {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    //Ações
    cy.get('#firstName').type('Valmir')
    cy.get('#lastName').type('Soriano')
    cy.get('#email').type('teste@teste.com,br')
    cy.get('#phone').type('11000000000')
    cy.get('#open-text-area').type('Texto teste para preenchimento do campo de texto ') 
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    // Resultado esperado 
    cy.get('.error').should('be.visible')
  })

  it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    //Ações
    cy.get('#firstName')
      .type('Valmir')
      .should('have.value', 'Valmir')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Soriano')
      .should('have.value', 'Soriano')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@teste.com.br')
      .should('have.value', 'teste@teste.com.br')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('11000000000')
      .should('have.value', '11000000000')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('Texto teste para preenchimento do campo de texto ') 
      .should('have.value', 'Texto teste para preenchimento do campo de texto ')
      .clear()
      .should('have.value', '')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()

    // Resultado esperado 
    cy.get('.error').should('be.visible')
  })
})
