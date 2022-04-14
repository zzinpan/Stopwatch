import TestModule from "./TestModule";


TestModule.Modules.forEach( ( testModule ) => {


    // Stopwatch Costructor
    const Stopwatch = testModule.Stopwatch;


    test(`[${testModule.id}] new insatnce`, () => {
    
        const stopwatch = new Stopwatch();
        expect( stopwatch instanceof Stopwatch ).toBe( true );
        expect( Object.getPrototypeOf( stopwatch ) ).toBe( Stopwatch.prototype );
    
    });

    
    test(`[${testModule.id}] start -> destroy`, () => {
        
        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {
    
            stopwatch.start();
            setTimeout( () => {
    
                resolve( stopwatch );
    
            }, 1000 );
    
        }).then( () => {
    
            expect( stopwatch.destroy() ).toBe( true );
    
        } );
    
    });

    
    test(`[${testModule.id}] start -> pause -> get -> destroy`, () => {
        
        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {
    
            stopwatch.start();
            setTimeout( () => {
    
                resolve( stopwatch );
    
            }, 500 );
    
        }).then( () => {
    
            expect( stopwatch.pause() ).toBe( true );
    
            return new Promise(( resolve, reject ) => {

                setTimeout( () => {

                    resolve( stopwatch );

                }, 500 );

            });

        } ).then( () => {

            const elapsed = stopwatch.get();
            expect( 400 < elapsed && elapsed < 600 ).toBe( true );
            expect( stopwatch.destroy() ).toBe( true );

        } );
    
    });
    

    test(`[${testModule.id}] start -> stop`, () => {
        
        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {
    
            stopwatch.start();
            setTimeout( () => {
    
                resolve( stopwatch );
    
            }, 1000 );
    
        }).then( () => {
    
            expect( stopwatch.stop() ).toBe( true );
    
        } );
    
    });


} );