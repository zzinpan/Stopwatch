const AlarmTypes = [];

/**
 * 알람 종류
 * @constructor
 * @example
 * // 새로운 알람 종류 생성
 * const customAlarmType = new Stopwatch.AlarmType( "SNAP", ( time, alarmTime ) => {
 *     
 *     // 0.5초 단위 스냅
 *     return alarmTime - alarmTime % 500;
 * 
 * } );
 * 
 * // 5초뒤 알람 발생
 * stopwatch.setAlarm( 5321, customAlarmType );
 * @property {string|number} id 알람 종류 구분자
 * @property {function} timeCalculator 시간 계산자
 */
class AlarmType {
	
	
	id: string | number;
	timeCalculator: Function;
	
	constructor( id: string | number, timeCalculator: Function ){
		
		this.id = id;
		this.timeCalculator = timeCalculator;
		
	}
	
	/**
	 * @description 알람시간을 계산하여 반환합니다.
	 * @example
	 * // 알람시간 계산
	 * const alarmTime = customAlarmType.timeCalculation( 3000, 3435 );
	 * @param {number} time 현재시간
	 * @param {number} time 알람시간
	 * @returns {number} 계산된 알람시간
	 */	
	timeCalculation( time: number, alarmTime: number ): number{
		
		return this.timeCalculator( time, alarmTime );
		
	}

	static ABSOLUTE = new AlarmType( 0, ( time: number, alarmTime: number ): number => {
	
		return alarmTime;
		
	} );

	static RELATIVE = new AlarmType( 1, ( time: number, alarmTime: number ): number => {
	
		return time + alarmTime;
		
	} );

}

AlarmTypes.push( AlarmType.ABSOLUTE );
AlarmTypes.push( AlarmType.RELATIVE );

export default AlarmType;