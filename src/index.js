/***************************************************************************
*  Description: 类的构造函数
*  Parameter： fnAlarmIn -- 定时器到期后执行函数
                options -- 扩展参数对象， 可设置 
                    options.timeout -- 定时时间
                    options.isInterval -- 是否间隔执行
*  Changes:
****************************************************************************/
function timer(fnAlarmIn, options)
{
    /* ----- 类可配置参数 ----- */
    this.timeout = 1000;
    this.isInterval = false;
    this.fnAlarm = undefined;
    
    /* ----- 类内部变量 ------ */
    this.timerHandle = undefined;
    
    /* 定时结束回调函数 */
    if ( fnAlarmIn && typeof fnAlarmIn == "function" )
    {
        this.fnAlarm = fnAlarmIn;
    }

    /* 超时时间设置 */
    if ( options && typeof options == "object" )
    {
        this.timeout = options.timeout || this.timeout;
        this.isInterval = options.isInterval || this.isInterval;
    }
}

/***************************************************************************
*  Description: 定时器原型定义
*  Changes:
****************************************************************************/
timer.prototype = {
    start : function(){
        this.timerHandle = setTimeout(function(){
            console.log(this.getTimerID() + "-->timer triggered");

            /* 处理回调函数处理 */
            if ( this.fnAlarm )
            {
                // this. 保证fnAlarm函数中 this 指代定时器对象
                this.fnAlarm();
            }

            /* 定时器销毁 */
            this.stop();

            /* 如果支持间隔执行，则再次启动定时器 */
            if ( this.isInterval )
            {
                this.start();
            }
        // bind 保证此函数中this指代定时器对象
        }.bind(this), this.timeout); 

        console.log(this.getTimerID() .toString() + "-timer started");
    },
    stop : function(){
        console.log(this.getTimerID().toString() + "-timer destroyed");

        clearTimeout(this.timerHandle);

        this.timerHandle = undefined;
    },
    getTimerID : function(){
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
    Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
        // closest thing possible to the ECMAScript 5
        // internal IsCallable function
        throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                    ? this
                    : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
    };
}

module.exports = timer;

