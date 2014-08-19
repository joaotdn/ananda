<?php get_header(); global $post; ?>

      <div class="reveal-content">
        <div class="mbt small-12 left"></div>

        <!-- INICIO ESCOLA DE YOGA -->
        <section class="page-thumb-big small-12 columns">
          <figure class="small-12 left yoga-school bg-cover rel" style="background-image: url(<?php echo get_field('om_img_topo'); ?>);">
            <figcaption class="big-title abs wow fadeInUp" data-wow-duration="1500ms">
              <h1 class="white">Escola Om de Yoga</h1>
            </figcaption>
          </figure><!-- // foto destaque -->
          <div class="mbt small-12 left"></div>

          <h3 class="small-12 left text-center font-body page-intro"><?php echo get_field('om_intro'); ?></h3><!-- //introducao -->
        </section>
        <div class="mbt small-12 left"></div>
        
        <div class="small-12 columns">
          <figure class="small-12 medium-6 large-6 left">
            <div class="icon-escola centered"></div>
          </figure><!-- simbolo om -->
          <div class="mbt small-12 left show-for-small-only"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('om_th1'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('om_th2'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left">
            <div class="panel">
              <p><?php echo get_field('om_descricao'); ?></p>
            </div>
          </div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('om_th3'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('om_th4'); ?>);"></div>
        </div><!-- fotos -->
        <div class="mbt small-12 left"></div>
        <!-- FIM ESCOLA DE YOGA -->
      
<?php get_footer(); ?>
