<?php

$themename = "Ananda";
$shortname = "nt";

add_action('admin_enqueue_scripts', 'my_admin_scripts');
 
function my_admin_scripts() {
    if (isset($_GET['page']) && $_GET['page'] == 'theme-options.php') {
        wp_enqueue_media();
        wp_register_script('my-admin-js', get_template_directory_uri() .'/functions/upload.js', array('jquery'));
        wp_enqueue_script('my-admin-js');
    }
}

$categories = get_categories('hide_empty=0&orderby=name');
$wp_cats = array();
foreach ($categories as $category_list ) {
       $wp_cats[$category_list->cat_ID] = $category_list->cat_name;
}

array_unshift($wp_cats, "Escolher categoria");

$options = array (
 
array( "name" => $themename." Options",
  "type" => "title"),

 
array( "name" => "Redes Sociais",
  "type" => "section"),
array( "type" => "open"),
  
array( "name" => "Instagram",
  "desc" => "Digite o usu&aacute;rio do Instagram sem '@'",
  "id" => $shortname."_ins",
  "type" => "text",
  "std" => ""),
  
array( "name" => "Facebook",
  "desc" => "Endere&ccedil;o da fanpage",
  "id" => $shortname."_fb",
  "type" => "text",
  "std" => ""),

array( "type" => "close"),
 
);

function mytheme_add_admin() {
 
global $themename, $shortname, $options;
 
if ( $_GET['page'] == basename(__FILE__) ) {
 
  if ( 'save' == $_REQUEST['action'] ) {
 
    foreach ($options as $value) {
    update_option( $value['id'], $_REQUEST[ $value['id'] ] ); }
 
foreach ($options as $value) {
  if( isset( $_REQUEST[ $value['id'] ] ) ) { update_option( $value['id'], $_REQUEST[ $value['id'] ]  ); } else { delete_option( $value['id'] ); } }
 
  header("Location: admin.php?page=theme-options.php&saved=true");
die;
 
} 
else if( 'reset' == $_REQUEST['action'] ) {
 
  foreach ($options as $value) {
    delete_option( $value['id'] ); }
 
  header("Location: admin.php?page=theme-options.php&reset=true");
die;
 
}
}
 
add_menu_page($themename, $themename, 'administrator', basename(__FILE__), 'mytheme_admin');
}

function mytheme_add_init() {

$file_dir=get_bloginfo('template_directory');
wp_enqueue_style("functions", $file_dir."/functions/functions.css", false, "1.0", "all");
wp_enqueue_script("rm_script", $file_dir."/functions/rm_script.js", false, "1.0");

}
function mytheme_admin() {
 
global $themename, $shortname, $options;
$i=0;
 
if ( $_REQUEST['saved'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' configura&ccedil;&otilde;es salvas.</strong></p></div>';
if ( $_REQUEST['reset'] ) echo '<div id="message" class="updated fade"><p><strong>'.$themename.' configura&ccedil;&otilde;es restauradas.</strong></p></div>';
 
?>
<div class="wrap rm_wrap">
<h2><?php echo $themename; ?> - Op&ccedil;&otilde;es do tema 1.0</h2>
 
<div class="rm_opts">
<form method="post">
<?php foreach ($options as $value) {
switch ( $value['type'] ) {
 
case "open":
?>
 
<?php break;
 
case "close":
?>
 
</div>
</div>
<br />

 
<?php break;
 
case "title":
?>
<p>Aplicativo exclusivo para administra&ccedil;&atilde;o f&aacute;cil do tema <?php echo $themename;?> 1.0</p>

 
<?php break;
 
case 'text':
?>

<div class="rm_input rm_text">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  <input name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id'])  ); } else { echo $value['std']; } ?>" />
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
<?php
break;
 
case 'textarea':
?>

<div class="rm_input rm_textarea">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  <textarea name="<?php echo $value['id']; ?>" type="<?php echo $value['type']; ?>" cols="" rows=""><?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id']) ); } else { echo $value['std']; } ?></textarea>
 <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 
 </div>
  
<?php
break;

case 'upload':
?>
<div class="rm_input rm_text">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  <input id="upload_image" type="text" size="36" name="<?php echo $value['id']; ?>" value="<?php if ( get_settings( $value['id'] ) != "") { echo stripslashes(get_settings( $value['id'])  ); } else { echo $value['std']; } ?>" />
  <input id="upload_image_button" type="button" class="button" value="Enviar m&iacute;dia" />
</div>
<?php
break;
 
case 'select':
?>

<div class="rm_input rm_select">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  
<select name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
<?php foreach ($value['options'] as $option) { ?>
    <option <?php if (get_settings( $value['id'] ) == $option) { echo 'selected="selected"'; } ?>><?php echo $option; ?></option><?php } ?>
</select>

  <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
</div>
<?php
break;

case 'terms':

$terms = get_terms('datas','hide_empty=0&orderby=date');
?>

<div class="rm_input rm_select">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  
<select name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>">
<?php foreach ($terms as $option) { ?>
    <option <?php if (get_settings( $value['id'] ) == $option->name) { echo 'selected="selected"'; } ?>><?php echo $option->name; ?></option><?php } ?>
</select>
  <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
</div>
<?php
break;
 
case "checkbox":
?>

case "checkbox":
?>

<div class="rm_input rm_checkbox">
  <label for="<?php echo $value['id']; ?>"><?php echo $value['name']; ?></label>
  
<?php if(get_option($value['id'])){ $checked = "checked=\"checked\""; }else{ $checked = "";} ?>
<input type="checkbox" name="<?php echo $value['id']; ?>" id="<?php echo $value['id']; ?>" value="true" <?php echo $checked; ?> />


  <small><?php echo $value['desc']; ?></small><div class="clearfix"></div>
 </div>
<?php break; 
case "section":

$i++;

?>

<div class="rm_section">
<div class="rm_title"><h3><img src="<?php echo get_stylesheet_directory(); ?>/functions/images/trans.png" class="inactive" alt=""><?php echo $value['name']; ?></h3><span class="submit"><input name="save<?php echo $i; ?>" type="submit" value="Salvar" />
</span><div class="clearfix"></div></div>
<div class="rm_options">

 
<?php break;
 
}
}
?>
 
<input type="hidden" name="action" value="save" />
</form>
<form method="post">
<p class="submit">
<input name="reset" type="submit" value="Restaurar" />
<input type="hidden" name="action" value="reset" />
</p>
</form>
 </div> 
 

<?php
}
?>
<?php
add_action('admin_init', 'mytheme_add_init');
add_action('admin_menu', 'mytheme_add_admin');
?>