<?php

function JSON_to_table($j_obj, $tblName){
$j_obj=json_decode($j_obj, true);
/* if(!mysql_num_rows( mysql_query("SHOW TABLES LIKE '" . $tblName . "'"))){  */
	$cq = "CREATE TABLE ". $tblName ." (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,";
	foreach($j_obj as $j_arr_key => $value){
		$cq .= $j_arr_key . " VARCHAR(256),";
	}
	$cq = substr_replace($cq,"",-1);
	$cq .= ")";
	echo $cq;
	/* mysql_query($cq) or die(mysql_error());
} */

/* $qi = "INSERT INTO $tblName (";
reset($j_obj);
	foreach($j_obj as $j_arr_key => $value){
		$qi .= $j_arr_key . ",";
	}
	$qi = substr_replace($qi,"",-1);
$qi .= ") VALUES (";
reset($j_obj);
	foreach($j_obj as $j_arr_key => $value){
		$qi .= "'" . mysql_real_escape_string($value) . "',";
	}
$qi = substr_replace($qi,"",-1);
$qi .= ")";
$result = mysql_query($qi) or die(mysql_error());

return true; */
}
$tblName=$tblName = "jsontable_" . time();
$j_obj='{"txtname":"","txtpass":"","txtfile":""}';
JSON_to_table($j_obj,$tblName);

?>