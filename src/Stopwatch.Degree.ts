/**
 * 도, 또는 각도는 평면 각도의 단위로, 1회전의 360등분
 * @constructor
 */
class Degree {
	
	/**
	 * @description 각도를 일반화합니다. ( 0 <= 각도 < 360 ) 
	 * @example
	 * // 9
	 * const degree = Stopwatch.Degree.normalize( 369 );
	 * @param {number} deg 일반화할 각도
	 * @returns {number} 일반화된 각도
	 */	
	static normalize( deg: number ): number{
		
		while( true ){
			
			if( 360 <= deg ){
				
				deg -= 360;
				continue;
				
			}
			
			if( deg < 0 ){
				
				deg += 360;
				continue;
				
			}
			
			return deg;
			
		}
		
	}
	
	/**
	 * @description 각도의 단위를 degree에서 radian으로 변경합니다. 
	 * @example
	 * // Math.PI
	 * const radian = Stopwatch.Degree.toRadian( 180 );
	 * @param {number} 변경할 degree 각도
	 * @returns {number} 변경된 radian 각도
	 */	
	static toRadian( deg: number ): number{
		
		return deg * Math.PI / 180;
		
	}
	
	/**
	 * @description 각도의 단위를 radian에서 degree로 변경합니다. 
	 * @example
	 * // 90
	 * const degree = Stopwatch.Degree.fromRadian( Math.PI / 2 );
	 * @param {number} 변경할 radian 각도
	 * @returns {number} 변경된 degree 각도
	 */	
	static fromRadian( rad: number ): number{
		
		return rad / Math.PI * 180;
		
	}
	
	
}

export default Degree;