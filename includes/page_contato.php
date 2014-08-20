<?php get_header(); ?>

      <div class="reveal-content">
        <div class="mbt small-12 left"></div>

        <!-- INICIO CONTATO -->
        <section class="page-thumb-big small-12 columns google-maps rel">
          <header>
            <h1 class="abs animated-title text-low wow fadeInUp" data-wow-duration="1500ms">Contato</h1>
          </header>

          <div class="show-for-large-up">
            <script type="text/javascript" src="http://www.webestools.com/google_map_gen.js?lati=-7.150999&long=-34.843471&zoom=17&width=960&height=600&mapType=normal&map_btn_normal=yes&map_btn_satelite=yes&map_btn_mixte=yes&map_small=yes&marqueur=yes&info_bulle=Centro%20Ananda%20-%20Pr%C3%A1ticas%20Integrativas"></script>
          </div>

          <div class="show-for-medium-only">
            <script type="text/javascript" src="http://www.webestools.com/google_map_gen.js?lati=-7.150999&long=-34.843471&zoom=17&width=748&height=400&mapType=normal&map_btn_normal=yes&map_btn_satelite=yes&map_btn_mixte=yes&map_small=yes&marqueur=yes&info_bulle=Centro%20Ananda%20-%20Pr%C3%A1ticas%20Integrativas"></script>
          </div>

          <div class="show-for-small-only text-center">
            <script type="text/javascript" src="http://www.webestools.com/google_map_gen.js?lati=-7.150999&long=-34.843471&zoom=17&width=320&height=320&mapType=normal&map_btn_normal=yes&map_btn_satelite=yes&map_btn_mixte=yes&map_small=yes&marqueur=yes&info_bulle=Centro%20Ananda%20-%20Pr%C3%A1ticas%20Integrativas"></script>
          </div>
        </section><!-- google-maps -->
        <div class="mbt small-12 left"></div>

        <section class="small-12 left rel">
          <?php echo do_shortcode('[contact-form-7 id="58" title="Formulário de contato"]'); ?><!-- // formulario de contato -->
          
          <?php
            global $post;
            $tel1 = get_field('an_tel1', $post->ID);
            $tel2 = get_field('an_tel2', $post->ID);
            $endereco = get_field('an_endereco', $post->ID);
            $bairro = get_field('an_bairro', $post->ID);
            $cidade = get_field('an_cidade', $post->ID);
            $cep = get_field('an_cep', $post->ID);
            $email = get_field('an_email', $post->ID);
          ?>
          <div class="address small-4 hide-for-small abs">
            <h1>Endereço</h1>
            <p><?php echo $endereco; ?></p>
            <p><?php echo $bairro; ?>, <?php echo $cidade; ?></p>
            <p>Paraíba</p>
            <p>CEP <?php echo $cep; ?></p>

            <h1>Telefones</h1>
            <p><?php echo $tel1; ?></p>
            <p><?php echo $tel1; ?></p>

            <h1>Email</h1>
            <p><?php echo $email; ?></p>
          </div><!-- // dados de contato -->

          <div class="address-mobile small-12 columns show-for-small-only">
            <h1>Endereço</h1>
            <p><?php echo $endereco; ?></p>
            <p><?php echo $bairro; ?>, <?php echo $cidade; ?></p>
            <p>Paraíba</p>
            <p>CEP <?php echo $cep; ?></p>

            <h1>Telefones</h1>
            <p><?php echo $tel1; ?></p>
            <p><?php echo $tel1; ?></p>

            <h1>Email</h1>
            <p><?php echo $email; ?></p>
          </div>

        </section>
        <!-- FIM CONTATO -->
      
<?php get_footer(); ?>
