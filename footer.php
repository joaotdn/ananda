      
      <?php if(is_post_type_archive('agenda')) { echo '<div class="row"><!-- //row [agenda] -->'; } ?>
      
      <?php 
        if(!is_home()) {
          include_once 'includes/footer_desktop.php';
        }
      ?>

      <!-- INICIO RODAPE MOBILE -->
      <footer id="footer-mobile" class="small-12 columns hide-for-large-up"></footer>
      <!-- FIM RODAPE MOBILE -->
      
      </div><!-- conteudo apos preload -->
    </div><!-- row -->

    <figure id="an-preload" class="small-12 text-center">
      <div class="icon-an-loader centered"></div>
    </figure><!-- // icone preload -->

    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/scripts.js"></script>
    <script>
      /* <![CDATA[ */
      $( '.list-slide' ).on( 'cycle-before', function( event, opts ) {
          wow = new WOW(
            {
              animateClass: 'animated',
              offset:       100
            }
          );
          wow.init();
      });
      /* ]]> */
    </script>
    <div id="fb-root"></div>
    <script>(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&appId=285518124940152&version=v2.0";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>

    <?php wp_footer(); ?>
  </body>
</html>