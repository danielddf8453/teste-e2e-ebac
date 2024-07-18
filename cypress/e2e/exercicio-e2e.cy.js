/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit('produtos')
  });

  it('Escolhendo e Adcionando os Produtos', () => {
    cy.fixture('produtos').then(dados => {

      // Add 1o produto ao carrinho
      produtosPage.buscarProdutoLista(dados[0].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[0].tamanho,
        dados[0].cor,
        dados[0].quantidade
    );

      // Verifica se o 1o produto foi adicionado com sucesso
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto);

      // Volta pra página de produtos
      cy.visit('produtos')

      // Add 2o produto ao carrinho
      produtosPage.buscarProdutoLista(dados[1].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[1].tamanho,
        dados[1].cor,
        dados[1].quantidade
      );

      // Verifica se o 2o produto foi adicionado com sucesso
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto);

      // Volta pra página de produtos
      cy.visit('produtos')

      // Add 3o produto ao carrinho
      produtosPage.buscarProdutoLista(dados[2].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[2].tamanho,
        dados[2].cor,
        dados[2].quantidade
      );

      // Verifica se o 2o produto foi adicionado com sucesso
      cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto);

      // Volta pra página de produtos
      cy.visit('produtos')

      // Add 4o produto ao carrinho
      produtosPage.buscarProdutoLista(dados[3].nomeProduto)
      produtosPage.addProdutoCarrinho(
        dados[3].tamanho,
        dados[3].cor,
        dados[3].quantidade
      );

      // Verifica se o 2o produto foi adicionado com sucesso
      cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto);

      //Vai pro carrinho
      cy.get('.woocommerce-message > .button').click()

      //Vai pro Concluir compra
      cy.get('.checkout-button').click()

      //Preencher o checkout
      cy.get('#billing_first_name').type('Daniel')
      cy.get('#billing_last_name').type('Dantas')
      cy.get('#billing_address_1').type('Rua Elesbão de Castro, 405')
      cy.get('#billing_city').type('Olinda')
      cy.get('#billing_state_field > .woocommerce-input-wrapper > .select2 > .selection > .select2-selection > .select2-selection__arrow').click()
      cy.get('#select2-billing_state-results').contains('Pernambuco').click()
      cy.get('#select2-billing_state-container').should('contain', 'Pernambuco')
      cy.get('#billing_postcode').type(53030210)
      cy.get('#billing_phone').type(819825012345)
      cy.get('#billing_email').type('danielddf@gmail.com')
      cy.get('#terms').click()
      cy.get('#place_order').click()

      cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  
      
    })
  })
});
