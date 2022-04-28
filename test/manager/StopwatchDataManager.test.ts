import TestModule from "../TestModule";
import StopwatchDataManager from "../../src/manager/StopwatchDataManager";
import StopwatchData from "../../src/data/StopwatchData";

const manager = new StopwatchDataManager();

test(`[ts] Create StopwatchDataManager instance`, () => {
    
    expect( manager instanceof StopwatchDataManager ).toBeTruthy();
    expect( Object.getPrototypeOf( manager ) ).toBe( StopwatchDataManager.prototype );

});

test(`[ts] StopwatchDataManager Basic Attribute Verification`, () => {
    
    expect( manager.map instanceof Map ).toBeTruthy();
    expect( manager.map.size ).toBe( 0 );

});



TestModule.Modules.forEach( ( testModule ) => {

    const manager = new StopwatchDataManager();

    // Different constructors per module
    const Stopwatch = testModule.Stopwatch;

    const stopwatch1 = new Stopwatch();
    const stopwatchData1 = new StopwatchData();

    const stopwatch2 = new Stopwatch();
    const stopwatchData2 = new StopwatchData();

    test(`[${testModule.id}] StopwatchDataManager.prototype.put`, () => {
    

        // nodata
        expect( manager.size() ).toBe( 0 );

        // add first data
        expect( manager.put( stopwatch1, stopwatchData1 ) ).toBe( manager );
        expect( manager.size() ).toBe( 1 );

        // change data
        expect( manager.put( stopwatch1, null ) ).toBe( manager );
        expect( manager.size() ).toBe( 1 );

        // change data
        expect( manager.put( stopwatch1, stopwatchData1 ) ).toBe( manager );
        expect( manager.size() ).toBe( 1 );
        
        // add second data
        expect( manager.put( stopwatch2, stopwatchData2 ) ).toBe( manager );
        expect( manager.size() ).toBe( 2 );
    
    });


    test(`[${testModule.id}] StopwatchDataManager.prototype.get`, () => {
    
        // get null data
        expect( manager.get( new Stopwatch() ) ).toBeUndefined();

        // get first data
        expect( manager.get( stopwatch1 ) ).toBe( stopwatchData1 );

        // get second data
        expect( manager.get( stopwatch2 ) ).toBe( stopwatchData2 );

    });


    test(`[${testModule.id}] StopwatchDataManager.prototype.remove`, () => {
    
        // has two data
        expect( manager.size() ).toBe( 2 );

        // remove first data
        expect( manager.remove( stopwatch1 ) ).toBeTruthy();
        expect( manager.size() ).toBe( 1 );

        // remove null data
        expect( manager.remove( stopwatch1 ) ).toBeFalsy();
        expect( manager.size() ).toBe( 1 );

        // remove second data
        expect( manager.remove( stopwatch2 ) ).toBeTruthy();
        expect( manager.size() ).toBe( 0 );

    });

});