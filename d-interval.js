function dInterval(beginFunc,endFunc,intervalFunc,intervalCount,timespanMillisecond){
		beginFunc = typeof beginFunc == "function" ? beginFunc : function(){};
		endFunc = typeof endFunc == "function" ? endFunc : function(){};
		intervalFunc = typeof intervalFunc == "function" ? intervalFunc : function(){};
		intervalCount = typeof intervalCount == "string" ? parseInt(intervalCount) : intervalCount;
		timespanMillisecond = typeof timespanMillisecond == "string" ? parseInt(timespanMillisecond) : timespanMillisecond;
		intervalCount = intervalCount > 1 ? intervalCount : 5;
		timespanMillisecond = timespanMillisecond > 0 ? timespanMillisecond : 1000;
		var handler = {
				handlers : [],
				clear : function(){
					for(var i in this.handlers){
						clearTimeout(this.handlers[i]);
					}
				}
		};
		for(var i = 0;i<intervalCount;i++){
			(function(time){
				var a = setTimeout(function(){
					intervalFunc(time,intervalCount,timespanMillisecond)
				},timespanMillisecond*(time+1));
				handler.handlers.push(a);
			})(i);
		}
		var a = setTimeout(function(){
			beginFunc(-1,intervalCount,timespanMillisecond);
		},0);
		handler.handlers.push(a);
		a = setTimeout(function(){
			endFunc(intervalCount,intervalCount,timespanMillisecond);
		},timespanMillisecond*(intervalCount));
		handler.handlers.push(a);
		return handler
	}
