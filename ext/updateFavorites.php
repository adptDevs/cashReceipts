<?php
define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);


function add($cn){
	$query = "INSERT INTO stationFavs (usrID, stID, favTitle) VALUES(
		".$_POST["userID"].",
		".$_POST["stationID"].",
		'".$_POST["templateName"]."'
	)";

	$res = sqlsrv_query($cn, $query);
	if($res === false){
		if( ($errors = sqlsrv_errors() ) != null) {
			$errorStr = "";
	        foreach( $errors as $error ) {
	            $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	            $errorStr .= "code: ".$error[ 'code']."<br />";
	            $errorStr .= "message: ".$error[ 'message']."<br />";
	        }
	
	    }
	    return "<p style = 'color: #ff9933;'>Oops! There was an error!</p>";
	}

	return "<p style = 'color: #00cc66;'>Successfully added template: " . $_POST["templateName"] . "</p>";
}

function update($cn){
	$query = "UPDATE stationFavs SET
				favTitle	= ".$_POST["templateName"]."
			WHERE usrID = ".$_POST["userID"]." AND stID = ".$_POST["stationID"]."";

	$res = sqlsrv_query($cn, $query);
	if($res === false){
		if( ($errors = sqlsrv_errors() ) != null) {
			$errorStr = "";
	        foreach( $errors as $error ) {
	            $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	            $errorStr .= "code: ".$error[ 'code']."<br />";
	            $errorStr .= "message: ".$error[ 'message']."<br />";
	        }
	    }
	    return "<p style = 'color: #ff9933;'>Oops! There was an error!</p>";
	}

	return "<p style = 'color: #00cc66;'>Successfully updated template: " . $_POST["templateName"] . "</p>";
}

function delete($cn){
	$query = "DELETE FROM stationFavs WHERE usrID = ".$_POST["userID"]." AND stID = ".$_POST["stationID"]."";

	$res = sqlsrv_query($cn, $query);
	if($res === false){
		if( ($errors = sqlsrv_errors() ) != null) {
			$errorStr = "";
	        foreach( $errors as $error ) {
	            $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	            $errorStr .= "code: ".$error[ 'code']."<br />";
	            $errorStr .= "message: ".$error[ 'message']."<br />";
	        }
	    }
	    return "<p style = 'color: #ff9933;'>Oops! There was an error!</p>";
	}

	return "<p style = 'color: #00cc66;'>Successfully removed template: " . $_POST["templateName"] . "";
}

if(isset($_POST["userID"])){
	switch($_POST["mode"]){
		case "'insert'":
			$action = add($conn);
			break;

		case "'delete'":
			$action = delete($conn);
			break;

		default:
			$action = update($conn);
			break;
	}

	echo $action;
}

?>