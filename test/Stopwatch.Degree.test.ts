import TestModule from "./TestModule";


TestModule.Modules.forEach( ( testModule ) => {


    // Different constructors per module
    const Stopwatch = testModule.Stopwatch;


    test(`[${testModule.id}] Stopwatch.Degree.normalize`, () => {
    
        
        let degree: any = 452.1234;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 92.1234 );

        degree = 834.7752;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 114.77520000000004 );

        degree = -12;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 348 );

        degree = -5000.1;
        expect( Stopwatch.Degree.normalize( degree ) ).toBe( 39.899999999999636 );

        degree = NaN;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        // ?
        degree = Infinity;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        // ?
        degree = -Infinity;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = true;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = false;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = "string?";
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();
        
        degree = "";
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = {};
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = () => {};
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = undefined;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

        degree = null;
        expect( Stopwatch.Degree.normalize( degree ) ).toBeNaN();

    
    });

    test(`[${testModule.id}] Stopwatch.Degree.toRadian`, () => {
    

        let degree: any = 0;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( 0 );

        degree = 90;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Math.PI / 2 );

        degree = 180;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Math.PI );

        degree = 270;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Math.PI / 2 * 3 );

        degree = 360;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Math.PI * 2 );

        degree = -270;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( -Math.PI / 2 * 3 );

        degree = -360;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( -Math.PI * 2 );

        degree = Infinity;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Infinity );

        degree = -Infinity;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( -Infinity );

        degree = true;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( Math.PI / 180 );

        degree = false;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( 0 );

        degree = "string?";
        expect( Stopwatch.Degree.toRadian( degree ) ).toBeNaN();
        
        degree = "";
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( 0 );

        degree = {};
        expect( Stopwatch.Degree.toRadian( degree ) ).toBeNaN();

        degree = () => {};
        expect( Stopwatch.Degree.toRadian( degree ) ).toBeNaN();

        degree = undefined;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBeNaN();

        degree = null;
        expect( Stopwatch.Degree.toRadian( degree ) ).toBe( 0 );

    
    });

} );