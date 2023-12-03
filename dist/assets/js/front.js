window.addEventListener("load", () => {
	headerMenu();
	layoutCommon();
})
$(window).on("load",function(){
	commonResize();
	posLayerEvent();
	setVh();
});

document.addEventListener("DOMContentLoaded", function () {
	commonInit();
	dataToggleEvent();
});




function commonResize(){
	var $window_width = 0;
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		setVh();
		posLayerResize();
	}).resize();
}

function commonInit() {
	let touchstart = "ontouchstart" in window;
	let userAgent = navigator.userAgent.toLowerCase();

	if (touchstart) {
		browserAdd("touchmode");
	}
	if (userAgent.indexOf('samsung') > -1) {
		browserAdd("samsung");
	}

	if (navigator.platform.indexOf('Win') > -1 || navigator.platform.indexOf('win') > -1) {
		browserAdd("window");
	}

	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		// iPad or iPhone
		browserAdd("ios");
	}


	function browserAdd(opt) {
		document.querySelector("html").classList.add(opt);
	}

	
	if($(".dimbg").length === 0){
		$("body").append("<div class='dimbg' />")
	}
}


function headerMenu() {
	const header_wrap = document.querySelector(".header_wrap");
	const btn_header_total = document.querySelector("[name='pcmenu']");
	const global_menu_layer = document.querySelector(".global_menu_layer");
	const gmenu_toggle = document.querySelectorAll(".gmenu_toggle");
	const tmenu_one = document.querySelectorAll(".tmenu_one");
	const tmenu_one_text = document.querySelectorAll(".tmenu_one_text");
	const mobile_total_layer = document.querySelector(".mobile_total_layer");
	const gnb_twodepth_layer = document.querySelector(".gnb_twodepth_layer");
	const gnb_twodepth_layer_gnbtwocont = document.querySelectorAll(".gnb_twodepth_layer .gnb_two_cont");
	const mobile_total_menu = document.querySelectorAll("[name='totalmenu']");
	const btn_mb_total_close = document.querySelector(".btn_mb_total_close");
	const hgroup_nav_menu = document.querySelectorAll(".hgroup_nav_menu");
	const hgroup_gnb_row = document.querySelector(".hgroup_gnb_row");
	const hgroup_main_row = document.querySelector(".hgroup_main_row");
	const gnb_two_cont = document.querySelectorAll(".gnb_two_cont");
	const hgroup_nav_item = document.querySelectorAll(".hgroup_nav_item");

	const mb_total_quick_slide = document.querySelectorAll(".mb_total_quick_list .swiper-slide");
	const bodyDom = document.querySelector("body");
	const htmlDom = document.querySelector("html");
	let windowWidth = 0;

	let mbquickObj = null;
	if (btn_header_total === null || global_menu_layer === null) { return; }


	// header_wrap.addEventListener("mouseleave",()=>{
	// 	global_menu_layer.classList.remove("active");
	// });

	btn_header_total.addEventListener("click", (e) => {
		e.preventDefault();
		const thisTarget = e.currentTarget;
		thisTarget.classList.toggle("active");
		global_menu_layer.classList.toggle("active");
		textHeightResize2(global_menu_layer.querySelectorAll(".gmenu_one"));
		if(!!gnb_twodepth_layer){
			gnb_twodepth_layer.classList.remove("active");
		}
	});


	window.addEventListener("resize",()=>{
		if(windowWidth !== window.innerWidth){
			if(window.innerWidth < 1024){
				mobile_total_layer.classList.remove("active");
				bodyDom.classList.remove("touchDis")
				gnbgmenuFunc();
			}
		}
		windowWidth = window.innerWidth;
	})

	if (!!gmenu_toggle) {
		gmenu_toggle.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				const thisTarget = e.currentTarget;
				thisTarget.closest(".gmenu_item").classList.toggle("active");
				textHeightResize2(thisTarget.closest(".gmenu_item").querySelectorAll(".gmenu_one"));
			});
		});
	}

	
	gnbgmenuFunc();
	function gnbgmenuFunc(){
		const gnb_two_cont = document.querySelectorAll(".gnb_two_cont")
		const gnb_two_cont_li = document.querySelectorAll(".gnb_two_cont .gmenu_list > li")
		if(!!gnb_two_cont){
			gnb_two_cont.forEach((item)=>{
				if(item.querySelectorAll(".gmenu_list > li").length<4){
					item.classList.add("short");
				}else{
					item.classList.add("pos_center");
				}
			})
		}
	}

	if(!!hgroup_nav_menu){
		hgroup_nav_menu.forEach((item)=>{
			item.addEventListener("mouseenter",(e)=>{
				const etarget = e.currentTarget;
				if(etarget.getAttribute("href") === "#"){return;}
				const etwo = document.querySelector(etarget.getAttribute("href"));
				const etwo_li = etwo.querySelectorAll(".gmenu_list > li");
				if(!!gnb_two_cont){
					gnb_two_cont.forEach((item)=>{
						item.classList.remove("active","pos_left","pos_right","ready");
					});
					etwo.classList.add("ready");
					gnb_twodepth_layer.classList.add("active");
					if(etwo.getBoundingClientRect().left<0){
						etwo.classList.add("pos_left");
					}else if(etwo.getBoundingClientRect().left+etwo.getBoundingClientRect().width>window.innerWidth){
						etwo.classList.add("pos_right");
					}else{
						etwo.style.left = etarget.getBoundingClientRect().left + (etarget.getBoundingClientRect().width/2) - etwo.getBoundingClientRect().width/2  +"px";
					}
					etwo.classList.remove("ready");
					etwo.classList.add("active");
					textHeightResize(etarget.getAttribute("href") + " .gmenu_one");
				}
			});
		});
	}
	if(!!hgroup_nav_item){
		hgroup_nav_item.forEach((item)=>{
			item.addEventListener("mouseenter",()=>{
				if(!!gnb_twodepth_layer){
					gnb_twodepth_layer.classList.remove("active");
				}
			});
		})
	}

	if(!!hgroup_gnb_row){
		hgroup_gnb_row.addEventListener("mouseleave",()=>{
			if(!!gnb_twodepth_layer){
				gnb_twodepth_layer.classList.remove("active");
			}
		});
	}

	if(!!hgroup_main_row){
		hgroup_main_row.addEventListener("mouseleave",()=>{
			if(!!gnb_twodepth_layer){
				gnb_twodepth_layer.classList.remove("active");
			}
		});
	}

	if(!!tmenu_one_text){
		tmenu_one_text.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				const thisTarget = e.currentTarget;
				thisTarget.closest(".tmenu_toggle_item").classList.toggle("active");
			});
		});
	}

	if(!!mobile_total_menu){
		mobile_total_menu.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.preventDefault();
				if(!!mobile_total_layer){
					mobile_total_layer.classList.add("active");
				}
				
				mbQuickMenu();
				bodyDom.classList.add("touchDis")
			});
		});
	}

	if(!!btn_mb_total_close){
		btn_mb_total_close.addEventListener("click", (e) => {
			e.preventDefault();
			mobile_total_layer.classList.remove("active");
			bodyDom.classList.remove("touchDis")
		});
	}

	function mbQuickMenu(){
		if(mb_total_quick_slide.length>1){
			if(mbquickObj == null){
				mbquickObj = new Swiper(".mb_total_quick_wrap", {
					speed : 1000, 
					slidesPerView: 4,
					slidesPerGroup : 4,
					freeMode: false,
					slidesPerGroupAuto : false,
					loop : false,
					pagination: {  
						el: ".mb_total_quick_wrap .swiper-pagination",
						clickable: true
					}
				});
			}
		}
	}
}

function layoutCommon(){
	const header_wrap = document.querySelector(".header_wrap");
	const middle_wrap = document.querySelector(".middle_wrap");
	const footer_wrap = document.querySelector(".footer_wrap");
	const floating_layer = document.querySelector(".floating_layer");
	let header_wrap_height = 0;
	let footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
	const bodyDom = document.querySelector("body");
	const htmlDom = document.querySelector("html");
	let scrollend = bodyDom.scrollHeight - window.innerHeight;

	minHeightFunc();
	btnTop();

	let windowWidth = window.innerWidth;
	window.addEventListener("resize",()=>{
		if(window.innerWidth !== windowWidth){
			minHeightFunc();
			footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
		}
		windowWidth = window.innerWidth;
	});

	scrollFloating();
	window.addEventListener("scroll",()=>{
		scrollFloating();
	});

	function minHeightFunc(){
		if(!!middle_wrap){
			header_wrap_height = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
			footer_wrap_height = !!footer_wrap ? footer_wrap.getBoundingClientRect().height : 0;
			middle_wrap.style.minHeight = 'calc(100vh - '+(footer_wrap_height+header_wrap_height) +'px)';
		}
	}

	function btnTop(){
		let btn_gotop = document.querySelector(".btn_pagetop");
		if(btn_gotop ===null){return;}
		btn_gotop.addEventListener("click",(e)=>{
			e.preventDefault();
			window.scrollTo(0,0);
		});
	}

	function scrollFloating(){
		if(!floating_layer){return;}
		if(scrollend <= window.scrollY){
			floating_layer.style.display = 'none';
		}else{
			floating_layer.style.display = 'block';
		}
	}
}



