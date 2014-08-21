<?php get_header(); ?>

      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO CURSOS -->
        <div class="small-12 columns">
          <h1 class="small-12 left text-center text-low panel-title no-bg wow fadeInUp" data-wow-duration="1500ms">Cursos</h1>
          <div class="small-12 left mbt"></div>
          <p class="font-body small-12 left text-center panel-title info">
            <?php
              $contato = get_page_by_title('Contato');
              $tel1 = get_field('an_tel1', $contato->ID);
              $email = get_field('an_email', $contato->ID);
            ?>
            Todos os cursos podem ser inscritos pelo telefone <span class="blue"><?php echo $tel1; ?></span> ou pelo email <span class="blue"><?php echo $email; ?></span>
          </p>
        </div>

        <nav class="list-courses small-12 columns">
          <ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-2">
            <?php
              $args = array( 'taxonomy' => 'categorias-cursos', 'term' => 'cursos',  'posts_per_page' => -1, 'orderby' => 'date' ); 
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
                    <?php $orientador = get_field('ag_orientador',$post->ID); if($orientador): ?>
                    <p class="except text-up blue">Com <?php echo $orientador; ?></p>
                    <?php endif; ?>
                    <h4><?php echo get_field('ag_data',$post->ID); ?></h4>
                    <p class="except blue text-up">R$ <?php echo get_field('ag_info',$post->ID); ?></p>
                    <p class="small-text"><?php the_excerpt(); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>
        </nav>
        <div class="mbt small-12 left"></div>
        <!-- FIM CURSOS -->

<?php get_footer(); ?>
