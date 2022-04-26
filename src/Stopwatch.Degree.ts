/**
 * A degree, or angle, is a unit of plane angle, divided into 360 equal parts of one rotation.
 * A class that provides convenience functions related to angles.
 */
export default class Degree {
	
	/**
	 * @description
	 * Normalize the angle. ( 0 <= angle < 360 ) 
	 * 
	 * @example
	 * ```js
	 * // 9
	 * const degree = Stopwatch.Degree.normalize( 369 );
	 * ```
	 * 
	 * @param {number} deg angle to normalize
	 * @returns {number} normalized angle
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
	 * @description
	 * Change the unit of angle from degree to radian.
	 * 
	 * @example
	 * ```js
	 * // Math.PI
	 * const radian = Stopwatch.Degree.toRadian( 180 );
	 * ```
	 * 
	 * @param {number} deg angle to change ( degree )
	 * @returns {number} changed angle ( radian )
	 */	
	static toRadian( deg: number ): number {
		
		return deg * Math.PI / 180;
		
	}
	
	/**
	 * @description
	 * Change the unit of angle from radian to degree.
	 * 
	 * @example
	 * ```js
	 * // 90
	 * const degree = Stopwatch.Degree.fromRadian( Math.PI / 2 );
	 * ```
	 * 
	 * @param {number} rad angle to change ( radian )
	 * @returns {number} changed angle ( degree )
	 */	
	static fromRadian( rad: number ): number {
		
		return rad / Math.PI * 180;
		
	}
	
	
}