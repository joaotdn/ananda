/*
* jPreLoader - jQuery plugin
* Create a Loading Screen to preload images and content for you website
*
* Name:			jPreLoader.js
* Author:		Kenny Ooi - http://www.inwebson.com
* Date:			July 11, 2012		
* Version:		2.1
* Example:		http://www.inwebson.com/demo/jpreloader-v2/
*	
*/

(function($) {
	var items = new Array(),
		errors = new Array(),
		onComplete = function() {},
		current = 0;
	
	var jpreOptions = {
		splashVPos: '35%',
		loaderVPos: '75%',
		splashID: '#jpreContent',
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		closeBtnText: 'Start!',
		onetimeLoad: false,
		debugMode: false,
		splashFunction: function() {}
	}
	
	//cookie
	var getCookie = function() {
		if( jpreOptions.onetimeLoad ) {
			var cookies = document.cookie.split('; ');
			for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
				if ((parts.shift()) === "jpreLoader") {
					return (parts.join('='));
				}
			}
			return false;
		} else {
			return false;
		}
		
	}
	var setCookie = function(expires) {
		if( jpreOptions.onetimeLoad ) {
			var exdate = new Date();
			exdate.setDate( exdate.getDate() + expires );
			var c_value = ((expires==null) ? "" : "expires=" + exdate.toUTCString());
			document.cookie="jpreLoader=loaded; " + c_value;
		}
	}
	
	//create jpreLoader UI
	var createContainer = function() {
		
		jOverlay = $('<div></div>')
		.attr('id', 'jpreOverlay')
		.css({
			position: "fixed",
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 9999999
		})
		.appendTo('body');
		
		if(jpreOptions.showSplash) {
			jContent = $('<div></div>')
			.attr('id', 'jpreSlide')
			.appendTo(jOverlay);
			
			var conWidth = $(window).width() - $(jContent).width();
			$(jContent).css({
				position: "absolute",
				top: jpreOptions.splashVPos,
				left: Math.round((50 / $(window).width()) * conWidth) + '%'
			});
			$(jContent).html($(jpreOptions.splashID).wrap('<div/>').parent().html());
			$(jpreOptions.splashID).remove();
			jpreOptions.splashFunction()			
		}
		
		jLoader = $('<div></div>')
		.attr('id', 'jpreLoader')
		.appendTo(jOverlay);
		
		var posWidth = $(window).width() - $(jLoader).width();
		$(jLoader).css({
			position: 'absolute',
			top: jpreOptions.loaderVPos,
			left: Math.round((50 / $(window).width()) * posWidth) + '%'
		});
		
		jBar = $('<div></div>')
		.attr('id', 'jpreBar')
		.css({
			width: '0%',
			height: '100%'
		})
		.appendTo(jLoader);
		
		if(jpreOptions.showPercentage) {
			jPer = $('<div></div>')
			.attr('id', 'jprePercentage')
			.css({
				position: 'relative',
				height: '100%'
			})
			.appendTo(jLoader)
			.html('Loading...');
		}
		if( !jpreOptions.autoclose ) {
			jButton = $('<div></div>')
			.attr('id', 'jpreButton')
			.on('click', function() {
				loadComplete();
			})
			.css({
				position: 'relative',
				height: '100%'
			})
			.appendTo(jLoader)
			.text(jpreOptions.closeBtnText)
			.hide();
		}
	}
	
	//get all images from css and <img> tag
	var getImages = function(element) {
		$(element).find('*:not(script)').each(function() {
			var url = "";

			if ($(this).css('background-image').indexOf('none') == -1 && $(this).css('background-image').indexOf('-gradient') == -1) {
				url = $(this).css('background-image');
				if(url.indexOf('url') != -1) {
					var temp = url.match(/url\((.*?)\)/);
					url = temp[1].replace(/\"/g, '');
				}
			} else if ($(this).get(0).nodeName.toLowerCase() == 'img' && typeof($(this).attr('src')) != 'undefined') {
				url = $(this).attr('src');
			}
			
			if (url.length > 0) {
				items.push(url);
			}
		});
	}
	
	//create preloaded image
	var preloading = function() {
		for (var i = 0; i < items.length; i++) {
			if(loadImg(items[i]));
		}
	}
	var loadImg = function(url) {
		var imgLoad = new Image();
		$(imgLoad)
		.load(function() {
			completeLoading();
		})
		.error(function() {
			errors.push($(this).attr('src'));
			completeLoading();
		})
		.attr('src', url);
	}
	
	//update progress bar once image loaded
	var completeLoading = function() {
		current++;

		var per = Math.round((current / items.length) * 100);
		$(jBar).stop().animate({
			width: per + '%'
		}, 500, 'linear');
		
		if(jpreOptions.showPercentage) {
			$(jPer).text(per+"%");
		}
		
		//if all images loaded
		if(current >= items.length) {
			current = items.length;
			setCookie();	//create cookie
			
			if(jpreOptions.showPercentage) {
				$(jPer).text("100%");
			}
			
			//fire debug mode
			if (jpreOptions.debugMode) {
				var error = debug();
			}
			
			
			//max progress bar
			$(jBar).stop().animate({
				width: '100%'
			}, 500, 'linear', function() {
				//autoclose on
				if( jpreOptions.autoClose )
					loadComplete();
				else
					$(jButton).fadeIn(1000);
			});	
		}	
	}
	
	//triggered when all images are loaded
	var loadComplete = function() {
		$(jOverlay).fadeOut(800, function() {
			$(jOverlay).remove();
			onComplete();	//callback function
		});
	}
	
	//debug mode
	var debug = function() {
		if(errors.length > 0) {
			var str = 'ERROR - IMAGE FILES MISSING!!!\n\r'
			str	+= errors.length + ' image files cound not be found. \n\r';	
			str += 'Please check your image paths and filenames:\n\r';
			for (var i = 0; i < errors.length; i++) {
				str += '- ' + errors[i] + '\n\r';
			}
			return true;
		} else {
			return false;
		}
	}
	
	$.fn.jpreLoader = function(options, callback) {
        if(options) {
            $.extend(jpreOptions, options );
        }
		if(typeof callback == 'function') {
			onComplete = callback;
		}
		
		//show preloader once JS loaded
		$('body').css({
			'display': 'block'
		});
		
		return this.each(function() {
			if( !(getCookie()) ) {
				createContainer();
				getImages(this);
				preloading();
			}
			else {	//onetime load / cookie is set
				$(jpreOptions.splashID).remove();
				onComplete();
			}
		});
    };

})(jQuery);

