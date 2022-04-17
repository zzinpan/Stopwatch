import TestModule from "./TestModule";


TestModule.Modules.forEach( ( testModule ) => {


    // Different constructors per module
    const Stopwatch = testModule.Stopwatch;


    test(`[${testModule.id}] Stopwatch.Degree.normalize`, () => {
    
        let degree = 452.1234;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 92.1234 );

        degree = 834.7752;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 114.77520000000004 );

        degree = -12;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 348 );

        degree = -5000.1;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 39.899999999999636 );
    
    });

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