function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    function action() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    action();
  };

function mainVisual(){
	let mv_obj = null;
	const mv_wrap = document.querySelector(".main_visual_wrap");
	const mv_slide = mv_wrap.querySelectorAll(".swiper-slide");
	const header_wrap_layer = document.querySelector(".header_wrap.layer_type");
	const mv_copy_container = document.querySelectorAll(".mv_copy_container");
	const btn_mv_control_container = document.querySelectorAll(".btn_mv_control_container");
	let btn_mv_stop = null;
	let btn_mv_play = null;

	heightControl();
	if(mv_slide.length>1){
		mv_obj = new Swiper(".main_visual_swiper", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.main_visual_wrap .btn_mv_control.next_control',
                prevEl: '.main_visual_wrap .btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.stop();
		},false);
	}else{
		mv_wrap.classList.add("nodata_type");
	}
	
	
	window.addEventListener("resize",()=>{
		heightControl();
	});

	function heightControl(){
		let windowHeight = window.innerHeight;
		let controlHeight = 0;
		let header_wrap_layer_height = 0;
		let btn_mv_control_container_height = 0;
		if(!!mv_copy_container){
			if(!!header_wrap_layer){
				header_wrap_layer_height = header_wrap_layer.getBoundingClientRect().height;
			}
			mv_copy_container.forEach((item)=>{
				item.style.paddingTop = header_wrap_layer_height+"px";
			});
		}
		/* if(!!btn_mv_control_container){
			if(!!header_wrap_layer){
				header_wrap_layer_height = header_wrap_layer.getBoundingClientRect().height;
			}	
			btn_mv_control_container.forEach((item)=>{
				item.style.top = header_wrap_layer_height+"px";
				item.style.height = "calc(100% - "+header_wrap_layer_height+"px)";
			});
		} */
		
		if(windowHeight<635){
			controlHeight = 635;
		}else{
			
			controlHeight = windowHeight;
		}

		if(window.innerWidth < 1023 && mv_wrap.classList.contains("typef")){
			mv_wrap.style.removeProperty("height")
			return;
		}

		mv_wrap.style.height = controlHeight + "px";
	}
}


function mainVisualTypeb(){
	let mv_obj = null;
	const mv_wrap = document.querySelector(".main_visual_wrap");
	const mv_slide = mv_wrap.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;

	if(mv_slide.length>1){
		mv_obj = new Swiper(".main_visual_swiper", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.main_visual_wrap .btn_mv_control.next_control',
                prevEl: '.main_visual_wrap .btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.stop();
		},false);
	}else{
		mv_wrap.classList.add("nodata_type");
	}
}


function mainVisualTypec(){
	let mv_obj = null;
	const mv_wrap = document.querySelector(".main_visual_wrap");
	const mv_slide = mv_wrap.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;

	if(mv_slide.length>1){
		mv_obj = new Swiper(".main_visual_swiper", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.main_visual_wrap .btn_mv_control.next_control',
                prevEl: '.main_visual_wrap .btn_mv_control.prev_control',
            },
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			}
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.stop();
		},false);
	}else{
		mv_wrap.classList.add("nodata_type");
	}
}

function mainVisualTyped(){
	let mv_obj = null;
	const mv_wrap = document.querySelector(".mv_vboth_zone");
	const mv_slide = mv_wrap.querySelectorAll(".swiper-slide");
	let btn_mv_stop = null;
	let btn_mv_play = null;

	if(mv_slide.length>1){
		mv_obj = new Swiper(".mvbox_swiper", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			},
			pagination: {
				clickable: true,
				el: ".swiper-pagination.main_visual_paging",
			},
            navigation: {
                nextEl: '.mv_vboth_zone .btn_mv_control.next_control',
                prevEl: '.mv_vboth_zone .btn_mv_control.prev_control',
            }
		});
		btn_mv_stop = document.querySelector(".btn_mv_stop");
		btn_mv_play = document.querySelector(".btn_mv_play");

		btn_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.start();
		},false);

		btn_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			mv_obj.autoplay.stop();
		},false);
	}else{
		mv_wrap.classList.add("nodata_type");
	}
}


function posLayerEvent(){
	var posCallBtn = $("[data-poslayer]");
	var poslayer_z = $(".poslayer_z");
	
	$("body").append(poslayer_z);

	
	
	posCallBtn.on("click",function(e){
		var $this = $(this),
			$t_t = $($this.attr("data-poslayer"));
		e.preventDefault();
		// btn_search_result_reset
		if($(e.target).hasClass("btn_search_result_reset")){return;}
		posLayerShow($t_t,$this);
	});
	poslayer_z.on("click",".layerclose",function(e){
		e.preventDefault();
		posLayerHide($(this).parents(".poslayer_z"));
	});

	$(document).on("click",".btn_psubmit",function(e){
		e.preventDefault();
		let thisParent = $(this).parents(".poslayer_z");
		let targetCols = $(`[data-poslayer='#${thisParent.attr("id")}']`);
		let activeDate = thisParent.attr("data-date");
		let activeText = thisParent.find(".product_choice_depth.active,.choice_item.active,.product_choice_one.active").text();
		let input_search_field = thisParent.find(".input_search_field");
		let input_search_field_value = input_search_field.val();
		

		if(thisParent.attr("data-date") !== undefined){
			targetCols.find(".search_form_text_result").html(activeDate);
			targetCols.addClass("result_mode");
		}else{
			if(activeText.length>0 || input_search_field_value.length>0){
				targetCols.find(".search_form_text_result,.mv_vboth_wbox_result").html(activeText || input_search_field_value);
				targetCols.addClass("result_mode");
			}
		}
		posLayerHide(thisParent);
	});

	$(document).on("click",".btn_search_result_reset",function(e){
		e.preventDefault();
		e.stopPropagation();
		
		$(this).parents(".search_field_target,.mv_form_item,.mv_vboth_wbox").removeClass("result_mode");
		$(this).parents(".search_field_target,.mv_form_item,.mv_vboth_wbox").find(".search_form_text_result,.mv_vboth_wbox_result").text("");
	});

	$(document).on("click",".choice_item",function(e){
		e.preventDefault();
		$(this).parents("li").siblings().find(".choice_item").removeClass("active");
		$(this).addClass("active");
	});

	$(document).on("click",".product_choice_depth,.product_choice_one",function(e){
		e.preventDefault();
		$(this).parents(".pcont_w").find(".product_choice_depth,.product_choice_one").removeClass("active");
		$(this).addClass("active");
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents("[data-poslayer] , .poslayer_z , .layer_in_control").length && !$(e.target).is("[data-poslayer]") && !$(e.target).is(".layer_in_control")){
			posLayerHide($(".poslayer_z.active"));
		}
	});
}

function posLayerShow(target,btn){
	var poslayer_z = $(".poslayer_z");
	var target = $(target);
	
	$("body").append(target);
	poslayer_z.removeClass("active");
	target.addClass("active");
	posLayerPos(target,btn);
	$("html").addClass("dim_active");
	$(".dimbg").addClass("active");
}

function posLayerResize(){
	var poslayer_z = $(".poslayer_z");
	if (poslayer_z.length){
		poslayer_z.each(function(){
			posLayerResizeAction($(this));
		});
	}
}

function posLayerPos(target,btn){
	var $target = $(target);
	var $posTopMargin = $target.attr("data-topmargin")>0 ? Number($target.attr("data-topmargin")) : 20;
	var $posTopMobileMargin = $target.attr("data-topMobileMargin")>0 ? Number($target.attr("data-topMobileMargin")) : 0;
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $(btn);
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	var elseMargin = 0;
	var product_choice_item_wrap = $(".product_choice_item_wrap");

	
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	// if ($targetWid + $btnPosLeft > $(window).width()){
	// 	$target.css({
	// 		"top": $btnPosTop + $btnPosHeight + 20,
	// 		"left": "auto",
	// 		"right" : 20
	// 	});
	// }else{
	// 	$target.css({
	// 		"top": $btnPosTop + $btnPosHeight + 20,
	// 		"left": $btnPosLeft
	// 	});
	// }

	if($(window).width()<1024){
		$posTopMargin = $posTopMobileMargin; 
	}

	$target.css({
		"top": $btnPosTop + $btnPosHeight + $posTopMargin
	});

	if($target.hasClass("has_leftpos")){
		if ($targetWid + $btnPosLeft > $(window).width()){
			$target.css({
				"top": $btnPosTop + $btnPosHeight + $posTopMargin,
				"left": "auto",
				"right" : 20
			});
		}else{
			$target.css({
				"left": $btnPosLeft
			});
		}
	}

	if($(window).width()<1279){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + $posTopMargin
		});
	}
	

	if($target.find(".product_choice_one").length){
		textHeightResize(".product_choice_one");
	}

	if(product_choice_item_wrap.length){
		product_choice_item_wrap.each(function(){
			var $this = $(this);
			if($this.find(".product_choice_item").length>=7){
				$this.addClass("align2");
			}else{
				$this.removeClass("align2");
			}
		})
	}
}

