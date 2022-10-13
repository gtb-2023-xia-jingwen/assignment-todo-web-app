describe('Render task list', () => {
  const inputTasks = ['task 01', 'task 02'];

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

    inputTasks.forEach((i) => {
      cy.get('#todo-input').clear().type(` ${i}`).next().click();
    });
  });

  it('should render todo task list initially', () => {
    cy.get('#todo-lists li').should('have.length', 2);
    cy.get('#todo-lists li')
      .first()
      .children('input')
      .should('have.attr', 'type', 'checkbox')
      .next()
      .contains(inputTasks[1]);
  });
});
