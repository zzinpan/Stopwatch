const Fn = {
 
  wait( waitTime = 500 ){

    cy.wait( waitTime );

  },

  rightButton(){

    cy.get( "#right-button" ).click();

  },

  leftButton(){

    cy.get( "#left-button" ).click();

  },

  setAlarm( degree ){

    const rect = Cypress.$("#hand-circle").get(0).getBoundingClientRect();
    const x = ( rect.left + rect.right ) / 2;
    const y = ( rect.top + rect.bottom ) / 2;

    // 삼각함수 범위: 0 < @ <= Math.PI

    cy.get("#hand-alarm").trigger( "mousedown", { button: 0, force: true } );
    cy.get("body").trigger( "mousemove", { pageX: x + 100, pageY: y - ( Math.tan( -( Math.PI / 180 * degree ) - Math.PI / 2 ) * 100 ), force: true } );
    cy.get("body").trigger( "mouseup", { button: 0, force: true } );

    return degree * 60 * 1000 / 360;

  },

  stopAlarm(){

    cy.get("#stopwatch").click( { force: true } );

  }

};

[
  "sample/index.html",
   "sample/index-esm.html",
  "sample/index-amd.html",
  // "sample/index-umd.html"
].forEach( ( html ) => {


  describe( html, () => {
  
    beforeEach(() => {
  
      cy.visit( html );
  
    });
  
    it( "start -> stop -> start", () => {
  
      Fn.rightButton();
      Fn.wait();
      Fn.rightButton();
      Fn.wait();
      Fn.rightButton();
      
    });
  
    it( "start -> pause -> start -> stop", () => {
  
      Fn.rightButton();
      Fn.wait();
      Fn.leftButton();
      Fn.wait();
      Fn.leftButton();
      Fn.wait();
      Fn.rightButton();
      
    });
  
    it( "start -> pause -> stop", () => {
  
      Fn.rightButton();
      Fn.wait();
      Fn.leftButton();
      Fn.wait();
      Fn.rightButton();
      
    });
  
    it( "alarm.set -> start -> alarm -> alarm.stop -> stop", () => {
  
      const alarmTime = Fn.setAlarm( 10 );
      Fn.rightButton();
      Fn.wait( alarmTime + 100 );
      Fn.stopAlarm();
      Fn.rightButton();
      
    });
    
  }); // end - describe


} ); // end - forEach