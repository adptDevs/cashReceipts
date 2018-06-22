<?php
  define('IN_ADPT', true);

  require('/dhtmlx/connector/grid_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  ini_set('display_errors', 'On');
  error_reporting(E_ALL);

  $sql_db = 'cashReceipts';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

  $gridConn = new GridConnector($conn, 'SQLSrv');

  if(isset($_GET["columnData"])){
  	$gridConn->render_complex_sql("SELECT ".$_GET["columnData"]." FROM additionalDescriptions_vw","lidID",$_GET["columnData"]);
  }

  



?>