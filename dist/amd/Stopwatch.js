define((function () { 'use strict';

    /**
     * 알람 종류
     * @constructor
     * @property {string|number} id 알람 종류 구분자
     * @property {function} timeCalculator 시간 계산자
     * @example
     * ```js
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
     * ```
     */
    var AlarmType = /** @class */ (function () {
        function AlarmType(id, timeCalculator) {
            this.id = id;
            this.timeCalculator = timeCalculator;
        }
        /**
         * @description 알람시간을 계산하여 반환합니다.
         * @param {number} time 현재시간
         * @param {number} time 알람시간
         * @returns {number} 계산된 알람시간
         * @example
         * ```js
         * // 알람시간 계산
         * const alarmTime = customAlarmType.timeCalculation( 3000, 3435 );
         * ```
         */
        AlarmType.prototype.timeCalculation = function (time, alarmTime) {
            return this.timeCalculator(time, alarmTime);
        };
        AlarmType.ABSOLUTE = new AlarmType(0, function (time, alarmTime) {
            return alarmTime;
        });
        AlarmType.RELATIVE = new AlarmType(1, function (time, alarmTime) {
            return time + alarmTime;
        });
        return AlarmType;
    }());

    /**
     * 도, 또는 각도는 평면 각도의 단위로, 1회전의 360등분
     * @constructor
     */
    var Degree = /** @class */ (function () {
        function Degree() {
        }
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
        Degree.normalize = function (deg) {
            if (typeof deg !== "number") {
                return NaN;
            }
            if (isNaN(deg) === true) {
                return NaN;
            }
            if (isFinite(deg) === false) {
                return NaN;
            }
            while (true) {
                if (360 <= deg) {
                    deg -= 360;
                    continue;
                }
                if (deg < 0) {
                    deg += 360;
                    continue;
                }
                return deg;
            }
        };
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
        Degree.toRadian = function (deg) {
            return deg * Math.PI / 180;
        };
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
        Degree.fromRadian = function (rad) {
            return rad / Math.PI * 180;
        };
        return Degree;
    }());

    /**
     * Data manager
     * @description
     *
     */
    var StopwatchDataManager = /** @class */ (function () {
        function StopwatchDataManager() {
            this.map = new Map();
        }
        StopwatchDataManager.prototype.get = function (stopwatch) {
            return this.map.get(stopwatch);
        };
        StopwatchDataManager.prototype.put = function (stopwatch, data) {
            this.map.set(stopwatch, data);
            return this;
        };
        StopwatchDataManager.prototype.remove = function (stopwatch) {
            this.map["delete"](stopwatch);
            return true;
        };
        return StopwatchDataManager;
    }());

    /*** docs exclude
     * Stopwatch data
     * @property {number} startTime requestAnimationFrame start time
     * @property {number} elapsedTime elapsed time = now time - start time
     * @property {number} frameTime requestAnimationFrame now time
     * @property {boolean} paused paused
     * @property {number} rafId return id from requestAnimationFrame
     * @property {object} event event items
     * @property {number[]} alarms set alarm times
     * @property {number[]} completeAlarms complete alarm times
     * @example
     * ```js
     * const stopwatch = new Stopwatch();
     * ```
     ***/
    var StopwatchData = /** @class */ (function () {
        function StopwatchData() {
            this.paused = false;
            this.alarms = [];
            this.completeAlarms = [];
            this.event = {
                update: [],
                alarm: []
            };
        }
        return StopwatchData;
    }());

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    var rAF = "requestAnimationFrame";
    var cAF = "cancelAnimationFrame";
    var _this = undefined;
    // esm
    if (_this == null) {
        _this = {};
    }
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    var lastTime = 0;
    var x;
    for (x = 0; x < vendors.length && !_this[rAF]; ++x) {
        _this[rAF] = _this[vendors[x] + 'RequestAnimationFrame'];
        _this[cAF] = _this[vendors[x] + 'CancelAnimationFrame']
            || _this[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!_this[rAF]) {
        _this[rAF] = function (callback) {
            var currTime = Date.now(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!_this[cAF]) {
        _this[cAF] = function (id) {
            clearTimeout(id);
        };
    }
    var requestAnimationFrame = _this[rAF];
    var cancelAnimationFrame = _this[cAF];

    // 상수
    var Const = {
        dataManager: new StopwatchDataManager()
    };
    /**
     * Stopwatch
     */
    var Stopwatch = /** @class */ (function () {
        /**
         * @description
         * Stopwatch constructor
         *
         * @example
         * ```js
         * // create instance
         * const stopwatch = new Stopwatch();
         * ```
         */
        function Stopwatch() {
            var data = new StopwatchData();
            Const.dataManager.put(this, data);
        }
        /**
         * @description
         * Start the stopwatch.
         *
         * @example
         * ```js
         * // Start the stopwatch.
         * stopwatch.start();
         * ```
         *
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.start = function () {
            var self = this;
            var data = Const.dataManager.get(this);
            if (data.paused === true) {
                data.paused = false;
                return true;
            }
            // 현재 수행중인 경우, 다시 실행시킬 수 없음
            if (data.rafId != null) {
                return false;
            }
            function frame(time) {
                data.rafId = requestAnimationFrame(frame);
                if (data.startTime == null) {
                    data.startTime = time;
                }
                if (data.paused === true) {
                    data.startTime += time - data.frameTime;
                }
                data.frameTime = time;
                data.elapsedTime = time - data.startTime;
                self.dispatch("update", data.elapsedTime);
                var alarms = data.alarms.filter(function (alarmTime) {
                    // 이미 알람을 발생한 경우
                    var isComplete = data.completeAlarms.some(function (cAlarmTime) { return cAlarmTime == alarmTime; });
                    if (isComplete) {
                        return false;
                    }
                    return alarmTime <= data.elapsedTime;
                });
                for (var i = 0; i < alarms.length; ++i) {
                    self.dispatch("alarm", data.elapsedTime);
                    data.completeAlarms.push(alarms[i]);
                }
            }
            data.rafId = requestAnimationFrame(frame);
            return true;
        };
        /**
         * @description
         * Pause the stopwatch.
         *
         * @example
         * ```js
         * // Pause the stopwatch.
         * stopwatch.pause();
         * ```
         *
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.pause = function () {
            var data = Const.dataManager.get(this);
            if (data.rafId == null) {
                return false;
            }
            if (data.paused === true) {
                return false;
            }
            data.paused = true;
            return true;
        };
        /**
         * @description
         * Stop the stopwatch.
         *
         * @example
         * ```js
         * // Stop the stopwatch.
         * stopwatch.stop();
         * ```
         *
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.stop = function () {
            var data = Const.dataManager.get(this);
            if (data.startTime == null) {
                return false;
            }
            cancelAnimationFrame(data.rafId);
            data.rafId = null;
            data.startTime = null;
            data.paused = false;
            data.completeAlarms = [];
            return true;
        };
        /**
         * @description
         * Get the elapsed time.
         *
         * @example
         * ```js
         * // Get the elapsed time.
         * const time = stopwatch.get();
         * ```
         *
         * @returns {number} elapsed time
         */
        Stopwatch.prototype.get = function () {
            var data = Const.dataManager.get(this);
            return data.elapsedTime;
        };
        /**
         * @description
         * Set an alarm.
         * When the alarm time comes, the stopwatch triggers an alarm event.
         *
         * @example
         * ```js
         * // Set an alarm. ( Default alarm type: Stopwatch.AlarmType.ABSOLUTE )
         * stopwatch.setAlarm( 3000 );
         * ```
         *
         * @example
         * ```js
         * // Set an alarm.
         * stopwatch.setAlarm( 3000, Stopwatch.AlarmType.RELATIVE );
         * ```
         *
         * @param {number} alarmTime Alarm time ( unit: ms )
         * @param {Stopwatch.AlarmType} [alarmType=Stopwatch.AlarmType.ABSOLUTE] Alarm type
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.setAlarm = function (alarmTime, alarmType) {
            if (alarmType === void 0) { alarmType = Stopwatch.AlarmType.ABSOLUTE; }
            var data = Const.dataManager.get(this);
            if (typeof alarmTime != "number") {
                return false;
            }
            if (alarmTime <= 0) {
                return false;
            }
            if (alarmType instanceof Stopwatch.AlarmType === false) {
                return false;
            }
            var time = this.get();
            alarmTime = alarmType.timeCalculation(time, alarmTime);
            data.alarms.push(alarmTime);
            /*
             * 이미 시간이 지난 알람의 경우, 완료처리
             * 이 알람은 재시작 시, 발생 가능
             */
            if (alarmTime < time) {
                data.completeAlarms.push(alarmTime);
            }
        };
        /**
         * @description
         * Get the set alarm list.
         *
         * @example
         * ```js
         * // Get the set alarm list.
         * const alarms = stopwatch.getAlarms();
         * ```
         *
         * @returns {number[]} alarm list
         */
        Stopwatch.prototype.getAlarms = function () {
            var data = Const.dataManager.get(this);
            return data.alarms;
        };
        /**
         * @description
         * All set alarms are cleared.
         *
         * @example
         * ```js
         * // All set alarms are cleared.
         * stopwatch.clearAlarm();
         * ```
         *
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.clearAlarm = function () {
            var data = Const.dataManager.get(this);
            data.alarms = [];
            data.completeAlarms = [];
            return true;
        };
        /**
         * @description
         * Register event callbacks.
         *
         * @example
         * ```js
         * // It is executed when the time is updated.
         * stopwatch.on( "update", ( ms ) => {
         *
         *     const seconds = ms / 1000;
         *     console.log( seconds.toFixed( 3 ) );
         *
         * } );
         * ```
         *
         * @param {StopwatchAlarmEvent} eventName Events to register for callbacks
         * @param {function} callback A callback to be executed when an event occurs
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.on = function (eventName, callback) {
            var data = Const.dataManager.get(this);
            var callbacks = data.event[eventName];
            // 등록가능한 이벤트명이 아님
            if (callbacks == null) {
                return false;
            }
            callbacks.push(callback);
            return true;
        };
        /**
         * @description
         * Remove the event callback.
         *
         * @example
         * ```js
         * // Remove all callbacks for a specific event
         * stopwatch.off( "alarm" );
         * ```
         *
         * @example
         * ```js
         * // Remove specific callbacks for specific events
         * stopwatch.off( "alarm", alarmListener );
         * ```
         * @param {StopwatchAlarmEvent} eventName Event to delete callback
         * @param {function} callback callback to delete
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.off = function (eventName, callback) {
            var data = Const.dataManager.get(this);
            // 모든 이벤트 삭제
            if (eventName == null) {
                for (eventName in data.event) {
                    data.event[eventName] = [];
                }
                return true;
            }
            // 특정 이벤트 삭제
            if (callback == null) {
                data.event[eventName] = [];
                return true;
            }
            // 특정 이벤트의 콜백 삭제
            var callbacks = data.event[eventName];
            var index = callbacks.indexOf(callback);
            callbacks.splice(index, 1);
            return true;
        };
        /**
         * @description
         * Dispatch events.
         * Used only inside a class.
         *
         * @example
         * ```js
         * // Dispatch events.
         * this.dispatch( "alarm", this.get() );
         * ```
         *
         * @param {StopwatchAlarmEvent} eventName Event to execute callback
         * @param {any} args Argument value to be passed to the callback
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.dispatch = function (eventName) {
            var _this = this;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var data = Const.dataManager.get(this);
            var callbacks = data.event[eventName];
            if (callbacks == null) {
                return false;
            }
            // execute callbacks
            callbacks.forEach(function (cb) { return cb.apply(_this, args); });
            return true;
        };
        /**
         * @description
         * Destroys the stopwatch object.
         * This means exempt from management, removing references to internal data that we manage internally.
         * t loses its function as a stopwatch.
         *
         * @example
         * ```js
         * // object destruction
         * stopwatch.destroy();
         * ```
         *
         * @returns {boolean} Whether to run
         */
        Stopwatch.prototype.destroy = function () {
            // 정지
            this.stop();
            // 이벤트 제거
            this.off();
            // 알람 제거
            this.clearAlarm();
            // 관리 제거
            Const.dataManager.remove(this);
            // 객체 원형정보 변경
            Object.setPrototypeOf(this, Object.prototype);
            return true;
        };
        /**
         * @description
         * Stopwatch alarm type.
         */
        Stopwatch.AlarmType = AlarmType;
        /**
         * @description
         * A utility object associated with degree.
         */
        Stopwatch.Degree = Degree;
        return Stopwatch;
    }());

    return Stopwatch;

}));
//# sourceMappingURL=Stopwatch.js.map
