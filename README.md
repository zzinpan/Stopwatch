# Stopwatch.js

javascript stopwatch library.

<br>

## getting started

```html

<script type="module">

import Stopwatch from "Stopwatch.js";

// create api
const stopwatch = new Stopwatch();

// add events
stopwatch.on( "update", ( time ) => console.log( ( time ) );
stopwatch.on( "alarm", ( time ) => console.log( ( time ) );

// set alarm
stopwatch.setAlarm( 5000, Stopwatch.AlarmType.ABSOLUTE );

// start
stopwatch.start();

</script>

```

<br>

## sample - sample/index.html
https://zzinpan.github.io/Stopwatch.js/sample/
- start: click the right button 
- stop: click the right button ( toggle )
- pause: click the left button ( during the start )
- setAlarm: drag the small hand
- stopAlarm: click the stopwatch

<br>

## document
https://zzinpan.github.io/Stopwatch.js/docs/
