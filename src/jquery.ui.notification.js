if(!window['console'])
	window.console = {log: function() {}};

(function($) {
	$.notification = {
		hide: function() {
			$(':ui-notification').notification('hide');
		},
		show: function() {
			$(':ui-notification').notification('show');
		},
		create: function() {
			$('<null />').notification(arguments);
		},
		remove: function() {
			$(':ui-notification').notification('remove');
		}
	};

	$.widget('ui.notification', {
		options: {
			message: "Internet Explorer is missing updates required to view this website. Click here to update...",
			isActive: function() { return true; },
			overlayTemplate: "<div><div class='ui-notification-overlay'></div></div>",
			underlayTemplate: "<div></div>",
			imagePath: "",
			messageOverIcon: "message-over.png",
			messageOutIcon: "message-out.png",
			closeOverIcon: "close-over.png",
			closeOutIcon: "close-out.png",
			usePlaceholder: true,
			useStyles: true,
			wrapper: null,
			styles: {
				normal: {
					width: "100%",
					position: "fixed",
					top: 0,
					left: 0,
					overflow: "hidden",
					zIndex: 9999,
					backgroundColor: "#ffffe7",
					//borderBottom: "1px solid #848284",
					fontFamily: "Bitstream Vera Sans, Arial, sans-serif",
					fontSize: "11px",
					wordSpacing: "-1px",
					padding: "7px 0 4px 24px",
					cursor: "default"
				}, 
				hoverIn: {
					backgroundColor: "#08246b",
					color: "#fff"
				},
				hoverOut: {
					backgroundColor: "#ffffe7",
					color: "#000"
				}
			},
			events: {
				beforeShow: function() {},
				afterShow: function() {},
				beforeHide: function() {},
				afterHide: function() {},
				beforeRemove: function() {},
				afterRemove: function() {},
				beforeCreate: function() {},
				afterCreate: function() {}
			}
		},
		_create: function() {
			var self = this;
			
			this.options.events.beforeCreate();

			if(this.options.wrapper && $(this.options.wrapper).length) {

				
			}
			
			if(this.element.is('null')) {
				this.element = $(this.options.overlayTemplate)
				.html(this.options.message)
				.css(this.options.useStyles ? this.options.styles.normal : {})
				.css({
					top: '-20px'
				})
				.prependTo('body');
			}
			else {
				this.element
				.css(this.options.useStyles ? this.options.styles.normal : {})
				.css({
					top: '-' + this.element.height() + 'px'
				});
			}
			
			this.placeholder = $(this.options.underlayTemplate)
				.prependTo('body')
				.css({
					width: '100%'
				});
			
			this.element.hover(function() {
				$(this).css(self.options.styles.hoverIn);
			}, function() {
				$(this).css(self.options.styles.hoverOut);
			});
			
			//if(this.options.isActive()) {
				this.show();
			//}
		
			this.options.events.afterCreate();
		},
		_destroy: function() {
			
		},
		hide: function() {
			this.options.events.beforeHide();
			
			this.placeholder.animate({
				paddingTop: 0 
			}, 500, 'linear');
			
			this.element.animate({
				top: 0 
			}, 500, 'linear', function() {
				self.options.events.afterHide();
			});
		},
		show: function() {
			var self = this;
			
			self.options.events.beforeShow();

			this.placeholder.animate({
				paddingTop: '20px' 
			}, 500, 'linear');
			
			this.element.animate({
				top: 0 
			}, 500, 'linear', function() {
				self.options.events.afterShow();
			});
		},
		remove: function() {
			this.options.events.beforeRemove();
			
			this._destroy();
			this.element.remove();
			
			this.options.events.afterRemove();
		},
		placeholder: null
	});

	$.extend($.browser.notice, {
		version: "@VERSION"
	});
})(jQuery);
