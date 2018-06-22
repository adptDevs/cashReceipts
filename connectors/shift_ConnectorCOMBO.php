<?php
  define('IN_ADPT', true);

  require('/dhtmlx/connector/combo_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  $sql_db = 'cashReceipts';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

  $combo = new ComboConnector($conn, "SQLSrv");

  $combo->render_table("stationShifts","stSftID","stationShift,stSftID");
?>