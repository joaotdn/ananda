<?php get_header(); ?>

      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO ACOES SOCIAIS -->
        <div class="small-12 columns">
          <h1 class="small-12 left text-center text-low panel-title no-bg wow fadeInUp" data-wow-duration="1500ms">Ações Sociais</h1>
        </div>
        <div class="mbt small-12 left"></div>

        <nav class="list-actions small-12 columns">
          
          <ul class="small-block-grid-1">
            <?php
              $args = array( 'post_type' => 'acoes', 'posts_per_page' => 3, 'orderby' => 'date' ); 
              $loop = new WP_Query( $args );
              while ( $loop->have_posts() ) : $loop->the_post();

              global $post;
              $imagens = get_field('as_gallery',$post->ID);
            ?>
            <li>
              <?php if(isset($imagens)): ?>
              <nav class="small-12 left cycle-slideshow rel"
                data-cycle-fx="fade" 
                data-cycle-timeout="0"
                data-cycle-slides="> figure"
                data-cycle-pager=".pager-container-1"
                data-cycle-pager-template="<span></span>"
                data-cycle-swipe="true"
                data-cycle-swipe-fx="scrollHorz"
              >
                <?php foreach($imagens as $imagem): ?>
                <figure class="small-12 left bg-cover action-slide" style="background-image: url(<?php echo $imagem['as_foto']; ?>);"></figure>
                <?php endforeach; ?>
                <nav class="pager-container-1 slide-pager small-12 abs text-center"></nav>
              </nav>
              <?php endif; ?>
              <div class="small-12 left content-block">
                <article class="small-12 columns">
                  <div class="small-12 columns">
                    <h3 class="blue text-up"><?php the_title(); ?></h3>
                    <?php $coordenador = get_field('as_coordenador',$post->ID); if(isset($coordenador)): ?>
                    <p class="small-text text-up">Com <?php echo $coordenador; ?></p>
                    <?php endif; ?>
                    <p class="small-text"><?php echo get_field('as_descricao',$post->ID); ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endwhile; wp_reset_query(); ?>
          </ul>

        </nav>
        <div class="mbt small-12 left"></div>
        <!-- FIM ACOES SOCIAIS -->
      
<?php get_footer(); ?>