function posLayerResizeAction(target){
	var $target = $(target);
	var $posTopMobileMargin = $target.attr("data-topMobileMargin")>0 ? Number($target.attr("data-topMobileMargin")) : 0;
	var $posTopMargin = $target.attr("data-topmargin")>0 ? Number($target.attr("data-topmargin")) : 20;
	var $target_tvitdep = $target.find(".tvitdep_vlist_wrap");
	var $target_tvitdep_pos = $target_tvitdep.length ? $target_tvitdep.offset().left : 0;
	var $target_tvitdep_wid = $target_tvitdep.length ? $target_tvitdep.outerWidth() : 0;
	var $targetWid = $target.length ? $target.outerWidth() : 0;
	var $btn = $("[data-poslayer='#" + $target.attr("id") +"']");
	var $btnIndex = $btn.index();
	var $btnPosTop = $btn.length ? $btn.offset().top : 0;
	var $btnPosHeight = $btn.length ? $btn.outerHeight() : 0;
	var $btnPosLeft = $btn.length ? $btn.offset().left : 0;
	var $btnWid = $btn.length ? $btn.outerWidth() : 0;
	$target.css({"top":"", "left" : "" , "right" : "" , "width" : ""});
	// if ($targetWid + $btnPosLeft > $(window).width()) {
	// 	$target.css({
	// 		"top": $btnPosTop + $btnPosHeight + 20,
	// 		"left": "auto",
	// 		"right": 20
	// 	});
	// } else {
	// 	$target.css({
	// 		"top": $btnPosTop + $btnPosHeight + 20,
	// 		"left": $btnPosLeft
	// 	});
	// }

	if($(window).width()<1024){
		$posTopMargin = $posTopMobileMargin; 
	}

	$target.css({
		"top": $btnPosTop + $btnPosHeight + $posTopMargin
	});

	if($target.hasClass("has_leftpos")){
		if ($targetWid + $btnPosLeft > $(window).width()){
			$target.css({
				"top": $btnPosTop + $btnPosHeight + $posTopMargin,
				"left": "auto",
				"right" : 20
			});
		}else{
			$target.css({
				"left": $btnPosLeft
			});
		}
	}
	
	if($(window).width()<1279){
		$target.css({
			"top": $btnPosTop + $btnPosHeight + $posTopMargin
		});
	}

	if($target.find(".product_choice_one").length){
		textHeightResize(".product_choice_one");
	}
}

function posLayerHide(target){
	var target = $(target) || target;
	target.removeClass("active");
	$("html").removeClass("dim_active");
	$(".dimbg").removeClass("active");
}


function textHeightResize(target){
	const targetDom = $(target) || target;

	action();

	window.addEventListener("resize",()=>{
		action();
	})

	function action(){
		targetDom.css({"height" : ""});
		let arrayHeight = [];
		targetDom.each(function(){
			arrayHeight.push($(this).height());
		});
		targetDom.css({"height" : Math.max.apply(null,arrayHeight)});
	}
}

function textHeightResize2(target){
	const targetDom = target;

	action();

	window.addEventListener("resize",()=>{
		action();
	})

	function action(){
		targetDom.forEach((item) => {
			item.removeAttribute("style");
		})
		let arrayHeight = [];
		targetDom.forEach((item) => {
			arrayHeight.push(item.getBoundingClientRect().height);
		})
		targetDom.forEach((item) => {
			item.style.height = Math.max.apply(null,arrayHeight)+"px";
		})
	}
}


function textWidthResize(target){
	const targetDom = $(target) || target;

	action();

	window.addEventListener("resize",()=>{
		action();
	})

	function action(){
		targetDom.css({"height" : ""});
		let arrayWidth = [];
		targetDom.each(function(){
			arrayWidth.push($(this).width());
		});
		targetDom.css({"width" : Math.max.apply(null,arrayWidth)});
	}
}

function productTabCont(){
	const product_tabmenu = document.querySelectorAll(".product_tabmenu");
	let product_tabActive = document.querySelector(".product_tabmenu.active");
	let product_contActive = document.querySelector(".product_tabcont.active");
	product_tabmenu.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			e.preventDefault();
			const thisTarget = e.currentTarget;
			const thisTargetCont = document.querySelector(thisTarget.getAttribute("href"));

			if(product_tabActive){
				product_tabActive.classList.remove("active");
			}
			thisTarget.classList.add("active");

			if(!!thisTargetCont){
				if(product_contActive){
					product_contActive.classList.remove("active");
				}
				thisTargetCont.classList.add("active");
				product_contActive = thisTargetCont;
			}

			product_tabActive = thisTarget;
		})
	});
}


function filterToggleCont(){
	const pcont_toggle_bar = document.querySelectorAll(".pcont_toggle_bar");
	if(!!pcont_toggle_bar){
		pcont_toggle_bar.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisTarget = e.currentTarget;
				thisTarget.closest(".pcont_toggle_item").classList.toggle("active");
			});
		});
	}
}



function multiRange(target){
    let multi_range_z = document.querySelector(target);
	if(!multi_range_z){return;}
	let inputLeft = multi_range_z.querySelector(".input-left"); 
	let inputRight = multi_range_z.querySelector(".input-right"); 
	let thumbLeft = multi_range_z.querySelector(".slider > .thumb.left"); 
	let thumbRight = multi_range_z.querySelector(".slider > .thumb.right"); 
	let range = multi_range_z.querySelector(".slider > .range");
	let setLeftValue = () => { 
		const _this = inputLeft; 
		const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
		
		// 교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
		_this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1); 
		
		// input, thumb 같이 움직이도록 
		const percent = ((_this.value - min) / (max - min)) * 100; 
		thumbLeft.style.left = percent + "%"; 
		range.style.left = percent + "%"; 
	}; 
	let setRightValue = () => { 
		const _this = inputRight; 
		const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
		
		// 교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
		_this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); 
		
		// input, thumb 같이 움직이도록 
		const percent = ((_this.value - min) / (max - min)) * 100; 
		thumbRight.style.right = 100 - percent + "%"; 
		range.style.right = 100 - percent + "%"; 
	}; 
	
	inputLeft.addEventListener("input", setLeftValue); 
	inputRight.addEventListener("input", setRightValue);
}


// function multiRange(){
//     let multi_range_z = document.querySelectorAll(".multi_range_z");
//     multi_range_z.forEach(function(elem,index){
//         let this_elem = elem;
//         let inputLeft = this_elem.querySelector(".input-left"); 
//         let inputRight = this_elem.querySelector(".input-right"); 
//         let thumbLeft = this_elem.querySelector(".slider > .thumb.left"); 
//         let thumbRight = this_elem.querySelector(".slider > .thumb.right"); 
//         let range = this_elem.querySelector(".slider > .range");
//         let setLeftValue = () => { 
//             const _this = inputLeft; 
//             const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
//             // 교차되지 않게, 1을 빼준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
//             _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1); 
            
//             // input, thumb 같이 움직이도록 
//             const percent = ((_this.value - min) / (max - min)) * 100; 
//             thumbLeft.style.left = percent + "%"; 
//             range.style.left = percent + "%"; 
//         }; 
//         let setRightValue = () => { 
//             const _this = inputRight; 
//             const [min, max] = [parseInt(_this.min), parseInt(_this.max)]; 
            
//             // 교차되지 않게, 1을 더해준 건 완전히 겹치기보다는 어느 정도 간격을 남겨두기 위해. 
//             _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1); 
            
//             // input, thumb 같이 움직이도록 
//             const percent = ((_this.value - min) / (max - min)) * 100; 
//             thumbRight.style.right = 100 - percent + "%"; 
//             range.style.right = 100 - percent + "%"; 
//         }; 
        
//         inputLeft.addEventListener("input", setLeftValue); 
//         inputRight.addEventListener("input", setRightValue);
//     });

// }


