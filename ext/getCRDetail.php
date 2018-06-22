<?php
	define('IN_ADPT', true);
	require("/dhtmlx/connector/form_connector.php");
	require('/dhtmlx/connector/db_config.php');
	require("/dhtmlx/connector/db_sqlsrv.php");

  	$sql_db = "cashReceipts";
	$sql_conn_info = array('Database'=>$sql_db, 'UID'=>$sql_user, 'PWD'=>$sql_pass);
	$conn = sqlsrv_connect($sql_server,$sql_conn_info);

	if(isset($_GET["id"])){
        $form = new FormConnector($conn, 'SQLSrv');
        // echo "SELECT * FROM recentlySubmittedReceipts_vw WHERE crrID = ".$_GET["id"];
		$form->render_complex_sql("SELECT * FROM recentlySubmittedReceipts_vw WHERE crrID = ".$_GET["id"], "crrID","
		businessDate,
		stSftID,
		bills_hundreds,
		bills_fifties,
		bills_twenties,
		bills_tens,
		bills_fives,
		bills_twos,
		bills_ones,
		roll_quarters,
		roll_dimes,
		roll_nickles,
		roll_pennies,
		coin_dollars,
		coin_halfDollars,
		coin_quarters,
		coin_dimes,
		coin_nickles,
		coin_pennies,
		
		regBegBal,
		regEndBal,
		returns,
		secDeposits,
		otherBalAdj_1,
		otherBalAdj_2,

		taxExempt,
		salesTaxAdj,
		paymentAdj,
		lineItemAdj,
		cashFund,
		totalSales,
		overShortAdj,
		totalAdj,
		totalSalesAdj,

		chkCountSheet,
		settlementTape_3,
		settlementTape_4,
		settlementTape_5,
		settlementTape_6,
		settlementTape_7,
		settlementTape_8,
		
		paymentType_1,
		paymentType_2,
		paymentType_3,
		paymentType_4,
		paymentType_5,
		paymentType_6,
		paymentType_7,
		paymentType_8,
		totalPayments,
		netDeposit,
        regTape,

        paymentType_1_adj,
        paymentType_2_adj,
        paymentType_3_adj,
        paymentType_4_adj,
        paymentType_5_adj,
        paymentType_6_adj,
        paymentType_7_adj,
        paymentType_8_adj,

        paymentType_1_overShort,
        paymentType_2_overShort,
        paymentType_3_overShort,
        paymentType_4_overShort,
        paymentType_5_overShort,
        paymentType_6_overShort,
        paymentType_7_overShort,
        paymentType_8_overShort,

        paymentType_1_salesAdj,
        paymentType_2_salesAdj,
        paymentType_3_salesAdj,
        paymentType_4_salesAdj,
        paymentType_5_salesAdj,
        paymentType_6_salesAdj,
        paymentType_7_salesAdj,
        paymentType_8_salesAdj,

		taxTypes,
		templates
");
	}
?>