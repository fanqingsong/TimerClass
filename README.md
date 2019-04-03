# a simple timer class of supporting setTimeout and setInterval function. 


#install and run 

```
// build TimerClass
npm run build

// to see the demo
cd example
npm run dev
```

# explain

usage code

```

const TimerClass = require("../../dist/timer.umd.js");

function DocWrite(str)
{
    console.log(str);

    var node=document.createElement("div");
    var textnode=document.createTextNode(str);
    node.appendChild(textnode);

    document.body.appendChild(node);
}

/* 未定时超时时间 */
var timer1 = new TimerClass(function(){
  DocWrite(this.getTimerID()+"-timer custom alarm -- 未定时超时时间");
});
timer1.start();
//timer1.stop();

/* 超时时间定制 */
var timer2 = new TimerClass(function(){
  DocWrite(this.getTimerID()+"-timer custom alarm -- 超时时间定制");
}, {timeout:4000});
timer2.start();

/* 循环执行 */
var timer3 = new TimerClass(function(){
  DocWrite(this.getTimerID()+"-timer custom alarm -- 循环执行");
}, {isInterval:true});
timer3.start();
```

# todo
if timer want to update one DOM， this timer must be tying to this DOM， wen dom destroy， this timer must destroy。
    for ajax to update another HTML scenario.
