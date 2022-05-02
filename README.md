# Stopwatch.js

[![build](https://github.com/zzinpan/Stopwatch.js/workflows/build/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/build.yml)
[![test](https://github.com/zzinpan/Stopwatch.js/workflows/test/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/test.yml)
[![documentation](https://github.com/zzinpan/Stopwatch.js/workflows/documentation/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/documentation.yml)
[![bump-version](https://github.com/zzinpan/Stopwatch.js/workflows/bump-version/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/bump-version.yml)
[![pages-build-deployment](https://github.com/zzinpan/Stopwatch.js/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/pages/pages-build-deployment)

Stopwatch.js is a JavaScript-based stopwatch library.  
Lightweight, easy to use,  
Available in browsers, ESM, CJS, AMD, and UMD.  

<br>

## getting started 

```html

<script type="module">

import Stopwatch from "Stopwatch.js";

// create api
const stopwatch = new Stopwatch();

// add events
stopwatch.on( "update", ( time ) => console.log( time ) );
stopwatch.on( "alarm", ( time ) => alert( time ) );

// set alarm
stopwatch.setAlarm( 5000, Stopwatch.AlarmType.ABSOLUTE );

// start
stopwatch.start();

</script>

```

<br>

## Sample - browser

<br>

![https://zzinpan.github.io/Stopwatch.js/sample/img/thumbnail.png](https://zzinpan.github.io/Stopwatch.js/sample/img/thumbnail.png)

<br>

The same features are implemented in IIFE, ESM, AMD, and UMD respectively.  

- __start__: click the right button 
- __stop__: click the right button ( toggle )
- __pause__: click the left button ( during the start )
- __setAlarm__: drag the small hand
- __stopAlarm__: click the stopwatch

https://zzinpan.github.io/Stopwatch.js/sample/index.html  
https://zzinpan.github.io/Stopwatch.js/sample/index-esm.html  
https://zzinpan.github.io/Stopwatch.js/sample/index-amd.html  
https://zzinpan.github.io/Stopwatch.js/sample/index-umd.html

<br>

## document
https://zzinpan.github.io/Stopwatch.js/docs/

<br>
