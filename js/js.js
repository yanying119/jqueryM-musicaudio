$(document).on("pageinit","#index",function(){

	var setList = {
		musicBox:$("#listview"),
		musicData:musicLise,
		newArrayIndex:0,
		musicIndex:0,
		isOneMusic:false,
		isRandomMusic:false,
		getHTML:function() { //创建音乐列表加入页面

			var musicList = [];
			
			for (var p in this.musicData) {

				var me = this.musicData[p];
				var _html = '<li><a herf="#"><img src="./img/'+me.img+'.jpg" art="'+me.name+'">'+
						'<p>歌名：'+me.name+'</p>'+
						'<p>歌手：'+me.autor+'</p>'+
						'<p class="ui-li-aside">'+me.times+'</p>'+
						'</a></li>';

				musicList.push(_html);

			}

			return musicList;
		},
		getMucisName:function(){//获得所有音乐的信息

			var musicName = [];

			for (var p in this.musicData) {

				var me = this.musicData[p];
				musicName.push(me.name);
			}
			return musicName;
		},
		getNewA:function(i){//获得前i个音乐的信息

			var newArray = this.getHTML().slice(0,i);

			this.newArrayIndex = newArray.length;
			return newArray;
		},
		playMusic:function(i){//播放音乐

			var _src = './music/'+this.getMucisName()[i]+".mp3";
			$("#audio").attr({src:_src,autoplay:"autoplay"});

			if(this.isOneMusic){
				this.autoPlayList(i);
			}else if(this.isRandomMusic){
				var n = Math.random();
				var i = Math.round(n*this.newArrayIndex);
				this.autoPlayList(i);
			}else{
				this.autoPlayList(i+1);
			}
		},
		autoPlayList:function(i){

			var isPlayEnd = document.getElementById('audio'),
				_this = this;

			isPlayEnd.addEventListener("ended",function(){
				if(i>=_this.newArrayIndex){
					i=0;
				}
				_this.playMusic(i);
			},false);
		},
		appendList:function(i){//动态加载音乐列表
			var a = this.newArrayIndex,
				b = this.getHTML().length,
				_this = this; 

			this.musicBox.html("");
			this.musicBox.append(this.getNewA(i).join(""));
			this.musicBox.listview("refresh");

			if (a==b){
				$("#downmore").html("已经全部加载完")
			}else{
				$("#downmore").html("加载更多...");
			};

			$("#listview").find("a").click(function(){
				_this.musicIndex = $(this).parent().index();
				_this.playMusic(_this.musicIndex);
			})
		},
		eventBind:function(){ //绑定事件
			var _this = this;

			$("#downmore").click(function(){
				_this.newArrayIndex = _this.newArrayIndex+4;
				if (_this.newArrayIndex>_this.getHTML().length){
					_this.newArrayIndex = _this.getHTML().length;
				}
				_this.appendList(_this.newArrayIndex);
			});

			$("#pre").click(function(){
				if(_this.musicIndex>0){
					_this.musicIndex = _this.musicIndex - 1;
					
				}else{
					_this.musicIndex = _this.musicIndex;
					alert("前面没有啦、别点啦");
				};
				
				_this.playMusic(_this.musicIndex);
			});

			$("#next").click(function(){
				if(_this.musicIndex<(_this.newArrayIndex-1)){

					_this.musicIndex = _this.musicIndex + 1;
				}else{

					_this.musicIndex = _this.musicIndex;
					alert("后面没有啦、别点啦");
				};
				
				_this.playMusic(_this.musicIndex);
			});

			$("#playfun").click(function(){
				var text = $(this).text();
				if(text == "列表播放"){
					$(this).text("单曲循环");
					_this.isOneMusic = true;
					_this.isRandomMusic = false;
				}else if(text == "单曲循环"){
					$(this).text("随机播放");
					_this.isOneMusic = false;
					_this.isRandomMusic = true;
				}else{
					$(this).text("列表播放");
					_this.isOneMusic = false;
					_this.isRandomMusic = false;
				}
			});
		},
		init:function(){//初始化方法
			this.eventBind();
			this.appendList(4);
			this.autoPlayList();
		}
	};

	setList.init();

});