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
	Chamar wow antes de iniciar slide
 */
$( '.list-slide' ).on( 'cycle-before', function( event, opts ) {
    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
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
