# d-Interval
enhancement on javascript original interval

usage :

    var runTimes = 3 , timeInterval = 1000;
    dInterval(function(){
        console.log('this is start function.');
    },function(){
        console.log('this is end function.');
    },function(){
        console.log('this is interval function.');
    },runTimes,timeInterval);
  
  output:
  
    this is start function.
    this is interval function.(every 1 second)
    this is interval function.
    this is interval function.
    this is end function.
  
  dInterval return an handler which you can call `handler.clear` to clear the interval.
  
  `handler.stop/start/restart/repeat` is not supported yet. Maybe in future feature.
