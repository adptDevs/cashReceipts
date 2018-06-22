<?php
define('IN_ADPT', true);
  require('/dhtmlx/connector/db_config.php');
  require("/dhtmlx/connector/db_sqlsrv.php");

function update_row($cn){
	$sql = 	"UPDATE lineItemDesc_v2 SET  ioID='".$_POST["c2"]."',
					Description= '".$_POST["c1"]."',
					active= ".$_POST["c4"].",
			WHERE id=".$_POST["gr_id"];
	//$res = sqlsrv_query($cn, $sql);
	
	return $sql;	
}

function delete_row($cn){

	$d_sql = "DELETE FROM lineItemDesc_v2 WHERE id=".$_POST["gr_id"];
	$resDel = sqlsrv_query($cn, $d_sql);
	return "delete";	
}

//include XML Header (as response will be in xml format)
header("Content-type: text/xml");
//encoding may differ in your case
echo('<?xml version="1.0" encoding="iso-8859-1"?>');


$mode = $_POST["!nativeeditor_status"]; // get request mode
$rowId = $_POST["gr_id"]; // id or row which was updated 
$newId = $_POST["gr_id"]; // will be used for insert operation

$sql_db = 'cashReceipts';
$sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
$conn = sqlsrv_connect($sql_server,$sql_conn_info);

switch($mode){
	case "deleted":
		//row deleting request
		$action = delete_row($conn);
	break;
	default:
		//row updating request
		$action = update_row($conn);
	break;
}

//output update results
echo "<data>";
echo '<action type="' . $action . '" sid="' . $rowId . '" tid="' . $newId . '" />';
echo "</data>";

  ?>