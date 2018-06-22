<?php

define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

// SELECT  Into db
$query = "SELECT * FROM jct.stations WHERE ptID = ".$_GET['locationID']." AND sagID = ".$_GET['facilityID']." AND stTypID = ".$_GET['stationID']." AND stModID = ".$_GET['modID']."";

$res = sqlsrv_query($conn, $query);

if($res !== NULL){
     $rows = sqlsrv_has_rows($res);

     if($rows === true){
        echo "yes";
    }else{
        echo "no";
   }
}
?>