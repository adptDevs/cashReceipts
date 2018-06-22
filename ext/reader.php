<?php
	
	error_reporting(E_ALL);
	ini_set("display_errors", "on");

	$url = "170.94.192.220";
	$username = "appwriter";
	$password = "8BjqyZ45&@_zbuBa";
	$depth = 10;

	$conn_id = ftp_connect($url);
	$login_result = ftp_login($conn_id, $username, $password);

	if ((!$conn_id) || (!$login_result)) { 
	    echo "FTP connection has failed!";
	    echo "Attempted to connect to $url for user $username"; 
	    exit; 
	} else {
	    //echo "Connected to $url, for user $username";
	    $serverPath = "/cashReceipts/";
	    $path = "";

	    //$folderStructure = json_decode($_POST["folderStructure"]);
	    if(isset($_POST["isDownload"])){
				if(isset($_POST["path"])){
					$path = $_POST["path"];
				}

				$folder = $_POST["folder"];
	    	// if($_POST["fileType"] == "file"){
				//$pathArray = explode("/", $path);
				//print_r($pathArray);
				//$fileName = $pathArray[count($pathArray)-1];
				//$fileName = $_POST["path"];

		    	$handle = fopen( "downloads/".$path, "w") or die("Unable to open file: ".$path);
		    	if(ftp_fget($conn_id, $handle, $serverPath.$folder."/".$path, FTP_ASCII, 0)){
		    		echo "success";
		    	}else{
		    		echo $serverPath.$path;
		    	}
		    	fclose($handle);
	    	// }else{
	    	// 	$contents = ftp_nlist($conn_id, $serverPath.$path);
		    // 	echo json_encode($contents);
	    	// }
	    }else{
			if(isset($_POST["path"])){
				$path = $_POST["path"]."/";
			}
	    	$contents = ftp_nlist($conn_id, $serverPath.$path);
		    echo json_encode($contents);
	    }

		ftp_close($conn_id);
	}

?>