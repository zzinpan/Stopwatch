const Fn = {
 
  wait( waitTime = 500 ){

    cy.wait( waitTime );

    return this;

  },

  rightButton(){

    cy.get( "#right-button" ).click();

    return this;

  },

  leftButton(){

    cy.get( "#left-button" ).click();

    return this;

  },

  setAlarm( ms ){

    const rect = Cypress.$("#hand-circle").get(0).getBoundingClientRect();
    const x = ( rect.left + rect.right ) / 2;
    const y = ( rect.top + rect.bottom ) / 2;

    const degree = 360 * ms / 1000 / 60;

    // 삼각함수 범위: 0 < @ <= Math.PI

    cy.get("#hand-alarm").trigger( "mousedown", { button: 0, force: true } );
    cy.get("body").trigger( "mousemove", { pageX: x + 100, pageY: y - ( Math.tan( -( Math.PI / 180 * degree ) - Math.PI / 2 ) * 100 ), force: true } );
    cy.get("body").trigger( "mouseup", { button: 0, force: true } );

    return this;

  },

  stopAlarm(){

    cy.get("#stopwatch").click( { force: true } );

    return this;

  }

};

[
  "sample/index.html",
  //  "sample/index-esm.html",
  // "sample/index-amd.html",
  // "sample/index-umd.html"
].forEach( ( html ) => {


  describe( html, () => {
  
    beforeEach(() => {
  
      cy.visit( html );
  
    });
  
    it( "start -> stop -> start", () => {
  
      Fn.rightButton()
        .wait()
        .rightButton()
        .wait()
        .rightButton();
      
    });
  
    it( "start -> pause -> start -> stop", () => {
  
      Fn.rightButton()
        .wait()
        .leftButton()
        .wait()
        .leftButton()
        .wait()
        .rightButton();
      
    });
  
    it( "start -> pause -> stop", () => {
  
      Fn.rightButton()
        .wait()
        .leftButton()
        .wait()
        .rightButton();
      
    });
  
    it( "alarm.set -> start -> alarm -> alarm.stop -> stop", () => {
  
      const alarmTime = 1000;

      Fn.setAlarm( alarmTime )
        .rightButton()
        .wait( alarmTime + 100 )
        .stopAlarm()
        .rightButton();
      
    });
  
    it( "alarm.set -> start -> pause -> start -> alarm -> alarm.stop -> stop", () => {
  
      const alarmTime = 1000;

      Fn.setAlarm( alarmTime )
        .rightButton()
        .wait( alarmTime / 2 )
        .leftButton()
        .wait()
        .leftButton()
        .wait( alarmTime / 2 + 100 )
        .stopAlarm()
        .rightButton();
      
    });
  
    it( "start -> alarm.set -> alarm -> alarm.stop -> stop", () => {
  
      const alarmTime = 1000;

      Fn.rightButton()
        .setAlarm( alarmTime )
        .wait( alarmTime + 100 )
        .stopAlarm()
        .rightButton();
      
    });
  
    it( "start -> ( alarm.set -> alarm -> alarm.stop ) x2 -> stop", () => {
  
      const alarmTime = 1000;

      Fn.rightButton()
        .setAlarm( alarmTime )
        .wait( alarmTime + 100 )
        .stopAlarm()
        .setAlarm( alarmTime * 2 )
        .wait( alarmTime )
        .stopAlarm()
        .rightButton();
      
    });
  

  }); // end - describe


} ); // end - forEach