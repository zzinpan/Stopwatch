/**
 * Alarm type
 */
export default class AlarmType {
	
	/**
	 * @property {StringOrNumber} id Alarm type id
	 */
	id: StringOrNumber;

	/**
	 * @property {Function} timeCalculator function to calculate time
	 */
	timeCalculator: Function;
	
	/**
	 * @description
	 * Constructor of AlarmType
	 * 
	 * @example
	 * ```js
 	 * // Create alarm type
	 * const customAlarmType = new Stopwatch.AlarmType( "SNAP", ( time, alarmTime ) => {
	 *     
	 *     // Snap in 0.5 second increments
	 *     return alarmTime - alarmTime % 500;
	 * 
	 * } );
	 * 
	 * // Alarm occurs after 5 seconds
	 * stopwatch.setAlarm( 5321, customAlarmType );
	 * ```
	 * 
	 * @param {StringOrNumber} id Alarm type id
	 * @param {Function} timeCalculator function to calculate time 
	 */
	constructor( id: StringOrNumber, timeCalculator: Function ){
		
		this.id = id;
		this.timeCalculator = timeCalculator;
		
	}
	
	/**
	 * @description
	 * Calculates and returns the alarm time.
	 * 
	 * @example
	 * ```js
	 * // Alarm time calculation
	 * const alarmTime = customAlarmType.timeCalculation( 3000, 3435 );
	 * ```
	 * 
	 * @param {number} elapsedTime elapsed time
	 * @param {number} alarmTime alarm time
	 * @returns {number} Calculated alarm time
	 */	
	timeCalculation( elapsedTime: number, alarmTime: number ): number{
		
		return this.timeCalculator( elapsedTime, alarmTime );
		
	}

	/**
	 * @description
	 * This is the default value for the alarm type.
	 * Regardless of the elapsed time, the argument value itself is used for the alarm.
	 */
	static ABSOLUTE = new AlarmType( 0, ( elapsedTime: number, alarmTime: number ): number => {
	
		return alarmTime;
		
	} );

	/**
	 * @description
	 * This is the default value for the alarm type.
	 * The time obtained by adding the argument value from the elapsed time becomes the alarm time.
	 */
	static RELATIVE = new AlarmType( 1, ( elapsedTime: number, alarmTime: number ): number => {
	
		return elapsedTime + alarmTime;
		
	} );

}