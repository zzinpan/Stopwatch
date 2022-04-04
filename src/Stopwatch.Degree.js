/**
 * 도, 또는 각도는 평면 각도의 단위로, 1회전의 360등분
 * @constructor
 */
class Degree {
	
	/**
	 * @description 각도를 일반화합니다. ( 0 <= 각도 < 360 ) 
	 * @param {number} deg 일반화할 각도
	 * @returns {number} 일반화된 각도
	 */	
	static normalize( deg ){
		
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
	 */	
	static toRadian( deg ){
		
		return deg * Math.PI / 180;
		
	}
	
	/**
	 * @description 각도의 단위를 radian에서 degree로 변경합니다. 
	 * @param {number} 변경할 radian 각도
	 * @returns {number} 변경된 degree 각도
	 */	
	static fromRadian( rad ){
		
		return rad / Math.PI * 180;
		
	}
	
	
}

export default Degree;