<?php
define('IN_ADPT', true);
require("/dhtmlx/connector/form_connector.php");
require('/dhtmlx/connector/db_config.php');
require("/dhtmlx/connector/db_sqlsrv.php");

// DB CONNECTION
$sql_db = "cashReceipts";
  $sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
  $conn = sqlsrv_connect($sql_server,$sql_conn_info);

// Creating variables that'll be used throughout each step 
$station = $_GET['station'];
$shift = $_POST['shiftType'];
$bDate = $_POST['effectDate'];
$lineItemADJs = array();
$taxItemADJs = array();
$taxExempt = array();
$paymentADJs = array();

// Date
$date = date("Y-m-d");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$isTaxExempt = 0;
$isSalesTaxAdj = 0;
$isPaymentAdj = 0;
$isLineItemAdj = 0;
$iscashADJSHORT =0;
$iscashADJ = 0;
$iscashSalesADJ =0;
$isckADJ = 0;
$ischeckSalesADJ = 0;
$ischeckADJSHORT = 0;
$isdebitADJ = 0;      // DEBIT-UPDATE-12/14/2017
$isdebitSalesADJ = 0; // DEBIT-UPDATE-12/14/2017
$isdebitSHORTADJ = 0; // DEBIT-UPDATE-12/14/2017
$isamxADJ = 0;
$isamxSalesADJ = 0;
$isamxSHORTADJ = 0;
$isdiscADJ = 0;
$isdiscSalesADJ = 0;
$isdiscCASHSHORTADJ = 0;
$ismasterADJ = 0;
$ismasterSALESADJ = 0;
$ismasterCASHSHORTADJ = 0;
$isvisaADJ = 0;
$isvisaSalesADJ = 0;
$isvisaCASHSHORTADJ = 0;
$iscrtADJ = 0;
$issalesCERTADJ = 0;
$isgiftCERTcsADJ = 0;


// Then loop through all post variables as so:

foreach($_POST as $key => $value)
{
  // Write if statements to see if the above variables have values (i.e. they equal true)
  
  // You'll use the strpos() method

  if(strpos($key, "SaleItemAdjustment_") !== false){
    if($value != 0 || $value != ""){
      $isLineItemAdj = 1;
    }
  }

  if(strpos($key, "taxItemExempt_") !== false){
    if($value != 0 || $value != ""){
      $isTaxExempt = 1;
    }
  }

  if(strpos($key, "taxTYPEAdj_") !== false){
    if($value != 0 || $value != ""){
      $isSalesTaxAdj = 1;
    }
  }

  if(strpos($key, "cashADJ") !== false){
    if($value != 0 || $value != ""){
      $iscashADJSHORT = 1;
    }
  }

  if(strpos($key, "cashSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $iscashSalesADJ = 1;
    }
  }

  if(strpos($key, "cashADJSHORT") !== false){
    if($value != 0 || $value != ""){
      $iscashADJ = 1;
    }
  } 

  if(strpos($key, "ckADJ") !== false){
    if($value != 0 || $value != ""){
      $iscashADJ = 1;
    }
  }

  if(strpos($key, "checkSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $ischeckSalesADJ = 1;
    }
  }

  if(strpos($key, "checkADJSHORT") !== false){
    if($value != 0 || $value != ""){
      $ischeckADJSHORT = 1;
    }
  }

// DEBIT-UPDATE-12/14/2017
    if(strpos($key, "debitADJ") !== false){
    if($value != 0 || $value != ""){
      $isdebitADJ = 1;
    }
  }

  if(strpos($key, "debitSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $isdebitSalesADJ = 1;
    }
  }

  if(strpos($key, "debitSHORTADJ") !== false){
    if($value != 0 || $value != ""){
      $isdebitSHORTADJ = 1;
    }
  }

  if(strpos($key, "amxADJ") !== false){
    if($value != 0 || $value != ""){
      $isamxADJ = 1;
    }
  }

  if(strpos($key, "amxSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $isamxSalesADJ = 1;
    }
  }

  if(strpos($key, "amxSHORTADJ") !== false){
    if($value != 0 || $value != ""){
      $isamxSHORTADJ = 1;
    }
  }

  if(strpos($key, "discADJ") !== false){
    if($value != 0 || $value != ""){
      $isdiscADJ = 1;
    }
  }

  if(strpos($key, "discSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $isdiscSalesADJ = 1;
    }
  }

  if(strpos($key, "discCASHSHORTADJ") !== false){
    if($value != 0 || $value != ""){
      $isdiscCASHSHORTADJ = 1;
    }
  }

  if(strpos($key, "masterADJ") !== false){
    if($value != 0 || $value != ""){
      $ismasterADJ = 1;
    }
  }

  if(strpos($key, "masterSALESADJ") !== false){
    if($value != 0 || $value != ""){
      $ismasterSALESADJ = 1;
    }
  }

  if(strpos($key, "masterCASHSHORTADJ") !== false){
    if($value != 0 || $value != ""){
      $ismasterCASHSHORTADJ = 1;
    }
  }

  if(strpos($key, "visaADJ") !== false){
    if($value != 0 || $value != ""){
      $isvisaADJ = 1;
    }
  }

  if(strpos($key, "visaSalesADJ") !== false){
    if($value != 0 || $value != ""){
      $isvisaSalesADJ = 1;
    }
  }

  if(strpos($key, "visaCASHSHORTADJ") !== false){
    if($value != 0 || $value != ""){
      $isvisaCASHSHORTADJ = 1;
    }
  }

  if(strpos($key, "crtADJ") !== false){
    if($value != 0 || $value != ""){
      $iscrtADJ = 1;
    }
  }

  if(strpos($key, "salesCERTADJ") !== false){
    if($value != 0 || $value != ""){
      $issalesCERTADJ = 1;
    }
  }

  if(strpos($key, "giftCERTcsADJ") !== false){
    if($value != 0 || $value != ""){
      $isgiftCERTcsADJ = 1;
    }
  }

}

