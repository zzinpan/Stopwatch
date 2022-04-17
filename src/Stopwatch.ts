import AlarmType from "./Stopwatch.AlarmType.js";
import Degree from "./Stopwatch.Degree.js";
import { requestAnimationFrame, cancelAnimationFrame } from "./polyfill/requestAnimatiionFrame.js";

// 상수
const Const: {

	datas: {

		[ id: string ]: Data

	},

	getUniqueId: Function

} = {

	datas: {},
	getUniqueId(): string {

		return Date.now() + "" + Math.random() * 1000000000000000000;

	}

};


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

/**
 * Stopwatch
 */
class Stopwatch {

	/**
	 * @description
	 * ID of automatically created object
	 */
	id: string | number;

	static AlarmType = AlarmType;
	static Degree = Degree;

	/**
	 * Stopwatch constructor
	 * ```js
	 * // create instance
	 * const stopwatch = new Stopwatch();
	 * ```
	 */
	constructor(){
		
		const id: string = Const.getUniqueId();

		// 재할당, 삭제 불가능
		Object.defineProperty( this, "id", {

			configurable: false,
			enumerable: true,
			writable: false,

			value: id

		} )

		const data = new Data( this );
		Const.datas[ id ] = data;
		
	}

	/**
	 * @description 스탑워치 실행 시킵니다.
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 스탑워치 실행
	 * stopwatch.start();
	 * ```
	 */	
	start(): boolean {
		
		const data: Data = Const.datas[ this.id ];

		if( data.paused === true ){
			data.paused = false;
			return true;
		}
		
		// 현재 수행중인 경우, 다시 실행시킬 수 없음
		if( data.rafId != null ){
			return false;
		}
		
		
		function frame( time: number ){
			
			data.rafId = requestAnimationFrame( frame );
			if( data.startTime == null ){
				data.startTime = time;
			}
			
			if( data.paused === true ){
				data.startTime += time - data.frameTime;
			}
			
			data.frameTime = time;
			data.time = time - data.startTime;
			data.event.execute( "update", data.time );
			
			const alarms: number[] = data.alarms.filter( alarmTime => {
				
				// 이미 알람을 발생한 경우
				const isComplete =  data.completeAlarms.some( cAlarmTime => cAlarmTime == alarmTime );
				
				if( isComplete ){
					return false;
				}
				
				return alarmTime <= data.time;
				
			} );
			
			for( let i=0; i<alarms.length; ++i ){
				
				data.event.execute( "alarm", data.time );
				data.completeAlarms.push( alarms[ i ] );
				
			}
			
		}
		
		data.rafId = requestAnimationFrame( frame );
		
		return true;
		
	}
	
	
	/**
	 * @description 스탑워치를 일시정지 시킵니다.
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 스탑워치 일시중지
	 * stopwatch.pause();
	 * ```
	 */	
	pause(): boolean {
		
		const data: Data = Const.datas[ this.id ];

		if( data.rafId == null ){
			return false;
		}
		
		if( data.paused === true ){
			return false;
		}
		
		data.paused = true;
		return true;
		
	}
	
	
	/**
	 * @description 스탑워치를 중지 시킵니다.
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 스탑워치 중지
	 * stopwatch.stop();
	 * ```
	 */	
	stop(): boolean {
		
		const data: Data = Const.datas[ this.id ];

		if( data.startTime == null ){
			return false;
		}
		
		cancelAnimationFrame( data.rafId );
		data.rafId = null;
		data.startTime = null;
		data.paused = false;
		data.completeAlarms = [];
		
		return true;
		
	}
	
	
	/**
	 * @description 현재시간을 반환합니다.
	 * @returns {number} 현재시간(ms)
	 * @example
	 * ```js
	 * // 스탑워치 시간 조회
	 * const time = stopwatch.get();
	 * ```
	 */	
	get(): number {
		
		const data: Data = Const.datas[ this.id ];
		return data.time;
		
	}
	
