/**
 * import
 */
import Stopwatch from "../../dist/esm/Stopwatch.js";

// 스탑워치 API 객체
 const stopwatch = new Stopwatch();

// 오디오 객체
const audio = (() => {

    const audio = new Audio();
    audio.addEventListener( "timeupdate", () => {

        if( 2 < audio.currentTime ){
            audio.currentTime = 1;
        }
    
    } );
    audio.src = "./sound/alarm.mp3";
    
    return audio;

})();

// 스탑워치 전체 컨테이너 UI
const stopwatchUI = document.querySelector("#stopwatch");

// 스탑워치 왼쪽 버튼
const leftButton = document.querySelector("#left-button");

// 스탑워치 오른쪽 버튼
const rightButton = document.querySelector("#right-button");

// 스탑워치 초판
const timeBoard = document.querySelector("#time-board");

// 초 바늘 고정핀
const handCircle = document.querySelector("#hand-circle");

// 초 바늘
const hand = (() => {

    const hand = document.querySelector("#hand");
    hand.deg = 0;
    hand.update = ( deg ) => {
        
        hand.deg = deg;
        hand.style.transform = `translateX( -50% ) rotate( ${deg}deg )`;
        handCircle.style.transform = `translate( -50%, -50% ) rotate( ${deg}deg )`;

    };

    return hand;

})();

// 알람 바늘
const handAlarm = (() => {

    const handAlarm = document.querySelector("#hand-alarm");
    handAlarm.isDrag = false;
    handAlarm.deg = 105;

    return handAlarm;

})();

// 경과 시간초 UI
const timeUI = document.querySelector("#time");


/**
 * event
 */

// 알람 바늘 mousedown event
function onAlarmHandPointerdown( e ){

	if( e instanceof MouseEvent && e.button !== 0 ){
		return;
	}

	handAlarm.classList.add( "drag" );
	handAlarm.isDrag = true;
	timeBoard.boundingRect = timeBoard.getBoundingClientRect();

	stopwatch.clearAlarm();

}

// 화면 mousemove event
function onBodyPointermove( e ){
	
	let pageX = e.pageX;
    let pageY = e.pageY;

    if( pageX == null ){
        pageX = e.touches[ 0 ].pageX;
    }

    if( pageY == null ){
        pageY = e.touches[ 0 ].pageY;
    }
	
	if( handAlarm.isDrag === false ){
		return;
	}
	
	const radians = Math.atan2( 
						pageY - ( timeBoard.boundingRect.top + timeBoard.boundingRect.bottom ) / 2, 
						pageX - ( timeBoard.boundingRect.left + timeBoard.boundingRect.right ) / 2 
					) + Math.PI / 2;
	
	handAlarm.deg = Stopwatch.Degree.fromRadian( radians );
	handAlarm.style.transform = `translateX( -50% ) rotate( ${radians}rad )`;

}

// 화면 mouseup event
function onBodyPointerup( e ){

	if( e instanceof MouseEvent && e.button !== 0 ){
		return;
	}

	handAlarm.classList.remove( "drag" );
	handAlarm.isDrag = false;

}

handAlarm.addEventListener( "mousedown", onAlarmHandPointerdown );
document.body.addEventListener( "mousemove", onBodyPointermove );
document.body.addEventListener( "mouseup", onBodyPointerup );
handAlarm.addEventListener( "touchstart", onAlarmHandPointerdown );
document.body.addEventListener( "touchmove", onBodyPointermove );
document.body.addEventListener( "touchend", onBodyPointerup );

// 스탑워치 왼쪽 버튼 click event
leftButton.addEventListener("click", function(){
	
	if( rightButton.classList.contains("pushed") === false ){
		
		return;

	}

	const classList = this.classList;

	if( classList.contains("pushed") ){

		classList.remove("pushed");
		stopwatch.start();

	}else{

		classList.add("pushed");
		stopwatch.pause();

	}


});

// 스탑워치 오른쪽 버튼 click event
rightButton.addEventListener("click", function(){

	const classList = this.classList;

	if( classList.contains("pushed") ){

		leftButton.classList.remove("pushed");
		classList.remove("pushed");
		stopwatch.stop();
		stopwatch.clearAlarm();

	}else{
		
		hand.deg = Stopwatch.Degree.normalize( hand.deg );

		let rafId = null;
		function frame(){
		
			rafId = requestAnimationFrame( frame );
			hand.update( hand.deg - 5 );
			
			if( hand.deg <= 0 ){
				
				hand.update( 0 );
				cancelAnimationFrame( rafId );
				classList.add("pushed");
				stopwatch.start();

			}
			
		}
		rafId = requestAnimationFrame( frame );

	}


});

// 스탑워치 click event
stopwatchUI.addEventListener("click", () => {
	
	if( stopwatchUI.classList.contains( "alarm" ) === false ){
		return;
	}

	stopwatchUI.classList.remove( "alarm" );
	audio.pause();
	audio.currentTime = 0;
	stopwatch.clearAlarm();

});

// 스탑워치 라이브러리 update event
stopwatch.on("update", ( time ) => {
	
	if(
 
		handAlarm.isDrag === false && 
		stopwatch.getAlarms().length === 0
 
	){

		let pivotTime = stopwatch.get();
		if( pivotTime == null ) {
			return;
		}

		pivotTime -= pivotTime % 60000;


		// 알람 바늘보다 초침이 넘어간 경우
		const handAlarmDeg = Stopwatch.Degree.normalize( handAlarm.deg );
		const handDeg = Stopwatch.Degree.normalize( hand.deg );
		if( handAlarmDeg <= handDeg ){
			pivotTime += 60000;
		}
		
		stopwatch.setAlarm( handAlarmDeg * 60000 / 360 + pivotTime, Stopwatch.AlarmType.ABSOLUTE );

	}

	const deg = ( time * 360 ) / 60000;
	hand.update( deg );
	timeUI.innerText = ( time / 1000 ).toFixed( 3 );

});

// 스탑워치 라이브러리 alarm event
stopwatch.on("alarm", ( time ) => {
	
	stopwatchUI.classList.add( "alarm" );
	audio.play();

});

// 화면 선택 이벤트
document.body.addEventListener("selectstart", ( e )  => e.preventDefault() );