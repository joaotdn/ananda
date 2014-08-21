<?php 
  get_header(); 

    if(is_page('servicos')) {
      /*
        Serviços
       */
      include_once 'includes/page_servicos.php';

    } elseif(is_page('profissionais')) {
      /*
        Profissionais
       */
      include_once 'includes/page_profissionais.php';

    } elseif(is_page('quem-somos')) {
      /*
        Quem Somos
       */
      include_once 'includes/page_quem_somos.php';

    } elseif(is_page('escola-om-de-yoga')) {
      /*
        Escola Om de Yoga
       */
      include_once 'includes/page_escola.php';

    } elseif(is_page('cursos') || is_page('cursos-2')) {
      /*
        Cursos
       */
      include_once 'includes/page_cursos.php';

    } elseif (is_page('contato')) {
      /*
        Contato
       */
      include_once 'includes/page_contato.php';

    } else {
      //incluir modelo padrão para pagina
      ?>
      <h1 class="small-12 columns blue text-up">Página não encontrada</h1>
      <?php
    }

  get_footer(); 
?>
