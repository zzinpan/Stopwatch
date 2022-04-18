import Stopwatch from "../Stopwatch";

/*** docs 제외
 * 스탑워치 캡슐
 * @property {Stopwatch} stopwatch 스탑워치 객체
 * @property {number} startTime 시간 시작값  
 * @property {number} time 현재 시간  
 * @property {number} frameTime raf에서 반환되는 frame time  
 * @property {boolean} paused 일시정지 여부
 * @property {number} rafId requestAnimationFrame 아이디
 * @property {object} event 이벤트 모듈
 * @property {number[]} alarms 등록된 알람 시간
 * @property {number[]} completeAlarms 완료된 알람 시간
 * @example
 * ```js
 * const stopwatch = new Stopwatch();
 * ```
 ***/
 class Data {

	// 필드
	stopwatch: Stopwatch;
	startTime: number;
	time: number;
	frameTime: number;
	paused: boolean;
	rafId: number;
	event: any;
	alarms: number[];
	completeAlarms: number[];


	constructor( stopwatch: Stopwatch ){

		const capsule = this;
		
		// 스탑워치
		this.stopwatch = stopwatch;

		// 일시정지 여부
		this.paused = false;
		
		// 알람 설정 시간
		this.alarms = [];
		this.completeAlarms = [];
		
		// 이벤트 목록
		this.event = {
			
			// 콜백 목록
			update: [], // ( {number} time )
			alarm: [], // ( {number} time )
			
			execute( /** name, args... */ ){
				
				const args = Array.prototype.slice.call( arguments );
				const name = args.shift();
				const callbacks = this[ name ];
				
				// 콜백수행
				callbacks.forEach( ( cb: Function ) => cb.apply( capsule.stopwatch, args ) );
				
			}
			
			
		};

	}

}

export default Data;