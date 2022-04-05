# Stopwatch.js

스탑워치 라이브러리

## getting started

```js

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

<script>

```

## sample - sample/index.html
- https://zzinpan.github.io/Stopwatch/sample/
- 시작: 오른쪽 버튼 클릭
- 종료: 오른쪽 버튼 클릭
- 일시정지: 왼쪽 버튼 클릭 ( 시작중에만 가능 )
- 알람: 작은 침 드래그
- 알람종료: 스탑워치 클릭

## document
https://zzinpan.github.io/Stopwatch/docs/