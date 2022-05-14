import AlarmType from "./Stopwatch.AlarmType";
import Degree from "./Stopwatch.Degree";
import StopwatchDataManager from "./manager/StopwatchDataManager";
import StopwatchData from "./data/StopwatchData";
import StopwatchEvent from "./Stopwatch.Event";
import { requestAnimationFrame, cancelAnimationFrame } from "./polyfill/requestAnimatiionFrame";

// constant
const Const = {

	dataManager: new StopwatchDataManager()

};


/**
 * Stopwatch
 */
export default class Stopwatch {

	/**
	 * @description
	 * Stopwatch alarm type.
	 */
	static AlarmType = AlarmType;

	/**
	 * @description
	 * A utility object associated with degree.
	 */
	static Degree = Degree;

	/**
	 * @description
	 * Stopwath event type.
	 */
	static Event = StopwatchEvent;

	/**
	 * @description
	 * Stopwatch constructor
	 *
	 * @example
	 * ```js
	 * // create instance
	 * const stopwatch = new Stopwatch();
	 * ```
	 */
	constructor(){

		const data = new StopwatchData();
		Const.dataManager.put( this, data );

	}

	/**
	 * @description
	 * Start the stopwatch.
	 *
	 * @example
	 * ```js
	 * // Start the stopwatch.
	 * stopwatch.start();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	start(): boolean {

		const self = this;
		const data: StopwatchData = Const.dataManager.get( this );

		if( data.paused === true ){
			data.paused = false;
			return true;
		}

		// 현재 수행중인 경우, 다시 실행시킬 수 없음
		if( data.started === true ){
			return false;
		}

		data.started = true;

		function frame( time: number ){

			data.rafId = requestAnimationFrame( frame );
			if( data.startTime == null ){
				data.startTime = time;
			}

			if( data.paused === true ){
				data.startTime += time - data.frameTime;
			}

			data.frameTime = time;
			data.elapsedTime = time - data.startTime;
			self.dispatch( StopwatchEvent.Update, data.elapsedTime );

			const alarms: number[] = data.alarms.filter( alarmTime => {

				// 이미 알람을 발생한 경우
				const isComplete =  data.completeAlarms.some( cAlarmTime => cAlarmTime == alarmTime );

				if( isComplete ){
					return false;
				}

				return alarmTime <= data.elapsedTime;

			} );

			for( let i=0; i<alarms.length; ++i ){

				self.dispatch( StopwatchEvent.Alarm, data.elapsedTime );
				data.completeAlarms.push( alarms[ i ] );

			}for( let i=0; i<alarms.length; ++i ){

				self.dispatch( StopwatchEvent.Alarm, data.elapsedTime );
				data.completeAlarms.push( alarms[ i ] );

			}

		}

		data.rafId = requestAnimationFrame( frame );

		return true;

	}


	/**
	 * @description
	 * Pause the stopwatch.
	 *
	 * @example
	 * ```js
	 * // Pause the stopwatch.
	 * stopwatch.pause();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	pause(): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

		if( data.started === false ){
			return false;
		}

		if( data.paused === true ){
			return false;
		}

		data.paused = true;
		return true;

	}


	/**
	 * @description
	 * Stop the stopwatch.
	 *
	 * @example
	 * ```js
	 * // Stop the stopwatch.
	 * stopwatch.stop();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	stop(): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

		if( data.started === false ){
			return false;
		}

		cancelAnimationFrame( data.rafId );
		data.rafId = null;
		data.started = false;
		data.startTime = null;
		data.paused = false;
		data.completeAlarms = [];

		return true;

	}

	/**
	 * @description
	 * Reset the stopwatch.
	 *
	 * @example
	 * ```js
	 * // Reset the stopwatch.
	 * stopwatch.reset();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	reset(): boolean {

		const data: StopwatchData = Const.dataManager.get( this );
		data.completeAlarms = [];
		data.startTime = data.frameTime;
		data.elapsedTime = 0;

		return true;

	}


	/**
	 * @description
	 * Get the elapsed time.
	 *
	 * @example
	 * ```js
	 * // Get the elapsed time.
	 * const time = stopwatch.get();
	 * ```
	 *
	 * @returns {number} elapsed time
	 */
	get(): number {

		const data: StopwatchData = Const.dataManager.get( this );
		return data.elapsedTime;

	}

