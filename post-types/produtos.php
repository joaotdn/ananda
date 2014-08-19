<?php

function produtos_init() {
  $labels = array(
    'name'               => 'Produtos',
    'singular_name'      => 'Produto',
    'add_new'            => 'Adicionar Novo',
    'add_new_item'       => 'Adicionar novo produto',
    'edit_item'          => 'Editar produto',
    'new_item'           => 'Novo produto',
    'all_items'          => 'Todos os produtos',
    'view_item'          => 'Ver produto',
    'search_items'       => 'Buscar produto',
    'not_found'          => 'N&atilde;o encontrado',
    'not_found_in_trash' => 'N&atilde;o encontrado',
    'parent_item_colon'  => '',
    'menu_name'          => 'Produtos'
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'lojinha' ),
    //'menu_icon'           => get_stylesheet_directory_uri() . '/images/works.png',
    'capability_type'    => 'post',
    'menu_position'      => 1,
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title','thumbnail','excerpt')
  );

  register_post_type( 'produtos', $args );
}

add_action( 'init', 'produtos_init' );

?>