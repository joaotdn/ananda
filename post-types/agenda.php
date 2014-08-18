<?php

function agenda_init() {
  $labels = array(
    'name'               => 'Agenda',
    'singular_name'      => 'Agenda',
    'add_new'            => 'Adicionar Nova',
    'add_new_item'       => 'Adicionar nova atividade',
    'edit_item'          => 'Editar atividade',
    'new_item'           => 'Nova atividade',
    'all_items'          => 'Todas as atividades',
    'view_item'          => 'Ver atividade',
    'search_items'       => 'Buscar atividade',
    'not_found'          => 'N&atilde;o encontrada',
    'not_found_in_trash' => 'N&atilde;o encontrada',
    'parent_item_colon'  => '',
    'menu_name'          => 'Agenda'
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'publicly_queryable' => true,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => true,
    'rewrite'            => array( 'slug' => 'agenda' ),
    //'menu_icon'           => get_stylesheet_directory_uri() . '/images/works.png',
    'capability_type'    => 'post',
    'menu_position'      => 1,
    'has_archive'        => true,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title','thumbnail','excerpt','editor')
  );

  register_post_type( 'agenda', $args );
}

add_action( 'init', 'agenda_init' );

?>