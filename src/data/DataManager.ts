import Stopwatch from "../Stopwatch";
import Data from "./Data";

class DataManager extends Array {

	get( stopwatch: Stopwatch ): Data {

		return this.find( ( data: Data ) => {

			return data.stopwatch === stopwatch;

		} );

	}

	remove( stopwatch: Stopwatch ): boolean {

		const index = this.indexOf( stopwatch );

		if( index < 0 ){
			return false;
		}

		this.splice( index, 1 );
		return true;

	}

}

export default DataManager;