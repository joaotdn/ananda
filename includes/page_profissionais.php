      <div class="reveal-content">
        <div class="mbt small-12 left"></div>

        <!-- INICIO PROFISSIONAIS -->
        <div class="small-12 columns">
          <h1 class="small-12 left text-center text-up panel-title wow fadeInUp" data-wow-duration="1500ms">Profissionais</h1>
        </div>
        <div class="mbt small-12 left"></div>

        <!-- lista de profissionais -->
        <nav class="small-12 columns list-professionals">
          <?php
            global $post;
            $profissionais = get_field('pro_lista',$post->ID);
            if(isset($profissionais)):
          ?>
          <ul class="small-block-grid-2 medium-block-grid-4 large-block-grid-6">
            <?php
              foreach($profissionais as $profissional):
                $thumb = wp_get_attachment_image_src( $profissional['pro_imagem'], 'medium' );
            ?>
            <li>
              <figure class="small-12 left rel bg-cover" style="background-image: url(<?php echo $thumb[0]; ?>);">
                <figcaption class="small-12 abs">
                  <p class="text-up name"><?php echo $profissional['pro_nome'] ?></p>
                  <p class="text-up role"><?php echo $profissional['pro_cargo'] ?></p>
                </figcaption>
            
                <article class="about-professional abs">
                  <p><?php echo $profissional['pro_descricao'] ?></p>
                </article>

                <a href="#" class="abs hide-for-large-up" data-reveal-id="about-modal" title=""></a>
              </figure>
            </li>
            <?php endforeach; ?>
          </ul>
          <?php endif; ?>
          <div id="about-modal" class="reveal-modal" data-reveal>
            <h2 class="blue text-up"></h2>
            <p></p>
            <a class="close-reveal-modal">&#215;</a>
          </div>
        </nav>
        <!-- // lista de profissionais -->

        <!-- FIM PROFISSIONAIS -->
