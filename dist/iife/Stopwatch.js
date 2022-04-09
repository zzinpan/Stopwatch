var Stopwatch = (function () {
    'use strict';

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

    // 상수
    var Const = {
        stopwatchCapsules: {},
        getUniqueId: function () {
            return Date.now() + "" + Math.random() * 1000000000000000000;
        }
    };
    /*** docs 제외
     * 스탑워치 캡슐
     * @property {Stopwatch} stopwatch 스탑워치 객체
     * @property {number} startTime 시간 시작값
     * @property {number} time 현재 시간
     * @property {number} frameTime raf에서 반환되는 frame time
     * @property {boolean} paused 일시정지 여부
     * @property {number} rafId requestAnimationFrame 아이디
     * @property {object} event 이벤트 모듈
     * @property {number[]} alarms 등록된 알람 시간
     * @property {number[]} completeAlarms 완료된 알람 시간
     * @example
     * ```js
     * const stopwatch = new Stopwatch();
     * ```
     ***/
    var StopwatchCapsule = /** @class */ (function () {
        function StopwatchCapsule(stopwatch) {
            var capsule = this;
            // 스탑워치
            this.stopwatch = stopwatch;
            // 일시정지 여부
            this.paused = false;
            // 알람 설정 시간
            this.alarms = [];
            this.completeAlarms = [];
            // 이벤트 목록
            this.event = {
                // 콜백 목록
                update: [],
                alarm: [],
                execute: function ( /** name, args... */) {
                    var args = Array.prototype.slice.call(arguments);
                    var name = args.shift();
                    var callbacks = this[name];
                    // 콜백수행
                    callbacks.forEach(function (cb) { return cb.apply(capsule.stopwatch, args); });
                }
            };
        }
        return StopwatchCapsule;
    }());
    /**
     * 스탑워치 생성자
     * @constructor
     * @property {string|number} id 스탑워치 아이디
     * @example
     * ```js
     * // 객체 생성
     * const stopwatch = new Stopwatch();
     * ```
     */
    var Stopwatch = /** @class */ (function () {
        function Stopwatch() {
            var id = Const.getUniqueId();
            // 재할당, 삭제 불가능
            Object.defineProperty(this, "id", {
                configurable: false,
                enumerable: true,
                writable: false,
                value: id
            });
            var stopwatchCapsule = new StopwatchCapsule(this);
            Const.stopwatchCapsules[id] = stopwatchCapsule;
        }
        /**
         * @description 스탑워치 실행 시킵니다.
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 스탑워치 실행
         * stopwatch.start();
         * ```
         */
        Stopwatch.prototype.start = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            if (capsule.paused === true) {
                capsule.paused = false;
                return true;
            }
            // 현재 수행중인 경우, 다시 실행시킬 수 없음
            if (capsule.rafId != null) {
                return false;
            }
            function frame(time) {
                capsule.rafId = window.requestAnimationFrame(frame);
                if (capsule.startTime == null) {
                    capsule.startTime = time;
                }
                if (capsule.paused === true) {
                    capsule.startTime += time - capsule.frameTime;
                }
                capsule.frameTime = time;
                capsule.time = time - capsule.startTime;
                capsule.event.execute("update", capsule.time);
                var alarms = capsule.alarms.filter(function (alarmTime) {
                    // 이미 알람을 발생한 경우
                    var isComplete = capsule.completeAlarms.some(function (cAlarmTime) { return cAlarmTime == alarmTime; });
                    if (isComplete) {
                        return false;
                    }
                    return alarmTime <= capsule.time;
                });
                for (var i = 0; i < alarms.length; ++i) {
                    capsule.event.execute("alarm", capsule.time);
                    capsule.completeAlarms.push(alarms[i]);
                }
            }
            capsule.rafId = window.requestAnimationFrame(frame);
            return true;
        };
        /**
         * @description 스탑워치를 일시정지 시킵니다.
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 스탑워치 일시중지
         * stopwatch.pause();
         * ```
         */
        Stopwatch.prototype.pause = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            if (capsule.rafId == null) {
                return false;
            }
            if (capsule.paused === true) {
                return false;
            }
            capsule.paused = true;
            return true;
        };
        /**
         * @description 스탑워치를 중지 시킵니다.
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 스탑워치 중지
         * stopwatch.stop();
         * ```
         */
        Stopwatch.prototype.stop = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            if (capsule.startTime == null) {
                return false;
            }
            window.cancelAnimationFrame(capsule.rafId);
            capsule.rafId = null;
            capsule.startTime = null;
            capsule.paused = false;
            capsule.completeAlarms = [];
            return true;
        };
        /**
         * @description 현재시간을 반환합니다.
         * @returns {number} 현재시간(ms)
         * @example
         * ```js
         * // 스탑워치 시간 조회
         * const time = stopwatch.get();
         * ```
         */
        Stopwatch.prototype.get = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            return capsule.time;
        };
        /**
         * @description 알람을 설정합니다. 알람시간이 되면, 타이머에서 알람이벤트를 발생시킵니다.
         * @param {number} alarmTime 알람시간(ms)
         * @param {Stopwatch.AlarmType} [alarmType=Stopwatch.AlarmType.RELATIVE] 알람기준
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 알람 설정 ( 알람종류: Stopwatch.AlarmType.RELATIVE )
         * stopwatch.setAlarm( 3000 );
         * ```
         * @example
         * ```js
         * // 알람 설정
         * stopwatch.setAlarm( 3000, Stopwatch.AlarmType.ABSOLUTE );
         * ```
         */
        Stopwatch.prototype.setAlarm = function (alarmTime, alarmType) {
            if (alarmType === void 0) { alarmType = Stopwatch.AlarmType.RELATIVE; }
            var capsule = Const.stopwatchCapsules[this.id];
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
            /**
             * @todo 특정 인스턴스에 해당되는 필터는 제거 필요
             */
            if (alarmType === Stopwatch.AlarmType.ABSOLUTE &&
                alarmTime <= time) {
                return false;
            }
            alarmTime = alarmType.timeCalculation(time, alarmTime);
            capsule.alarms.push(alarmTime);
        };
        /**
         * @description 저장된 알람을 전달합니다.
         * @returns {number[]} 저장된 알람
         * @example
         * ```js
         * // 알람 조회
         * const alarms = stopwatch.getAlarms();
         * ```
         */
        Stopwatch.prototype.getAlarms = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            return capsule.alarms;
        };
        /**
         * @description 설정된 모든 알람이 제거 됩니다.
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 알람 초기화
         * stopwatch.clearAlarm();
         * ```
         */
        Stopwatch.prototype.clearAlarm = function () {
            var capsule = Const.stopwatchCapsules[this.id];
            capsule.alarms = [];
            capsule.completeAlarms = [];
            return true;
        };
        /**
         * @description 이벤트 콜백을 등록합니다.
         * @param {string} eventName 등록할 이벤트명 ( 'update', 'alarm' )
         * @param {function} callback 이벤트 발생 시, 수행될 콜백함수
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 시간이 갱신되면, 호출
         * stopwatch.on( "update", ( ms ) => {
         *
         *     const seconds = ms / 1000;
         *     console.log( seconds.toFixed( 3 ) );
         *
         * } );
         * ```
         */
        Stopwatch.prototype.on = function (eventName, callback) {
            var capsule = Const.stopwatchCapsules[this.id];
            var callbacks = capsule.event[eventName];
            // 등록가능한 이벤트명이 아님
            if (callbacks == null) {
                return false;
            }
            callbacks.push(callback);
            return true;
        };
        /**
         * @description 이벤트 콜백을 삭제합니다.
         * @param {string} eventName 삭제할 이벤트명 ( 'update', 'alarm' )
         * @param {function} callback 삭제할 콜백함수
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 특정 이벤트의 모든 콜백 제거
         * stopwatch.off( "alarm" );
         * ```
         * @example
         * ```js
         * // 특정 이벤트의 특정 콜백 제거
         * stopwatch.off( "alarm", alarmListener );
         * ```
         */
        Stopwatch.prototype.off = function (eventName, callback) {
            var capsule = Const.stopwatchCapsules[this.id];
            // 모든 이벤트 삭제
            if (eventName == null) {
                for (eventName in capsule.event) {
                    capsule.event[eventName] = [];
                }
                return true;
            }
            // 특정 이벤트 삭제
            if (callback == null) {
                capsule.event[eventName] = [];
                return true;
            }
            // 특정 이벤트의 콜백 삭제
            var callbacks = capsule.event[eventName];
            var index = callbacks.indexOf(callback);
            callbacks.splice(index, 1);
            return true;
        };
        /**
         * @description 객체를 파괴합니다.
         * 파괴된 객체는 캡슐 관리에서 제외되고, Stopwatch의 기능을 잃어버립니다.
         * @returns {boolean} 명령 수행 여부
         * @example
         * ```js
         * // 객체 파괴
         * stopwatch.destroy();
         * ```
         */
        Stopwatch.prototype.destroy = function () {
            // 정지
            this.stop();
            // 이벤트 제거
            this.off();
            // 알람 제거
            this.clearAlarm();
            // 관리 제거
            delete Const.stopwatchCapsules[this.id];
            // 객체 원형정보 변경
            Object.setPrototypeOf(this, Object.prototype);
            return true;
        };
        Stopwatch.AlarmType = AlarmType;
        Stopwatch.Degree = Degree;
        return Stopwatch;
    }());

    return Stopwatch;

})();
