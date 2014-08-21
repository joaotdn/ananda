<?php 
if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
}

//Get new images formats
if ( function_exists( 'add_image_size' ) ) { 
  //add_image_size( 'piollin-thumb', 400, 400, true );
  //add_image_size( 'clipping', 660, 420, true );
}

//Registrar menu
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Menu principal' ),
      'footer-menu' => __( 'Menu rodape' )
    )
  );
}
add_action( 'init', 'register_my_menus' );

//Remove container de menu
function my_wp_nav_menu_args( $args = '' ) {
    $args['container'] = false;
    return $args;
}
add_filter( 'wp_nav_menu_args', 'my_wp_nav_menu_args' );

add_filter( 'jpeg_quality', 'tgm_image_full_quality' );
add_filter( 'wp_editor_set_quality', 'tgm_image_full_quality' );
/**
 * Filters the image quality for thumbnails to be at the highest ratio possible.
 *
 * Supports the new 'wp_editor_set_quality' filter added in WP 3.5.
 *
 * @since 1.0.0
 *
 * @param int $quality The default quality (90)
 * @return int $quality Amended quality (100)
 */
function tgm_image_full_quality( $quality ) {
 
    return 100;
 
}

//Get jQuery
function my_scripts_method() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js');
    wp_enqueue_script( 'jquery' );
}

add_action('wp_enqueue_scripts', 'my_scripts_method');

function returnId() {
  global $post, $post_id;
  return $post->ID;
}

function get_excerpt($l) {
  $e = substr(the_excerpt(), 0,$l);
  return $e;
}
remove_filter( 'the_excerpt', 'wpautop' );

//Pega o nome do custom term no loop
function custom_taxonomies_terms_names() {
  global $post, $post_id;
  $post = &get_post($post->ID);
  $post_type = $post->post_type;
  $taxonomies = get_object_taxonomies($post_type);
  foreach ($taxonomies as $taxonomy) {
    $terms = get_the_terms( $post->ID, $taxonomy );
    if ( !empty( $terms ) ) {
      $out = array();
      foreach ( $terms as $term )
        $out[] = $term->name;
      $return = join( ', ', $out );
    }
  }
  return $return;
}

/**
 * Custom Post Types
 */

//Agenda
require_once ( get_stylesheet_directory() . '/post-types/agenda.php' );

//Produtos
require_once ( get_stylesheet_directory() . '/post-types/produtos.php' );

//Ações Sociais
require_once ( get_stylesheet_directory() . '/post-types/acoes_sociais.php' );

/*
  Formulario de login
 */
function my_login_logo_url() {
    return "http://imaginaria.cc";
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

function my_login_logo_url_title() {
    return 'Imaginária';
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

function my_login_logo() { ?>
    <style type="text/css">
        body.login {
          background-color: #fff;
        }
        body.login div#login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/images/admin-logo.png);
            padding-bottom: 30px;
        }
        body.login div#login form#loginform {
          background-color: #f1f1f1;
        }
        body.login div#login form#loginform p label {
          color: #ef2b39;
        }
        body.login div#login form#loginform p.submit input#wp-submit {
          background-color: #ef2b39;
          border-color: #ef2b39;
        }
        body.login div#login h1 a {
          width: 100%;
          height: 150px;
          background-size: 200px;
        }
    </style>
<?php }
add_action( 'login_enqueue_scripts', 'my_login_logo' );

?>