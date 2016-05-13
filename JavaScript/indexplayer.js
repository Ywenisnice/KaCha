// JavaScript Document
var $ID = function(id){
	return "string"==typeof id?document.getElementById(id):id;
}
var Class = {
	create:function(){
		return function(){
			this.initilize.apply(this,arguments);
		}
	}
}
var Bind = function(object,fun){
	var args = Array.prototype.slice.call(arguments,2);
	return function(){
		return fun.apply(object,args);
	}
}

var Flash = Class.create();
Flash.prototype = {
	initilize:function(contain){
		this.len = $ID(contain).getElementsByTagName("p")[0].getElementsByTagName("a").length;
		if(this.len<=1) return;
		this.width = $ID("banner_up_1").offsetWidth;
		this.cur = 1;
		if(this.len<=1) return;
		this.cur2 = 2;
		this.i = 0;
		this._fnRun = Bind(this,this.Run);
		this._fnRun2 = Bind(this,this.Run2);
		this.t = window.setTimeout(this._fnRun,2000);
	},
	Run:function(){
		if(this.i<=-(this.width/2)){
			this.i = -(this.width/2)
			$ID("banner_up_" + this.cur).style.left = this.i + "px";
			$ID("banner_up_" + this.cur2).style.left = -this.i + "px";
			$ID("banner_up_" + this.cur2).style.zIndex = parseInt($ID("banner_up_" + this.cur).style.zIndex) + this.len;
			this.t = window.setTimeout(this._fnRun2,5);
			return;
		}
		this.i-=6;
		$ID("banner_up_" + this.cur).style.left = this.i + "px";
		$ID("banner_up_" + this.cur2).style.left = Math.abs(this.i) + "px";
		this.t = window.setTimeout(this._fnRun,10);
	},
	Run2:function(){
		if(this.i>0){
			$ID("banner_down_" + this.cur).className = "";
			$ID("banner_down_" + this.cur2).className = "cur";
			$ID("banner_up_" + this.cur).style.left = $ID("banner_up_" + this.cur2).style.left = "0px";
			this.cur++;
			if(this.cur>this.len)
				this.cur = 1;
			this.cur2 = this.GetNext();
			$ID("banner_up_" + this.cur2).style.zIndex = parseInt($ID("banner_up_" + this.cur).style.zIndex)-1;
			this.t = window.setTimeout(this._fnRun,3000);
			return;
		}
		this.i+=6;
		$ID("banner_up_" + this.cur).style.left = this.i + "px";
		$ID("banner_up_" + this.cur2).style.left = -this.i + "px";
		this.t = window.setTimeout(this._fnRun2,10);
	},
	GetNext:function(){
		if(this.cur == this.len)
			return 1;
		else
			return this.cur + 1;
	}
}
onload = function(){
	new Flash("bannerImage");
}