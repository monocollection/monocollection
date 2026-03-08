$(function(){
  syncDetailCoverHeight();
  if (window.matchMedia("(min-width: 992px)").matches) {
    syncDetailTextHeight();
  } else {
    matchWidth(".navbar-light .container-fluid");
  }
  matchHalfWidth(".dropdown-menu");
  fitCovers();

  function getViewportContentHeight() {
    var h = $(window).height() - 122 - 120;
    if (window.matchMedia("(max-width: 1440px)").matches) {
      h += 64;
    }

    return Math.max(h, 0);
  }
  function getDetailCoverHeight() {
    var h = getViewportContentHeight();
    var cover = $(".item--content--cover").first();

    if (!window.matchMedia("(min-width: 992px)").matches || !cover.length) {
      return h;
    }

    return Math.min(h, cover.width());
  }
  function syncDetailCoverHeight() {
    var h = getDetailCoverHeight();
    $(".item--content--cover, .item--content--cover .carousel-inner, .item--content--cover .carousel-item").height(h);
  }
  function syncDetailTextHeight() {
    $(".item--content--text .col").height(getDetailCoverHeight());
  }
  function matchHalfWidth(el) {
    if ($(el)) {
      var w = $(window).width() / 2;
      $(el).width(w);
    }
  }
  function matchWidth(el) {
    if ($(el)) {
      var w = $(window).width() - 40;
      $(el).width(w);
    }
  }
  function fitCovers() {
    var container = $(".item--list .col-md-6").first();
    if (container) {
      c_width = container.width();
      $('.item--list--cover').each(function(i){
        $(this).width(c_width).height(c_width);
      });
    }
  }

  function applyCarouselCover(img) {
    var source = img.currentSrc || $(img).attr('src');
    if (!source || !img.naturalWidth) {
      return;
    }

    var ratio = img.naturalWidth / img.naturalHeight;
    var isSquare = Math.abs(ratio - 1) < 0.08;
    $(img).parent()
      .toggleClass('photo--contain', isSquare)
      .css({
        'background': 'url("' + source + '") 50% 50% / ' + (isSquare ? 'contain' : 'cover') + ' no-repeat',
        'background-color': isSquare ? '#fff' : 'transparent'
      });
    $(img).hide();
  }

  if (window.matchMedia("(min-width: 992px)").matches) {
    var target = '.dropdown, ';
    target += '.works .term.active, .work .term.active, ';
    target += '.applications .term.active, .application .term.active';
    $(target).on('mouseenter mouseleave', function(e){
      $('.dropdown-menu').each(function(){
        $(this).toggleClass('show');
        $(this).parent().toggleClass('show');
      });
      $('.header .nav-item').each(function(){
        $(this).toggleClass('open');
      });
    });
  }
  $(window).on("resize",function(e){
    syncDetailCoverHeight();
    if (window.matchMedia("(min-width: 992px)").matches) {
      syncDetailTextHeight();
    } else {
      $(".item--content--text .col").css('height', 'auto');
    }
    matchHalfWidth(".dropdown-menu");
    fitCovers();
  });

  $(document).bind('keyup', function(e) {
    if(e.which == 39){
      $('.carousel').carousel('next');
    }
    else if(e.which == 37){
      $('.carousel').carousel('prev');
    }
  });

  $('#play-pause').on('click', function(){
    if ($(this).hasClass('play')) {
      $(this).removeClass('play');
      $('.carousel').carousel('pause');
      $('#play-pause-button').attr('src', '/img/ios7-play.png');
    } else {
      $(this).addClass('play');
      $('.carousel').carousel('cycle');
      $('#play-pause-button').attr('src', '/img/ios7-pause.png');
    }
  });

  var container = $(".item--content--text .col").first();
  if(container) {
    if ( container.prop('scrollHeight') > container.prop('clientHeight')) {
      $('.more').width(container.width() - 15);
    }
  }
  $(".item--content--text .col.text").scroll(function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
      $(".more").fadeOut();
    } else {
      $(".more").fadeIn();
    }
  });
  if (window.matchMedia("(min-width: 992px)").matches) {
    $(".dropdown .nav-link").on('click', function(e) {
      event.preventDefault();
    });
  } else {
    $(".more").hide();
  }
  $(".more").click(function (){
      $('.item--content--text .col.text').animate({
          scrollTop: $(this).offset().top
      }, 2000);
  });

  $('.carousel-item.photo img').each(function() {
    if (this.complete) {
      applyCarouselCover(this);
    } else {
      $(this).one('load', function() {
        applyCarouselCover(this);
      });
    }
  });

  if (window.matchMedia("(max-width: 575.98px)").matches) {
    $('footer.footer .col:last-child').hide();
    var shopLink = $('#shop a').css('fontSize', '12px').addClass('float-right mr-3');
    $('.col.d-block.d-sm-none').append(shopLink);
    $('#shop').hide();
  }

});

$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    $('.breadcrumbs').removeClass('fixed');
    if (window.matchMedia("(max-width: 1440px)").matches) {
      $('body').css({'padding-top': '43px'});
    } else {
      $('body').css({'padding-top': '60px'});
    }
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
if (!$('body').hasClass('detail')) {
  $(window).scrollEnd(function(){
    var scroll = $(window).scrollTop();
    if (scroll != 0) {
      var width = $('.header .row').width();
      $('.breadcrumbs').addClass('fixed').width(width);
      if (window.matchMedia("(max-width: 1440px)").matches) {
        $('body').css({'padding-top': '73px'});
      } else {
        $('body').css({'padding-top': '100px'});
      }
    }
  }, 500);
}
