<?php get_header(); ?>

      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO AGENDA -->
        <div class="row">
          <div class="small-12 columns">
            <div class="mbt small-12 left"></div>
            <h1 class="font-body small-12 left text-up panel-title no-bg wow fadeInUp bd-bottom" data-wow-duration="1500ms">Agenda</h1>
          </div>
        </div>
        
        <!-- CURSOS -->
        <nav class="list-courses small-12 columns">
          <div class="row">
            <div class="mbt small-12 left"></div>
            <header class="small-12 columns mbt">
              <h1 class="text-up gray">Cursos</h1>
            </header>
          </div>

          <ul class="flowslider inline-list">
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
                    <?php $orientador = get_field('ag_orientador',$post->ID); if($orientador): ?>
                    <p class="except text-up blue">Com <?php echo $orientador; ?></p>
                    <?php endif; ?>
                    <h4><?php echo get_field('ag_data',$post->ID); ?></h4>
                    <?php
                      $info = get_field('ag_info',$post->ID);
                      if($info != ''):
                    ?>
                      <p class="except blue text-up">R$ <?php echo $info; ?></p>
                    <?php endif; ?>
                    <p class="small-text"><?php the_excerpt(); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>
        </nav>
        <!-- // CURSOS -->

        <!-- ATIVIDADES -->
        <nav class="list-courses small-12 columns">
          <div class="row">
            <header class="small-12 columns mbt">
              <h1 class="text-up gray">Atividades</h1>
            </header>
          </div>

          <ul class="flowslider inline-list">
            <?php
              $args = array( 'taxonomy' => 'categorias-cursos', 'term' => 'atividades',  'posts_per_page' => 10, 'orderby' => 'date' ); 
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
                    <?php
                      $info = get_field('ag_info',$post->ID);
                      if($info != ''):
                    ?>
                      <p class="except blue text-up">R$ <?php echo $info; ?></p>
                    <?php endif; ?>
                    <p class="small-text"><?php the_excerpt(); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>
        </nav>
        <!-- // ATIVIDADES -->

        <!-- ACOES ACOES SOCIAIS -->

        <nav class="list-courses small-12 columns">
          <div class="row">
            <header class="small-12 columns mbt">
              <h1 class="text-up gray">Ações Sociais</h1>
            </header>
          </div>

          <ul class="flowslider inline-list">
            <?php
              $args = array( 'taxonomy' => 'categorias-cursos', 'term' => 'acoes-sociais',  'posts_per_page' => 10, 'orderby' => 'date' ); 
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
                    <?php
                      $info = get_field('ag_info',$post->ID);
                      if($info != ''):
                    ?>
                      <p class="except blue text-up">R$ <?php echo $info; ?></p>
                    <?php endif; ?>
                    <p class="small-text"><?php the_excerpt(); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>
        </nav>
        <!-- // ACOES SOCIAIS -->

        <div class="mbt small-12 left"></div>
        <!-- FIM AGENDA -->

<?php get_footer(); ?>