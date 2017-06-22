(function(window){
	var Progress = function(opts) {
		this.init(opts);
	}

	Progress.prototype = {
		constructor:Progress,

		//初始化
		init: function(opts) {

			var configs = {
				height:opts.height || 5,
				bgColor: opts.bgColor || '#64e7fc'
			};
			this.createEl(configs);
			this.movePg();
		},

		//页面中创建元素
		createEl:function(conf) {
			this.pgWrap = document.createElement('div');
			this.pg = document.createElement('div');
			this.pgWrap.setAttribute("class", "pg-wrapper");
			this.pg.setAttribute("id","pg");
			this.pg.style.height = conf.height+'px';
			this.pg.style.backgroundColor = conf.bgColor;
			this.pgWrap.appendChild(this.pg);

			document.body.append(this.pgWrap);
		},

		//进度管理
		movePg: function() {
			var percent = 1;
			var random = function(max, min) {
				return Math.floor(Math.random()*(max-min+1)+ min);
			};
			var that = this;
			var onPg = function() {
				var ran = random(30,10);

				setTimeout(function() {
					if(window.loaded) {
						this.pg.style.width ='100%';
						setTimeout(function(){
							that.pgWrap.style.display = "none";
						},800)
						return;
					}

					percent+=random(3,1);

					if(percent >97) {
						percent = 97;
					}

					this.pg.style.width = percent+'%';
					onPg();
				},ran);
			};

			onPg();

			window.onload = function() {
				window.loaded = true;
			}
 		}
	}

	window.Progress = Progress;
}(window))
