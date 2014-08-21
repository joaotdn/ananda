//Preloader
$('.reveal-content').jpreLoader({
	//autoClose: false,
	splashID: '#an-preload',
	showPercentage: false,
	splashVPos: "50%"
}, function() {
	$('.reveal-content').fadeIn('slow');

	wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
});

// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

/*
	Barra de progresso no slide principal
 */
var progress = $('#progress'),
    slideshow = $( '.cycle-slideshow' );

slideshow.on( 'cycle-initialized cycle-before', function( e, opts ) {
    progress.stop(true).css( 'width', 0 );
});

slideshow.on( 'cycle-initialized cycle-after', function( e, opts ) {
    if ( ! slideshow.is('.cycle-paused') )
        progress.animate({ width: '100%' }, opts.timeout, 'linear' );
});

slideshow.on( 'cycle-paused', function( e, opts ) {
   progress.stop(); 
});

slideshow.on( 'cycle-resumed', function( e, opts, timeoutRemaining ) {
    progress.animate({ width: '100%' }, timeoutRemaining, 'linear' );
});

/*
	Copia conteudo do menu principal para o menu mobile
 */
$('li','.container-main-menu').clone().appendTo('#menu-mobile');

/*
	Copia conteudo do rodape para rodape mobile
 */
$('.footer-content').clone().appendTo('#footer-mobile');

/*
  Mostrar sobre o profissional mobile
 */
$('a[data-reveal-id="about-modal"]').on('touchstart click',function() {
  var parent = $(this).parents('figure'),
      name   = parent.find('.name').text(),
      desc   = parent.find('.about-professional > p').text();

  $('h2','#about-modal').html(name);
  $('p','#about-modal').html(desc);
});

$('.about-professional').on('mouseover',function() { $(this).stop().fadeOut('fast'); });

$('li','.list-professionals').hover(
  function() {
    var openProfessionalModal = $('a[data-reveal-id="about-modal"]',this).css('display');
    if(openProfessionalModal != 'block') {
      $(this).find('.about-professional').stop().fadeIn('fast');
    }  
  },
  function() {
    $(this).find('.about-professional').stop().fadeOut('fast');
  }
);

function worksList() {
  //var count = $('article','.list-articles').length;
  $.each($('.about-professional'),function(i) {
    switch(i % 1000) {
      case 3: 
        $(this).addClass('show-in-left');
      break;

      case 4: 
        $(this).addClass('show-in-left');
      break;

      case 9: 
        $(this).addClass('show-in-left');
      break;

      case 10: 
        $(this).addClass('show-in-left');
      break;

      case 15: 
        $(this).addClass('show-in-left');
      break;

      case 16: 
        $(this).addClass('show-in-left');
      break;

      case 21: 
        $(this).addClass('show-in-left');
      break;

      case 22: 
        $(this).addClass('show-in-left');
      break;

      case 21: 
        $(this).addClass('show-in-left');
      break;

      case 22: 
        $(this).addClass('show-in-left');
      break;

      case 27: 
        $(this).addClass('show-in-left');
      break;

      case 28: 
        $(this).addClass('show-in-left');
      break;

      case 35: 
        $(this).addClass('show-in-left');
      break;

      case 36: 
        $(this).addClass('show-in-left');
      break;
    }
  });
};
worksList();

//Gerar timeline
FlowSlider(".flowslider", {
    startPosition: 0.0,
    position: 0.5,
    marginStart: 50,
    marginEnd: 100,
    controllerOptions: [{
        mouseStart: 0,
        mouseEnd: 100
    }]
});


