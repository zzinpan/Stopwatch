import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
// import { RollupFileOptions } from "rollup";
// import fs from 'fs';


// function getDirNames( dirName, dirNames ){

//     const subDirNames = fs.readdirSync( dirName );
//     subDirNames.forEach(( subFileName ) => {

//         const subDirName = dirName + "/" + subFileName;
//         const isDirectory = fs.lstatSync( subDirName ).isDirectory();
//         if( isDirectory === true ){

//             dirNames.concat( getDirNames( subDirName, dirNames ) );
//             return;

//         }

//         dirNames.push( subDirName );

//     });
    

//     return dirNames;

// }

// const dirNames = getDirNames( "./src", [] );


// console.log( dirNames );

class RollupOption {

    constructor( outFileName, outFormat ){

        this.input = "./src/Stopwatch.ts";
        this.output = {
            file: `./dist/${outFormat}/${outFileName}`,
            name: 'Stopwatch',
            format: outFormat
        };
        this.plugins = [];

    }

    addPlugin( plugins ){

        this.plugins.push( plugins );
        return this;

    }

}

const Plugin = {

    typescript: typescript({

        tsconfig: './tsconfig.json',
        sourceMap: true
    
    }),

    terser: terser()

};

const Modules = [
    "esm", "cjs", "iife", "amd", "umd"
];

export default Modules.reduce( ( rollupOptions, module ) => {

    rollupOptions.push( 
        new RollupOption( "Stopwatch.js", module )
                .addPlugin( Plugin.typescript )
    );

    rollupOptions.push( 
        new RollupOption( "Stopwatch.min.js", module )
                .addPlugin( Plugin.typescript )
                .addPlugin( Plugin.terser )
    );

    return rollupOptions;

}, [] );
