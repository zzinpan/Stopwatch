class TestModule {

    id: string;
    Stopwatch: any;

    static Modules: TestModule[];

    constructor( id: string, src: string ){

        this.id = id;
        this.Stopwatch = require( src );

    }

}

TestModule.Modules = [

    new TestModule( "cjs", "../dist/cjs/Stopwatch.js" ),
    new TestModule( "cjs.min", "../dist/cjs/Stopwatch.min.js" ),
    new TestModule( "umd", "../dist/umd/Stopwatch.js" ),
    new TestModule( "umd.min", "../dist/umd/Stopwatch.min.js" )

];

export default TestModule;