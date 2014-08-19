      <!-- INICIO BARRA LATERAL -->
      <aside id="sidebar" class="small-12 medium-12 large-4 right">
        
        <?php
          /*
            Ações Sociais
           */
          include_once 'includes/home_acoes_sociais.php';
        ?>

        <!-- INICIO LIKE BOX -->
        <?php 
          $contato = get_page_by_title('Contato');
          $facebook = get_field('an_facebook', $contato->ID);
          if($facebook != ''):
        ?>
        <section class="small-12 medium-6 large-12 columns content-block">
          <article class="fb-like-box small-12" data-href="<?php echo $facebook; ?>" data-colorscheme="light" data-show-faces="true" data-header="false" data-width="100%" data-stream="false" data-show-border="false"></article>
        </section>
        <?php endif; ?>
        <div class="small-12 left mbt"></div>
        <!-- FIM LIKE BOX -->

      </aside>
      <!-- FIM BARRA LATERAL -->