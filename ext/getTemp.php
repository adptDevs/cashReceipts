<?php

define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

$stationMod = $_POST['modCashier'];

if ($stationMod == 'null'){
 $stationMod = stripslashes("(SELECT stModID WHERE stationModifier='N/A')");
} 

// SELECT  Into db
$query = " SELECT templates, stID, cashFund, regBegBal, taxTypes, numOfSaleItems FROM jct.stations WHERE stID = ".$_POST["stationID"]."";

// METHOD TO GATHER THE MOST RECENT RECORDS END BALANCE TO MAKE IT THE NEXT RECORDS BEGINNING. TA DA!
$begEndQuery = "SELECT TOP (1) regEndBal FROM staging WHERE  stID = ".$_POST["stationID"]." ORDER BY crrID Desc";

// Response ....................................................................................................................
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
  }else{

// Response 2 for $begEndQuery ...................................................................................................
$res2 = sqlsrv_query($conn, $begEndQuery);
  if($res2 === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      echo "error";
  }else{
// HEY LISTEN! BE SURE TO INCORPERATE THE ROWS3 FOR THE ARCHIVED QUEREY. IT IS CALLED STAGINGARCHVIED_V2..
// Fetch from DB
$rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC);
$rows2 = sqlsrv_fetch_array($res2, SQLSRV_FETCH_ASSOC);

$regBalance = $rows2['regEndBal'];

if($regBalance == null){

  $regBalance = $rows['regBegBal'];

}

$arrayContain = array();

array_push($arrayContain, $rows['templates']);
array_push($arrayContain, $rows['stID']); 
array_push($arrayContain, $rows['cashFund']);
array_push($arrayContain, $regBalance);
array_push($arrayContain, $rows['taxTypes']);
array_push($arrayContain, $rows['numOfSaleItems']);

echo json_encode($arrayContain);
  }



  }

?>