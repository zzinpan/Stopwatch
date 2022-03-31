const AlarmTypes = [];

/**
 * 알람 종류
 * @constructor
 * @property {string} id 알람 종류 구분자
 * @property {function} timeCalculator 시간 계산자
 */
class AlarmType {
	
	id;
	timeCalculator;
	
	constructor( id, timeCalculator ){
		
		this.id = id;
		this.timeCalculator = timeCalculator;
		
	}
	
	/**
	 * @description 알람시간을 계산하여 반환합니다.
	 * @param {number} time 현재시간
	 * @param {number} time 알람시간
	 * @returns {number} 계산된 알람시간
	 */	
	timeCalculation( time, alarmTime ){
		
		return this.timeCalculator( time, alarmTime );
		
	}
	
	/**
	 * @description 실존하는 알람타입인지 확인합니다.
	 * @param {any} target 알람타입인지 확인할 대상
	 * @returns {boolean} 알람타입 여부
	 */	
	static has( target ){
			
		return AlarmTypes.some( alarmType => alarmType == target );
		
	}
	
}

AlarmType.ABSOLUTE = new AlarmType( 0, ( time, alarmTime )=>{
	
	return alarmTime;
	
} );

AlarmType.RELATIVE = new AlarmType( 1, ( time, alarmTime )=>{
	
	return time + alarmTime;
	
} );

AlarmTypes.push( AlarmType.ABSOLUTE );
AlarmTypes.push( AlarmType.RELATIVE );

export default AlarmType;