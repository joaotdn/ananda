      <!-- INICIO SLIDE PRINCIPAL -->
      <nav id="main-slide" class="small-12 columns rel">
        
        <div class="cycle-slideshow small-12 left list-slide"
          data-cycle-fx="fade" 
          data-cycle-timeout="10000"
          data-cycle-slides="> div"
          data-cycle-pager=".pager-container"
          data-cycle-pager-template="<span></span>"
        >    
          <section id="progress"></section>
          
          <?php
            $args = array( 'post_type' => 'agenda', 'posts_per_page' => 3, 'orderby' => 'date' ); 
            $loop = new WP_Query( $args );
            while ( $loop->have_posts() ) : $loop->the_post();

            global $post;
            $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
            $categoria = get_field('ag_categoria',$post->ID);
            $master = get_field('ag_orientador',$post->ID);
            $datas = get_field('ag_data',$post->ID);
          ?>
          <div class="small-12 left">
            <a href="<?php echo get_post_type_archive_link('agenda'); ?>" title="<?php the_title(); ?>" class="display-block">
              <figure class="small-12 left bg-cover" style="background-image: url(<?php echo $thumb[0]; ?>);"></figure>
            </a>
            
            <article class="small-12 medium-5 large-4 abs slide-info wow fadeInUp" data-wow-duration="1500ms">
              <?php if($categoria != ''): ?> <h4 class="text-low"><?php echo $categoria; ?></h4><?php endif; ?>
              <h1><a href="<?php echo get_post_type_archive_link('agenda'); ?>" class="white text-up" title="<?php the_title(); ?>"><?php echo the_title(); ?></a></h1>
              <?php if($master != ''): ?><p class="text-up white">com <?php echo $master; ?></p><?php endif; ?>
              <?php if($datas != ''): ?><h3 class="text-low"><?php echo $datas; ?></h3><?php endif; ?>
              <p class="white except show-for-large-up"><?php get_excerpt(100); ?></p>
              <a href="<?php echo get_post_type_archive_link('agenda'); ?>" class="button-white show-for-medium-up text-up" title="<?php the_title(); ?>">Veja mais</a>
            </article>
          </div> 
          <?php endwhile; wp_reset_query(); ?>

          <section class="slide-pager abs small-12">
            <nav class="slide-pager centered display-ib pager-container">
            </nav>
          </section>
        </div>
      </nav>
      <div class="small-12 left mbt"></div>
      <!-- FIM SLIDE PRINCIPAL -->