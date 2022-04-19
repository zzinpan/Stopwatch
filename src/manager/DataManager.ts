import Stopwatch from "../Stopwatch";
import Data from "../data/Data";
import Manager from "./Manager";

/**
 * Data manager
 * @description
 * 
 */
// class DataManager extends Array<Data> implements Manager<Data, Stopwatch> {
class DataManager implements Manager<Data, Stopwatch> {

	get( stopwatch: Stopwatch ): Data {

		return this.find( ( data: Data ) => {

			return data.stopwatch === stopwatch;

		} );

	}

	add( data: Data ): DataManager {

		this.push( data );
		return this;

	}

	remove( stopwatch: Stopwatch ): boolean {

		const index = this.findIndex( ( data: Data ) => {

			return data.stopwatch === stopwatch;

		} );

		if( index < 0 ){
			return false;
		}

		this.splice( index, 1 );
		return true;

	}

}

Object.setPrototypeOf( DataManager.prototype, Array.prototype );
export default DataManager;