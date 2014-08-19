        <!-- INICIO ACOES SOCIAIS -->
        <?php
          $args = array( 'post_type' => 'acoes', 'posts_per_page' => 1, 'orderby' => 'date' ); 
          $loop = new WP_Query( $args );
          while ( $loop->have_posts() ) : $loop->the_post();

          global $post;
          $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
        ?>
        <section class="social-actions small-12 medium-6 large-12 columns content-block">
          <a href="<?php echo get_post_type_archive_link('acoes'); ?>" title="<?php the_title(); ?>" class="display-block small-12 right">
            <figure class="bg-cover small-12 content-thumb-top" style="background-image: url(<?php echo $thumb[0]; ?>);"></figure>
          </a>
          <article class="small-12 left rel">
            <header class="small-12 columns right">
              <hgroup>
                <h4 class="text-low"><a href="<?php echo get_post_type_archive_link('acoes'); ?>" title="Mais Ações Sociais">ações sociais</a></h4>
                <h2 class="text-up"><a href="<?php echo get_post_type_archive_link('acoes'); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>
              </hgroup>
              <p class="except"><?php echo get_excerpt(100); ?></p>
              <p><a href="<?php echo get_post_type_archive_link('acoes'); ?>" title="<?php the_title(); ?>" class="text-up primary">Veja mais</a></p>
            </header>
          </article>
          <div class="small-12 left mbt"></div>
        </section>
        <?php endwhile; wp_reset_query(); ?>
        <!-- FIM ACOES SOCIAIS -->