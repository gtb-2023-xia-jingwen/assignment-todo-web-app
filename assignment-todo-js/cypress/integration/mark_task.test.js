describe('Mark task items', () => {
  const todoItem = 'first todo item';

  beforeEach(() => {
    if (Cypress.env('scene') === 'e2e') {
      /**
       * reset mysql 数据
       * 该命令用来初始化数据，测试的时候连的是 后端server，启用下面这条命令，
       * 提交代码前请确保启用该条命令
       */
      cy.exec(
        'mysql -h127.0.0.1 -uroot -pp@ssword -P13306 -e "USE todoapp;TRUNCATE TABLE tasks;"'
      );
    } else {
      /**
       * reset json-server 数据
       * 该命令用来初始化数据，测试的时候连的是 json-server，启用下面这条命令，
       */
      cy.writeFile('json-server/api.json', { tasks: [] });
    }

    cy.visit('/');

    cy.get('#todo-input').clear().type(todoItem).next().click();
  });

  it('should mark item as completed', () => {
    // given

    // when
    cy.get('#todo-lists li').first().children('.input-checkbox').click();

    // then
    cy.get('#todo-lists li').should('have.length', 0);
    cy.get('#completed-lists li').should('have.length', 1);
  });

  it('should uncheck item to active', () => {
    // given

    // when
    cy.get('#todo-lists li').first().children('.input-checkbox').click();
    cy.get('#completed-lists li').first().children('.input-checkbox').click();

    // then
    cy.get('#todo-lists li').should('have.length', 1);
    cy.get('#completed-lists li').should('have.length', 0);
  });
});
