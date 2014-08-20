<?php get_header(); ?>

      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO CURSOS -->
        <div class="small-12 columns">
          <h1 class="font-body small-12 left text-up panel-title no-bg wow fadeInUp bd-bottom" data-wow-duration="1500ms">Agenda</h1>
          <div class="mbt small-12 left"></div>
        </div>

        </div><!-- //row -->
        
        <!-- CURSOS -->
        <nav class="list-courses small-12 columns">
          
          <div class="row">
            <header class="small-12 left mbt">
              <h3 class="text-up">Cursos</h3>
            </header>
          </div>

          <ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
            <?php
              $args = array( 'taxonomy' => 'categorias-cursos', 'term' => 'cursos',  'posts_per_page' => 10, 'orderby' => 'date' ); 
              $loop = new WP_Query( $args );
              while ( $loop->have_posts() ) : $loop->the_post();

              global $post;
              $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'large' );
            ?>
            <li>
              <figure class="small-12 left">
                  <div class="course-thumb small-12 left bg-cover content-thumb-inner" style="background-image: url(<?php echo $thumb[0]; ?>);"></div>
              </figure>
              <div class="content-block small-12 left">
                <article class="small-12 left">
                  <div class="small-12 columns">
                    <h2 class="text-up small-12 blue"><?php the_title(); ?></h2>
                    <p class="small-text"><?php the_excerpt(); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>
        </nav>
        <!-- // CURSOS -->

        <!-- reinicio .row -->
        <div class="row">

        <div class="mbt small-12 left"></div>
        <!-- FIM CURSOS -->

<?php get_footer(); ?>
