// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license
const rAF: any = "requestAnimationFrame";
const cAF: any = "cancelAnimationFrame";

let _this: any = this;

// esm
if( _this == null ){
    _this = {};
}

const vendors: string[] = ['ms', 'moz', 'webkit', 'o'];
let lastTime: number = 0;
let x: number;

for (x = 0; x < vendors.length && !_this[rAF]; ++x) {
    _this[rAF] = _this[vendors[x] + 'RequestAnimationFrame'];
    _this[cAF] = _this[vendors[x] + 'CancelAnimationFrame']
        || _this[vendors[x] + 'CancelRequestAnimationFrame'];
}

if (!_this[rAF]) {
    _this[rAF] = function ( callback: Function ) {

        const currTime = Date.now(),
        
        timeToCall = Math.max(0, 16 - (currTime - lastTime)),
        id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;

        return id;
    };
}

if (!_this[cAF]) {
    _this[cAF] = function ( id: number ) {
        clearTimeout( id );
    };
}

let requestAnimationFrame = _this[ rAF ];
let cancelAnimationFrame = _this[ cAF ];


export { requestAnimationFrame, cancelAnimationFrame };
