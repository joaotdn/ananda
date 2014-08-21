<!doctype html>
<html class="no-js" lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="imaginaria.cc">
    <!--
      ***** IMAGINARIA.CC *****
      Design: Joao Faissal (https://www.flickr.com/photos/joaofaissal)
      Code: Joao Teodoro (http://about.me/jteodoro)
    -->
    <title><?php bloginfo('name'); ?> | <?php is_home() ? bloginfo('description') : wp_title(''); ?></title>
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/vnd.microsoft.icon"/>
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/x-ico"/>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.1/modernizr.min.js"></script>
    <?php wp_head(); ?>
  </head>
  <body>
    <div class="row">
      <!-- INICIO HEADER -->
      <header id="header" class="small-12 left">
        <figure class="logo small-6 medium-4 large-4 columns">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="Página principal">
            <img src="<?php echo get_template_directory_uri(); ?>/images/logo.png" alt="">
          </a>
        </figure><!-- logo -->
        
        <nav id="main-menu" class="small-12 columns">
          <ul class="inline-list show-for-large-up container-main-menu text-low">
            <?php

              $defaults = array(
                'theme_location'  => '',
                'menu'            => 'Menu principal',
                'container'       => '',
                'container_class' => '',
                'container_id'    => '',
                'menu_class'      => '',
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => 'wp_page_menu',
                'before'          => '<h5>',
                'after'           => '</h5>',
                'link_before'     => '',
                'link_after'      => '',
                'items_wrap'      => '%3$s',
                'depth'           => 0,
                'walker'          => ''
              );

              wp_nav_menu( $defaults );
            ?>
          </ul>
          
          <!-- redes sociais -->
          <?php 
            $contato = get_page_by_title('Contato');
            $instagram = get_field('an_instagram', $contato->ID);
            $facebook = get_field('an_facebook', $contato->ID);
          ?>
          <ul class="social-links inline-list small-12 left">
            <?php if($instagram != ''): ?>
            <li><a href="<?php echo $facebook; ?>" title="Siga-nos no Instagram" target="_blank"><span class="icon-instagram"></span></a></li>
            <?php endif; if($facebook): ?>
            <li><a href="<?php echo $instagram; ?>" title="Siga-nos no Facebook" target="_blank"><span class="icon-facebook"></span></a></li>
            <?php endif ?>
          </ul>
          <!-- // redes socias -->

          <div class="mbt hide-for-large-up small-12 left"></div>
          
          <!-- menu mobile -->
          <a href="#" data-dropdown="menu-mobile" class="button dropdown hide-for-large-up text-up white left small-12"><span class="icon-menu"></span> Menu</a>
          
          <div class="small-12 left rel">
          <ul id="menu-mobile" data-dropdown-content class="f-dropdown hide-for-large-up">
          </ul>
          </div>
          <!-- //menu mobile -->

        </nav>
      </header>
      <!-- FIM HEADER -->
      <?php if(is_post_type_archive('agenda')) { echo '</div><!-- //row [agenda] -->'; } ?>