// Clause
$Clause1 = 'INSERT INTO staging_v2 (entryDate, businessDate, sbmtDate, stID, stSftID, regBegBal,regEndBal, returns, secDeposits, otherBalAdj_1, otherBalAdj_2, ptSBMT, ptAUTH, coACPT, aasisDOC, taxExempt, salesTaxAdj, paymentAdj, lineItemAdj, cashFund, totalSales, overShortAdj, totalAdj, totalSalesAdj, chkCountSheet, settlementTape_3, settlementTape_4, settlementTape_5, settlementTape_6, settlementTape_7, settlementTape_8, paymentType_1, paymentType_2, paymentType_3, paymentType_4, paymentType_5, paymentType_6, paymentType_7, paymentType_8, totalPayments, netDeposit';

$Clause2 = "VALUES('$date','$bDate','$date',$station,$shift,".$_POST["beginBal"].", ".$_POST["endBal"].", ".$_POST["returnBal"].", ".$_POST["securityDep"].",  ".$_POST["otherRegBalAdj"].",  ".$_POST["otherRegBalAdj2"].", 0,'', 0, 0, 0, 0, 0, 0, ".$_POST["cf"].", ".$_POST["totalSales"].", ".$_POST["overShortTotal"].", ".$_POST["adjustmentsSalesTOTAL"].", ".$_POST["adjFINALTOTAL"].",".$_POST["countSheetCK"].",".$_POST["amxSettlementTape"].", ".$_POST["discSettlementTape"].", ".$_POST["masterSettlementTape"].", ".$_POST["visaSettlementTape"].",".$_POST["GIFTUCRT"].",".$_POST["debitSettlementTape"].",".$_POST["CASH"].", ".$_POST["CK"].", ".$_POST["AMEX"].", ".$_POST["DISC"].", ".$_POST["MAST"].", ".$_POST["VISA"].", ".$_POST["UCRT"].", ".$_POST["DEBIT"].", ".$_POST["totalCHARGE"].", ".$_POST["netCashTOTAL"]."";


$lineItems = json_decode($_GET["lineItems"]);
$adjList =json_decode($_GET["adjList"]);
//echo $adjList->lineItems[0][0];
// echo sizeof($adjList->lineItems);