	/**
	 * @description 알람을 설정합니다. 알람시간이 되면, 타이머에서 알람이벤트를 발생시킵니다.
	 * @param {number} alarmTime 알람시간(ms)
	 * @param {Stopwatch.AlarmType} [alarmType=Stopwatch.AlarmType.RELATIVE] 알람기준
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 알람 설정 ( 알람종류: Stopwatch.AlarmType.RELATIVE )
	 * stopwatch.setAlarm( 3000 );
	 * ```
	 * @example
	 * ```js
	 * // 알람 설정
	 * stopwatch.setAlarm( 3000, Stopwatch.AlarmType.ABSOLUTE );
	 * ```
	 */	
	setAlarm( alarmTime: number, alarmType: AlarmType = Stopwatch.AlarmType.RELATIVE ): boolean {
		
		const data: Data = Const.datas[ this.id ];

		if( typeof alarmTime != "number" ){
			return false;
		}
		
		if( alarmTime <= 0 ){
			return false;
		}
		
		if( alarmType instanceof Stopwatch.AlarmType === false ){
			return false;
		}
		
		const time: number = this.get();
		alarmTime = alarmType.timeCalculation( time, alarmTime );
		data.alarms.push( alarmTime );

		/*
		 * 이미 시간이 지난 알람의 경우, 완료처리
		 * 이 알람은 재시작 시, 발생 가능
		 */ 
		if( alarmTime < time ){

			data.completeAlarms.push( alarmTime );

		}
		
	}
	
	/**
	 * @description 저장된 알람을 전달합니다.
	 * @returns {number[]} 저장된 알람
	 * @example
	 * ```js
	 * // 알람 조회
	 * const alarms = stopwatch.getAlarms();
	 * ```
	 */	
	getAlarms(): number[] {
		
		const data: Data = Const.datas[ this.id ];
		return data.alarms;
		
	}
	

	/**
	 * @description 설정된 모든 알람이 제거 됩니다.
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 알람 초기화
	 * stopwatch.clearAlarm();
	 * ```
	 */	
	clearAlarm(): boolean {
		
		const data: Data = Const.datas[ this.id ];
		
		data.alarms = [];
		data.completeAlarms = [];

		return true;
		
	}
	
	
	/**
	 * @description 이벤트 콜백을 등록합니다.
	 * @param {string} eventName 등록할 이벤트명 ( 'update', 'alarm' ) 
	 * @param {function} callback 이벤트 발생 시, 수행될 콜백함수 
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 시간이 갱신되면, 호출
	 * stopwatch.on( "update", ( ms ) => {
	 * 
	 *     const seconds = ms / 1000;
	 *     console.log( seconds.toFixed( 3 ) );
	 * 
	 * } );
	 * ```
	 */	
	on( eventName: string, callback: Function ): boolean {
		
		const data: Data = Const.datas[ this.id ];
		const callbacks: Function[] = data.event[ eventName ];
		
		// 등록가능한 이벤트명이 아님
		if( callbacks == null ){
			return false;
		}
		
		callbacks.push( callback );
		return true;
		
	}
	
	
	/**
	 * @description 이벤트 콜백을 삭제합니다.
	 * @param {string} eventName 삭제할 이벤트명 ( 'update', 'alarm' ) 
	 * @param {function} callback 삭제할 콜백함수 
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 특정 이벤트의 모든 콜백 제거
	 * stopwatch.off( "alarm" );
	 * ```
	 * @example
	 * ```js
	 * // 특정 이벤트의 특정 콜백 제거
	 * stopwatch.off( "alarm", alarmListener );
	 * ```
	 */	
	off( eventName?: string, callback?: Function ): boolean {
		
		const data: Data = Const.datas[ this.id ];

		// 모든 이벤트 삭제
		if( eventName == null ){
			
			for( eventName in data.event ){
				
				data.event[ eventName ] = [];
				
			}
			
			return true;
			
		}

		// 특정 이벤트 삭제
		if( callback == null ){
			
			data.event[ eventName ] = [];
			return true;
			
		}

		// 특정 이벤트의 콜백 삭제
		const callbacks: Function[] = data.event[ eventName ];
		const index: number = callbacks.indexOf( callback );
		callbacks.splice( index, 1 );
		return true;
		
	}
	
	
	/**
	 * @description 객체를 파괴합니다.
	 * 파괴된 객체는 캡슐 관리에서 제외되고, Stopwatch의 기능을 잃어버립니다.
	 * @returns {boolean} 명령 수행 여부
	 * @example
	 * ```js
	 * // 객체 파괴
	 * stopwatch.destroy();
	 * ```
	 */	
	destroy(): boolean {

		// 정지
		this.stop();

		// 이벤트 제거
		this.off();

		// 알람 제거
		this.clearAlarm();

		// 관리 제거
		delete Const.datas[ this.id ];

		// 객체 원형정보 변경
		(<any>Object).setPrototypeOf( this, Object.prototype );

		return true;


	}


}


export default Stopwatch;