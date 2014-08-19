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

/**
 * Custom Post Types
 */

//Agenda
require_once ( get_stylesheet_directory() . '/post-types/agenda.php' );

//Produtos
require_once ( get_stylesheet_directory() . '/post-types/produtos.php' );

//Ações Sociais
require_once ( get_stylesheet_directory() . '/post-types/acoes_sociais.php' );

?>