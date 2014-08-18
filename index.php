<?php get_header(); ?>

      <div class="reveal-content">

      <?php
        /*
          Slide principal
         */
        include_once 'includes/home_slide.php';
      ?>

      <!-- INICIO CONTEUDO -->
      <div class="small-12 medium-12 large-8 left">
        
        <?php
          /*
            SERVIÇOS
           */
          include_once 'includes/home_servicos.php';

          /*
            PROFISSIONAIS
           */
          include_once 'includes/home_profissionais.php';

          /*
            LOJA
           */
          include_once 'includes/home_loja.php';

          /*
            RODAPE
           */
          include_once 'includes/footer_desktop.php';
        ?>
      </div>
      <!-- FIM CONTEUDO -->

      <?php
        /*
          Home SIDEBAR
        */
        get_sidebar( 'home' );
      ?>

<?php get_footer(); ?>
