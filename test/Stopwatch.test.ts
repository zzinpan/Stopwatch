import TestModule from "./TestModule";

const waitingTime: number = 500;


TestModule.Modules.forEach( ( testModule ) => {


    // Different constructors per module
    const Stopwatch = testModule.Stopwatch;

    
    test(`[${testModule.id}] new insatnce`, () => {
    
        const stopwatch = new Stopwatch();
        expect( stopwatch instanceof Stopwatch ).toBeTruthy();
        expect( Object.getPrototypeOf( stopwatch ) ).toBe( Stopwatch.prototype );
    
    });

    test(`[${testModule.id}] stopwatch.on("update")`, () => {

        const stopwatch = new Stopwatch();
        expect( stopwatch.on( "update", () => {} ) ).toBeTruthy();

    });

    test(`[${testModule.id}] stopwatch.on("alarm")`, () => {

        const stopwatch = new Stopwatch();
        expect( stopwatch.on( "alarm", () => {} ) ).toBeTruthy();

    });

    test(`[${testModule.id}] stopwatch.on("tick")`, () => {

        const stopwatch = new Stopwatch();
        expect( stopwatch.on( "tick", () => {} ) ).toBeTruthy();

    });

    
    test(`[${testModule.id}] start -> destroy`, () => {
        
        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {
    
            stopwatch.start();
            setTimeout( () => {
    
                resolve( stopwatch );
    
            }, waitingTime );
    
        }).then( () => {
    
            expect( stopwatch.destroy() ).toBeTruthy();
    
        } );
    
    });


    test(`[${testModule.id}] start -> pause -> get -> destroy`, () => {

        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {

            stopwatch.start();
            setTimeout( () => {

                resolve( stopwatch );

            }, waitingTime / 2 );

        }).then( () => {

            expect( stopwatch.pause() ).toBeTruthy();

            return new Promise(( resolve, reject ) => {

                setTimeout( () => {

                    resolve( stopwatch );

                }, waitingTime / 2 );

            });

        } ).then( () => {

            const elapsed = stopwatch.get();
            expect( ( waitingTime / 2 - waitingTime / 10 ) < elapsed && elapsed < ( waitingTime / 2 + waitingTime / 10 ) ).toBeTruthy();
            expect( stopwatch.destroy() ).toBeTruthy();

        } );

    });


    test(`[${testModule.id}] start -> stop`, () => {

        const stopwatch = new Stopwatch();
        return new Promise(( resolve, reject ) => {

            stopwatch.start();
            setTimeout( () => {

                resolve( stopwatch );

            }, waitingTime );

        }).then( () => {

            expect( stopwatch.stop() ).toBeTruthy();

        } );

    });


    test(`[${testModule.id}] start -> update -> stop`, () => {

        let updated = false;
        const stopwatch = new Stopwatch();
        stopwatch.on( "update", () => {
            updated = true;
        } );

        expect( updated ).toBeFalsy();

        return new Promise(( resolve, reject ) => {

            stopwatch.start();
            setTimeout( () => {

                resolve( stopwatch );

            }, waitingTime );

        }).then( () => {

            stopwatch.stop();
            expect( updated ).toBeTruthy();

        } );

    });

    test(`[${testModule.id}] start -> tick -> stop`, () => {

        let updated = false;
        const stopwatch = new Stopwatch();
        stopwatch.on( "tick", () => {
            updated = true;
        } );

        expect( updated ).toBeFalsy();

        return new Promise(( resolve, reject ) => {

            stopwatch.start();
            setTimeout( () => {

                resolve( stopwatch );

            }, waitingTime );

        }).then( () => {

            stopwatch.stop();
            expect( updated ).toBeTruthy();

        } );

    });


} );