function quickMenu(){
	const quick_data_layer_zone = document.querySelector(".quick_data_layer_zone");
	const parent_pos_item = document.querySelector(quick_data_layer_zone.getAttribute("data-initpos"));
	const quick_mb_layer = document.querySelector(".quick_mobile_layer");
	const quick_mb_item = document.querySelectorAll(".quick_mb_item");
	let parent_pos = !!parent_pos_item ? parent_pos_item.getBoundingClientRect().top + window.scrollY : 0;
	const btn_quick_topgo = document.querySelector(".btn_quick_topgo");
	const btn_quick_mb_close = document.querySelectorAll(".btn_quick_mb_close");
	let barHeight = 35;
	let touchstart = "ontouchstart" in window;
	window.addEventListener("scroll",()=>{
		parent_pos = !!parent_pos_item ? parent_pos_item.getBoundingClientRect().top + window.scrollY : 0;

		if(window.scrollY > parent_pos){
			quick_data_layer_zone.classList.add("fixed");
		}else{
			quick_data_layer_zone.classList.remove("fixed");
		}

		mobileQuick();
	});


	if(!!btn_quick_topgo){
		btn_quick_topgo.addEventListener("click",function(e){
			e.preventDefault();
			setTimeout(()=>{
				window.scrollTo(0,0);
			},30);
		});
	}

	if(!!btn_quick_mb_close){
		btn_quick_mb_close.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				if(quick_mb_item.length==1){
					quick_mb_layer.style.display = "none";
				}
			});
		});
	}

	function mobileQuick(){
		if(!touchstart){
			barHeight = 0;
		}else{
			if(document.querySelector("html").classList.contains("ios")){
				barHeight = 130;
			}else{
				barHeight = 35;
			}
		}
		if(document.querySelector("body").scrollHeight - window.innerHeight - barHeight <= window.scrollY){
			fadeOutAction();
		}else{
			fadeInAction();
		}
	}

	function fadeOutAction(){
		quick_mb_layer.classList.add("ophidden");
	}

	function fadeInAction(){
		quick_mb_layer.classList.remove("ophidden");
	}
}





function stickyTab() {
	const header_wrap = document.querySelector(".header_wrap");
    const detailAnchorContentsWrap = document.querySelector(".detail_anchor_contents_wrap");
    const stickyTabsContainerZone = document.querySelector(".sticky_tabs_container_zone");
    const tabContents = document.querySelectorAll(".tab_contents");
    const stickyTabsInnerWrap = document.querySelector(".sticky_tabs_inner_wrap");
    const stickyTabsInner = document.querySelector(".sticky_tabs_inner");
    const stickyTab = document.querySelectorAll(".sticky_tab");
    let detailAnchorContentsWrapPos = !!detailAnchorContentsWrap ? detailAnchorContentsWrap.getBoundingClientRect().top + window.scrollY : 0;
    let getPosValue = getLayerPos();
    let getPosHeight = getHeight();
    let getPosArrayValue = getPosArray();
    let getWindowWid = window.innerWidth;
    let activeItem = null;
    let btnClickIs = false;

	let detail_anctab_obj = null;
	const detail_anctab_swiper = document.querySelector(".sticky_tabs_swiper_container");
	const detail_anctab_slide = !!detail_anctab_swiper ? detail_anctab_swiper.querySelectorAll(".swiper-slide") : null;
	if(!!detail_anctab_slide){
		if(detail_anctab_obj !== null){
			detail_anctab_obj.update();
		}else{
			if(window.innerWidth < 1024){
				mbFunc();
			}
	
			window.addEventListener("resize",()=>{
				if(getWindowWid !== window.innerWidth){
					if(detail_anctab_obj !== null){
						detail_anctab_obj.destroy();
					}
					if(window.innerWidth < 1024){
						mbFunc();
					}
				}
				getWindowWid = window.innerWidth;
			});
		}
	
		function mbFunc(){
			detail_anctab_obj = new Swiper(".sticky_tabs_swiper_container", {
				slidesPerView: 'auto',
				slidesPerGroupAuto : true,
				freeMode: true,
			});
		}
	}
	updateActiveMenu();
	let windowwid = window.innerWidth;
    window.addEventListener("resize", () => {
		//btnClickIs = false;
		//activeSlideTo();
        if (windowwid !== window.innerWidth) {
			updateOnlyActiveMenu();
			triggerActiveScroll();
        }
        windowwid = window.innerWidth;
    });


    window.addEventListener("touchstart", () => {
        btnClickIs = false;
    });

    window.addEventListener("mousewheel", () => {
        btnClickIs = false;
		
    });

    window.addEventListener("mousedown", () => {
        btnClickIs = false;
		updateValue();
    });

    window.addEventListener("scroll", () => {
		updateValue();
        scrollAction();
    });

    window.addEventListener("touchmove", () => {
		updateValue();
        scrollAction();
    });

	
	detailAnchorContentsWrap.addEventListener("updateScroll",()=>{
		updateValue();
        scrollAction();
	})

	
	function updateValue(){
		getPosValue = getLayerPos();
		getPosHeight = getHeight();
		getPosArrayValue = getPosArray();
		detailAnchorContentsWrapPos = !!detailAnchorContentsWrap ? detailAnchorContentsWrap.getBoundingClientRect().top + window.scrollY : 0;
	}


    
    stickyTab.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const thisTarget = e.currentTarget;
            const thisScrollPosTop = document.querySelector(thisTarget.getAttribute("href")).getBoundingClientRect().top;
			let thisScrollGo = 0;
			let headerWrapHeight = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
			let stickyHeight = !!stickyTabsInner ? stickyTabsInner.getBoundingClientRect().height : 0;
            let thisScrollPos = (thisScrollPosTop + window.scrollY - getPosHeight);
            let thisScrollMbPos = (thisScrollPosTop + window.scrollY - (stickyHeight + headerWrapHeight));
			
			if(window.innerWidth > 1023){
				thisScrollGo = thisScrollPos;
			}else{
				thisScrollGo = thisScrollMbPos;
			}

			
            //activeTab(thisTarget);
            if (!!thisScrollPos) {
                window.scrollTo({
                    top: thisScrollGo,
                    left: 0,
                    behavior: "smooth",
                });
            }
            btnClickIs = true;
			activeTab(thisTarget);
			activeSlideTo();
        });
    });

	
	function triggerActiveScroll(){
		const stickyTabActive = document.querySelector(".sticky_tab.active");
		// Create the event
		let event = new MouseEvent('click', {
			bubbles: true,
			cancelable: true
		});
		if(document.querySelectorAll(".sticky_tab")[0] == stickyTabActive && !stickyTabsInnerWrap.classList.contains("fixed")){return;}
		setTimeout(()=>{
			stickyTabActive.dispatchEvent(event);
		},100);

	
	}

    function getLayerPos() {
		if(!!stickyTabsContainerZone){
			let localTop = stickyTabsContainerZone.getBoundingClientRect().top;
			return localTop -(stickyTabsInnerWrap.getBoundingClientRect().height/2) + window.scrollY;
		}
    }

    function getPosArray() {
        let posArray = [];
		let headerWrapHeight = !!header_wrap ? header_wrap.getBoundingClientRect().height : 0;
		let stickyFixedHeight = !!stickyTabsInner ? stickyTabsInner.getBoundingClientRect().height : 0;
        if(!!tabContents){
            tabContents.forEach((item)=>{
                let eachTop = item.getBoundingClientRect().top;
				if(window.innerWidth > 1023){
					posArray.push(eachTop + window.scrollY - getPosHeight);
				}else{
					posArray.push(eachTop + window.scrollY - (stickyFixedHeight + headerWrapHeight));
				}
            });
        }
        return posArray;
    }


    function getHeight() {
		if(!!stickyTabsInner){
			return stickyTabsInner.getBoundingClientRect().height;
		}
    }

    function scrollAction() {
		if(!stickyTabsInnerWrap){return;}
        if (getPosValue < window.scrollY) {
            stickyTabsInnerWrap.classList.add("fixed");
        } else {
            stickyTabsInnerWrap.classList.remove("fixed");
        }
		if(!btnClickIs){
			updateActiveMenu();
		}
    }

	function updateActiveMenu(){
		stickyTab.forEach((item,index) => {
			if(getPosArrayValue[index] <= window.scrollY){
				activeTab(item);
				activeSlideTo();
			}
		});
	}

	function activeSlideTo(){
		stickyTab.forEach((item,index) => {
			var activeIndex = 0;
			if(detail_anctab_obj !== null && window.innerWidth < 1024){
				detail_anctab_obj.slideTo(index);
				activeIndex = index;
			}
		});
	}

	function updateOnlyActiveMenu(){
		if(!btnClickIs){
			stickyTab.forEach((item,index) => {
				if(getPosArrayValue[index] <= window.scrollY){
					activeTab(item);
				}
			});
		}
	}


    function activeTab(target){
        if (activeItem) {
            activeItem.classList.remove("active");
        }
        target.classList.add("active");
        activeItem = target;
    }
}

