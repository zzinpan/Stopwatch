# Stopwatch.js

[![build](https://github.com/zzinpan/Stopwatch.js/workflows/build/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/build.yml)
[![test](https://github.com/zzinpan/Stopwatch.js/workflows/test/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/test.yml)
[![documentation](https://github.com/zzinpan/Stopwatch.js/workflows/documentation/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/documentation.yml)
[![publish](https://github.com/zzinpan/Stopwatch.js/workflows/publish/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/publish.yml)
[![pages-build-deployment](https://github.com/zzinpan/Stopwatch.js/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/zzinpan/Stopwatch.js/actions/workflows/pages/pages-build-deployment)

Stopwatch.js is a JavaScript-based stopwatch library.  
Lightweight, easy to use,  
Available in browsers, ESM, CJS, AMD, and UMD.  

<br>

## Installation

`Note`: Please enter a value of {version} in the import path.

<br>

#### Browser
```html
<script type="javascript" src="https://cdn.jsdelivr.net/npm/@zzinpan/stopwatch.js@{version}/dist/iife/Stopwatch.min.js"></script>
```

<br>

#### Browser - ECMAScript Module
```html
<script type="module">
import Stopwatch from "https://cdn.jsdelivr.net/npm/@zzinpan/stopwatch.js@{version}/dist/esm/Stopwatch.min.js";

// ...
</script>
```

<br>

#### Node.js
```shell
# Installation
npm install @zzinpan/stopwatch.js
```
```javascript
const Stopwatch = require( "@zzinpan/stopwatch.js" );

// ...
```

<br>

## getting started 

```javascript
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

If you want to use a simple stopwatch:  
https://zzinpan.github.io/Stopwatch.js/docs/classes/Stopwatch.default.html
<br>

If you want to create a custom AlarmType:  
https://zzinpan.github.io/Stopwatch.js/docs/classes/Stopwatch_AlarmType.default.html
<br>

If you are curious about the full code:  
https://zzinpan.github.io/Stopwatch.js/docs/

If you want to see a test coverage:  
https://zzinpan.github.io/Stopwatch.js/coverage/lcov-report/index.html

<br>

---

Thanks for using it!

<br>
