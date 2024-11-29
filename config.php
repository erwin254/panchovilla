<?php
@session_start();
date_default_timezone_set('America/Santiago');


require 'vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Configuración base de datos
define("HOST",     $_ENV['HOST']);
define("USERNAME", $_ENV['USERNAME']);
define("PASSWORD", $_ENV['PASSWORD']);
define("DATABASE",  $_ENV['DATABASE']);

define("BASE_URL",  $_ENV['BASE_URL']);
define("ROOT_URL",  $_ENV['ROOT_URL']);
define("EMAIL_URL",  $_ENV['EMAIL_URL']);