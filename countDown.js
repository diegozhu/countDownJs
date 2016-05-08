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
				_currentCount : -1,
				finished : false,
				clear : function(){
					for(var i in this.handlers){
						clearTimeout(this.handlers[i]);
					}
					this.handlers = [];
					return this;
				},
				pause : function(){
					return this.clear();
				},
				resume : function(){
					if(this.finished)
						return this;
					if(this.handlers.length > 0){
						console.error("not paused");
						return this;
					}
					for(var i = this._currentCount+1;i<this._totalCount;i++){
						(function(time){
							var self = this;
							var a = setTimeout(function(){
								intervalFunc.call(self,time,self._totalCount,self._timespanMillisecond)
								self._currentCount = time;
							},timespanMillisecond*(time-this._currentCount-1));
							this.handlers.push(a);
						}).call(this,i);
					}
					var a = setTimeout(function(){
						endFunc(totalCount,totalCount,timespanMillisecond);
					},timespanMillisecond * (this._totalCount-this._currentCount));
					this.handlers.push(a);
					return this;
				},
				interrupt : function(){
					this.clear();
					this._endFunc(this._currentCount,this._totalCount,this._timespanMillisecond);
					return this;
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
			handler.finished = true;
			endFunc(totalCount,totalCount,timespanMillisecond);
		},timespanMillisecond * totalCount);
		handler.handlers.push(a);
		return handler;
	}
