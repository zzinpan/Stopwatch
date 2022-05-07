import Type from "../Stopwatch.Event";

/*** docs exclude
 * Stopwatch data
 * @property {number} startTime requestAnimationFrame start time
 * @property {number} elapsedTime elapsed time = now time - start time
 * @property {number} frameTime requestAnimationFrame now time
 * @property {boolean} paused paused
 * @property {number} rafId return id from requestAnimationFrame
 * @property {object} event event items
 * @property {number[]} alarms set alarm times
 * @property {number[]} completeAlarms complete alarm times
 * @property {function} a zzz
 * @example
 * ```js
 * const stopwatch = new Stopwatch();
 * ```
 ***/
 class StopwatchData {

	// 필드
	startTime: number;
	elapsedTime: number;
	frameTime: number;
	paused: boolean;
	rafId: number;

	event: {
		[key: string]: Function[],
		update: Function[],
		tick: Function[],
		alarm: Function[]
	};

	alarms: number[];
	completeAlarms: number[];


	constructor(){

		this.startTime = null;
		this.elapsedTime = null;
		this.frameTime = null;
		this.paused = false;
		this.rafId = null;
		this.event = {
			
			update: null,
			tick: null,
			alarm: null
			
		};

		// synonym
		const synonymGroup: string[][] = Type.getSynonyms();
		synonymGroup.forEach(( synonyms ) => {

			const array: Function[] = [];
			synonyms.forEach(( synonym ) => {

				this.event[ synonym ] = array;

			});

		});

		this.alarms = [];
		this.completeAlarms = [];

	}

}

export default StopwatchData;