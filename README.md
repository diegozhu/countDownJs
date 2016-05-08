# countDownJs
enhancement on javascript original interval , based on setTimeout

usage :

    var runTimes = 3 , timeInterval = 1000;
    countDown(startFunc,intervalFunc,endFunc,runTimes,timeInterval);
 

In web development , we usually need to use count down feature like sending text password, reading agreement lisence etc.

We use to do it below :

    var count = 10,handler;
    var $btn = $('button[name="sendMePassword"]');
    $btn.on('click',function(){
        $btn.prop('disabled',true).html('please waiting for '+(count)+' seconds');
        // call back end service
        $.get('sendpassword',function(){
            //ok function
            $btn.html('send ok');
        },function(res){
            clearInterval(handler);
            $btn.html('failed:'+res);
            $btn.prop('disabled',false);
        });
        // call back end service
        handler = setInterval(function(){
            $btn.html('please waiting for '+(count--)+' seconds');
            if(count ==0){
                $btn.prop('disabled',false);
                count = 10;
                clearInterval(handler);
            }
        })
    });

As you can see above , it's quite hard to read , too much vairables makes it easy to make mistake , not mention being accidently changed value by other js because count and handler are quite common varible names we used a lot.
most of your time is focus on how to implement the interval and not to make mistake , this is frastrating . 
    
How about compared with this:
    
    

    var $btn = $('button[name="sendMePassword"]');
    $btn.on('click',function(){
        var h = countDown(function(time,totalTime,timeInterval){      //begin
            $btn.prop('disabled',true).html('please waiting for '+totalTime+' seconds');
        },function(time,totalTime){      //every 1 second
            $btn.html('please waiting for '+(totalTime - time)+' seconds');
        },function(){        //end
            $btn.prop('disabled',false).html('click to send password');
        },10,1000);
        
        // call back end service
        $.get('sendpassword',function(){
            //ok function
            console.log('send ok');
        },function(res){
            h.interrupt(); //this will clear all and run endFunc
            console.log('failed:'+res);
        });
    });

countDown return an `handler` object
    
functions of handler:
    
`clear` : clear the interval

`interrupt` : end the interval immediatelly and run endfunc

`pause` : pause the interval loop

`resume` : resume the interval loop from where it is paused
    
`repeat` is not supported yet. Maybe in future feature.