function updateTrigger(){
	const detailAnchorContentsWrap = document.querySelector(".detail_anchor_contents_wrap");
	if(!!detailAnchorContentsWrap){

		// Create the event
		let event = new CustomEvent('updateScroll', {
			bubbles: true,
			cancelable: true
		});
	
		// Emit the event
		detailAnchorContentsWrap.dispatchEvent(event);
	}
}



function stickyPanel() {
    const detailCalculationZone = document.querySelector(".detail_calculation_zone");
    const detailCalculationWrap = document.querySelector(".detail_calculation_wrap");
	const dc_inner_get_container = document.querySelector(".dc_inner_get_container");
    const detailContentsGlobalZone = document.querySelector(".detail_contents_global_zone");
    const detailContentsZone = document.querySelector(".detail_contents_zone");
    const footerWrap = document.querySelector(".footer_wrap");
    let footerWrapPos = !!footerWrap ? footerWrap.getBoundingClientRect().top + window.scrollY : 0;
    let footerWrapHeight = !!footerWrap ? footerWrap.getBoundingClientRect().height : 0;
    let detailContentsZoneHeight = !!detailContentsZone ? detailContentsZone.getBoundingClientRect().height : 0;
    let detailCalculationWrapHeight = !!detailCalculationWrap ? detailCalculationWrap.getBoundingClientRect().height : 0;
    let detailCalculationZonePos = !!detailCalculationZone ? detailCalculationZone.getBoundingClientRect().top + window.scrollY : 0;
	let detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().top + detailContentsGlobalZone.getBoundingClientRect().height + window.scrollY : 0;
    let getWindowWid = window.innerWidth;
	let dcInnerGetContainerHeight = !!dc_inner_get_container ? dc_inner_get_container.getBoundingClientRect().height : 0;
	let bodyHeight = document.querySelector("body").getBoundingClientRect().height;
    window.addEventListener("resize", () => {
        if (getWindowWid !== window.innerWidth) {
            detailCalculationZonePos = !!detailCalculationZone ? detailCalculationZone.getBoundingClientRect().top + window.scrollY : 0;
        }
        getWindowWid = window.innerWidth;
    });


    window.addEventListener("scroll", () => {
        scrollAction();
    });

    window.addEventListener("touchmove", () => {
        scrollAction();
    });

    function scrollAction() {
		detailContentsZoneHeight = !!detailContentsZone ? detailContentsZone.getBoundingClientRect().height : 0;
		detailCalculationWrapHeight = !!detailCalculationWrap ? detailCalculationWrap.getBoundingClientRect().height : 0;
		footerWrapPos = !!footerWrap ? footerWrap.getBoundingClientRect().top + 120 + window.scrollY : 0;
		footerWrapHeight = !!footerWrap ? footerWrap.getBoundingClientRect().height : 0;
		dcInnerGetContainerHeight = !!dc_inner_get_container ? dc_inner_get_container.getBoundingClientRect().height : 0;
		//detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().top + detailContentsGlobalZone.getBoundingClientRect().height + window.scrollY : 0;
		detailContentsGlobalZonePos = !!detailContentsGlobalZone ? detailContentsGlobalZone.getBoundingClientRect().bottom + window.scrollY : 0;
		

		if(!!detailCalculationWrap){
			if(detailCalculationWrapHeight>=detailContentsZoneHeight){return;}
			if (detailCalculationZonePos < window.scrollY) {
				detailCalculationWrap.classList.add("fixed");
				if(detailContentsGlobalZonePos - dcInnerGetContainerHeight < window.scrollY){
					detailCalculationWrap.classList.add("bottom");
				}else{
					detailCalculationWrap.classList.remove("bottom");
				}
			} else {
				detailCalculationWrap.classList.remove("fixed");
			}
		}
		
    }
}


/* 상세 비쥬얼 */
function detailVisualA(){
	let detail_mv_obj = null;
	const detail_mv_wrap = document.querySelector(".detail_visual_wrap");
	const detail_mv_swiper = document.querySelector(".detail_mv_swiper");
	const detail_mv_slide = detail_mv_wrap.querySelectorAll(".swiper-slide");
	let btn_d_mv_stop = null;
	let btn_d_mv_play = null;
	let windowWidth = window.innerWidth;

	if(detail_mv_slide.length>1){

		if(detail_mv_obj !== null){
			detail_mv_obj.update();
		}else{
			if(window.innerWidth >= 1024){
				pcFunc();
			}else{
				mbFunc();
			}
			//slideObj.update();

			window.addEventListener("resize",()=>{
				if(windowWidth !== window.innerWidth){
					detail_mv_obj.destroy();
					if(window.innerWidth >= 1024){
						pcFunc();
					}else{
						mbFunc();
					}
				}
				windowWidth = window.innerWidth;
			});
			btn_d_mv_stop = document.querySelector(".btn_d_mv_stop");
			btn_d_mv_play = document.querySelector(".btn_d_mv_play");

			btn_d_mv_play.addEventListener("click", (e) => {
				e.preventDefault();
				detail_mv_obj.autoplay.start();
			},false);

			btn_d_mv_stop.addEventListener("click", (e) => {
				e.preventDefault();
				detail_mv_obj.autoplay.stop();
			},false);
		}

		function pcFunc(){
			detail_mv_obj = new Swiper(".detail_mv_swiper", {
				speed : 1000,
				loop : true,
				centeredSlides: true,
				slidesPerView: 'auto',
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".detail_visual_wrap .swiper-pagination.d_mv_paging",
				},
				navigation: {
					nextEl: '.detail_visual_wrap .btn_d_mv_control.next',
					prevEl: '.detail_visual_wrap .btn_d_mv_control.prev',
				}
			});
		}
	
		function mbFunc(){
			detail_mv_obj = new Swiper(".detail_mv_swiper", {
				speed : 1000, 
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".detail_visual_wrap .swiper-pagination.d_mv_paging",
				},
				navigation: {
					nextEl: '.detail_visual_wrap .btn_d_mv_control.next',
					prevEl: '.detail_visual_wrap .btn_d_mv_control.prev',
				}
			});
		}

		
	}else{
		detail_mv_wrap.classList.add("nodata_type");
	}
	
}




function detailVisualB(){

	let detail_mv_obj = null;
	const detail_multi_visual_wrap = document.querySelector(".detail_multi_visual_wrap");
	const detail_mv_slide = detail_multi_visual_wrap.querySelectorAll(".swiper-slide");
	let btn_d_mv_stop = null;
	let btn_d_mv_play = null;
	let windowWidth = window.innerWidth;

	if(detail_mv_slide.length>1){
		// detail_mv_obj = new Swiper(".detail_multi_visual_swiper", {
		// 	speed : 1000,
		// 	loop : true,
		// 	centeredSlides: true,
		// 	spaceBetween :15,
		// 	slidesPerGroup : 3,
		// 	slidesPerView: 3,
		// 	autoplay: {
		// 		delay: 2500,
		// 		disableOnInteraction: false
		// 	},
		// 	pagination: {
		// 		clickable: true,
		// 		el: ".detail_multi_visual_wrap .swiper-pagination.d_mv_paging",
		// 	},
        //     navigation: {
        //         nextEl: '.detail_multi_visual_wrap .btn_d_mv_control.next',
        //         prevEl: '.detail_multi_visual_wrap .btn_d_mv_control.prev',
        //     }
		// });
		if(detail_mv_obj !== null){
			detail_mv_obj.update();
		}else{
			if(window.innerWidth >= 1024){
				pcFunc();
			}else{
				mbFunc();
			}
			//slideObj.update();

			window.addEventListener("resize",()=>{
				if(windowWidth !== window.innerWidth){
					detail_mv_obj.destroy();
					if(window.innerWidth >= 1024){
						pcFunc();
					}else{
						mbFunc();
					}
				}
				windowWidth = window.innerWidth;
			});
			btn_d_mv_stop = document.querySelector(".btn_d_mv_stop");
			btn_d_mv_play = document.querySelector(".btn_d_mv_play");

			btn_d_mv_play.addEventListener("click", (e) => {
				e.preventDefault();
				detail_mv_obj.autoplay.start();
			},false);

			btn_d_mv_stop.addEventListener("click", (e) => {
				e.preventDefault();
				detail_mv_obj.autoplay.stop();
			},false);
		}

		function pcFunc(){
			detail_mv_obj = new Swiper(".detail_multi_visual_swiper", {
				speed : 1000,
				loop : true,
				centeredSlides: true,
				spaceBetween :15,
				slidesPerGroup : 3,
				slidesPerView: 3,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".detail_multi_visual_wrap .swiper-pagination.d_mv_paging",
				},
				navigation: {
					nextEl: '.detail_multi_visual_wrap .btn_d_mv_control.next',
					prevEl: '.detail_multi_visual_wrap .btn_d_mv_control.prev',
				}
			});
		}
	
		function mbFunc(){
			detail_mv_obj = new Swiper(".detail_multi_visual_swiper", {
				speed : 1000, 
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".detail_multi_visual_wrap .swiper-pagination.d_mv_paging",
				},
				navigation: {
					nextEl: '.detail_multi_visual_wrap .btn_d_mv_control.next',
					prevEl: '.detail_multi_visual_wrap .btn_d_mv_control.prev',
				}
			});
		}
		btn_d_mv_stop = detail_multi_visual_wrap.querySelector(".btn_d_mv_stop");
		btn_d_mv_play = detail_multi_visual_wrap.querySelector(".btn_d_mv_play");

		btn_d_mv_play.addEventListener("click", (e) => {
			e.preventDefault();
			detail_mv_obj.autoplay.start();
		},false);

		btn_d_mv_stop.addEventListener("click", (e) => {
			e.preventDefault();
			detail_mv_obj.autoplay.stop();
		},false);
	}else{
		detail_multi_visual_wrap.classList.add("nodata_type");
	}
	
}


