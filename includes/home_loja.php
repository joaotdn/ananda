        <!-- INICIO LOJA -->
        <?php
          $args = array( 'post_type' => 'produtos', 'posts_per_page' => 1, 'orderby' => 'rand' ); 
          $loop = new WP_Query( $args );
          while ( $loop->have_posts() ) : $loop->the_post();

          global $post;
          $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
        ?>
        <a href="<?php echo get_post_type_archive_link('produtos'); ?>" title="Mais produtos" class="display-block small-12 medium-12 large-9 columns right">
          <figure class="bg-cover small-12 content-thumb-top" style="background-image: url(<?php echo $thumb[0]; ?>);"></figure>
        </a>
        <section class="commerce content-block small-12 medium-12 large-9 columns right">
          <article class="small-12 left rel">
            <header class="small-12 columns right">
              <hgroup>
                <h4 class="text-low"><a href="<?php echo get_post_type_archive_link('produtos'); ?>" title="Mais produtos">produtos</a></h4>
                <h2 class="text-up"><?php the_title(); ?></h2>
              </hgroup>
              <p class="text-up">R$ <?php echo get_field('preco',$post->ID); ?></p>
              <p><a href="<?php echo get_post_type_archive_link('produtos'); ?>" title="Mais produtos" class="text-up primary">Veja mais</a></p>
            </header>
          </article>
        </section>
        <?php endwhile; wp_reset_query(); ?>
        <div class="small-12 left mbt show-for-large-up"></div>
        <div class="small-12 left mbt show-for-large-up"></div>
        <!-- FIM LOJA -->