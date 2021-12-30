describe('Edit task items', () => {
  const todoItem = 'first todo item';

  beforeEach(() => {
    if (Cypress.env('scene') === 'e2e') {
      /**
       * reset mysql 数据
       * 该命令用来初始化数据，测试的时候连的是 后端server，启用下面这条命令，
       * 提交代码前请确保启用该条命令
       */
      cy.exec(
        'mysql -h127.0.0.1 -uroot -pp@ssword -P13306 -e "USE todoapp;TRUNCATE TABLE tasks;" >/dev/null 2>&1'
      );
    } else {
      /**
       * reset json-server 数据
       * 该命令用来初始化数据，测试的时候连的是 json-server，启用下面这条命令，
       */
      cy.exec('cat json-server/test.json > json-server/api.json');
    }

    cy.visit('/');

    cy.get('#todo-input').clear().type(todoItem).next().click();
  });

  it('should update item as input', () => {
    // given
    const updateItem = 'updated todo item';

    // when
    cy.contains(todoItem).click();
    cy.get('#todo-lists li')
      .first()
      .children('.edit-input')
      .type(`${updateItem}{enter}`);

    // then
    cy.contains(updateItem);
  });
});
