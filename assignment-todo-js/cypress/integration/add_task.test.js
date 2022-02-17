describe('Add task items', () => {
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
      cy.exec('node reset.js');
    }

    cy.visit('/');
  });

  it('should render empty TODO list initially', () => {
    cy.get('#todo-lists').children().should('have.length', 0);
    cy.get('#completed-lists').children().should('have.length', 0);
  });

  it('should input todo', () => {
    // given
    const todoItem = 'some todo item';

    // when
    cy.get('#todo-input').clear().type(todoItem);

    // then
    cy.get('#todo-input').should('have.value', todoItem);
  });

  it('should show error for blank input', () => {
    // given
    const blankTodoItem = '\t  \t ';

    // when
    cy.get('#todo-input').clear().type(blankTodoItem).next().click();

    // then
    cy.contains('Please input something first.').should('have.length', 1);
    cy.get('#todo-lists').children().should('have.length', 0);
  });

  it('should add item to list', () => {
    // given
    const todoItem = 'new task item';

    // when
    cy.get('#todo-input').clear().type(todoItem).next().click();

    // then
    cy.get('#todo-lists li').should('have.length', 1);
    cy.get('#todo-lists li')
      .first()
      .children('input')
      .should('have.attr', 'type', 'checkbox')
      .next()
      .contains(todoItem);
  });

  it('should add multiple items to list', () => {
    // given
    const inputTasks = ['task 01', 'task 02', 'task 03'];

    // when
    inputTasks.forEach((i) => {
      cy.get('#todo-input').clear().type(` ${i}`).next().click();
    });

    // then
    cy.get('#todo-lists li').should('have.length', inputTasks.length);

    cy.get('#todo-lists li')
      .first()
      .children('input')
      .should('have.attr', 'type', 'checkbox')
      .next()
      .contains(inputTasks[2]);
  });
});
