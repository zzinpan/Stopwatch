class Module {

    type;
    Stopwatch;

    constructor( type ){

        this.type = type;
        this.Stopwatch = require( `../dist/${type}/Stopwatch.js` );

    }

}

[

    new Module( "cjs" ),
    new Module( "umd" )

].forEach( ( module ) => {


    // Stopwatch Costructor
    const Stopwatch = module.Stopwatch;


    test(`[${module.type}] new insatnce`, () => {
    
        const stopwatch = new Stopwatch();
        expect( stopwatch instanceof Stopwatch ).toBe( true );
        expect( Object.getPrototypeOf( stopwatch ) ).toBe( Stopwatch.prototype );
    
    });

    
    test(`[${module.type}] start -> destroy`, () => {
        
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

    
    test(`[${module.type}] start -> pause -> get -> destroy`, () => {
        
        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {
    
            stopwatch.start();
            setTimeout( () => {
    
                resolve();
    
            }, 500 );
    
        }).then( () => {
    
            expect( stopwatch.pause() ).toBe( true );
    
            return new Promise(( resolve, reject ) => {

                setTimeout( () => {

                    resolve();

                }, 500 );

            });

        } ).then( () => {

            const elapsed = stopwatch.get();
            expect( 400 < elapsed && elapsed < 600 ).toBe( true );
            expect( stopwatch.destroy() ).toBe( true );

        } );
    
    });
    

    test(`[${module.type}] start -> stop`, () => {
        
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