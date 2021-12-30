describe('Render task list', () => {
  const mockData = [
    {
      name: 'task01',
      completed: false,
      id: 1,
    },
    {
      name: 'task02',
      completed: false,
      id: 2,
    },
    {
      name: 'task03',
      completed: true,
      id: 3,
    },
  ];

  beforeEach(() => {
    cy.intercept('GET', Cypress.env('API'), {
      statusCode: 200,
      body: mockData,
    });
    cy.visit('/');
  });

  it('should render todo task list initially', () => {
    cy.get('#todo-lists li').should('have.length', 2);
    cy.get('#todo-lists li')
      .first()
      .children('input')
      .should('have.attr', 'type', 'checkbox')
      .next()
      .contains(mockData[1].name);
  });

  it('should render completed task list initially', () => {
    cy.get('#completed-lists li').should('have.length', 1);
    cy.get('#completed-lists li')
      .first()
      .children('input')
      .should('have.attr', 'type', 'checkbox')
      .next()
      .contains(mockData[2].name);
  });
});
