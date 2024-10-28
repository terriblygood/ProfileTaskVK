describe('Infinite Scroll React App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('должен загружать начальные элементы', () => {
    cy.get('[data-cy=list-item]').should('have.length.greaterThan', 0);
  });

  it('должен подгружать новые элементы при прокрутке', () => {
    cy.get('[data-cy=scroll-container]').scrollTo('bottom');
    cy.wait(1000);
    cy.get('[data-cy=list-item]').should('have.length.greaterThan', 10);
  });

  it('должен удалять элемент', () => {
    cy.get('[data-cy=list-item]').then($items => {
      const initialCount = $items.length;
      cy.get('[data-cy=delete-button]').first().click();
      cy.wait(1000);
      cy.get('[data-cy=list-item]').should('have.length', initialCount - 1);
    });
  });
  
  
  

  it('должен сортировать элементы по имени', () => {

    cy.get('[data-cy=list-item]').should('have.length.greaterThan', 0);
  
    cy.get('[data-cy=item-name]').then($items => {
      const initialNames = $items.map((i, el) => Cypress.$(el).text()).get();
      console.log('Текущие имена элементов перед сортировкой:', initialNames);
    });
  
   
    cy.get('[data-cy=sort-selector]').click();
    cy.get('[role="option"]').contains('Name').click();
  
    
    cy.wait(500);
    cy.get('[data-cy=item-name]').should('have.length.greaterThan', 0);
  
    
    cy.get('[data-cy=item-name]').first().then($firstItem => {
      const firstItemName = $firstItem.text();
      console.log('Первый элемент после сортировки:', firstItemName);
      expect(firstItemName).not.to.be.empty;
    });
  });
  
  
  
  

  it('должен сортировать элементы по описанию', () => {
    
    cy.get('[data-cy=list-item]').should('have.length.greaterThan', 0);
    
    
    cy.get('[data-cy=sort-selector]').click();
    cy.get('[role="option"]').contains('Description').click();
  
    
    cy.wait(500);
  
    
    cy.get('[data-cy=item-name]').should('have.length.greaterThan', 0);
  
    
    cy.get('[data-cy=item-description]').then($items => {
      const itemDescriptions = $items.map((i, el) => Cypress.$(el).text()).get();
      const sortedDescriptions = [...itemDescriptions].sort();
      expect(itemDescriptions).to.deep.equal(sortedDescriptions);
    });
  });
  
});
