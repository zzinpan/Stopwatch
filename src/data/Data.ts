import Stopwatch from "../Stopwatch";

/*** docs exclude
 * Stopwatch data
 * @property {Stopwatch} stopwatch It is a stopwatch object and serves as a key for data
 * @property {number} startTime requestAnimationFrame start time
 * @property {number} elapsedTime elapsed time = now time - start time
 * @property {number} frameTime requestAnimationFrame now time
 * @property {boolean} paused paused
 * @property {number} rafId return id from requestAnimationFrame
 * @property {object} event event items
 * @property {number[]} alarms set alarm times
 * @property {number[]} completeAlarms complete alarm times
 * @example
 * ```js
 * const stopwatch = new Stopwatch();
 * ```
 ***/

 class Data {

	// 필드
	stopwatch: Stopwatch;
	startTime: number;
	elapsedTime: number;
	frameTime: number;
	paused: boolean;
	rafId: number;

	event: {
		update: Function[],
		alarm: Function[],
		execute: Function
	};

	alarms: number[];
	completeAlarms: number[];


	constructor( stopwatch: Stopwatch ){

		const capsule = this;
		
		this.stopwatch = stopwatch;
		this.paused = false;
		this.alarms = [];
		this.completeAlarms = [];
		this.event = {
			
			update: [],
			alarm: [],
			execute( /** name, args... */ ): boolean {
				
				const args = Array.prototype.slice.call( arguments );

				const name = args.shift();
				if( name == null ){
					return false;
				}

				const callbacks = this[ name ];
				if( callbacks == null ){
					return false;
				}
				
				// execute callbacks
				callbacks.forEach( ( cb: Function ) => cb.apply( capsule.stopwatch, args ) );

				return true;

			}
			
		};

	}

}

export default Data;