function detailVisualC(){
	let detail_mv_obj = null;
	const detail_multi_visual_wrap = document.querySelector(".detail_grid_visual_wrap");
	const detail_mv_slide = detail_multi_visual_wrap.querySelectorAll(".swiper-slide");
	const dgrid_thum_item = detail_multi_visual_wrap.querySelectorAll(".dgrid_thum_item");
	let windowWidth = window.innerWidth;

	if(detail_mv_slide.length>1){
		// detail_mv_obj = new Swiper(".detail_grid_main_swiper", {
		// 	speed : 1000,
		// 	loop : true,
		// 	effect: "fade",
		// 	autoplay: {
		// 		delay: 2500,
		// 		disableOnInteraction: false
		// 	}
		// });

		if(detail_mv_obj !== null){
			detail_mv_obj.update();
		}else{
			if(window.innerWidth >= 1024){
				pcFunc();
			}else{
				mbFunc();
			}
			//slideObj.update();

			window.addEventListener("resize",()=>{
				if(windowWidth !== window.innerWidth){
					detail_mv_obj.destroy();
					if(window.innerWidth >= 1024){
						pcFunc();
					}else{
						mbFunc();
					}
				}
				windowWidth = window.innerWidth;
			});
		}

		function pcFunc(){
			detail_mv_obj = new Swiper(".detail_grid_main_swiper", {
				speed : 1000,
				loop : true,
				effect: "fade",
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				}
			});
		}
	
		function mbFunc(){
			detail_mv_obj = new Swiper(".detail_grid_main_swiper", {
				speed : 1000, 
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					clickable: true,
					el: ".detail_grid_visual_wrap .swiper-pagination.d_mv_paging",
				},
				navigation: {
					nextEl: '.detail_grid_visual_wrap .btn_d_mv_control.next',
					prevEl: '.detail_grid_visual_wrap .btn_d_mv_control.prev',
				}
			});
		}

		dgrid_thum_item.forEach((item,index)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				if(index<3){
					detail_mv_obj.slideToLoop(index);
				}
			});
		});
	}else{
		detail_multi_visual_wrap.classList.add("nodata_type");
	}
}




/* popup */

/**
 * 디자인 팝업
 * @param {*} option 
 */
 function DesignPopup(option) {
	this.option = option;
	this.selector = this.option.selector;
  
	if (this.selector !== undefined) {
	  this.selector = document.querySelector(this.option.selector);
	}
	this.design_popup_wrap = document.querySelectorAll(".popup_wrap");
	this.domHtml = document.querySelector("html");
	this.domBody = document.querySelector("body");
	this.pagewrap = document.querySelector(".page_wrap");
	this.layer_wrap_parent = null;
	this.btn_close = null;
	this.bg_design_popup = null;
	this.scrollValue = 0;
  
	this.btn_closeTrigger = null;
	this.btn_close = null;
  
	const popupGroupCreate = document.createElement("div");
	popupGroupCreate.classList.add("layer_wrap_parent");
  
	if(!this.layer_wrap_parent && !document.querySelector(".layer_wrap_parent")){
	  this.pagewrap.append(popupGroupCreate);
	}
  
	this.layer_wrap_parent = document.querySelector(".layer_wrap_parent");
  
	
  
	// console.log(this.selector.querySelectorAll(".close_trigger"));
  
  
  
	this.bindEvent();
  }
  
  

  
  DesignPopup.prototype.popupShow = function () {
	this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
	if (this.selector == null) {
	  return;
	}
	// this.domHtml.classList.add("touchDis");

	
	this.selector.classList.add("active");
	setTimeout(()=>{
		this.selector.classList.add("motion_end");
		this.scrollCheck();
	},30);
	if ("beforeCallback" in this.option) {
	  this.option.beforeCallback();
	}
  
	if ("callback" in this.option) {
	  this.option.callback();
	}
	if(!!this.design_popup_wrap_active){
	  this.design_popup_wrap_active.forEach((element,index)=>{
		if(this.design_popup_wrap_active !== this.selector){
		  element.classList.remove("active");
		}
	  })
	}
	//animateIng = true;
  
	this.layer_wrap_parent.append(this.selector);
	
  
	this.dimCheck();
  
	// this.layer_wrap_parent
  
	// ****** 주소 해시 설정 ****** //
	// location.hash = this.selector.id
	// modalCount++
	// modalHash[modalCount] = '#' + this.selector.id
  }
  DesignPopup.prototype.popupHide = function () {
	var target = this.option.selector;
	if (target !== undefined) {
  
	  this.selector.classList.remove("motion");
	  if ("beforeClose" in this.option) {
		this.option.beforeClose();
	  }
	   //remove
	   this.selector.classList.remove("motion_end");
	   setTimeout(()=>{
  
		 this.selector.classList.remove("active");
	   },400)
	   this.design_popup_wrap_active = document.querySelectorAll(".popup_wrap.active");
	   this.dimCheck();
	   if ("closeCallback" in this.option) {
		 this.option.closeCallback();
	   }
	  //  if (this.design_popup_wrap_active.length == 0) {
	  //    this.domHtml.classList.remove("touchDis");
	  //  }
	}
  }
  
  DesignPopup.prototype.bindEvent = function () {
	this.btn_close = this.selector.querySelectorAll(".btn_popup_close");
	this.bg_design_popup = this.selector.querySelector(".bg_dim");
	var closeItemArray = [...this.btn_close];
	this.btn_closeTrigger = this.selector.querySelectorAll(".close_trigger");

	
  
	if(!!this.btn_closeTrigger){
	  closeItemArray.push(...this.btn_closeTrigger)
	}
	if (!!this.bg_design_popup) {
	  closeItemArray.push(this.bg_design_popup);
	}
	if (closeItemArray.length) {
	  closeItemArray.forEach((element) => {
		element.addEventListener("click", (e) => {
		  e.preventDefault();
		  this.popupHide(this.selector);
		}, false);
	  });
	}
  };

  DesignPopup.prototype.dimCheck = function(){
	const popupActive = document.querySelectorAll(".popup_wrap.active");
	if(!!popupActive[0]){
	  popupActive[0].classList.add("active_first");
	}
	if(popupActive.length>1){
	  this.layer_wrap_parent.classList.add("has_active_multi");
	}else{
	  this.layer_wrap_parent.classList.remove("has_active_multi");
	}
  }
  DesignPopup.prototype.scrollCheck = function(){
	  const popupActive = document.querySelector(".popup_wrap.active");
	  const popup_item = popupActive.querySelector(".popup_item");
	  const popup_content_low = popupActive.querySelector(".popup_content_low");
	 
	  action();
	  window.addEventListener("resize",()=>{
		  action();
		});
		
		function action(){
		if(!popup_content_low){return;}
		const getScrollbarWidth = () => popup_item.clientWidth - popup_content_low.scrollWidth;
		if(popup_content_low.classList.contains("d_type") && getScrollbarWidth()>0){
			popup_content_low.style.paddingLeft = getScrollbarWidth() + 'px';
			popup_content_low.classList.add("has_bar");
		}
	}
  }


function timeSwiper(){
	const time_gallery_swiper_wrap = document.querySelectorAll(".time_gallery_swiper_wrap");
	if(!time_gallery_swiper_wrap){return;}
	const option = {
		loop: true,
		speed: 800,
		pagination: {
		  el: ".swiper_imgbanner_container .swiper-pagination",
		  clickable: true
		}
	  }
	time_gallery_swiper_wrap.forEach((item,index)=>{

	});
}



