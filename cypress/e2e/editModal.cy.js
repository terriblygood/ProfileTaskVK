describe('Edit Modal Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('должен открываться при нажатии кнопки редактирования', () => {
      cy.get('[data-cy=edit-button]').first().click();
      cy.get('[data-cy=input-name]').should('be.visible');
    });
  
    it('должен сохранять изменения и найти элемент по новому имени', () => {
        const index = 0;
        const newName = 'New Name';
        const newDescription = 'New Description';

        cy.get('[data-cy=edit-button]').eq(index).click();
        cy.get('[data-cy=input-name]').as('nameInput');
        cy.get('[data-cy=input-description]').as('descriptionInput');
        
        
        cy.get('[data-cy=input-name]').clear().then(() => {
            cy.get('[data-cy=input-name]').type(newName);
        });
        
        
        cy.get('[data-cy=input-description]').clear().then(() => {
            cy.get('[data-cy=input-description]').type(newDescription);
        });
    
        
        cy.get('[data-cy=button-save]').click(); 
        cy.wait(1000);
        cy.get('[data-cy=input-search]').clear().type(newName); 
        cy.get('[data-cy=list-item]').find('[data-cy=item-name]').should('contain', newName); 
    });
    
    it('должен закрываться при нажатии кнопки отмены', () => {
      cy.get('[data-cy=edit-button]').first().click();
      cy.get('[data-cy=button-cancel]').click();
      cy.get('[data-cy=input-name]').should('not.exist');
  });
})