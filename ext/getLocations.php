<?php
  define('IN_ADPT', true);

  require('/dhtmlx/connector/data_connector.php');
  require('/dhtmlx/connector/db_config.php');
  require('/dhtmlx/connector/db_sqlsrv.php');

  $sql_db = 'CommonCore';
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);

  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

  $json = new JSONDataConnector($conn, "SQLSrv");


  $json->render_table("adpt_locations","id","loc_name,id");
?>