	/**
	 * @description
	 * Set an alarm.
	 * When the alarm time comes, the stopwatch triggers an alarm event.
	 *
	 * @example
	 * ```js
	 * // Set an alarm. ( Default alarm type: Stopwatch.AlarmType.ABSOLUTE )
	 * stopwatch.setAlarm( 3000 );
	 * ```
	 *
	 * @example
	 * ```js
	 * // Set an alarm.
	 * stopwatch.setAlarm( 3000, Stopwatch.AlarmType.RELATIVE );
	 * ```
	 *
	 * @param {number} alarmTime Alarm time ( unit: ms )
	 * @param {Stopwatch.AlarmType} [alarmType=Stopwatch.AlarmType.ABSOLUTE] Alarm type
	 * @returns {boolean} Whether to run
	 */
	setAlarm( alarmTime: number, alarmType: AlarmType = Stopwatch.AlarmType.ABSOLUTE ): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

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
	 * @description
	 * Get the set alarm list.
	 *
	 * @example
	 * ```js
	 * // Get the set alarm list.
	 * const alarms = stopwatch.getAlarms();
	 * ```
	 *
	 * @returns {number[]} alarm list
	 */
	getAlarms(): number[] {

		const data: StopwatchData = Const.dataManager.get( this );
		return data.alarms;

	}


	/**
	 * @description
	 * All set alarms are cleared.
	 *
	 * @example
	 * ```js
	 * // All set alarms are cleared.
	 * stopwatch.clearAlarm();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	clearAlarm(): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

		data.alarms = [];
		data.completeAlarms = [];

		return true;

	}


	/**
	 * @description
	 * Register event callbacks.
	 *
	 * @example
	 * ```js
	 * // It is executed when the time is updated.
	 * stopwatch.on( "update", ( ms ) => {
	 * 
	 *     const seconds = ms / 1000;
	 *     console.log( seconds.toFixed( 3 ) );
	 * 
	 * } );
	 * ```
	 *
	 * @param {Event} eventName Events to register for callbacks
	 * @param {function} callback A callback to be executed when an event occurs
	 * @returns {boolean} Whether to run
	 */
	on( eventName: string, callback: Function ): boolean {

		const data: StopwatchData = Const.dataManager.get( this );
		const callbacks: Function[] = data.event[ eventName ];

		// 등록가능한 이벤트명이 아님
		if( callbacks == null ){
			return false;
		}

		callbacks.push( callback );
		return true;

	}


	/**
	 * @description
	 * Remove the event callback.
	 *
	 * @example
	 * ```js
	 * // Remove all callbacks for a specific event
	 * stopwatch.off( "alarm" );
	 * ```
	 *
	 * @example
	 * ```js
	 * // Remove specific callbacks for specific events
	 * stopwatch.off( "alarm", alarmListener );
	 * ```
	 * @param {Event} eventName Event to delete callback
	 * @param {function} callback callback to delete
	 * @returns {boolean} Whether to run
	 */
	off( eventName?: string, callback?: Function ): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

		// 모든 이벤트 삭제
		if( eventName == null ){

			const callbackGroups = Object.values( data.event );
			callbackGroups.forEach( callbacks => callbacks.length = 0 );

			return true;

		}

		// 특정 이벤트 삭제
		if( callback == null ){

			// 동의어에서 동일 참조가 필요하므로 신규 배열 할당이 아닌 아래코드 사용
			data.event[ eventName ].length = 0;
			return true;

		}

		// 특정 이벤트의 콜백 삭제
		const callbacks: Function[] = data.event[ eventName ];
		const index: number = callbacks.indexOf( callback );
		callbacks.splice( index, 1 );
		return true;

	}


	/**
	 * @description
	 * Dispatch events.
	 * Used only inside a class.
	 *
	 * @example
	 * ```js
	 * // Dispatch events.
	 * this.dispatch( "alarm", this.get() );
	 * ```
	 *
	 * @param {Event} eventName Event to execute callback
	 * @param {any} args Argument value to be passed to the callback
	 * @returns {boolean} Whether to run
	 */
	private dispatch( eventName: string, ...args: any | number ): boolean {

		const data: StopwatchData = Const.dataManager.get( this );

		const callbacks = data.event[ eventName ];
		if( callbacks == null ){
			return false;
		}

		// execute callbacks
		callbacks.forEach( ( cb: Function ) => cb.apply( this, args ) );

		return true;

	}

	/**
	 * @description
	 * Destroys the stopwatch object.
	 * This means exempt from management, removing references to internal data that we manage internally.
	 * t loses its function as a stopwatch.
	 *
	 * @example
	 * ```js
	 * // object destruction
	 * stopwatch.destroy();
	 * ```
	 *
	 * @returns {boolean} Whether to run
	 */
	destroy(): boolean {

		// 정지
		this.stop();

		// 이벤트 제거
		this.off();

		// 알람 제거
		this.clearAlarm();

		// 관리 제거
		Const.dataManager.remove( this );

		// 객체 원형정보 변경
		(<any>Object).setPrototypeOf( this, Object.prototype );

		return true;


	}


}