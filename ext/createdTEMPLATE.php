<?php

define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION --------------------------------------------------------------------------------------------------------------------------------------------------------------

$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SALE ITEMS

$formData = $_POST['formInput'];
$stationModifier = $_POST['mod'];

if ($stationModifier == 'null'){
    $stationModifier = stripslashes("(SELECT stModID WHERE stationModifier = 'N/A')");
   }

// UPDATE
$query = "UPDATE jct.stations SET templates = '".$formData."', cashFund = ".$_POST["cFunds"].", facilityMgr = 0, regBegBal = ".$_POST["regBegBal"].", taxTypes=".$_POST["taxAMNT"].", numOfSaleItems=".$_POST["numberOfSaleItems"]."  WHERE 
ptID = ".$_POST["pt"]." AND 
sagID = ".$_POST["f"]." AND
stTypID = ".$_POST["stat"]." AND
stModID = $stationModifier
";

echo $formData;

// EMAIL RESPONSE TO TROUBLE-SHOOT
mail('megan.lindsey@arkansas.gov', 'cashReciepts - Template QRY',$query);

  $res = sqlsrv_query($conn, $query);

  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
          mail('megan.lindsey@arkansas.gov', 'cashReciepts 2 - Template QRY', $errorStr . "<br />" . $query);
      }
      return "error";
  }


?>