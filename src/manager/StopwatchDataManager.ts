import { Stopwatch } from "../Stopwatch";
import StopwatchData from "../data/StopwatchData";
import Manager from "./Manager";

/**
 * Data manager
 * @description
 * 
 */
class StopwatchDataManager implements Manager<Stopwatch, StopwatchData> {

	map: Map<Stopwatch, StopwatchData>;

	constructor(){

		this.map = new Map<Stopwatch, StopwatchData>();

	}

	get( stopwatch: Stopwatch ): StopwatchData {

		return this.map.get( stopwatch );

	}

	put( stopwatch: Stopwatch, data: StopwatchData ): StopwatchDataManager {

		this.map.set( stopwatch, data );
		return this;

	}

	remove( stopwatch: Stopwatch ): boolean {

		this.map.delete( stopwatch );
		return true;

	}

}

export default StopwatchDataManager;