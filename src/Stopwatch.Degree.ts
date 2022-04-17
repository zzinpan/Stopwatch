/**
 * 도, 또는 각도는 평면 각도의 단위로, 1회전의 360등분
 * @constructor
 */
class Degree {
	
	/**
	 * @description 각도를 일반화합니다. ( 0 <= 각도 < 360 ) 
	 * @param {number} deg 일반화할 각도
	 * @returns {number} 일반화된 각도
	 * @example
	 * ```js
	 * // 9
	 * const degree = Stopwatch.Degree.normalize( 369 );
	 * ```
	 */	
	static normalize( deg: number ): number {
		

		if( typeof deg !== "number" ){
			return NaN;
		}

		if( isNaN( deg ) === true ){
			return NaN;
		}

		if( isFinite( deg ) === false ){
			return NaN;
		}


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
	 * @param {number} 변경할 degree 각도
	 * @returns {number} 변경된 radian 각도
	 * @example
	 * ```js
	 * // Math.PI
	 * const radian = Stopwatch.Degree.toRadian( 180 );
	 * ```
	 */	
	static toRadian( deg: number ): number {
		
		return deg * Math.PI / 180;
		
	}
	
	/**
	 * @description 각도의 단위를 radian에서 degree로 변경합니다. 
	 * @param {number} 변경할 radian 각도
	 * @returns {number} 변경된 degree 각도
	 * @example
	 * ```js
	 * // 90
	 * const degree = Stopwatch.Degree.fromRadian( Math.PI / 2 );
	 * ```
	 */	
	static fromRadian( rad: number ): number {
		
		return rad / Math.PI * 180;
		
	}
	
	
}

export default Degree;