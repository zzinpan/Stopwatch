import Data from "../../src/data/Data";
import TestModule from "../TestModule";

TestModule.Modules.forEach( ( testModule ) => {

    test(`[${testModule.id}] create instance`, () => {
        
        const data = new Data( testModule.Stopwatch );
        expect( data instanceof Data ).toBe( true );
    
    });

    test(`[${testModule.id}] create instance`, () => {
        
        const data = new Data( testModule.Stopwatch );
        expect( data instanceof Data ).toBe( true );
    
    });

});
