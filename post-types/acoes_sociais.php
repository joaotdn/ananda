<?php

function acoes_init() {
  $labels = array(
    'name'               => 'A&ccedil;&otilde;es Sociais',
    'singular_name'      => 'A&ccedil;&atilde;o Social',
    'add_new'            => 'Adicionar Nova',
    'add_new_item'       => 'Adicionar nova a&ccedil;&atilde;o',
    'edit_item'          => 'Editar a&ccedil;&atilde;o',
    'new_item'           => 'Nova a&ccedil;&atilde;o',
    'all_items'          => 'Todas as a&ccedil;&atilde;os',
    'view_item'          => 'Ver a&ccedil;&atilde;o',
    'search_items'       => 'Buscar a&ccedil;&atilde;o',
    'not_found'          => 'N&atilde;o encontrada',
    'not_found_in_trash' => 'N&atilde;o encontrada',
    'parent_item_colon'  => '',
    'menu_name'          => 'A&ccedil;&otilde;es Sociais'
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'acoes-sociais' ),
    //'menu_icon'           => get_stylesheet_directory_uri() . '/images/works.png',
    'capability_type'    => 'post',
    'menu_position'      => 1,
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title','thumbnail','excerpt')
  );

  register_post_type( 'acoes', $args );
}

add_action( 'init', 'acoes_init' );

?>