import Stopwatch from "../Stopwatch";
import Data from "./Data";

class DataManager {

	datas: Array<Data>;

	get( stopwatch: Stopwatch ): Data {

		return this.datas.find( ( data: Data ) => {

			return data.stopwatch === stopwatch;

		} );

	}

	add( data: Data ): DataManager {

		this.datas.push( data );
		return this;

	}

	remove( stopwatch: Stopwatch ): boolean {

		const index = this.datas.findIndex( ( data: Data ) => {

			return data.stopwatch === stopwatch;

		} );

		if( index < 0 ){
			return false;
		}

		this.datas.splice( index, 1 );
		return true;

	}

}

export default DataManager;