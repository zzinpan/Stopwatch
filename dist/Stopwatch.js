import AlarmType from "./Stopwatch.AlarmType.js";
import Degree from "./Stopwatch.Degree.js";
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
 * @example
 * // 객체 생성
 * const stopwatch = new Stopwatch();
 * @property {string|number} id 스탑워치 아이디
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
     * @example
     * // 스탑워치 실행
     * stopwatch.start();
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 스탑워치 일시중지
     * stopwatch.pause();
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 스탑워치 중지
     * stopwatch.stop();
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 스탑워치 시간 조회
     * const time = stopwatch.get();
     * @returns {number} 현재시간(ms)
     */
    Stopwatch.prototype.get = function () {
        var capsule = Const.stopwatchCapsules[this.id];
        return capsule.time;
    };
    /**
     * @description 알람을 설정합니다. 알람시간이 되면, 타이머에서 알람이벤트를 발생시킵니다.
     * @example
     * // 알람 설정 ( 알람종류: Stopwatch.AlarmType.RELATIVE )
     * stopwatch.setAlarm( 3000 );
     * @example
     * // 알람 설정
     * stopwatch.setAlarm( 3000, Stopwatch.AlarmType.ABSOLUTE );
     * @param {number} alarmTime 알람시간(ms)
     * @param {Stopwatch.AlarmType} [alarmType=Stopwatch.AlarmType.RELATIVE] 알람기준
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 알람 조회
     * const alarms = stopwatch.getAlarms();
     * @returns {number[]} 저장된 알람
     */
    Stopwatch.prototype.getAlarms = function () {
        var capsule = Const.stopwatchCapsules[this.id];
        return capsule.alarms;
    };
    /**
     * @description 설정된 모든 알람이 제거 됩니다.
     * @example
     * // 알람 초기화
     * stopwatch.clearAlarm();
     * @returns {boolean} 명령 수행 여부
     */
    Stopwatch.prototype.clearAlarm = function () {
        var capsule = Const.stopwatchCapsules[this.id];
        capsule.alarms = [];
        capsule.completeAlarms = [];
        return true;
    };
    /**
     * @description 이벤트 콜백을 등록합니다.
     * @example
     * // 시간이 갱신되면, 호출
     * stopwatch.on( "update", ( ms ) => {
     *
     *     const seconds = ms / 1000;
     *     console.log( seconds.toFixed( 3 ) );
     *
     * } );
     * @param {string} eventName 등록할 이벤트명 ( 'update', 'alarm' )
     * @param {function} callback 이벤트 발생 시, 수행될 콜백함수
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 모든 콜백 제거
     * stopwatch.off();
     * @example
     * // 특정 이벤트의 모든 콜백 제거
     * stopwatch.off( "alarm" );
     * @example
     * // 특정 이벤트의 특정 콜백 제거
     * stopwatch.off( "alarm", alarmListener );
     * @param {string} eventName 삭제할 이벤트명 ( 'update', 'alarm' )
     * @param {function} callback 삭제할 콜백함수
     * @returns {boolean} 명령 수행 여부
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
     * @example
     * // 객체 파괴
     * stopwatch.destroy();
     * @returns {boolean} 명령 수행 여부
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
export default Stopwatch;
//# sourceMappingURL=Stopwatch.js.map