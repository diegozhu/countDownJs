function countDown(beginFunc,endFunc,intervalFunc,totalCount,timespanMillisecond){
		beginFunc = typeof beginFunc == "function" ? beginFunc : function(){};
		endFunc = typeof endFunc == "function" ? endFunc : function(){};
		intervalFunc = typeof intervalFunc == "function" ? intervalFunc : function(){};
		totalCount = typeof totalCount == "string" ? parseInt(totalCount) : totalCount;
		timespanMillisecond = typeof timespanMillisecond == "string" ? parseInt(timespanMillisecond) : timespanMillisecond;
		totalCount = totalCount > 1 ? totalCount : 5;
		timespanMillisecond = timespanMillisecond > 0 ? timespanMillisecond : 1000;
		var handler = {
				handlers : [],
				_beginFunc : beginFunc,
				_intervalFunc : intervalFunc,
				_endFunc : endFunc,
				_totalCount : totalCount,
				_timespanMillisecond : timespanMillisecond,
				_currentCount : 0,
				clear : function(){
					for(var i in this.handlers){
						clearTimeout(this.handlers[i]);
					}
				},
				interrupt : function(){
					this.clear();
					this._endFunc(this._currentCount,this._totalCount,this._timespanMillisecond);
				}
		};
		for(var i = 0;i<totalCount;i++){
			(function(time){
				var a = setTimeout(function(){
					intervalFunc.call(handler,time,totalCount,timespanMillisecond)
					handler._currentCount = time;
				},timespanMillisecond*(time+1));
				handler.handlers.push(a);
			})(i);
		}
		setTimeout(function(){
			beginFunc.call(handler,-1,totalCount,timespanMillisecond);
		},0);
		var a = setTimeout(function(){
			endFunc(totalCount,totalCount,timespanMillisecond);
		},timespanMillisecond * totalCount);
		handler.handlers.push(a);
		return handler;
	}
