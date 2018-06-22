<?php
  define('IN_ADPT', true);

  require('/dhtmlx/connector/combo_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  $sql_db = 'cashReceipts';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);


if(isset($_GET['gl'])){
    $q = "SELECT * FROM lineItemSubDesc WHERE glID = ".$_GET['gl']." AND active = 1";
    $res = sqlsrv_query($conn, $q);
    if($res === false){
	    if( ($errors = sqlsrv_errors() ) != null) {
	      $errorStr = "";
	          foreach( $errors as $error ) {
	              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	              $errorStr .= "code: ".$error[ 'code']."<br />";
	              $errorStr .= "message: ".$error[ 'message']."<br />";
	          }
	      }

	      echo  json_encode(["error", "OH MY GOSH WHAT HAPPENED?!?!?! I WANT CHILIS BB BACK RIBS!"]);

	  }else{
        $array = array();
		while ($rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)){
			array_push($array,[$rows['lsdID'], $rows['Description']]);
			}
			echo json_encode($array);
      }

}


?>