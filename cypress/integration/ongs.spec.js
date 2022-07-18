// Este comando traz as referências de comandos do Cypress, quando digitar cy. ele traz a lista de comandos e seus respectivos resultados/efeitos
/// <reference types="cypress" />

    //criar primeira estrutura de testes utilizando o mocha
describe('Ongs', () => {
    //it.skip para de executar o teste
    it('devem poder realizar um cadastro', () => {
        cy.visit('http://localhost:3000/register')
        //cy.get - busca um elemento
        //.type - insere um elemento
        cy.get('[data-cy=name]').type('Primeiro teste Cy');
        cy.get('[data-cy=email]').type('testecy@mail.com');
        cy.get('[data-cy=whatsapp]').type('42988567533');
        cy.get('[data-cy=city]').type('Ponta Grossa');
        cy.get('[data-cy=uf]').type('PR');

        // chamada http (XHR) para api/lab e retornou o status 200 e retornou o ID de acesso
        // vamos fazer uma assersão no cadastro para sempre retonar o POST 200
        // routing *escutar onde a aplicação está se conectando com conexões http etc e para criação de mocks
        // start server com cy.server() *dependencia para utilizar o routing
        // criar uma rota com cy.route() *monitorar uma requisição
        // atribuir rota a um alias *que é para utilizar com o cy.wait
        // esperar com cy.wait e fazer uma validação

        //POST = Método
        // ** é como se fosse um coringa, pois não sabemos qual servidor ele está fazendo a requisição
        // alias (as) é uma variável temporária, basicamente ela vai salvar a rota especificada como um alias para usar posteriormente
        // Sempre passar o cy.server e o cy.route antes da ação que dispara a chamada http
        
        //cy.server();
        cy.route('POST','**/ongs').as('postOng');

        cy.get('[data-cy=submit]').click();
        // .wait consegue esperar até a chamada ser finalizada
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
         // validar a resposta
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })


    });

    it('deve poder realizar um login no sistema', () => {
         
        const createOngId = Cypress.env('createdOngId');

        cy.log(createOngId);

        cy.visit('http://localhost:3000/');
        cy.get('input').type(createOngId);
        cy.get('.button').click();
    });
});