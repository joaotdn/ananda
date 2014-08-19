<?php
/** 
 * As configurações básicas do WordPress.
 *
 * Esse arquivo contém as seguintes configurações: configurações de MySQL, Prefixo de Tabelas,
 * Chaves secretas, Idioma do WordPress, e ABSPATH. Você pode encontrar mais informações
 * visitando {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. Você pode obter as configuraçções de MySQL de seu servidor de hospedagem.
 *
 * Esse arquivo é usado pelo script ed criação wp-config.php durante a
 * instalação. Você não precisa usar o site, você pode apenas salvar esse arquivo
 * como "wp-config.php" e preencher os valores.
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar essas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define('DB_NAME', 'portalczn1');

/** Usuário do banco de dados MySQL */
define('DB_USER', 'portalczn1');

/** Senha do banco de dados MySQL */
define('DB_PASSWORD', 'czn20727');

/** nome do host do MySQL */
define('DB_HOST', 'mysql02.portalczn1.hospedagemdesites.ws');

/** Conjunto de caracteres do banco de dados a ser usado na criação das tabelas. */
define('DB_CHARSET', 'utf8');

/** O tipo de collate do banco de dados. Não altere isso se tiver dúvidas. */
define('DB_COLLATE', '');

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Você pode alterá-las a qualquer momento para desvalidar quaisquer cookies existentes. Isto irá forçar todos os usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '+u$^#Z0-,?|in$7p5;qqzrFpJ@B--K@I/%@a@5uYV&wk6&_hPvFt`ktU~x_(kdS?');
define('SECURE_AUTH_KEY',  'EY+<O(?NX*<|B,uj&Fa$y+4C>A::0}{yR?<JH$krawU4%M23]=CJZ}n-G$,4=JS4');
define('LOGGED_IN_KEY',    '#)46BnpK98-`:B;-?K{) rRw2fjqV>LK?z5s>5v;^Uc$m3tFGaq<x*+/8`*)4QgA');
define('NONCE_KEY',        'yTnD|@r!rz93]GwfP,>+{Yu_<RuR`{2kSQD-+Su2q)nav8NyZ%>HdH3G56n?Qx2:');
define('AUTH_SALT',        '<C8K;GN/@|Hc?K_?vz;lq0gE8^VmmBB#&{#AgfI)p,u{01xT%h=j|Bs0hHpx4/^|');
define('SECURE_AUTH_SALT', 'eFLC+{eXlu8F~|C{GL.WU)Dm@$yFQ79M|}u;v]alj3/bqhaZBi5#|3c;sp`|sabF');
define('LOGGED_IN_SALT',   'GuXk_B.-&$Z(8aNY-A*|$(-?.$}U9@$eWO#AA2DANky,p-W<d`!>Pa+S`p1GNvQT');
define('NONCE_SALT',       'zU-T9yLh+0_-<P*:39XRcyGa[-201X0HbtC+R+7 #!tzg|ZlF:6HV$o}X=}iF/iK');

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der para cada um um único
 * prefixo. Somente números, letras e sublinhados!
 */
$table_prefix  = 'wp_';

/**
 * O idioma localizado do WordPress é o inglês por padrão.
 *
 * Altere esta definição para localizar o WordPress. Um arquivo MO correspondente a
 * língua escolhida deve ser instalado em wp-content/languages. Por exemplo, instale
 * pt_BR.mo em wp-content/languages e altere WPLANG para 'pt_BR' para habilitar o suporte
 * ao português do Brasil.
 */
define ('WPLANG', 'pt_BR');

/**
 * Para desenvolvedores: Modo debugging WordPress.
 *
 * altere isto para true para ativar a exibição de avisos durante o desenvolvimento.
 * é altamente recomendável que os desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seuas ambientes de desenvolvimento.
 */
define('WP_DEBUG', false);

define( 'WP_MEMORY_LIMIT', '256M' );

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
	
/** Configura as variáveis do WordPress e arquivos inclusos. */
require_once(ABSPATH . 'wp-settings.php');