function timeLineSwiper() {
	const time_gallery_swiper_wrap = document.querySelectorAll(".time_gallery_swiper_wrap");
	if (time_gallery_swiper_wrap.length) {
		time_gallery_swiper_wrap.forEach((swiperGroup, index) => {
		const thisSwiperGroup = swiperGroup;
		const thisSwiperSlide = thisSwiperGroup.querySelectorAll(".swiper-slide");
		swiperGroup.setAttribute("id", "swiper0" + (index + 1));
		if (thisSwiperSlide.length) {
		  (new Function(
			`
			  ${swiperGroup.getAttribute("id")} = new Swiper("#${swiperGroup.getAttribute("id")} .time-swiper", {
				loop: true,
				speed : 800,
				spaceBetween :6,
				slidesPerView: 3,
				slidesPerGroup : 3,
				navigation: {
					nextEl: '#${swiperGroup.getAttribute("id")} .btn_time_gallery_control.next',
					prevEl: '#${swiperGroup.getAttribute("id")} .btn_time_gallery_control.prev',
				},
				breakpoints: {
					1024: {
						spaceBetween :0,
						slidesPerView: 1,
						slidesPerGroup : 1,
					},
				},
			  });
			`
		  )());
		}
	  });
	}
  }


  function accordionFunc(){
	const accordion_bar = document.querySelectorAll(".accordion_bar");
	if(!accordion_bar){return;}
	accordion_bar.forEach((item)=>{
		item.addEventListener("click",(e)=>{
			const thisTarget = e.currentTarget;
			const thisParent = thisTarget.closest(".accordion_vitem");
			e.preventDefault();
			thisParent.classList.toggle("active");
		});
	})
  }


  

function photoSwiperFunc(){
	let photo_mv_obj = null;
	const photo_swiper_popup = document.querySelector("#photo_swiper_popup");
	const gallery_main_swiper_wrap = document.querySelector(".gallery_main_swiper_wrap");
	const gallery_main_slide = gallery_main_swiper_wrap.querySelectorAll(".swiper-slide");
	const gfraction_current = photo_swiper_popup.querySelector(".gfraction_current");
	const gfraction_length = photo_swiper_popup.querySelector(".gfraction_length");

	gfraction_length.textContent = gallery_main_slide.length;
	if(photo_mv_obj !== null){
		photo_mv_obj.update();
	}else{
		photo_mv_obj = new Swiper(".gallery_main_swiper_wrap .swiper-container", {
			speed : 1000,
			loop : true,
			navigation: {
                nextEl: '.gallery_main_swiper_wrap .btn_gallery_ms_control.next',
                prevEl: '.gallery_main_swiper_wrap .btn_gallery_ms_control.prev',
            },
			autoplay: {
				delay: 2500,
				disableOnInteraction: false
			}
		});

		slideSetting();
		photo_mv_obj.on("slideChange",()=>{
			slideSetting();
		});
		

		function slideSetting(){
			gfraction_current.textContent = photo_mv_obj.realIndex + 1;
		}

	}
}


function mobileBottomLayer(){
	const footer_wrap = document.querySelector(".footer_wrap");
	const mb_bottom_layer = document.querySelector(".mb_bottom_layer");
	const middle_wrap = document.querySelector(".middle_wrap");
	let btn_mbb_toggle = null;
	let mb_bottom_content = null;
	if(!!mb_bottom_layer){
		btn_mbb_toggle = mb_bottom_layer.querySelector(".btn_mbb_toggle");
		mb_bottom_content = mb_bottom_layer.querySelector(".mb_bottom_content");
	}
	let windowWid = window.innerWidth;

	if(!mb_bottom_layer){return;}
	action();
	window.addEventListener("resize",()=>{
		if(windowWid !== window.innerWidth){
			action();
		}
		windowWid = window.innerWidth;
	});
	btn_mbb_toggle.addEventListener("click",(e)=>{
		e.preventDefault();
		btn_mbb_toggle.classList.toggle("active");
		mb_bottom_content.classList.toggle("active");
	});
	
	function action(){
		if(window.innerWidth < 1024){
			footer_wrap.style.paddingBottom = mb_bottom_layer.getBoundingClientRect().height+40 + "px";
		}else{
			footer_wrap.style.paddingBottom = "0px";
		}
	}
}


function toggleCompItem(option){
	const targetDom = document.querySelectorAll(option.target);
	//const targetParent = targetDom.closest(option.parent);

	if(!!targetDom){
		targetDom.forEach((item) => {
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisTarget = e.currentTarget;
				const siblingsTarget = siblings(thisTarget);
				const siblingsTarget2 = thisTarget.closest(option.parent).querySelectorAll(option.target);

				if(!!siblingsTarget){
					siblingsTarget.forEach((item)=>{
						item.classList.remove("active");
					});
				}

				if(!!siblingsTarget2){
					siblingsTarget2.forEach((item)=>{
						if(item !== thisTarget){
							item.classList.remove("active");
						}
					});
				}
				thisTarget.classList.toggle("active");
			});
		});
	}
}


function siblings(t) {
	var children = t.parentElement.children;
	var tempArr = [];
  
	for (var i = 0; i < children.length; i++) {
	  tempArr.push(children[i]);
	}
  
	return tempArr.filter(function(e) {
	  return e != t;
	});
  }


  function verifyDetailAcc(){
	const verify_detail_acc_bar = document.querySelectorAll(".verify_detail_acc_bar");
	if(!!verify_detail_acc_bar){
		verify_detail_acc_bar.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisTarget = e.currentTarget;
				const thisParent = thisTarget.closest(".verify_detail_acc_item");
				thisParent.classList.toggle("active");
				window.dispatchEvent(new Event('resize'));
			});
		});
	}
  }

  function payTab(){
	const payTabZoneTab = document.querySelectorAll("#pay_tab_cont .render_tab");
	if(!!payTabZoneTab){
		payTabZoneTab.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisTarget = e.currentTarget;
				const thisTargetSiblings = siblings(thisTarget.closest("li"));
				const thisTargetCont = document.querySelector(thisTarget.getAttribute("href"));
				const thisTargetContSiblings = siblings(thisTargetCont);

				
				if(!!thisTargetCont){
					thisTargetSiblings.forEach((item)=>{
						item.classList.remove("active");
					})
					thisTarget.closest("li").classList.add("active");
					thisTargetContSiblings.forEach((item)=>{
						item.classList.remove("active");
					})
					thisTargetCont.classList.add("active");
				}
			});
		});
	}
  }


  function responMaxWidth(parent,target){
	const parentsDom =  document.querySelectorAll(parent);
	// const targetsDom =  document.querySelectorAll(target);
	if(!parentsDom){return;}
	action();
	window.addEventListener("resize",()=>{
		action();
	});

	function action(){
		parentsDom.forEach((item)=>{
			const thisItem = item;
			const thisItemTarget = thisItem.querySelectorAll(target);
			let maxWidth = [];

			if(!!thisItemTarget){
				thisItemTarget.forEach((item)=>{
					const thisLoopItem = item;
					thisLoopItem.style.removeProperty("width");
					maxWidth.push(thisLoopItem.getBoundingClientRect().width);
				});
				
				thisItemTarget.forEach((item)=>{
					const thisLoopItem = item;
					if(window.innerWidth>1023){
						thisLoopItem.style.removeProperty("width");
						return;
					}
					thisLoopItem.style.width = Math.max.apply(null,maxWidth) + "px";
				});
			}
		});
	}
  }

function moveCheckbar(){
	// $(".time_gallery_item").each(function(){
	// 	const thisItem = $(this);
	// 	const thisItemChk = thisItem.find(".move_chk");
	// 	const thisItemTarget = thisItem.find(".time_gallery_swiper_cont_row , .daylife_toggle_cont_wrap");
	// 	if(thisItemChk.prop("checked")){
	// 		thisItemTarget.css("height",thisItemTarget.children().outerHeight());
	// 	}else{
	// 		thisItemTarget.css("height",0);
	// 	}
	// });
	$(document).on("click",".move_chk",function(e){
		const thisChk = $(this);
		const thisParent = thisChk.parents(".time_gallery_item,.daylife_primary_item");
		const thisTarget = thisParent.find(".time_gallery_swiper_cont_row , .daylife_toggle_cont_wrap");

		thisTarget.css("height",thisTarget.children().outerHeight());
		if(!thisChk.prop("checked")){
			setTimeout(()=>{
				thisTarget.css("height",0);
			},30);
		}else{
			setTimeout(()=>{
				thisTarget.css("height","auto");
			},500);
		}
	});
}

function moveCheckInit(){
	action();
	$(window).on("resize",function(){
		action();
	});

	function action(){
		$(".time_gallery_item").not(".init").css("height","");
		$(".time_gallery_item").not(".init").each(function(){
			const thisItem = $(this);
			const thisItemChk = thisItem.find(".move_chk");
			const thisItemTarget = thisItem.find(".time_gallery_swiper_cont_row , .daylife_toggle_cont_wrap");
			if(thisItemChk.prop("checked")){
				thisItemTarget.css("height",thisItemTarget.children().outerHeight());
			}else{
				thisItemTarget.css("height",0);
			}
			thisItem.addClass("init");
		});
	}
}

