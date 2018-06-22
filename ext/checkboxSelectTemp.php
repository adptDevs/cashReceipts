<?php

define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

// QUERY
$query = "SELECT * FROM lineItemDesc WHERE active = 1 ORDER BY Description DESC";

// RESPONSE
$res = sqlsrv_query($conn, $query);
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      echo "error";
 }

// LOGIC
$lineItems = array();

while($rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)){
	array_push($lineItems,[$rows['lidID'],$rows['glID'],$rows['Description']]);
// arsort($lineItems,true);


}
echo json_encode($lineItems);
?>