<?php
/**
 * Licensed under Creative Commons 3.0 Attribution
 * Copyright Adam Wulf 2013
 */

include("config.php");
include("include.classloader.php");

$classLoader->addToClasspath(ROOT);


$mysql = new MySQLConn(DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);

$db = new JSONtoMYSQL($mysql);

// create some json
$obj = json_decode('{"textinput-0":"aa","passwordinput-0":"bb","selectbasic-0":"Option two"}');

// save it to a table
$db->save($obj, "app1");


?>