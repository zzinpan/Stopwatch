import StopwatchData from "../../src/data/StopwatchData";
import TestModule from "../TestModule";

TestModule.Modules.forEach( ( testModule ) => {

    test(`[${testModule.id}] create instance`, () => {
        
        const data = new StopwatchData();
        expect( data instanceof StopwatchData ).toBe( true );
    
    });

    test(`[${testModule.id}] create instance`, () => {
        
        const data = new StopwatchData();
        expect( data instanceof StopwatchData ).toBe( true );
    
    });

});
