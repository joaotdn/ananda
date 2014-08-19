      <div class="reveal-content">
        <!--<div class="mbt small-12 left"></div>-->

        <!-- INICIO SERVICOS -->
        <div class="small-12 columns">
          <h1 class="small-12 left text-center text-low panel-title no-bg wow fadeInUp" data-wow-duration="1500ms">Serviços</h1>
        </div>
        <div class="mbt small-12 left"></div>

        <nav class="list-services small-12 columns">
          <?php
            global $post;
            $servicos = get_field('ser_lista',$post->ID);
            if($servicos):
          ?>
          <ul class="small-block-grid-1">
            <?php
              foreach($servicos as $servico):
                $thumb = wp_get_attachment_image_src( $servico['ser_imagem'], 'medium' );
            ?>
            <li>
              <figure class="small-12 left rel">
                <div class="service-thumb bg-cover small-6 hide-for-small abs" style="background-image: url(<?php echo $thumb[0]; ?>);"></div>
                <figcaption class="small-12 medium-6 large-6 columns right">
                  <h3 class="blue text-up"><?php echo $servico['servico']; ?></h3>
                  <p class="text-up small-text"><?php echo $servico['ser_diretor']; ?></p>
                  <p class="small-text"><?php echo $servico['ser_descricao']; ?></p>
                </figcaption>
              </figure>
            </li>
            <?php endforeach; ?>
          </ul>
          <?php endif; ?>
        </nav>
        <div class="mbt small-12 left"></div>
        <!-- FIM SERVICOS -->
