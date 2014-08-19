        <!-- INICIO SERVICOS -->
        <section id="services" class="small-12 columns content-block">
          <?php
            global $post;
            $page = get_page_by_title('Servicos');
            $servicos = get_field('ser_lista',$page->ID);
            shuffle($servicos);
            if($servicos):
              foreach($servicos as $servico):
                $thumb = wp_get_attachment_image_src( $servico['ser_imagem'], 'medium' );
          ?>
          <article class="small-12 left rel">
            <header class="small-7 columns">
              <hgroup>
                <h4 class="text-low"><a href="<?php echo get_page_link($page->ID); ?>" title="Todos os Serviços">serviços</a></h4>
                <h1 class="text-up"><?php echo $servico['servico']; ?></h1>
              </hgroup>
              <p class="text-up">Com <?php echo $servico['ser_diretor']; ?></p>
              <p class="except"><?php echo substr($servico['ser_descricao'],0,100).'...'; ?></p>
              <p><a href="<?php echo get_page_link($page->ID); ?>" title="Mais serviços" class="text-up primary">Veja mais</a></p>
            </header>

            <figure class="content-thumb-right bg-cover small-5 abs" style="background-image: url(<?php echo $thumb[0]; ?>);"></figure>
          </article>
          <?php break; endforeach; endif; ?>
        </section>
        <div class="small-12 left mbt"></div>
        <!-- FIM SERVICOS -->