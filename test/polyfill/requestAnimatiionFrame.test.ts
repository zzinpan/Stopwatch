import { requestAnimationFrame, cancelAnimationFrame } from "../../src/polyfill/requestAnimatiionFrame";

// setTimeout return to Timeout type in node
// setTimeout return to Number type in browser
const Timeout = setTimeout(function(){}, 0).constructor;

let frameTime: number = null;
let rafId: any = null;

function testFrame( _frameTime: any ){

    frameTime = _frameTime;
    rafId = requestAnimationFrame( testFrame );

}

test(`[ts] requestAnimationFrame -> cancelAnimationFrame`, () => {
    
    // The pre-start value is a null.
    expect( rafId ).toBeNull();
    expect( frameTime ).toBeNull();

    rafId = requestAnimationFrame( testFrame );

    return new Promise( ( resolve, reject )=>{
        
        setTimeout( () => {
            
            resolve( null );

        }, 500 );

    } ).then( () => {

        // After start the value is number.
        cancelAnimationFrame( rafId );
        expect( rafId instanceof Timeout ).toBeTruthy();
        expect( typeof frameTime ).toBe( "number" );

        const expectValues = { rafId, frameTime };

        return new Promise( ( resolve, reject ) => {

            setTimeout( () => {
            
                resolve( expectValues );
    
            }, 500 );

        } )

    } ).then( ( expectValues: any ) => {

        // The values before and after cancellation are the same.
        expect( expectValues.rafId ).toBe( rafId );
        expect( expectValues.frameTime ).toBe( frameTime );

    } );

});