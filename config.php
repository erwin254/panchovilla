<?php
@session_start();
date_default_timezone_set('America/Santiago');


require 'vendor/autoload.php';
use Dotenv\Dotenv;
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();


// Configuración base de datos
define('HOST_URL', $_ENV['HOST_URL']);

// Database Credentials
define('DB_HOST', $_ENV['DB_HOST']);
define('DB_DATABASE', $_ENV['DB_DATABASE']);
define('DB_USERNAME', $_ENV['DB_USERNAME']);
define('DB_PASSWORD', $_ENV['DB_PASSWORD']);

// Email Credentials
define('SMTP_HOST', $_ENV['SMTP_HOST']);
define('SMTP_PORT', $_ENV['SMTP_PORT']);
define('SMTP_ENCRYPTION', $_ENV['SMTP_ENCRYPTION']);
define('SMTP_USERNAME', $_ENV['SMTP_USERNAME']);
define('SMTP_PASSWORD', $_ENV['SMTP_PASSWORD']);
define('SMTP_FROM', $_ENV['SMTP_FROM']);
define('SMTP_FROM_NAME', $_ENV['SMTP_FROM_NAME']);

// Global Variables
define('MAX_LOGIN_ATTEMPTS_PER_HOUR', $_ENV['MAX_LOGIN_ATTEMPTS_PER_HOUR']);
define('MAX_EMAIL_VERIFICATION_REQUESTS_PER_DAY', $_ENV['MAX_EMAIL_VERIFICATION_REQUESTS_PER_DAY']);
define('MAX_PASSWORD_RESET_REQUESTS_PER_DAY', $_ENV['MAX_PASSWORD_RESET_REQUESTS_PER_DAY']);
define('PASSWORD_RESET_REQUEST_EXPIRY_TIME', $_ENV['PASSWORD_RESET_REQUEST_EXPIRY_TIME']);
define('CSRF_TOKEN_SECRET', $_ENV['CSRF_TOKEN_SECRET']);


// Code we want to run on every page/script
date_default_timezone_set('UTC'); 
error_reporting(0);
session_set_cookie_params(['samesite' => 'Strict']);
session_start();