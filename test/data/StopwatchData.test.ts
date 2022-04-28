import StopwatchData from "../../src/data/StopwatchData";

const data = new StopwatchData();

test(`[ts] Create StopwatchData instance`, () => {
    
    expect( data instanceof StopwatchData ).toBeTruthy();
    expect( Object.getPrototypeOf( data ) ).toBe( StopwatchData.prototype );

});

test(`[ts] Stopwatch Basic Attribute Verification`, () => {
    
    expect( data.startTime ).toBeNull();
    expect( data.elapsedTime ).toBeNull();
    expect( data.frameTime ).toBeNull();
    expect( data.paused ).toBeFalsy();
    expect( data.rafId ).toBeNull();
    expect( data.event instanceof Object ).toBeTruthy();
    expect( data.event.update instanceof Array ).toBeTruthy();
    expect( data.event.update.length ).toBe( 0 );
    expect( data.event.alarm instanceof Array ).toBeTruthy();
    expect( data.event.alarm.length ).toBe( 0 );
    expect( data.alarms instanceof Array ).toBeTruthy();
    expect( data.alarms.length ).toBe( 0 );
    expect( data.completeAlarms instanceof Array ).toBeTruthy();
    expect( data.completeAlarms.length ).toBe( 0 );

});

