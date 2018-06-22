<?php
    define('IN_ADPT', true);

    require('/dhtmlx/connector/grid_connector.php');
    require('/dhtmlx/connector/db_config.php');
    require('/dhtmlx/connector/db_sqlsrv.php');


    //include XML Header (as response will be in xml format)
    header("Content-type: text/xml");
    //encoding may be different in your case
    echo('<?xml version="1.0" encoding="utf-8"?>'); 

    echo '<rows id="0">';

    echo '<head>';
        echo '<column width="150" type="ro" align="left" sort="str">Facility</column>';
        echo '<column width="150" type="ro" align="left" sort="str">Station</column>';
        echo '<column width="150" type="ro" align="left" sort="str">Modifier</column>';
        echo '<column width="150" type="ro" align="left" sort="str">Shift</column>';
        echo '<column width="150" type="ro" align="left" sort="str">Business date</column>';
    echo '</head>';

    $sql = "SELECT * FROM "

    echo '</rows>';
?>