      <!-- INICIO RODAPE DESKTOP -->
      <footer id="footer" class="small-12 columns show-for-large-up">
        <section class="footer-content">
          <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="Página principal" class="display-block left">
            <div class="icon-footer left"></div>
            <span class="mbt small-12 left show-for-small-only"></span>
          </a><!-- // logo footer -->
          <?php
            $contato = get_page_by_title('Contato');
            $tel1 = get_field('an_tel1', $contato->ID);
            $tel2 = get_field('an_tel2', $contato->ID);
            $endereco = get_field('an_endereco', $contato->ID);
            $bairro = get_field('an_bairro', $contato->ID);
            $cidade = get_field('an_cidade', $contato->ID);
          ?>
          <div class="left">
            <h5 class="font-black">
              <?php
                if($tel1 != '') {
                  echo $tel1;
                }

                if($tel2 != '') {
                  echo " / ".$tel2;
                }
              ?>
            </h5>
            <p class="text-up">
              <?php 
                if($endereco != '') {
                  echo $endereco;
                }

                if($bairro != '') {
                  echo ", ".$bairro;
                }

                if($cidade != '') {
                  echo ", ".$cidade;
                }
              ?>
            </p>
          </div>
        </section>
      </footer>
      <div class="small-12 left mbt"></div>
      <!-- FIM RODAPE DESKTOP -->