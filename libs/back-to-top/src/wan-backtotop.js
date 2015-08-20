;
(function($, window, document, undefined) {
  'use strict';

  var getTop = function() {
    return $('body').scrollTop() || $('html').scrollTop();
  };

  var WanBackToTop = function(element, options) {
    this.defaults = {
      toTopImg: 'http://7xl1b4.com1.z0.glb.clouddn.com/to_top.png',
      css: undefined,
      displayTop: 500,
      speed: 500,
      position: {
      	right: '30px',
      	bottom: '30px'
      },
      showAnimate: function(img) {
      	img.animate({
          bottom: this.position.bottom
        }, 150, 'swing');
      },
      hideAnimate: function(img) {
        img.animate({
          bottom: '-50px'
        }, 150, 'swing');
      },
      template: '<img alt="backtotop" class="backtotop-img">'
    };

    this.options = $.extend({}, this.defaults, options);
    this.element = element;
    this.element.css('right', this.options.position.right);
    this.backToTop = undefined;

  };

  WanBackToTop.prototype.init = function() {
    var self = this;

    self.element.html(self.options.template);
    self.backToTop = self.element.children('.backtotop-img');
    self.backToTop.on('click', function() {
      $('body').animate({
        scrollTop: 0
      }, self.options.speed);
    }).attr('src', self.options.toTopImg);

  };

  WanBackToTop.prototype.showOrHide = function(top) {
    var self = this;
    var now = self.element.css('bottom');
    if (top > self.options.displayTop) {
      now === '-50px' && self.options.showAnimate(self.element);
    } else {
      now === self.options.position.bottom && self.options.hideAnimate(self.element);
    }
  };


  $.fn.WanBackToTop = function(options) {
    var btts = []
    $(this).each(function(index, element) {
      var btt = new WanBackToTop($(element), options);
      btt.init();
      btts.push(btt);
    });

    $(window).on('scroll', function() {
      var top = getTop();
      $.each(btts, function(index, btt) {
        btt.showOrHide(top);
      });
    });
    return $(this);
  };
})(jQuery, window, document)
