GUI.Timer = function(gui) {
	
	var _this = this;
	
	this.gui = gui;
	this.gui.timer = this;
	
	var playhead = 0;
	var lastPlayhead = 0;
	var playListeners = [];
	var windowListeners = [];
	
	var windowMin = 0;
	var windowWidth = 10000;
	
	var thisTime;
	var lastTime;
	
	var playInterval = -1;
	var playResolution = 1000/60;
	
	var playing = false;
	
	var millis = function() {
		var d = new Date();
		return d.getTime();
	}
	
	this.__defineGetter__("windowMin", function() {
		return windowMin;
	});
	
	this.__defineSetter__("windowMin", function(v) {
		windowMin = v;
		for (var i in windowListeners) {
			windowListeners[i].call(windowListeners[i]);
		}
	});
	
	this.__defineGetter__("windowWidth", function() {
		return windowWidth;
	});
	
	
	this.__defineSetter__("windowWidth", function(v) {
		windowWidth = v;
		for (var i in windowListeners) {
			windowListeners[i].call(windowListeners[i]);
		}
	});
	
	this.__defineGetter__("playhead", function() {
		return playhead;
	});
	
	this.__defineSetter__("playhead", function(t) {
		lastPlayhead = playhead;
		playhead = t;
		for (var i = 0; i < playListeners.length; i++) {
			playListeners[i].call(this, playhead, lastPlayhead);
		}
	});
	
	this.__defineGetter__("playing", function() {
		return playing;
	});
	
	this.play = function() {
		playing = true;
		lastTime = millis();
		if (playInterval == -1) {
			playInterval = setInterval(this.update, playResolution);
		}
	};
	
	this.update = function() {
		thisTime = millis();
		_this.playhead = _this.playhead + (thisTime - lastTime);
		lastTime = thisTime;
	};
	
	this.pause = function() {
		playing = false;
		clearInterval(playInterval);
		playInterval = -1;
	};
	
	this.playPause = function() {
		if (playing) {
			this.pause();
		} else {
			this.play();
		}
	}
	
	
	this.stop = function() {
		this.pause();
		this.playhead = 0;
	};
	
	this.addPlayListener = function(fnc) {
		playListeners.push(fnc);
	};
	
	this.addWindowListener = function(fnc) {
		windowListeners.push(fnc);
	};
		
}