// LINE ITEM ADJ AND TAX EXEMPT FOR LOOP ###################################################################
for($i=0;$i<sizeof($lineItems);$i++){

    $lineItemIDFull = explode("_", $lineItems[$i][0]);

  $Clause1 .=','."[".$lineItemIDFull[1]."]";
  $Clause2 .=','.$lineItems[$i][1];

  if($_POST["SaleItemAdjustment_".$i] != "" && $_POST["SaleItemAdjustment_".$i] != 0){

    array_push($lineItemADJs, [$lineItemIDFull[1], $_POST["SaleItemAdjustment_".$i], $adjList->lineItems[$i][1]]);
  }

  if($_POST["taxItemExempt_".$i] != "" && $_POST["taxItemExempt_".$i] != 0){

    array_push($taxExempt, [$lineItemIDFull[1], $_POST["taxItemExempt_".$i]]);
  }
}

# END OF LOOP #############################################################################################

# TAX ADJ FOR LOOP ########################################################################################
for($j = 0; $j < sizeof($adjList->taxItems[0]); $j++){

  if($_POST["taxTYPEAdj_".$j] != "" && $_POST["taxTYPEAdj_".$j] != 0){

    array_push($taxItemADJs, [$_POST["taxTYPEAdj_".$j], $adjList->taxItems[$j][1]]);
  }
}

// THIS LOOP ACCOUNTS FOR ALL THE TAX TYPE AMOUNTS (EX. 1 2 3 4 TAX TYPES.. AND SO ON - WHILE GATHERING THE ADJUSTMENTS IN THE LOOP ABOVE)

for($j = 1; $j <= sizeof($adjList->taxItems[0]); $j++){

  $Clause1 .=', taxTYPE_'.$j;
  $Clause2 .=','.(isset($_POST["taxTYPE_".$j]) ? $_POST["taxTYPE_".$j]: 0);
}

# END OF TAX ADJ AND TAX TYPE LOOPS ########################################################################

// Merge
$query = $Clause1.")".$Clause2.")";
print_r($adjList->payments);
// for($j = 1; $j <= sizeof($adjList->payments[0]); $j++){
//   array_push([]);
// }

/* UNCOMMENT FOR ACTUAL SAVING!!!*/

// Fetch   
echo $query;
  $res = sqlsrv_query($conn, $query);

// // Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{
    $submissionQry = "INSERT INTO [Playground Aaron].dbo.submittedForms (crrID, submittedForm) VALUES (@@identity, '".$_GET["crFormData"]."')";
    $res = sqlsrv_query($conn, $submissionQry);
    if($res === false){
      if( ($errors = sqlsrv_errors() ) != null) {
        $errorStr = "";
            foreach( $errors as $error ) {
                $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
                $errorStr .= "code: ".$error[ 'code']."<br />";
                $errorStr .= "message: ".$error[ 'message']."<br />";
            }
        }
        return "error";
    }
  }

/*****************************************************************************************************************************************************/
// DESCRIPTIONS AND THEIR VALUES
/*****************************************************************************************************************************************************/
$descItems = json_decode($_GET["descItems"]);

for($i=0;$i<sizeof($descItems);$i++){
    $descQuery = "INSERT INTO pkRevStaging_v2 (businessDate, lidID, stID, stSftID, regTape) VALUES (";
    
    $descQuery .= "'".$bDate."', "."(SELECT lsdID FROM lineItemSubDesc WHERE glID = ".$descItems[$i][2]." AND Description = '".$descItems[$i][0]."'), ".$station.", ".$shift.", ".$descItems[$i][1].")";

    $res = sqlsrv_query($conn, $descQuery);

    if($res === false){
        if( ($errors = sqlsrv_errors() ) != null) {
          $errorStr = "";
              foreach( $errors as $error ) {
                  $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
                  $errorStr .= "code: ".$error[ 'code']."<br />";
                  $errorStr .= "message: ".$error[ 'message']."<br />";
              }
          }
          return "error";
    }else{

    }
}

/*****************************************************************************************************************************************************/
// LINE ITEM ADJ QUERY 
/*****************************************************************************************************************************************************/
for($l=0;$l<sizeof($lineItemADJs);$l++){
  $queryLineItemAdj = "INSERT INTO lineItemADJ_v2 (lidID, stID, stSftID, businessDate, adjAmount, adjNote) VALUES
                (
                  ".$lineItemADJs[$l][0].",
                  ".$station.",
                  ".$shift.",
                  '".$bDate."',
                  ".$lineItemADJs[$l][1].",
                  '".$lineItemADJs[$l][2]."'
                )";

  /* UNCOMMENT FOR ACTUAL SAVING!!!*/

//Fetch   
  $res = sqlsrv_query($conn, $queryLineItemAdj);

// // Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{

  }
}

