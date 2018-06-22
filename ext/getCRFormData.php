<?php
	define('IN_ADPT', true);
	require("/dhtmlx/connector/form_connector.php");
	require('/dhtmlx/connector/db_config.php');
	require("/dhtmlx/connector/db_sqlsrv.php");

  	$sql_db = "cashReceipts";
	$sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
	$conn = sqlsrv_connect($sql_server,$sql_conn_info);

	if(isset($_GET["crrID"])){
        $query = "SELECT submittedForm FROM [Playground Aaron].dbo.submittedForms WHERE crrID = ".$_GET["crrID"];
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
            die($error);
        }else{
            $rows = sqlsrv_fetch_array($res, SQLSRV_FETCH_ASSOC);

            echo json_encode($rows["submittedForm"]);
        }
    }

?>