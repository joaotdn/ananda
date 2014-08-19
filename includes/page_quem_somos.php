      <div class="reveal-content">
        <div class="mbt small-12 left"></div>
        <?php global $post; ?>
        <!-- INICIO ESCOLA DE YOGA -->
        <section class="page-thumb-big small-12 columns">
          <figure class="small-12 left yoga-school bg-cover rel" style="background-image: url(<?php echo get_field('qs_img_topo',$post->ID); ?>);">
            <figcaption class="big-title abs wow fadeInUp" data-wow-duration="1500ms">
              <h1 class="white">Quem Somos</h1>
            </figcaption>
          </figure><!-- // foto destaque -->
        </section>
        
        <div class="small-12 columns">
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th1',$post->ID); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left">
            <div class="panel">
              <p><?php echo get_field('qs_txt1',$post->ID); ?></p>
            </div>
          </div>
          <div class="thumb-block small-12 medium-6 large-6 left">
            <div class="panel">
              <p><?php echo get_field('qs_txt2',$post->ID); ?></p>
            </div>
          </div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th2'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th3'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th4'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th5'); ?>);"></div>
          <div class="thumb-block small-12 medium-6 large-6 left bg-cover" style="background-image: url(<?php echo get_field('qs_th6'); ?>);"></div>
        </div><!-- fotos -->
        <div class="mbt small-12 left"></div>
        <!-- FIM ESCOLA DE YOGA -->