/*!
* jQuery Cycle2; version: 2.1.5 build: 20140415
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
!function(a){"use strict";function b(a){return(a||"").toLowerCase()}var c="2.1.5";a.fn.cycle=function(c){var d;return 0!==this.length||a.isReady?this.each(function(){var d,e,f,g,h=a(this),i=a.fn.cycle.log;if(!h.data("cycle.opts")){(h.data("cycle-log")===!1||c&&c.log===!1||e&&e.log===!1)&&(i=a.noop),i("--c2 init--"),d=h.data();for(var j in d)d.hasOwnProperty(j)&&/^cycle[A-Z]+/.test(j)&&(g=d[j],f=j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),i(f+":",g,"("+typeof g+")"),d[f]=g);e=a.extend({},a.fn.cycle.defaults,d,c||{}),e.timeoutId=0,e.paused=e.paused||!1,e.container=h,e._maxZ=e.maxZ,e.API=a.extend({_container:h},a.fn.cycle.API),e.API.log=i,e.API.trigger=function(a,b){return e.container.trigger(a,b),e.API},h.data("cycle.opts",e),h.data("cycle.API",e.API),e.API.trigger("cycle-bootstrap",[e,e.API]),e.API.addInitialSlides(),e.API.preInitSlideshow(),e.slides.length&&e.API.initSlideshow()}}):(d={s:this.selector,c:this.context},a.fn.cycle.log("requeuing slideshow (dom not ready)"),a(function(){a(d.s,d.c).cycle(c)}),this)},a.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var b=this.opts(),c=b.slides;b.slideCount=0,b.slides=a(),c=c.jquery?c:b.container.find(c),b.random&&c.sort(function(){return Math.random()-.5}),b.API.add(c)},preInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-pre-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.preInit)&&c.preInit(b),b._preInitialized=!0},postInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-post-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.postInit)&&c.postInit(b)},initSlideshow:function(){var b,c=this.opts(),d=c.container;c.API.calcFirstSlide(),"static"==c.container.css("position")&&c.container.css("position","relative"),a(c.slides[c.currSlide]).css({opacity:1,display:"block",visibility:"visible"}),c.API.stackSlides(c.slides[c.currSlide],c.slides[c.nextSlide],!c.reverse),c.pauseOnHover&&(c.pauseOnHover!==!0&&(d=a(c.pauseOnHover)),d.hover(function(){c.API.pause(!0)},function(){c.API.resume(!0)})),c.timeout&&(b=c.API.getSlideOpts(c.currSlide),c.API.queueTransition(b,b.timeout+c.delay)),c._initialized=!0,c.API.updateView(!0),c.API.trigger("cycle-initialized",[c]),c.API.postInitSlideshow()},pause:function(b){var c=this.opts(),d=c.API.getSlideOpts(),e=c.hoverPaused||c.paused;b?c.hoverPaused=!0:c.paused=!0,e||(c.container.addClass("cycle-paused"),c.API.trigger("cycle-paused",[c]).log("cycle-paused"),d.timeout&&(clearTimeout(c.timeoutId),c.timeoutId=0,c._remainingTimeout-=a.now()-c._lastQueue,(c._remainingTimeout<0||isNaN(c._remainingTimeout))&&(c._remainingTimeout=void 0)))},resume:function(a){var b=this.opts(),c=!b.hoverPaused&&!b.paused;a?b.hoverPaused=!1:b.paused=!1,c||(b.container.removeClass("cycle-paused"),0===b.slides.filter(":animated").length&&b.API.queueTransition(b.API.getSlideOpts(),b._remainingTimeout),b.API.trigger("cycle-resumed",[b,b._remainingTimeout]).log("cycle-resumed"))},add:function(b,c){var d,e=this.opts(),f=e.slideCount,g=!1;"string"==a.type(b)&&(b=a.trim(b)),a(b).each(function(){var b,d=a(this);c?e.container.prepend(d):e.container.append(d),e.slideCount++,b=e.API.buildSlideOpts(d),e.slides=c?a(d).add(e.slides):e.slides.add(d),e.API.initSlide(b,d,--e._maxZ),d.data("cycle.opts",b),e.API.trigger("cycle-slide-added",[e,b,d])}),e.API.updateView(!0),g=e._preInitialized&&2>f&&e.slideCount>=1,g&&(e._initialized?e.timeout&&(d=e.slides.length,e.nextSlide=e.reverse?d-1:1,e.timeoutId||e.API.queueTransition(e)):e.API.initSlideshow())},calcFirstSlide:function(){var a,b=this.opts();a=parseInt(b.startingSlide||0,10),(a>=b.slides.length||0>a)&&(a=0),b.currSlide=a,b.reverse?(b.nextSlide=a-1,b.nextSlide<0&&(b.nextSlide=b.slides.length-1)):(b.nextSlide=a+1,b.nextSlide==b.slides.length&&(b.nextSlide=0))},calcNextSlide:function(){var a,b=this.opts();b.reverse?(a=b.nextSlide-1<0,b.nextSlide=a?b.slideCount-1:b.nextSlide-1,b.currSlide=a?0:b.nextSlide+1):(a=b.nextSlide+1==b.slides.length,b.nextSlide=a?0:b.nextSlide+1,b.currSlide=a?b.slides.length-1:b.nextSlide-1)},calcTx:function(b,c){var d,e=b;return e._tempFx?d=a.fn.cycle.transitions[e._tempFx]:c&&e.manualFx&&(d=a.fn.cycle.transitions[e.manualFx]),d||(d=a.fn.cycle.transitions[e.fx]),e._tempFx=null,this.opts()._tempFx=null,d||(d=a.fn.cycle.transitions.fade,e.API.log('Transition "'+e.fx+'" not found.  Using fade.')),d},prepareTx:function(a,b){var c,d,e,f,g,h=this.opts();return h.slideCount<2?void(h.timeoutId=0):(!a||h.busy&&!h.manualTrump||(h.API.stopTransition(),h.busy=!1,clearTimeout(h.timeoutId),h.timeoutId=0),void(h.busy||(0!==h.timeoutId||a)&&(d=h.slides[h.currSlide],e=h.slides[h.nextSlide],f=h.API.getSlideOpts(h.nextSlide),g=h.API.calcTx(f,a),h._tx=g,a&&void 0!==f.manualSpeed&&(f.speed=f.manualSpeed),h.nextSlide!=h.currSlide&&(a||!h.paused&&!h.hoverPaused&&h.timeout)?(h.API.trigger("cycle-before",[f,d,e,b]),g.before&&g.before(f,d,e,b),c=function(){h.busy=!1,h.container.data("cycle.opts")&&(g.after&&g.after(f,d,e,b),h.API.trigger("cycle-after",[f,d,e,b]),h.API.queueTransition(f),h.API.updateView(!0))},h.busy=!0,g.transition?g.transition(f,d,e,b,c):h.API.doTransition(f,d,e,b,c),h.API.calcNextSlide(),h.API.updateView()):h.API.queueTransition(f))))},doTransition:function(b,c,d,e,f){var g=b,h=a(c),i=a(d),j=function(){i.animate(g.animIn||{opacity:1},g.speed,g.easeIn||g.easing,f)};i.css(g.cssBefore||{}),h.animate(g.animOut||{},g.speed,g.easeOut||g.easing,function(){h.css(g.cssAfter||{}),g.sync||j()}),g.sync&&j()},queueTransition:function(b,c){var d=this.opts(),e=void 0!==c?c:b.timeout;return 0===d.nextSlide&&0===--d.loop?(d.API.log("terminating; loop=0"),d.timeout=0,e?setTimeout(function(){d.API.trigger("cycle-finished",[d])},e):d.API.trigger("cycle-finished",[d]),void(d.nextSlide=d.currSlide)):void 0!==d.continueAuto&&(d.continueAuto===!1||a.isFunction(d.continueAuto)&&d.continueAuto()===!1)?(d.API.log("terminating automatic transitions"),d.timeout=0,void(d.timeoutId&&clearTimeout(d.timeoutId))):void(e&&(d._lastQueue=a.now(),void 0===c&&(d._remainingTimeout=b.timeout),d.paused||d.hoverPaused||(d.timeoutId=setTimeout(function(){d.API.prepareTx(!1,!d.reverse)},e))))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&(a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a])),a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var b=this.opts();return clearTimeout(b.timeoutId),b.timeoutId=0,b.nextSlide=b.currSlide+a,b.nextSlide<0?b.nextSlide=b.slides.length-1:b.nextSlide>=b.slides.length&&(b.nextSlide=0),b.API.prepareTx(!0,a>=0),!1},buildSlideOpts:function(c){var d,e,f=this.opts(),g=c.data()||{};for(var h in g)g.hasOwnProperty(h)&&/^cycle[A-Z]+/.test(h)&&(d=g[h],e=h.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),f.API.log("["+(f.slideCount-1)+"]",e+":",d,"("+typeof d+")"),g[e]=d);g=a.extend({},a.fn.cycle.defaults,f,g),g.slideNum=f.slideCount;try{delete g.API,delete g.slideCount,delete g.currSlide,delete g.nextSlide,delete g.slides}catch(i){}return g},getSlideOpts:function(b){var c=this.opts();void 0===b&&(b=c.currSlide);var d=c.slides[b],e=a(d).data("cycle.opts");return a.extend({},c,e)},initSlide:function(b,c,d){var e=this.opts();c.css(b.slideCss||{}),d>0&&c.css("zIndex",d),isNaN(b.speed)&&(b.speed=a.fx.speeds[b.speed]||a.fx.speeds._default),b.sync||(b.speed=b.speed/2),c.addClass(e.slideClass)},updateView:function(a,b){var c=this.opts();if(c._initialized){var d=c.API.getSlideOpts(),e=c.slides[c.currSlide];!a&&b!==!0&&(c.API.trigger("cycle-update-view-before",[c,d,e]),c.updateView<0)||(c.slideActiveClass&&c.slides.removeClass(c.slideActiveClass).eq(c.currSlide).addClass(c.slideActiveClass),a&&c.hideNonActive&&c.slides.filter(":not(."+c.slideActiveClass+")").css("visibility","hidden"),0===c.updateView&&setTimeout(function(){c.API.trigger("cycle-update-view",[c,d,e,a])},d.speed/(c.sync?2:1)),0!==c.updateView&&c.API.trigger("cycle-update-view",[c,d,e,a]),a&&c.API.trigger("cycle-update-view-after",[c,d,e]))}},getComponent:function(b){var c=this.opts(),d=c[b];return"string"==typeof d?/^\s*[\>|\+|~]/.test(d)?c.container.find(d):a(d):d.jquery?d:a(d)},stackSlides:function(b,c,d){var e=this.opts();b||(b=e.slides[e.currSlide],c=e.slides[e.nextSlide],d=!e.reverse),a(b).css("zIndex",e.maxZ);var f,g=e.maxZ-2,h=e.slideCount;if(d){for(f=e.currSlide+1;h>f;f++)a(e.slides[f]).css("zIndex",g--);for(f=0;f<e.currSlide;f++)a(e.slides[f]).css("zIndex",g--)}else{for(f=e.currSlide-1;f>=0;f--)a(e.slides[f]).css("zIndex",g--);for(f=h-1;f>e.currSlide;f--)a(e.slides[f]).css("zIndex",g--)}a(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}},a.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},a.fn.cycle.version=function(){return"Cycle2: "+c},a.fn.cycle.transitions={custom:{},none:{before:function(a,b,c,d){a.API.stackSlides(c,b,d),a.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:0,visibility:"visible",display:"block"}),b.animIn={opacity:1},b.animOut={opacity:0}}},fadeout:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:1,visibility:"visible",display:"block"}),b.animOut={opacity:0}}},scrollHorz:{before:function(a,b,c,d){a.API.stackSlides(b,c,d);var e=a.container.css("overflow","hidden").width();a.cssBefore={left:d?e:-e,top:0,opacity:1,visibility:"visible",display:"block"},a.cssAfter={zIndex:a._maxZ-2,left:0},a.animIn={left:0},a.animOut={left:d?-e:e}}}},a.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:0},a(document).ready(function(){a(a.fn.cycle.defaults.autoSelector).cycle()})}(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(a){"use strict";function b(b,d){var e,f,g,h=d.autoHeight;if("container"==h)f=a(d.slides[d.currSlide]).outerHeight(),d.container.height(f);else if(d._autoHeightRatio)d.container.height(d.container.width()/d._autoHeightRatio);else if("calc"===h||"number"==a.type(h)&&h>=0){if(g="calc"===h?c(b,d):h>=d.slides.length?0:h,g==d._sentinelIndex)return;d._sentinelIndex=g,d._sentinel&&d._sentinel.remove(),e=a(d.slides[g].cloneNode(!0)),e.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),e.css({position:"static",visibility:"hidden",display:"block"}).prependTo(d.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),e.find("*").css("visibility","hidden"),d._sentinel=e}}function c(b,c){var d=0,e=-1;return c.slides.each(function(b){var c=a(this).height();c>e&&(e=c,d=b)}),d}function d(b,c,d,e){var f=a(e).outerHeight();c.container.animate({height:f},c.autoHeightSpeed,c.autoHeightEasing)}function e(c,f){f._autoHeightOnResize&&(a(window).off("resize orientationchange",f._autoHeightOnResize),f._autoHeightOnResize=null),f.container.off("cycle-slide-added cycle-slide-removed",b),f.container.off("cycle-destroyed",e),f.container.off("cycle-before",d),f._sentinel&&(f._sentinel.remove(),f._sentinel=null)}a.extend(a.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null}),a(document).on("cycle-initialized",function(c,f){function g(){b(c,f)}var h,i=f.autoHeight,j=a.type(i),k=null;("string"===j||"number"===j)&&(f.container.on("cycle-slide-added cycle-slide-removed",b),f.container.on("cycle-destroyed",e),"container"==i?f.container.on("cycle-before",d):"string"===j&&/\d+\:\d+/.test(i)&&(h=i.match(/(\d+)\:(\d+)/),h=h[1]/h[2],f._autoHeightRatio=h),"number"!==j&&(f._autoHeightOnResize=function(){clearTimeout(k),k=setTimeout(g,50)},a(window).on("resize orientationchange",f._autoHeightOnResize)),setTimeout(g,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),a(document).on("cycle-update-view",function(b,c,d,e){if("caption"===c.captionModule){a.each(["caption","overlay"],function(){var a=this,b=d[a+"Template"],f=c.API.getComponent(a);f.length&&b?(f.html(c.API.tmpl(b,d,c,e)),f.show()):f.hide()})}}),a(document).on("cycle-destroyed",function(b,c){var d;a.each(["caption","overlay"],function(){var a=this,b=c[a+"Template"];c[a]&&b&&(d=c.API.getComponent("caption"),d.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20140415 */
function(a){"use strict";var b=a.fn.cycle;a.fn.cycle=function(c){var d,e,f,g=a.makeArray(arguments);return"number"==a.type(c)?this.cycle("goto",c):"string"==a.type(c)?this.each(function(){var h;return d=c,f=a(this).data("cycle.opts"),void 0===f?void b.log('slideshow must be initialized before sending commands; "'+d+'" ignored'):(d="goto"==d?"jump":d,e=f.API[d],a.isFunction(e)?(h=a.makeArray(g),h.shift(),e.apply(f.API,h)):void b.log("unknown command: ",d))}):b.apply(this,arguments)},a.extend(a.fn.cycle,b),a.extend(b.API,{next:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?-1:1;a.allowWrap===!1&&a.currSlide+b>=a.slideCount||(a.API.advanceSlide(b),a.API.trigger("cycle-next",[a]).log("cycle-next"))}},prev:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?1:-1;a.allowWrap===!1&&a.currSlide+b<0||(a.API.advanceSlide(b),a.API.trigger("cycle-prev",[a]).log("cycle-prev"))}},destroy:function(){this.stop();var b=this.opts(),c=a.isFunction(a._data)?a._data:a.noop;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stop(),b.API.trigger("cycle-destroyed",[b]).log("cycle-destroyed"),b.container.removeData(),c(b.container[0],"parsedAttrs",!1),b.retainStylesOnDestroy||(b.container.removeAttr("style"),b.slides.removeAttr("style"),b.slides.removeClass(b.slideActiveClass)),b.slides.each(function(){a(this).removeData(),c(this,"parsedAttrs",!1)})},jump:function(a,b){var c,d=this.opts();if(!d.busy||d.manualTrump){var e=parseInt(a,10);if(isNaN(e)||0>e||e>=d.slides.length)return void d.API.log("goto: invalid slide index: "+e);if(e==d.currSlide)return void d.API.log("goto: skipping, already on slide",e);d.nextSlide=e,clearTimeout(d.timeoutId),d.timeoutId=0,d.API.log("goto: ",e," (zero-index)"),c=d.currSlide<d.nextSlide,d._tempFx=b,d.API.prepareTx(!0,c)}},stop:function(){var b=this.opts(),c=b.container;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stopTransition(),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.off("mouseenter mouseleave")),b.API.trigger("cycle-stopped",[b]).log("cycle-stopped")},reinit:function(){var a=this.opts();a.API.destroy(),a.container.cycle()},remove:function(b){for(var c,d,e=this.opts(),f=[],g=1,h=0;h<e.slides.length;h++)c=e.slides[h],h==b?d=c:(f.push(c),a(c).data("cycle.opts").slideNum=g,g++);d&&(e.slides=a(f),e.slideCount--,a(d).remove(),b==e.currSlide?e.API.advanceSlide(1):b<e.currSlide?e.currSlide--:e.currSlide++,e.API.trigger("cycle-slide-removed",[e,b,d]).log("cycle-slide-removed"),e.API.updateView())}}),a(document).on("click.cycle","[data-cycle-cmd]",function(b){b.preventDefault();var c=a(this),d=c.data("cycle-cmd"),e=c.data("cycle-context")||".cycle-slideshow";a(e).cycle(d,c.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
function(a){"use strict";function b(b,c){var d;return b._hashFence?void(b._hashFence=!1):(d=window.location.hash.substring(1),void b.slides.each(function(e){if(a(this).data("cycle-hash")==d){if(c===!0)b.startingSlide=e;else{var f=b.currSlide<e;b.nextSlide=e,b.API.prepareTx(!0,f)}return!1}}))}a(document).on("cycle-pre-initialize",function(c,d){b(d,!0),d._onHashChange=function(){b(d,!1)},a(window).on("hashchange",d._onHashChange)}),a(document).on("cycle-update-view",function(a,b,c){c.hash&&"#"+c.hash!=window.location.hash&&(b._hashFence=!0,window.location.hash=c.hash)}),a(document).on("cycle-destroyed",function(b,c){c._onHashChange&&a(window).off("hashchange",c._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20131121 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{loader:!1}),a(document).on("cycle-bootstrap",function(b,c){function d(b,d){function f(b){var f;"wait"==c.loader?(h.push(b),0===j&&(h.sort(g),e.apply(c.API,[h,d]),c.container.removeClass("cycle-loading"))):(f=a(c.slides[c.currSlide]),e.apply(c.API,[b,d]),f.show(),c.container.removeClass("cycle-loading"))}function g(a,b){return a.data("index")-b.data("index")}var h=[];if("string"==a.type(b))b=a.trim(b);else if("array"===a.type(b))for(var i=0;i<b.length;i++)b[i]=a(b[i])[0];b=a(b);var j=b.length;j&&(b.css("visibility","hidden").appendTo("body").each(function(b){function g(){0===--i&&(--j,f(k))}var i=0,k=a(this),l=k.is("img")?k:k.find("img");return k.data("index",b),l=l.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),l.length?(i=l.length,void l.each(function(){this.complete?g():a(this).load(function(){g()}).on("error",function(){0===--i&&(c.API.log("slide skipped; img not loaded:",this.src),0===--j&&"wait"==c.loader&&e.apply(c.API,[h,d]))})})):(--j,void h.push(k))}),j&&c.container.addClass("cycle-loading"))}var e;c.loader&&(e=c.API.add,c.API.add=d)})}(jQuery),/*! pager plugin for Cycle2;  version: 20140415 */
function(a){"use strict";function b(b,c,d){var e,f=b.API.getComponent("pager");f.each(function(){var f=a(this);if(c.pagerTemplate){var g=b.API.tmpl(c.pagerTemplate,c,b,d[0]);e=a(g).appendTo(f)}else e=f.children().eq(b.slideCount-1);e.on(b.pagerEvent,function(a){b.pagerEventBubble||a.preventDefault(),b.API.page(f,a.currentTarget)})})}function c(a,b){var c=this.opts();if(!c.busy||c.manualTrump){var d=a.children().index(b),e=d,f=c.currSlide<e;c.currSlide!=e&&(c.nextSlide=e,c._tempFx=c.pagerFx,c.API.prepareTx(!0,f),c.API.trigger("cycle-pager-activated",[c,a,b]))}}a.extend(a.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerEventBubble:void 0,pagerTemplate:"<span>&bull;</span>"}),a(document).on("cycle-bootstrap",function(a,c,d){d.buildPagerLink=b}),a(document).on("cycle-slide-added",function(a,b,d,e){b.pager&&(b.API.buildPagerLink(b,d,e),b.API.page=c)}),a(document).on("cycle-slide-removed",function(b,c,d){if(c.pager){var e=c.API.getComponent("pager");e.each(function(){var b=a(this);a(b.children()[d]).remove()})}}),a(document).on("cycle-update-view",function(b,c){var d;c.pager&&(d=c.API.getComponent("pager"),d.each(function(){a(this).children().removeClass(c.pagerActiveClass).eq(c.currSlide).addClass(c.pagerActiveClass)}))}),a(document).on("cycle-destroyed",function(a,b){var c=b.API.getComponent("pager");c&&(c.children().off(b.pagerEvent),b.pagerTemplate&&c.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20140408 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),a(document).on("cycle-initialized",function(a,b){if(b.API.getComponent("next").on(b.nextEvent,function(a){a.preventDefault(),b.API.next()}),b.API.getComponent("prev").on(b.prevEvent,function(a){a.preventDefault(),b.API.prev()}),b.swipe){var c=b.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",d=b.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";b.container.on(c,function(){b._tempFx=b.swipeFx,b.API.next()}),b.container.on(d,function(){b._tempFx=b.swipeFx,b.API.prev()})}}),a(document).on("cycle-update-view",function(a,b){if(!b.allowWrap){var c=b.disabledClass,d=b.API.getComponent("next"),e=b.API.getComponent("prev"),f=b._prevBoundry||0,g=void 0!==b._nextBoundry?b._nextBoundry:b.slideCount-1;b.currSlide==g?d.addClass(c).prop("disabled",!0):d.removeClass(c).prop("disabled",!1),b.currSlide===f?e.addClass(c).prop("disabled",!0):e.removeClass(c).prop("disabled",!1)}}),a(document).on("cycle-destroyed",function(a,b){b.API.getComponent("prev").off(b.nextEvent),b.API.getComponent("next").off(b.prevEvent),b.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{progressive:!1}),a(document).on("cycle-pre-initialize",function(b,c){if(c.progressive){var d,e,f=c.API,g=f.next,h=f.prev,i=f.prepareTx,j=a.type(c.progressive);if("array"==j)d=c.progressive;else if(a.isFunction(c.progressive))d=c.progressive(c);else if("string"==j){if(e=a(c.progressive),d=a.trim(e.html()),!d)return;if(/^(\[)/.test(d))try{d=a.parseJSON(d)}catch(k){return void f.log("error parsing progressive slides",k)}else d=d.split(new RegExp(e.data("cycle-split")||"\n")),d[d.length-1]||d.pop()}i&&(f.prepareTx=function(a,b){var e,f;return a||0===d.length?void i.apply(c.API,[a,b]):void(b&&c.currSlide==c.slideCount-1?(f=d[0],d=d.slice(1),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.API.advanceSlide(1)},50)}),c.API.add(f)):b||0!==c.currSlide?i.apply(c.API,[a,b]):(e=d.length-1,f=d[e],d=d.slice(0,e),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.currSlide=1,b.API.advanceSlide(-1)},50)}),c.API.add(f,!0)))}),g&&(f.next=function(){var a=this.opts();if(d.length&&a.currSlide==a.slideCount-1){var b=d[0];d=d.slice(1),a.container.one("cycle-slide-added",function(a,b){g.apply(b.API),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(b)}else g.apply(a.API)}),h&&(f.prev=function(){var a=this.opts();if(d.length&&0===a.currSlide){var b=d.length-1,c=d[b];d=d.slice(0,b),a.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(c,!0)}else h.apply(a.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),a.extend(a.fn.cycle.API,{tmpl:function(b,c){var d=new RegExp(c.tmplRegex||a.fn.cycle.defaults.tmplRegex,"g"),e=a.makeArray(arguments);return e.shift(),b.replace(d,function(b,c){var d,f,g,h,i=c.split(".");for(d=0;d<e.length;d++)if(g=e[d]){if(i.length>1)for(h=g,f=0;f<i.length;f++)g=h,h=h[i[f]]||c;else h=g[c];if(a.isFunction(h))return h.apply(g,e);if(void 0!==h&&null!==h&&h!=c)return h}return c})}})}(jQuery);
//# sourceMappingURL=jquery.cycle2.js.map

/* Plugin for Cycle2; Copyright (c) 2012 M. Alsup; v20140128 */
(function(e){"use strict";e.event.special.swipe=e.event.special.swipe||{scrollSupressionThreshold:10,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:75,setup:function(){var i=e(this);i.bind("touchstart",function(t){function n(i){if(r){var t=i.originalEvent.touches?i.originalEvent.touches[0]:i;s={time:(new Date).getTime(),coords:[t.pageX,t.pageY]},Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.scrollSupressionThreshold&&i.preventDefault()}}var s,o=t.originalEvent.touches?t.originalEvent.touches[0]:t,r={time:(new Date).getTime(),coords:[o.pageX,o.pageY],origin:e(t.target)};i.bind("touchmove",n).one("touchend",function(){i.unbind("touchmove",n),r&&s&&s.time-r.time<e.event.special.swipe.durationThreshold&&Math.abs(r.coords[0]-s.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(r.coords[1]-s.coords[1])<e.event.special.swipe.verticalDistanceThreshold&&r.origin.trigger("swipe").trigger(r.coords[0]>s.coords[0]?"swipeleft":"swiperight"),r=s=void 0})})}},e.event.special.swipeleft=e.event.special.swipeleft||{setup:function(){e(this).bind("swipe",e.noop)}},e.event.special.swiperight=e.event.special.swiperight||e.event.special.swipeleft})(jQuery);


/*
	WOW
 */
(function() {
  var Util,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in custom) {
        value = custom[key];
        if (value != null) {
          defaults[key] = value;
        }
      }
      return defaults;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    return Util;

  })();

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
        return this.start();
      } else {
        return document.addEventListener('DOMContentLoaded', this.start);
      }
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.boxes = this.element.getElementsByClassName(this.config.boxClass);
      if (this.boxes.length) {
        if (this.disabled()) {
          return this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
          window.addEventListener('scroll', this.scrollHandler, false);
          window.addEventListener('resize', this.scrollHandler, false);
          return this.interval = setInterval(this.scrollCallback, 50);
        }
      }
    };

    WOW.prototype.stop = function() {
      window.removeEventListener('scroll', this.scrollHandler, false);
      window.removeEventListener('resize', this.scrollHandler, false);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      return box.className = "" + box.className + " " + this.config.animateClass;
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return box.setAttribute('style', this.customStyle(hidden, duration, delay, iteration));
    };

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.setAttribute('style', 'visibility: visible;'));
      }
      return _results;
    };

    WOW.prototype.customStyle = function(hidden, duration, delay, iteration) {
      var style;
      style = hidden ? "visibility: hidden; -webkit-animation-name: none; -moz-animation-name: none; animation-name: none;" : "visibility: visible;";
      if (duration) {
        style += "-webkit-animation-duration: " + duration + "; -moz-animation-duration: " + duration + "; animation-duration: " + duration + ";";
      }
      if (delay) {
        style += "-webkit-animation-delay: " + delay + "; -moz-animation-delay: " + delay + "; animation-delay: " + delay + ";";
      }
      if (iteration) {
        style += "-webkit-animation-iteration-count: " + iteration + "; -moz-animation-iteration-count: " + iteration + "; animation-iteration-count: " + iteration + ";";
      }
      return style;
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!this.boxes.length) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + this.element.clientHeight - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util || (this._util = new Util());
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

}).call(this);

