        <!-- INICIO PROFISSIONAIS -->
        <section class="professionals small-12 columns content-block">
          <?php
            global $post;
            $page = get_page_by_title('Profissionais');
            $profissionais = get_field('pro_lista',$page->ID);
            shuffle($profissionais);
            if($profissionais):
              foreach($profissionais as $profissional):
                $thumb = wp_get_attachment_image_src( $profissional['pro_imagem'], 'medium' );
          ?>
          <article class="small-12 left rel">
            <header class="small-9 columns right">
              <hgroup>
                <h4 class="text-low"><a href="<?php echo get_page_link($page->ID); ?>" title="Todos os profissionais">profissionais</a></h4>
                <h1 class="text-up"><?php echo $profissional['pro_nome']; ?></h1>
              </hgroup>
              <p class="text-up"><?php echo $profissional['pro_cargo']; ?></p>
              <p class="except"><?php echo $profissional['pro_descricao']; ?></p>
              <p><a href="<?php echo get_page_link($page->ID); ?>" title="Todos os profissionais" class="text-up primary">Veja mais</a></p>
            </header>
            
            <figure class="bg-cover small-3 content-thumb-left abs" style="background-image: url(<?php echo $thumb[0]; ?>);"></figure>
          </article>
          <?php break; endforeach; endif; ?>
        </section>
        <div class="small-12 left mbt"></div>
        <!-- FIM PROFISSIONAIS -->