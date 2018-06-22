<?php
  define('IN_ADPT', true);

  require('/dhtmlx/connector/combo_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  $sql_db = 'cashReceipts';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

if(isset($_GET['descriptionID'])){
	$sql = 	"SELECT ioNumber FROM additionalDescriptions_vw WHERE lsdID=".$_GET['descriptionID']."";
		$res = sqlsrv_query($conn, $sql);
		$ioNumber = "";
		while ($rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC)){
			$ioNumber = $rows['ioNumber'];
			}
			echo $ioNumber;
      

}

?>