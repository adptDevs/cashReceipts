<?php

  define('IN_ADPT', true);

  require('/dhtmlx/connector/combo_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  $sql_db = 'cashReceipts';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);


	$hasError = false; 

	for($i = 0; $i < $_GET['descAmnt']; $i++){

	$sql = ("INSERT INTO lineItemDesc_v2 (ptID,glID,ioID,Description,active) VALUES (".$_GET['ptID'].",".$_GET['glID'].",".$_POST['descIO_'.$i].",'".$_POST['descName_'.$i]."',".$_POST['activeCB_'.$i].") ");


	// Fetch   
	  $res = sqlsrv_query($conn, $sql);

   // Response 
	  if($res === false){
	    if( ($errors = sqlsrv_errors() ) != null) {
	      $errorStr = "";
	          foreach( $errors as $error ) {
	              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	              $errorStr .= "code: ".$error[ 'code']."<br />";
	              $errorStr .= "message: ".$error[ 'message']."<br />";
	          }
	      }

	      $hasError = true; 

	  }


	}

	if($hasError){

	echo json_encode(["error","Error..Descriptions were NOT saved.."]);

	}else{

	echo json_encode(["success","<b><p><span style='color:#4abdac'>Success!</span><img src='/dhtmlx/codebase/imgs/lightbulb.png' style='position:static;width:auto;height:auto;left:5px;top:3px;'></p><p> Descriptions Created!</p>"]);

	}

 
?>