/*****************************************************************************************************************************************************/
// TAX ADJ QUERY 
/*****************************************************************************************************************************************************/
for($l=0;$l<sizeof($taxItemADJs);$l++){
  $queryTaxItemAdj = "INSERT INTO salesTaxAdj (stID, stSftID, businessDate, adjAmount, adjNote) VALUES
                (
                  ".$station.",
                  ".$shift.",
                  '".$bDate."',
                  ".$taxItemADJs[$l][0].",
                  '".$taxItemADJs[$l][1]."'
                )";
    /* UNCOMMENT FOR ACTUAL SAVING!!!*/

//Fetch   
  $res = sqlsrv_query($conn, $queryTaxItemAdj);

// Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{

  }
}

/*****************************************************************************************************************************************************/
// TAX EX QUERY 
/*****************************************************************************************************************************************************/

for($l=0;$l<sizeof($taxExempt);$l++){
  $queryTaxExempt = "INSERT INTO taxExemptSales_v2 (lidID, stID, stSftID, businessDate, tesAmount) VALUES
                (
                  ".$taxExempt[$l][0].",
                  ".$station.",
                  ".$shift.",
                  '".$bDate."',
                  ".$taxExempt[$l][1]."
                )";

  $res = sqlsrv_query($conn, $queryTaxExempt);

// Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{

  }
}

/*****************************************************************************************************************************************************/
// PAYMENT QUERY 
/*****************************************************************************************************************************************************/

// ".$_POST["cashADJ"].",
// ".$_POST["cashADJSHORT"].",
// ".$_POST["cashSalesADJ"].",
// ".$adjList->payments[$l][1]."


if($_POST["cashADJ"] != 0 || $_POST["cashADJSHORT"] != 0 || $_POST["cashSalesADJ"] != 0 || $_POST["ckADJ"] != 0 || $_POST["checkADJSHORT"] != 0 || $_POST["checkSalesADJ"] != 0 || $_POST["amxADJ"] != 0 || $_POST["amxSHORTADJ"] != 0 || $_POST["amxSalesADJ"] != 0 || $_POST["discADJ"] != 0 || $_POST["discCASHSHORTADJ"] != 0 || $_POST["discSalesADJ"] != 0 || $_POST["masterADJ"] != 0 || $_POST["masterCASHSHORTADJ"] != 0 || $_POST["masterSALESADJ"] != 0 || $_POST["visaADJ"] != 0 || $_POST["visaCASHSHORTADJ"] != 0 || $_POST["visaSalesADJ"] != 0 || $_POST["crtADJ"] != 0 || $_POST["giftCERTcsADJ"] != 0 || $_POST["salesCERTADJ"] != 0 || $_POST["debitADJ"] != 0 || $_POST["debitSHORTADJ"] != 0 || $_POST["debitSalesADJ"] != 0){

  $queryPaymentAdj = "INSERT INTO paymentTypesAdj (stID, stSftID, businessDate,  paymentType_1_adj, paymentType_1_overShort, paymentType_1_salesAdj, paymentType_1_adjNote, paymentType_2_adj, paymentType_2_overShort, paymentType_2_salesAdj, paymentType_2_adjNote, paymentType_3_adj, paymentType_3_overShort, paymentType_3_salesAdj, paymentType_3_adjNote, paymentType_4_adj, paymentType_4_overShort, paymentType_4_salesAdj, paymentType_4_adjNote, paymentType_5_adj, paymentType_5_overShort, paymentType_5_salesAdj, paymentType_5_adjNote, paymentType_6_adj, paymentType_6_overShort, paymentType_6_salesAdj, paymentType_6_adjNote, paymentType_7_adj, paymentType_7_overShort, paymentType_7_salesAdj, paymentType_7_adjNote, paymentType_8_adj, paymentType_8_overShort, paymentType_8_salesAdj, paymentType_8_adjNote) VALUES
                (
                  ".$station.",
                  ".$shift.",
                  '".$bDate."',
                  ".$_POST["cashADJ"].",
                  ".$_POST["cashADJSHORT"].",
                  ".$_POST["cashSalesADJ"].",
                  '".($adjList->payments[0][1] != '' ? $adjList->payments[0][1] : "''")."',  
                  ".$_POST["ckADJ"].",
                  ".$_POST["checkADJSHORT"].",
                  ".$_POST["checkSalesADJ"].",
                  '".($adjList->payments[1][1] != '' ? $adjList->payments[1][1] : "''")."',
                  ".$_POST["amxADJ"].",
                  ".$_POST["amxSHORTADJ"].",
                  ".$_POST["amxSalesADJ"].",
                  '".($adjList->payments[2][1] != '' ? $adjList->payments[2][1] : "''")."',
                  ".$_POST["discADJ"].",
                  ".$_POST["discCASHSHORTADJ"].",
                  ".$_POST["discSalesADJ"].",
                  '".($adjList->payments[3][1] != '' ? $adjList->payments[3][1] : "''" )."',
                  ".$_POST["masterADJ"].",
                  ".$_POST["masterCASHSHORTADJ"].",
                  ".$_POST["masterSALESADJ"].",
                  '".($adjList->payments[4][1] != '' ? $adjList->payments[4][1] : "''")."',
                  ".$_POST["visaADJ"].",
                  ".$_POST["visaCASHSHORTADJ"].",
                  ".$_POST["visaSalesADJ"].",
                  '".($adjList->payments[5][1] != '' ? $adjList->payments[5][1] : "''")."',
                  ".$_POST["crtADJ"].",
                  ".$_POST["giftCERTcsADJ"].",
                  ".$_POST["salesCERTADJ"].",
                  '".($adjList->payments[6][1] != '' ? $adjList->payments[6][1] : "''")."',
                  ".$_POST["debitADJ"].",
                  ".$_POST["debitSHORTADJ"].",
                  ".$_POST["debitSalesADJ"].",
                  '".($adjList->payments[7][1] != '' ? $adjList->payments[7][1] : "''")."'
                )";

  $res = sqlsrv_query($conn, $queryPaymentAdj);

// // Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{

  }

   }

    

