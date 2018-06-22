<?php
	define('IN_ADPT', true);
	require('/dhtmlx/connector/db_config.php');
	require("/dhtmlx/connector/db_sqlsrv.php");

  	$sql_db = "PersonnelHR";
	$sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
	$conn = sqlsrv_connect($sql_server,$sql_conn_info);

    if(isset($_GET["persNumber"])){
        $query = "SELECT ptID, loc_name FROM vw_employees WHERE  
        RIGHT(pernr, LEN(pernr) - (8 - LEN(".$_GET["persNumber"]."))) = ".$_GET["persNumber"]."";

        $stmt = sqlsrv_query($conn,$query);

        $locationInfo = "";
        if($stmt){
            while($rows = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $locationInfo = ["ptID"=>$rows["ptID"], "loc_name"=>$rows["loc_name"]];
            }

            echo json_encode($locationInfo);
        }
    }

?>