/*!
 * Flow Slider v1.6.0
 * jQuery content sliding plugin
 * http://FlowSlider.com/
 *
 * Copyright Flow Slider Inc., www.FlowSlider.com
 * 
 * LICENCE:
 * http://www.FlowSlider.com/license-html
 * If you use this plugin, you must keep this copyright notice at all times.
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('D H=q(n,t,i){D j="T",1U="3c",2s=\'<3d 1V="\',1W="q",p="4g",l=3e,h=1X,b="3f",1Y="3g",g="4h",d="1t",1Z="1c",o=x,f,s,21,a,22;J("4i"==1u n)A 1I(n).H(t);J("4j"==1u n&&n.H)A n.H;J("4k"==1u n)A 1j H.2t(n);D u=o,e=i(n),k,y,v,c,w,n={1v:1Z,23:d,M:g,2u:"1k",24:"2v",12:"4l",3h:q(n,t){J(18 0===t)A n.3i();n.3i(t)},Z:q(n,t){J(18 0===t)A n.1c();n.1c(t)},26:q(n,t){J(18 0===t)A n.1t();n.1t(t)}},3j={1v:d,23:1Z,M:"2v",2u:"3k",24:g,12:"4m",3h:q(n,t){J(18 0===t)A n.2w();n.2w(t)},Z:q(n,t){J(18 0===t)A n.1t();n.1t(t)},26:q(n,t){J(18 0===t)A n.1c();n.1c(t)}},27,28,29,2a,r=i.O({},2x.H.F,t);o.19=q(){A x.3l=u.B.Z(y)},o.3m=q(){A(r.1l-x.I())/(r.1l-(u.B.Z(e)-x.19()-r.2b))},o.T=q(n){A 0>n&&(n=0),1<n&&(n=1),x.G(x.2c(n)),x},o.2c=q(n){A r.1l-n*(r.1l-(u.B.Z(e)-x.19()-r.2b))},o.I=q(){A w.I()},o.G=q(n){A 29(n),x},o.W=q(n){A 2a(n)};D m=q(n){(r.3n||!(u.19()<=u.B.Z(e)))&&w.G(n)},2y=q(n){J(n>r.1l)A r.1l;D t=u.B.Z(e)-u.19()-r.2b;A n<t?t:n},3o=q(n){D t=w.I();1a=u.19()/2,n>1a&&(n%=1a);D i=t+1a-n,t=N.U(t-n)<N.U(i)?n:n-1a,n=2y(n);n!=t&&(w.1J(n>t?1a:-1a),t+=n>t?1a:-1a),w.G(t)},3p=q(n){A n};J(o.2d=q(n){A u.G(u.I()+n)},o.1d=q(n){A u.G(u.W(u.I()+n))},o.2z=q(){J(v=y.1w(),v.3q(r.11+"-1K"),e.E({4n:"4o",T:"4p"}),v.E({4q:g}),(r.1L=1Y)&&!X(e.E(d))){13(D s=v.1b,o=0,t=0,n,f=0;f<s;f++)$1K=i(v[f]),n=X($1K.E("2e-2v")),2f(n)&&(n=0),t=n,n=X($1K.2w()),2f(n)&&(n=0),t+=n,n=X($1K.E("2e-3k")),2f(n)&&(n=0),t+=n,t>o&&(o=t);e.E(d,o)}A 1Y==r.1L&&u.B.Z(k,3r),r.2A?(v.4r(!0).4s(y),29=3o,2a=3p):(29=m,2a=2y),x},o.3s=q(){A y},o.3t=q(n){A i.O(r,n),x.s=r,21(),x},o.V=q(){13(D n=0;n<c.1b;n++)c[n].V();A x},o.P=q(){13(D n=0;n<c.1b;n++)c[n].P();A x},o.1m=q(){e.1n(r.2B,u)},o.2g=q(){e.1n(r.2C,u)},o.1o=q(){e.1n(r.2D,u)},f={1M:q(n,t,i){D r=n.O({},f.1M.F,i),u=!1,e=q(n){n=n[t.B.12]-r.C.G()[t.B.M],t.T((n-r.1x)/(t.B.Z(r.C)-r.1x-r.1N)),u=!1};x.P=q(){r.C.R(b,e),u=!1},x.V=q(){u||(u=!0,r.C.14(b,e))},r.C=r.C?n(r.C):t.$S}},f.1M.F={C:h,1x:50,1N:50},f.2h=q(n,t,i){D c="3u",r=n.O({},f.2h.F,i),s=0,h=!1,o,u=!1,a=q(){t.1d(s),e()},v=q(n){h=!1,n=n[t.B.12]-r.C.G()[t.B.M]-(N.3v(t.B.Z(r.C)/2)+r.3w),s=r.2E?r.2E(n):n<-r.1x||n>r.1N?-r.1p*(n+(0<n?-r.1N:r.1x)):0,u||(a(),o=1O(a,r.1e),u=!0)},l=q(){s=0,u&&(1y(o),u=!1),e(),4t=!1},e=q(){h||(r.C.1f(b,v),h=!0)};x.P=q(){r.C.R(b,v),r.C.R(c,l),u&&(1y(o),u=!1)},x.V=q(){e();r.C.1f(c,l)},r.C=r.C?n(r.C):t.$S},f.2h.F={C:h,1e:50,1x:3x,1N:3x,3w:0,1p:.2,2E:h},f.2F=q(n,t,i){D r=n.O({},f.2F.F,i),h,e=!1,u=0,c=0,o=!1,v=q(i){r.1z&&i.1g(),e=!0,h=i[t.B.12],u=0,n(K).14(r.1A,s);n(K).1f(r.1B,a);o=!1,t.$S.1n("4u",t)},s=q(n){D n,f,i,o;n.1g(),e&&(c=u,u=(n[t.B.12]-h)*r.1p,n=t.I()+u-c,f=t.W(n),n!=f&&(i=N.U(f-n),o=r.1h?r.1h(i):i*r.2i,u+=f<n?o-i:i-o),t.2d(u-c),r.C[0].1C=!0)},a=q(i){r.1z&&i.1g(),t.$S.R(r.1A,s),e=!1,t.1d((i[t.B.12]-h)*r.1p-u),n(K).R(r.1A,s),l(),t.$S.1n("4v",t),2j(q(){r.C[0].1C=!1},r.2k)},l=q(){o||(o=!0,r.C.1f(r.1P,v))};x.P=q(){e&&(n(K).R(r.1A,s),n(K).R(r.1B,a),t.G(t.W(t.I())),e=!1,r.C[0].1C=!1),n(K).R(r.1P,v),o=!1},x.V=q(){l()},r.C=r.C?n(r.C):t.$S},f.2F.F={C:h,1P:"4w",1A:b,1B:"4x",1p:1,2i:.3y,1h:h,2k:3z,1z:!1},f.2l=q(n,t,i){D l="4y",a="4z 4A",c="4B",r=n.O({},f.2l.F,i),y,u=0,h=0,e=!1,o=!1,p=q(i){r.1z&&i.1g(),e=!0,y=i.3A.3B[0][t.B.12],u=0,n(K).14(c,s);n(K).1f(a,w);o=!1,t.$S.1n("4C",t)},s=q(n){D n,f,i,o;n.1g(),e&&(h=u,u=(n.3A.3B[0][t.B.12]-y)*r.1p,n=t.I()+u-h,f=t.W(n),n!=f&&(i=N.U(f-n),o=r.1h?r.1h(i):i*r.2i,u+=f<n?o-i:i-o),t.2d(u-h),r.C[0].1C=!0)},w=q(i){r.1z&&i.1g(),e=!1,n(K).R(r.1A,s),t.G(t.W(t.I())),v(),t.$S.1n("4D",t),2j(q(){r.C[0].1C=!1},r.2k)},v=q(){o||(o=!0,r.C.1f(l,p))};x.P=q(){e&&(n(K).R(c,s),n(K).R(a,w),t.G(t.W(t.I())),e=!1,r.C[0].1C=!1),n(K).R(l,p),o=!1},x.V=q(){v()},r.C=r.C?n(r.C):t.$S},f.2l.F={C:h,1e:50,1p:1,2i:.3y,1h:h,2k:3z,1z:!1},f.2G=q(n,t,i){D o="4E",r=n.O({},f.2G.F,i),e=!1,u=0,h=q(){D n=+1j 2H;n>=u+r.1e?(t.G(t.W(t.I())),e=!1):2j(h,r.1e-(n-u))},s=q(n,i){n.1g(),r.3C&&(i=0<i?1:-1);D f=i*r.1i;G=t.I()+f,2m=t.W(G),G!=2m&&(f=r.1h(i,N.U(2m-G))),r.1e?(t.2d(f),u=+1j 2H,!e&&G!=2m&&(2j(h,r.1e),e=!0)):t.1d(f)};x.P=q(){t.$S.R(o,s)},x.V=q(){t.$S.14(o,s)}},f.2G.F={1i:40,3C:!1,1e:4F,1h:q(n,t){A l<t?0:4G*n/t}},f.2I=q(n,t,i){D r=n.O({},f.2I.F,i),e=n(r.2J),u=q(n){n.3D==r.3E&&t.1d(-r.Y),n.3D==r.3F&&t.1d(r.Y)};x.P=q(){e.R("3G",u)},x.V=q(){e.3G(u)}},f.2I.F={2J:K,Y:l,3E:39,3F:37},f.2K=q(n,t,i){D u=n.O({},f.2K.F,i),r=2x.1D.3H,e=q(){D n=t.I();t.s.2A&&(n%=t.19()/2),2x.1D.3H=N.3v(-n/N.U(u.Y))+1};x.P=q(){},x.V=q(){r&&(r=X(r.4H(1,r.1b-1)),2f(r)&&(r=1),t.G(t.W(-u.Y*(r-1)))),t.$S.14("3I",e)}},f.2K.F={Y:l},f.2L=q(n,t,i){D r=n.O({},f.2L.F,i),e,o=q(){t.1d(-r.Y)},u=q(){1y(e)};x.P=q(){u()},x.V=q(){n(r.C).14(r.1P,q(){J(e=1O(o,r.1E),r.1B)n(r.C).1f(r.1B,u)})}},f.2L.F={1P:"4I",1B:h,C:K,Y:l,1E:4J},f.2M=q(n,t,i){D r=n.O({},f.2M.F,i),u=q(n){J(n.1g(),r.3J){D n=t.I(),i=t.W(n-r.Y);J(n==i){t.T(0<-r.Y?1:0);A}}t.1d(-r.Y)};x.P=q(){r.C.R(r.2N,u)},x.V=q(){r.C.14(r.2N,u)},r.C=r.C?n(r.C):t.$S},f.2M.F={C:h,2N:"4K",Y:l,3J:!0},s={4L:q(n,t){D i;x.I=q(){A i},x.G=q(n){t.1m(),i=n,t.$L.E(t.B.M,i),t.1o()},x.1J=q(){},(i=X(t.$L.E(t.B.M)))||(i=0)},1Q:q(n,t,i){D e="16-4M-q",n=n.O({},s.1Q.F,i),u=X(t.$L.E(t.B.M)),o=t.B.M,c=t.$L[0].1q,f=!0,i="",h=q(){f=!0,t.1o()},r;3K=q(){t.$L.1f("4N",h)},x.I=q(){A u},x.G=q(n){u=n,c[o]=u+p,f&&(f=!1,3K(),t.1m())},(u=X(t.$L.E(o)))||(u=0),i=H.2O.2P(),!1!==i&&(r={},r[i+"16-4O"]=t.B.M,n.2Q&&(r[i+e]=n.2Q),r[i+"16-3L"]=n.1E+"2R",r[i+"16-1F"]=n.1F+"2R",t.$L.E(r),t.$L.E(i+e,n.16))}},s.1Q.F={1F:-20,1E:2S,2Q:"2T-3M(0.3N, 1.0, 0.3O, 0.3P)",16:"2T-3M(0.3N, 1.4P, 0.3O, 0.3P)"},s.2n=q(n,t,i){D o=n.O({},s.2n.F,i),r,u,l,f=!1,e=t.B.M,a=t.$L[0].1q,h,c,v=q(){h=(u-r)*o.3Q,c=.5>N.U(h),u!=r&&!c?(r+=h,a[e]=r+p,t.2g()):(o.3R&&(a[e]=u+p),f&&(1y(l),f=!1,t.1o()))};x.I=q(){A u},x.G=q(n){u=n,f||(l=1O(v,o.1r),f=!0,t.1m())},x.1J=q(n){r+=n,u+=n},(r=X(t.$L.E(e)))||(r=0),u=r},s.2n.F={3R:!1,1r:25,3Q:.25},s.2U=q(n,t,i){D u=n.O({},s.2U.F,i),e,o,a,h=!1,v=t.B.M,w=t.$L[0].1q,r=0,c,l,f,y=q(){(f=o-e)?(r=u.1G?r+(0<f?u.1G:-u.1G):u.1i,u.1H&&(c=N.U(r)/u.1H,l=u.1H*c*(c+1)/2,l>N.U(f-r)&&(r=(0<f?1:-1)*(-1+N.3S(u.1H*(u.1H+8*N.U(f))))/2)),u.3T||(0>f&&0<r&&(r=-u.1G),0<f&&0>r&&(r=u.1G)),r>u.1i&&(r=u.1i),r<-u.1i&&(r=-u.1i),0<f&&r>f&&(r=f),0>f&&r<f&&(r=f),e+=r,w[v]=e+p,t.2g()):(r=0,h&&(1y(a),h=!1,t.1o()))};x.I=q(){A o},x.G=q(n){o=n,h||(a=1O(y,u.1r),h=!0,t.1m())},x.1J=q(n){e+=n,o+=n},(o=e=X(t.$L.E(v)))||(e=0)},s.2U.F={1r:50,1i:50,1G:3,1H:3,3T:!0},s.1I=q(n,t,i){D f=n.O({},s.1I.F,i),r,u=t.B.M;x.I=q(){A r},x.G=q(n){r=n,n={},n[u]=r,t.$L.P(!0).2o(n,f.1E,f.3U,t.1o),t.1m()},(r=X(t.$L.E(u)))||(r=0)},s.1I.F={1E:2S,3U:"4Q"},s.1R=q(n,t,i){D u=n.O({},s.1R.F,i),k,v=!1,h,f,r,d,y,a,o,l=0,e,c,w=t.B.M,b=t.$L[0].1q,g=q(){o=+1j 2H,y!=r&&(l=l>o?o+e+N.U(r-h)*u.2V:o+N.U(r-h)*u.2V-u.1r/2,a=o+u.1F,e=l-a,e>u.2W&&(e=u.2W,l=a+e),e<u.2X&&(e=u.2X,l=a+e),h=f,d=r-h),o>=l?(f=r,b[w]=f+p,v&&(1y(k),v=!1,t.1o())):(c=(o-a)/e,1<c&&(c=1),0>c&&(c=0),f=h+d*u.16(c),b[w]=f+p,y=r,t.2g())};x.I=q(){A r},x.G=q(n){r=n,v||(k=1O(g,u.1r),v=!0,t.1m())},x.1J=q(n){f+=n,r+=n,h+=n,y+=n},(f=X(t.$L.E(t.B.M)))||(f=0),h=r=f},s.1R.F={1F:-20,1r:20,2X:l,2W:4R,2V:10,16:H.1R.3V},21=q(){r.3W&&"4S"3X K.3Y&&(r.1s=["2l"],r.1S=[r.3Z]),c=[];13(D t,n=0;n<r.1s.1b;n++)t=r.1S[n]?r.1S[n]:r.1S[0],c[n]=1j f[r.1s[n]](i,u,t);r.41&&"1Q"!=r.2p&&!1!==H.2O.2P()&&(r.2p="1Q",r.2Y=r.42),w=1j s[r.2p](i,u,r.2Y)},H.1T.43++,1W==1u r.2Z&&e.14(r.2D,r.2Z),1W==1u r.30&&e.14(r.2B,r.30),1W==1u r.31&&e.14(r.2C,r.31),o.B=1Y==r.1L?n:3j,t=r.11+"-L",e.44(\'<4T 1V="\'+t+\'-2" 1q="45:4U-46;"/>\'),e.44(2s+t+\'-1" 1q="T:3c;"/>\'),k=i(e.1w("."+t+"-1")[0]),y=i(k.1w("."+t+"-2")[0]),"4V"==r.1L&&y.E(1Z,"3e%"),o.s=r,o.$S=e,o.$L=k,e.3q(r.11),o.2z(),""==1D.32||"4W"==1D.32||1D.32.4X(/47\\.48/i)||(e.34(\'<a 4Y="49://4Z.47.48" 51="52 53 54&55;56 57 59!" 2J="5a" 1V="\'+r.11+\'-35"></a>\'),a=e.1w("a."+r.11+"-35"),H.1T.4a||(H.1T.4a=!0,t=K.5b("5c"),t.5d="5e/E",n="."+r.11+"-35 {36:5f(5g:5h/5i;5j,5k/5l/5m+5n/5o+5p+5q+5r/5s/5t+5u/5v+5w/Q+5x/6/5y+5z+5A+5B+5C+/n/5D+5E/5F+5G+5H+5I/5J/+5K+5L/5M+5N+5O/5P/5Q+5R/5S/5T+5U+5V+5W+5X/5Y+5Z/i/60+61+62/63+64/65/66+68/69+6a+/6b+6c/6d//6e+6f+6g==);z-6h:3r !38;6i:0 !38;45:46 !38}",t.4b?t.4b.6j=n:t.6k(K.6l(n)),i("6m").34(t)),a.E({2e:0,T:1U,1c:17,1t:17,2e:0,1k:-20}).1F(6n).2o({1k:4},2S),a.6o(q(){a.P().E({"36-T":"-6p 0",1k:-58,1c:6q}).2o({1k:0},l)}),a.3u(q(){a.P().2o({1k:-58},{3L:l,6r:q(){a.E({"36-T":"0 0",1k:4,1c:17})}})})),r.4c){13(t=!1,n=0;n<r.1s.1b;n++)J("1M"==r.1s[n]||"2h"==r.1s[n]){t=!0;3a}t&&(e.34(2s+r.11+\'-2q-1"/><3d 1V="\'+r.11+\'-2q-2"/>\'),27=e.1w("."+r.11+"-2q-1"),28=e.1w("."+r.11+"-2q-2"),27.E(j,1U).E(u.B.1v,u.19()).E(u.B.23,u.B.26(e)).E(u.B.M,0).E(u.B.24,0),28.E(j,1U).E(u.B.1v,u.3l).E(u.B.23,u.B.26(e)).E(u.B.2u,0).E(u.B.24,0),e.3f(q(n){22=n[u.B.12]-e.G()[u.B.M],27.E(u.B.1v,22-r.3b),28.E(u.B.1v,u.B.Z(e)-22-r.3b)}))}13(k.E(o.B.M,o.2c(r.4d)),21(),o.T(r.T),n=0;n<c.1b;n++)c[n].V()};H.F={1L:"3g",2A:!1,2p:"2n",2Y:{},1s:["1M"],1S:[{}],1l:25,2b:25,4d:0,T:.5,4c:!1,3b:7,3W:!0,3Z:{},41:!1,42:{},3n:!1,30:1X,2Z:1X,31:1X,11:"6s",2B:"6t",2D:"3I",2C:"6u"},H.1T={6v:"1.6.0",6w:"6x",6y:!1,43:0},H.2O={2P:q(){D n=H.1T,r,t,i;J(18 0===n.2r){n.2r=!1,r=(K.6z||K.3Y).1q,t={16:"",6A:"-6B-",6C:"-6D-",6E:"-2R-",6F:"-o-"};13(i 3X t)J(18 0!==r[i]){n.2r=t[i];3a}}A n.2r},4e:q(){A"4f:"==K.1D.4e?"4f:":"49:"}},H.2t=q(n){13(D i="19 3m T 2c I G W 2z 3s 3t V P".6G(" "),r=x,t=0;t<i.1b;t++)(q(t){r[t]=q(){13(D u,i,f=0;f<n.1b;f++)J(u=n[f].H,i=u[t].6H(u,6I),18 0!==i&&i!==u)A i;A r}})(i[t]);A x},H.1R={6J:q(){A 1},6K:q(n){A n},6L:q(n){D t=n*n;A n*(-t*n+4*t-6*n+4)},2T:q(n){A n*(4*n*n-9*n+6)},6M:q(n){D t=n*n;A n*(33*t*t-6N*t*n+6O*t-67*n+15)},3V:q(n){A N.3S(1-(n-=1)*n)},6P:q(n,t,i,r,u,f){D v=u?u:.6Q,y=f?f:5,e=3*n,o=3*(i-n)-e,p=2*o,c=1-e-o,a=3*c,s=3*t,h=3*(r-t)-s,l=1-s-h;x.16=q(n){13(D t=n,r=0,i;r<y;r++){J(i=t*(e+t*(o+t*c))-n,N.U(i)<v)3a;t-=i/(e+t*(p+t*a))}A t*(s+t*(h+t*l))}}},q(n){n.6R.H=q(t){A H.2t(x.6S(q(i,r){r.H||(r.H=1j H(r,t,n))}))}}(1I);',62,427,'||||||||||||||||||||||||||function|||||||this|||return|props|el|var|css|defaults|offset|FlowSlider|getOffset|if|document|wrap|edge|Math|extend|stop||unbind|mask|position|abs|start|boundOffset|parseInt|step|fSize||prefix|mouse|for|bind||transition||void|calcSize|half_size|length|width|moveBounded|timeout|one|preventDefault|outFunction|speed|new|right|marginStart|_triggerOnStart|trigger|_triggerOnStop|coefficient|style|frequency|controllers|height|typeof|size|children|mouseStart|clearInterval|prevent|eventMove|eventEnd|fsDragging|location|time|delay|acc|dec|jQuery|shift|item|mode|Hover|mouseEnd|setInterval|eventStart|CSS|Transition|controllerOptions|Global|ht|class|it|null|nt|tt||st|rt|sizeC|edgeC||fSizeC|et|ft|ut|ot|marginEnd|positionToOffset|move|margin|isNaN|_triggerOnMove|HoverCenter|outCoefficient|setTimeout|_delay|Touch|bound|Elastic|animate|animation|overlay|tPrefix|ct|Array|edgeEnd|top|outerHeight|window|at|setupDOM|infinite|eMoveStart|eMove|eMoveStop|moveFunction|Drag|Wheel|Date|Key|target|Hash|Timer|Event|event|Util|transitionPrefix|transitionAlt|ms|1e3|cubic|Accelerating|timeCoefficient|timeMax|timeMin|animationOptions|onMoveStop|onMoveStart|onMove|host||append|branding|background||important||break|overlayPrecision|absolute|div|100|mousemove|horizontal|fOuterSize|outerWidth|vt|bottom|wrapSize|getPosition|moveIfSmaller|yt|pt|addClass|9999999|content|set|mouseleave|round|center|150|125|200|originalEvent|touches|normalize|keyCode|keyFwd|keyRev|keydown|hash|flowSliderMoveStop|rewind|hookStopEvent|duration|bezier|345|535|795|elasticity|snap|sqrt|overshoot|easing|circ|detectTouchDevice|in|documentElement|touchOptions||detectCssTransition|cssAnimationOptions|sliders|wrapInner|display|block|flowslider|com|http|brandingCSS|styleSheet|externalContent|startPosition|protocol|https|px|left|string|object|array|pageX|pageY|overflow|hidden|relative|float|clone|appendTo|eventLeaveOn|flowSliderDragStart|flowSliderDragEnd|mousedown|mouseup|touchstart|touchend|touchcancel|touchmove|flowSliderTouchStart|flowSliderTouchEnd|mousewheel|500|300|substr|ready|3e3|click|None|timing|transitionend|property|650|swing|1500|ontouchstart|span|inline|vertical|localhost|match|href|www||title|Flow|Slider|plugin|mdash|slide|your||HTML|_blank|createElement|STYLE|type|text|url|data|image|png|base64|iVBORw0KGgoAAAANSUhEUgAAAGAAAAARCAYAAAAi5qlcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw|eHBhY2tldCBiZWdpbj0i77u|IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8|IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MTJEMUUwQ0IxMjlFMTExQTdENUE2NkI4MENGMEUyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NjZGQ0EwNDQ3NkIxMUUxQjhBOUNEQUU5RTA3NzY4MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NjZGQ0EwMzQ3NkIxMUUxQjhBOUNEQUU5RTA3NzY4MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMzRBQjk2MzZCNDdFMTExQThDOEFBQzQzREU4RDlCMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MTJEMUUwQ0IxMjlFMTExQTdENUE2NkI4MENGMEUyQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI|PjyGfq4AAASpSURBVHja7FhdSBxXFD4z|6fRdsWEUrJUS1swJKhJaLp9iCJp4gaKPgqlWAxFQ8DkzSd91CehULRgkVKoSIkvBW0h2hSCW2Jt0aJv2pKiSZsmGrImJq7r7k7ud|OZ3J2dWVc67UPZA4c7c|69585837nnzFzNMAz6pxKNRo1QKERer5d0XZdaEHtJp9NSk8kk7ezskNcNpwDe7|fL1uPxFAjYg4BUKmVi5BoBUJ|PZ|6CgjgTgOjna1cIAOCIfCbivyZgcXGRampq|hXfKysrVFZWRsFg0LYPa6Ovvr4|bwK4BU5e7ev1KnF|irOeYdE9omtMti3xTaOH9EN3M|LjNJ2LPqV7ceca8|vZEhpZ3aFPlhMZ9lKvRt|dLqZwuce0xWIx|bKqVFZWUlVVlbyOx|OugA0FmQC9sbGRpqenqb|r6|uR6s7Oz5vjR0VHq7e2lnp4eamho2FfAsnoZ|M9PldoOvvjL5vei|eOLcOmVZDqrD5Om7OYx|E5|x1bi9HqJTjXlfjHGb|VL7|4RcvnS6jcr5lRDkAADEd7a2ura5E|MDBAXV1dVFtbK8lWfWNNRDgIcFu8DD5eWsr8JNHJiDrmqtAzH89uBqz9u|NsEWbwnfwOnSyiG2tJavtpixz80pOkYRLAAvCnpl5w3t7ebl6PjIzIiEQUA7CxsTFqaWmRAOIaBDY1Nck|gK36QYRDJicn5XiQgOjn3QdlwRqDg4MZNlx3dHTQ|Pi4JArrIWgwjncXfFdXV2fuBo44BsHo|9CKJXbAOb6R|QBLnecgufy|94qHfrifov363djYkMAwOGr6ABkAF2kC|QAEAlB4zsTEhFQniUQitLCwIEmwrgmQmWSsg9TDAkKxztLSknwWEI8WvlAjQAr8ZKUjwn|ArpogvbD9aXxwaFW0p00bg6XMs5Ucfg8XEb12QKeb60nar1|8FACAqgJguC4gjTDwfM3jASQik|1mShQRC9ABWDgclnPthMnr7Oy0tfOOxHOycFDYFWpdexQjVn3oN2lUbDPCFhTtcbbJSWKcOs9Ocvl9t3ibNhJpWlx9QDn9Guksv5yC1PSRS7heAHSOaoBcV1eXMY5BYmI4dVhFTTt2dhRsfBDk|1Gge9bvkqq|3mn1|prQ80I9Dv1S7SSX38ghg67feki05rjuc7|pdN7FDLmdI5yjD4WUCQBAHLVcI6xFGKmiu7vb3El2ohJkjXKuJXgGpx2UVYS1tbs|Ydmz5Ux2|EfrWHj9|JXnrLany7KE5ztx9mDS72eaj5zRPUfnWetLW|HZ2|cVB8ARXl|z8BYIaHh2Uuxqdpc3OzjEY1l4MQpCKAq9p3j1MkeCAKYGIu8rhVQBDXE|XfAOO5DqAPPvL5N9ECbUPBXZBDlr5rQj8V||i0C2qkmCv3o5uVTdyoqKigQCJg|Yo|2EnTxyyj9FXuaMeHssRBdOnOUWj67LgLcPs|XCw|TS|U0eGyA|bP|FEIkHb29ukuXEYNzc3Z4AAPg8qHEXkT4ArRxE4XIJTBr5AwN4EADPXzoKYAF5A0zSpBXE|DQVeUFdSEGRmZsbAgRy0QEBuAngXQJ8JMABn2v61okLcyAAAAABJRU5ErkJggg|index|padding|cssText|appendChild|createTextNode|head|5e3|mouseenter|17px|79|complete|www_FlowSlider_com|flowSliderMoveStart|flowSliderMove|VERSION|PACK|Free|pinged|body|MozTransition|moz|WebkitTransition|webkit|MsTransition|OTransition|split|apply|arguments|none|linear|quadratic|elastic|106|126|CubicBezier|001|fn|each'.split('|'),0,{}));