function toggleHistory(){
	const dr_toggle_bar = document.querySelectorAll(".dr_toggle_bar");
	if(!!dr_toggle_bar){
		dr_toggle_bar.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				item.closest("li").classList.toggle("active");
			});
		})
	}
}


function reviewEval(){
	const reviewEvalWrap = document.querySelectorAll(".review_write_wrap");
	reviewEvalWrap.forEach((item)=>{
		const thisWrap = item;
		const thisWrapStarGroup = thisWrap.querySelector(".eval_star_wrap");
		const thisWrapStar = thisWrapStarGroup.querySelectorAll(".eval_star");
		const thisWrapProps = thisWrap.querySelectorAll(".review_write_props_list .form_drd");

		thisWrapProps.forEach((item,index)=>{
			item.addEventListener("click",()=>{
				const eqItem = thisWrapStar[thisWrapProps.length - 1 - index];
				const eqItemPrev = prevAll(eqItem);
				const eqItemNext = nextAll(eqItem);

				//reset
				if(!!eqItemPrev){
					eqItemPrev.forEach((item)=>{
						item.classList.add("active");
					});
				}
				if(!!eqItemNext){
					eqItemNext.forEach((item)=>{
						item.classList.remove("active");
					});
				}
				eqItem.classList.add("active");
			});
		})
	})
}

function prevAll(element) {
    var result = [];

    while (element = element.previousElementSibling)
        result.push(element);
    return result;
}

function nextAll(element) {
    var result = [];

    while (element = element.nextElementSibling)
        result.push(element);
    return result;
}


function dataRenderTabUI(){
	const data_render_tab_ui_wrap = document.querySelectorAll(".data_render_tab_ui_wrap");
	if(!!data_render_tab_ui_wrap){
		data_render_tab_ui_wrap.forEach((item)=>{
			const this_ui_wrap = item;
			const this_ui_tab = this_ui_wrap.querySelectorAll(".data_render_tab");
			const this_ui_tabcont = this_ui_wrap.querySelectorAll(".data_render_tabcont");

			this_ui_tab.forEach((tab)=>{
				tab.addEventListener("click",(e)=>{
					e.preventDefault();
					const thisTab = e.currentTarget;
					const thisTarget = document.querySelector(thisTab.getAttribute("href"));

					this_ui_tab.forEach((item)=>{
						item.closest("li").classList.remove("active");
					});
					thisTab.closest("li").classList.add("active");

					if(!!thisTarget){
						this_ui_tabcont.forEach((item)=>{
							item.classList.remove("active");
						});
						thisTarget.classList.add("active");
					}
				});
			})
		});
	}
}


function dataToggleFunc(){
	const single_toggle_bar = document.querySelectorAll(".single_toggle_bar");
	if(!!single_toggle_bar){
		single_toggle_bar.forEach((item)=>{
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisTarget = e.currentTarget;
				const thisTargetOther = siblings(thisTarget.closest("li"));
				if(!!thisTargetOther){
					thisTargetOther.forEach((item)=>{
						if(thisTarget == item){return;}
						item.classList.remove("active");
					});
				}
				thisTarget.closest("li").classList.toggle("active");
			});
		})
	}
}

function dataToggleEvent(){
	const dataToggleObj = document.querySelectorAll("[data-eventobj]");
	if(!!dataToggleObj){
		dataToggleObj.forEach((item)=>{
			let btnBoolean = false;
			item.setAttribute("data-origin",item.textContent);
			item.addEventListener("click",(e)=>{
				e.preventDefault();
				const thisObj = e.currentTarget;
				const thisObjText = thisObj.querySelector("span");
				const thisData = JSON.parse(thisObj.dataset.eventobj);
				const thisContent = thisData.content;
				const thisParent = thisObj.closest(".dc_vitem_wrap");
				if(btnBoolean){
					thisObjText.textContent = thisObj.dataset.origin;
				}else{
					thisObjText.textContent = thisData.text;
				}
				// if(!!){
				// 	document.querySelector(thisData.content).classList.toggle("none");
				// }
				thisContent.forEach((item)=>{
					document.querySelector(item).classList.toggle("none");
					console.log();
				})
				if(!!thisParent){
					thisParent.classList.toggle("skin2");
				}
				btnBoolean = !btnBoolean;
			});
		});
	}
}


function myIntroFunc(){
	const swiperMyintro = document.querySelector(".swiper-myintro");
	const swiperSlide = swiperMyintro.querySelectorAll(".swiper-slide");
	let myintroObj = null;
	let windowWidth = window.innerWidth;
	if(swiperSlide.length>4){
		console.log('test')
		if(myintroObj !== null){
			myintroObj.update();
		}else{
			if(window.innerWidth < 1024){
				mbFunc();
			}

			window.addEventListener("resize",()=>{
				if(windowWidth !== window.innerWidth){
					if(!!myintroObj){
						myintroObj.destroy();
					}
					if(window.innerWidth < 1024){
						mbFunc();
					}
				}
				windowWidth = window.innerWidth;
			});
		}

	
		function mbFunc(){
			myintroObj = new Swiper(".swiper-myintro", {
				speed : 1000, 
				slidesPerView: 4,
				slidesPerGroup : 4,
				freeMode: false,
				slidesPerGroupAuto : false,
				loop : false,
				pagination: {  
					el: ".swiper-myintro .swiper-pagination",
					clickable: true
				}
			});
		}
	}else{
		swiperMyintro.classList.add("nodata_type");
	}
}


function mainNotice(){
	let main_notice_obj = null;
	const main_notice_zone = $(".main_notice_zone");
	const main_notice_container = $(".main_notice_container");
	const main_notice_slide = main_notice_container.find(".swiper-slide");

	if($.cookie('popup') !== "today"){
		main_notice_zone.addClass("active");
	}else{
		main_notice_zone.removeClass("active");
		return;
	}
	if(main_notice_slide.length<=1){
		return;
	}
	if(main_notice_obj !== null){
		main_notice_obj.update();
	}else{
		main_notice_obj = new Swiper(".main_notice_container", {
			speed : 1000,
			loop : true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			pagination: {  
				el: ".notice_pagination.swiper-pagination",
				clickable: true
			}
		});
	}


	$("#btn_notice_today").on("click",function(e){
		$.cookie("popup","today",{expires:1});
		main_notice_zone.removeClass("active");
	});

	$("#btn_notice_popup").on("click",function(e){
		main_notice_zone.removeClass("active");
	});
}

function smtabFunc(){
	const smtab_container = document.querySelectorAll(".swiper-container.smtab_container");

	if(!!smtab_container){
		window.addEventListener("resize",()=>{
			modeCheckFunc();
		});
		modeCheckFunc();
		responFunc();

		function modeCheckFunc(){
			smtab_container.forEach((swiperGroup, index) => {
				const thisSwiperGroup = swiperGroup;
				const swiperWrapper = thisSwiperGroup.querySelector(".swiper-wrapper");
				const thisSwiperSlide = thisSwiperGroup.querySelectorAll(".swiper-slide");
				let slideSum = 0;
				thisSwiperSlide.forEach((item)=>{
					slideSum += item.getBoundingClientRect().width
				});
				if(thisSwiperGroup.getBoundingClientRect().width < slideSum){
					thisSwiperGroup.classList.add("scroll_mode");
				}else{
					thisSwiperGroup.classList.remove("scroll_mode");
				}
			});
		}
		function responFunc(){
			smtab_container.forEach((swiperGroup, index) => {
				const thisSwiperGroup = swiperGroup;
				const swiperWrapper = thisSwiperGroup.querySelector(".swiper-wrapper");
				const thisSwiperSlide = thisSwiperGroup.querySelectorAll(".swiper-slide");
				thisSwiperGroup.setAttribute("id", "smTabGroup0" + (index + 1));
				if (thisSwiperSlide.length) {
					(new Function(
					`
					${swiperGroup.getAttribute("id")} = new Swiper("#${swiperGroup.getAttribute("id")}", {
						slidesPerView: 'auto',
						slidesPerGroupAuto : true,
						freeMode: true,
						speed : 500,
						touchRatio : 1,
					});
					`
					)());
				}
			});
		}
	}
}



function gridGalleryFunc(){
	let window_wid = $(window).width();
	let gutter_value = 0;
	$('.grid_gallery_wrap').masonry({
		itemSelector: '.grid_gallery_item',
		gutter : 35
	});
	resizeAction();
	$(window).on("resize",function(){
		if(window_wid !== $(window).width()){
			resizeAction();
		}
		window_wid = $(window).width();
	});

	function resizeAction(){
		if($(window).width()>1023){
			gutter_value = 35;
		}else{
			gutter_value = 20;
		}
		$('.grid_gallery_wrap').masonry({
			gutter : gutter_value
		});
	}
}