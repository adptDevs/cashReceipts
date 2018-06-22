<?php

define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

if(isset($_GET["userID"])){
	$query = "SELECT * FROM ufv_stationFavs WHERE usrID = ".$_GET["userID"]."";

	$res = sqlsrv_query($conn, $query);
	  if($res === false){
	    if( ($errors = sqlsrv_errors() ) != null) {
	      $errorStr = "";
	          foreach( $errors as $error ) {
	              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	              $errorStr .= "code: ".$error[ 'code']."<br />";
	              $errorStr .= "message: ".$error[ 'message']."<br />";
	          }
	          mail('megan.lindsey@arkansas.gov', 'cashReciepts - Get Favorities QRY', $errorStr . "<br />" . $query);
	      }
	      echo "error";
	  }else{

	  	$arrayContain = array();
		while($rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)){
			array_push($arrayContain, [$rows['stID'], rtrim($rows['favTitle']), rtrim($rows['Location']), rtrim($rows['Facility']), rtrim($rows['Station']), rtrim($rows['Modifer'])]);
		}

		echo json_encode($arrayContain);

	  }
}

?>