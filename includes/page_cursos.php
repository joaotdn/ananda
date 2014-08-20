<?php get_header(); ?>

      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO CURSOS -->
        <div class="small-12 columns">
          <h1 class="small-12 left text-center text-low panel-title no-bg wow fadeInUp" data-wow-duration="1500ms">Cursos</h1>
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
              global $post;
              $cursos = get_field('cursos',$post->ID);
              if($cursos):
                foreach($cursos as $curso):
            ?>
            <li>
              <figure class="small-12 left">
                  <div class="course-thumb small-12 left bg-cover content-thumb-inner" style="background-image: url(<?php echo $curso['c_imagem']; ?>);"></div>
              </figure>
              <div class="content-block small-12 left">
                <article class="small-12 left">
                  <div class="small-12 columns">
                    <h2 class="text-up small-12 blue"><?php $curso['c_titulo']; ?></h2>
                    <?php $orientador = $curso['c_orientador']; if($orientador): ?>
                    <p class="except text-up blue">Com <?php echo $orientador; ?></p>
                    <?php endif; ?>
                    <h4><?php echo $curso['c_datas']; ?></h4>
                    <p class="except blue text-up">R$ <?php echo $curso['c_valor']; ?></p>
                    <p class="small-text"><?php echo $curso['c_descricao']; ?></p>
                  </div>
                </article>
              </div>
            </li>
            <?php endforeach; endif; ?>
          </ul>
        </nav>
        <div class="mbt small-12 left"></div>
        <!-- FIM CURSOS -->

<?php get_footer(); ?>
