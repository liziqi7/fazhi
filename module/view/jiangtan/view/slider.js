define('', '', function(require) {
	var B = require('backbone');
	var M = require('base/model');
	var Swipe = require('plusin/swipe');
	var H = require('text!../../../../tpl/index/view/slider.html');
	var model = new M();
	var V = B.View.extend({
		model: model,
		template: H,
		initialize: function() {
			var t = this;			
			// t.listenTo(t.model, "sync", function() {
				t.render();
			// });			
		},
		//待优化
		render: function() {
			var t = this,
				data = {"data":[{"id":0,"pic":"resource/images/s1.png"},{"id":1,"pic":"resource/images/s2.png"}]};//t.model.toJSON();
			var html = _.template(t.template, data);
			t.$el.show().html(html);
			t.doSlider();
			Jser.loadimages(t.$el);			
		},
		doSlider: function() {
			var t=this;
			window.global_indexSwipe = Swipe(t.$el.find(".slider-box")[0], {
				stopPropagation: true,
				continuous: true,
				auto: 2000,
				speed: 800,
				callback: function(idx) {
					t.$el.find(".js-sliderIdx li").removeClass().eq(idx % global_indexSwipe.getNumSlides()).addClass("on");
				}
			});
		}
	});
	return function(pars) {
		// model.set({
		// 	action: 'carousel/carouselList'
		// });		
		return new V({
			el: pars.el
		});
	}
})