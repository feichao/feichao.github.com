;
(function($, window, document, undefined) {
  'use strict';

  var getTop = function() {
    return $('body').scrollTop() || $('html').scrollTop();
  };

  var WanBackToTop = function(element, options) {
    var template = '<img alt="backtotop" class="backtotop-img">';

    this.defaults = {
      displayTop: 500,
      imgSrc: 'http://7xl1b4.com1.z0.glb.clouddn.com/to_top.png',
      size: {
        height: '50px',
        width: '50px'
      },
      speed: 500,
      position: {
        right: '30px',
        bottom: '30px'
      },
      template: ''
    };

    this.options = $.extend({}, this.defaults, options);
    this.options.template += template;
    this.options.bottom = '-' + this.options.size.height;

    this.options.hideAnimate = function(img) {
      img.animate({
        bottom: this.bottom
      }, 150, 'swing');
    };
    this.options.showAnimate = function(img) {
      img.animate({
        bottom: this.position.bottom
      }, 150, 'swing');
    };

    this.element = element;
    this.element.css({
      bottom: this.options.bottom,
      cursor: 'pointer',
      position: 'fixed',
      height: this.options.size.height,
      width: this.options.size.width,
      right: this.options.position.right
    });

    this.backToTop = undefined;

  };

  WanBackToTop.prototype.init = function() {
    var self = this;

    self.element.html(self.options.template);
    self.backToTop = self.element.children('.backtotop-img');
    self.backToTop.css({
      height: '100%',
      width: '100%'
    });
    self.backToTop.on('click', function() {
      $('html, body').animate({
        scrollTop: 0
      }, self.options.speed);
    }).attr('src', self.options.imgSrc);

  };

  WanBackToTop.prototype.showOrHide = function(top) {
    var self = this;
    var now = self.element.css('bottom');
    if (top > self.options.displayTop) {
      now === this.options.bottom && self.options.showAnimate(self.element);
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
