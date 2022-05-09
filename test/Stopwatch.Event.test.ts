import TestModule from "./TestModule";


TestModule.Modules.forEach( ( testModule ) => {


    // Different constructors per module
    const Stopwatch = testModule.Stopwatch;


    test(`[${testModule.id}] Stopwatch.Event`, () => {

        const events = Object.keys( Stopwatch.Event );
        expect( events.includes( "Update" ) ).toBeTruthy();
        expect( events.includes( "Tick" ) ).toBeTruthy();
        expect( events.includes( "Alarm" ) ).toBeTruthy();
        expect( events.includes( "getSynonym" ) ).toBeFalsy();
        expect( events.includes( "getSynonyms" ) ).toBeFalsy();

        expect( Stopwatch.Event.Update ).toBe( "update" );
        expect( Stopwatch.Event.Tick ).toBe( "tick" );
        expect( Stopwatch.Event.Alarm ).toBe( "alarm" );

    });


    test(`[${testModule.id}] Stopwatch.Event.getSynonym`, () => {

        const synonymByUpdate: string[] = Stopwatch.Event.getSynonym( Stopwatch.Event.Update );
        const synonymByUpdate2: string[] = Stopwatch.Event.getSynonym( Stopwatch.Event.Update );
        const synonymByTick = Stopwatch.Event.getSynonym( Stopwatch.Event.Tick );
        const synonymByAlarm = Stopwatch.Event.getSynonym( Stopwatch.Event.Alarm );
        const synonymByAny = Stopwatch.Event.getSynonym( "any" );

        // no equals reference
        expect( synonymByUpdate === synonymByUpdate2 ).toBeFalsy();

        // deep copy true
        expect( JSON.stringify( synonymByUpdate ) ).toBe( JSON.stringify( synonymByUpdate2 ) );

        // Stopwatch.Event.Update synonym
        expect( synonymByUpdate.includes( Stopwatch.Event.Update ) ).toBeTruthy();
        expect( synonymByUpdate.includes( Stopwatch.Event.Tick ) ).toBeTruthy();
        expect( synonymByUpdate.includes( Stopwatch.Event.Alarm ) ).toBeFalsy();

        // Stopwatch.Event.Tick synonym
        expect( synonymByTick.includes( Stopwatch.Event.Update ) ).toBeTruthy();
        expect( synonymByTick.includes( Stopwatch.Event.Tick ) ).toBeTruthy();
        expect( synonymByTick.includes( Stopwatch.Event.Alarm ) ).toBeFalsy();

        // Stopwatch.Event.Alarm synonym
        expect( synonymByAlarm.includes( Stopwatch.Event.Update ) ).toBeFalsy();
        expect( synonymByAlarm.includes( Stopwatch.Event.Tick ) ).toBeFalsy();
        expect( synonymByAlarm.includes( Stopwatch.Event.Alarm ) ).toBeTruthy();

        // no event
        expect( synonymByAny.length ).toBe( 0 );
        expect( synonymByAny.includes( Stopwatch.Event.Update ) ).toBeFalsy();
        expect( synonymByAny.includes( Stopwatch.Event.Tick ) ).toBeFalsy();
        expect( synonymByAny.includes( Stopwatch.Event.Alarm ) ).toBeFalsy();

    });


    test(`[${testModule.id}] Stopwatch.Event.getSynonyms`, () => {

        const events = Object.keys( Stopwatch.Event );
        const synonyms: string[][] = Stopwatch.Event.getSynonyms();

        // Synonyms include all events.
        synonyms.every(( synonym ) => {

            synonym.every( ( event ) => {

                return events.includes( event );

            } );

        });

    });

} );