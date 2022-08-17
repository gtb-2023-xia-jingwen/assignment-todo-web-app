describe('Render task list', () => {
  const inputTasks = ['task 01', 'task 02'];

  beforeEach(() => {
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
