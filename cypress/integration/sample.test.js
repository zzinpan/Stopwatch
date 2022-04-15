describe( "sample/index.html", () => {
  
  const waitTime = 1000;

  beforeEach(() => {

    cy.visit( "/sample/index.html" );

  });

  it( "start -> stop -> start", () => {

    cy.get( "#right-button" ).click();
    cy.wait( waitTime );
    cy.get( "#right-button" ).click();
    cy.wait( waitTime );
    cy.get( "#right-button" ).click();
    
  });

  it( "start -> pause -> start", () => {

    cy.get( "#right-button" ).click();
    cy.wait( waitTime );
    cy.get( "#left-button" ).click();
    cy.wait( waitTime );
    cy.get( "#left-button" ).click();
    
  });

  it( "start -> pause -> stop", () => {

    cy.get( "#right-button" ).click();
    cy.wait( waitTime );
    cy.get( "#left-button" ).click();
    cy.wait( waitTime );
    cy.get( "#right-button" ).click();
    
  });

  it( "setAlarm", () => {

    Cypress.$("#hand-alarm").get(0).dispatchEvent( new MouseEvent( "mousedown", { button: 0 } ) );
    Cypress.$("body").get(0).dispatchEvent( new MouseEvent( "mousemove", { pageX: 0, pageY: 0 } ) );
    Cypress.$("body").get(0).dispatchEvent( new MouseEvent( "mouseup", { button: 0 } ) );
    
  });
  
});