/*****************************************************************************************************************************************************/
// CASH LOG QUERY 
/*****************************************************************************************************************************************************/

$cashLogQRY = "INSERT INTO cashLog (stID, stSftID, businessDate, bills_hundreds, bills_fifties, bills_twenties, bills_tens, bills_fives, bills_twos, bills_ones, roll_quarters, roll_dimes, roll_nickles, roll_pennies, coin_dollars, coin_halfDollars, coin_quarters, coin_dimes, coin_nickles, coin_pennies) VALUES
              (
                $station,
                $shift,
                '$bDate',
                ".$_POST["hundreds"].",
                ".$_POST["fifties"].",
                ".$_POST["twenties"].",
                ".$_POST["tens"].",
                ".$_POST["fives"].",
                ".$_POST["twos"].",
                ".$_POST["ones"].",
                ".$_POST["rQuarters"].",
                ".$_POST["rDimes"].",
                ".$_POST["rNickles"].",
                ".$_POST["rPennies"].",
                ".$_POST["dollar"].",
                ".$_POST["HDollar"].",
                ".$_POST["Quarters"].",
                ".$_POST["Dimes"].",
                ".$_POST["Nickles"].",
                ".$_POST["Pennies"]."
)";

//Fetch   
  $res = sqlsrv_query($conn, $cashLogQRY);

// Response 
  if($res === false){
    if( ($errors = sqlsrv_errors() ) != null) {
      $errorStr = "";
          foreach( $errors as $error ) {
              $errorStr .= "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
              $errorStr .= "code: ".$error[ 'code']."<br />";
              $errorStr .= "message: ".$error[ 'message']."<br />";
          }
      }
      return "error";
  }else{

  }
/*****************************************************************************************************************************************************/

// lineItemADJ, paymentTypesADJ, salesTaxADJ, taxExemptSales

//echo $query;  // Debug purposes




// **!!NOTE!!************************************************************************ 
// 
// MEAN G CHANGE ADJUSTMENT : 10/26/2017 MADE AN CHANGE ON THE 'bDate' VARIABLE FOR IT WAS NOT CALLING THE DATES CORRECTLY. IT IS NOW '".$bDate."'.
// 
// **!! NOTE !!**********************************************************************

?>