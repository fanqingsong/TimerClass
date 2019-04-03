(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/***************************************************************************
*  Description: 类的构造函数
*  Parameter： fnAlarmIn -- 定时器到期后执行函数
                options -- 扩展参数对象， 可设置 
                    options.timeout -- 定时时间
                    options.isInterval -- 是否间隔执行
*  Changes:
****************************************************************************/
function timer(fnAlarmIn, options) {
    /* ----- 类可配置参数 ----- */
    this.timeout = 1000;
    this.isInterval = false;
    this.fnAlarm = undefined;

    /* ----- 类内部变量 ------ */
    this.timerHandle = undefined;

    /* 定时结束回调函数 */
    if (fnAlarmIn && typeof fnAlarmIn == "function") {
        this.fnAlarm = fnAlarmIn;
    }

    /* 超时时间设置 */
    if (options && (typeof options === "undefined" ? "undefined" : _typeof(options)) == "object") {
        this.timeout = options.timeout || this.timeout;
        this.isInterval = options.isInterval || this.isInterval;
    }
}

/***************************************************************************
*  Description: 定时器原型定义
*  Changes:
****************************************************************************/
timer.prototype = {
    start: function start() {
        this.timerHandle = setTimeout(function () {
            console.log(this.getTimerID() + "-->timer triggered");

            /* 处理回调函数处理 */
            if (this.fnAlarm) {
                // this. 保证fnAlarm函数中 this 指代定时器对象
                this.fnAlarm();
            }

            /* 定时器销毁 */
            this.stop();

            /* 如果支持间隔执行，则再次启动定时器 */
            if (this.isInterval) {
                this.start();
            }
            // bind 保证此函数中this指代定时器对象
        }.bind(this), this.timeout);

        console.log(this.getTimerID().toString() + "-timer started");
    },
    stop: function stop() {
        console.log(this.getTimerID().toString() + "-timer destroyed");

        clearTimeout(this.timerHandle);

        this.timerHandle = undefined;
    },
    getTimerID: function getTimerID() {
        return this.timerHandle;
    }
};

timer.prototype.constructor = timer;

/***************************************************************************
*  Description: bind interface Polyfill by MDN，
        为定时器回调函数使用this表示定时器对象引入
        recite form :https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
*  Changes:
****************************************************************************/
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function fNOP() {},
            fBound = function fBound() {
            return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

module.exports = timer;

/***/ })
/******/ ]);
});