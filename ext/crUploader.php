<?php

  define('IN_ADPT', true);

  //$fileName = $_GET['fileName'];
  //echo $fileName;
  
  // $psPath = "powershell.exe";
  // $psDIR = "\\"

  $file = explode(".", $_GET["originalFile"]);
  //echo "RENAME: " . "uploaded/".$_GET["originalFile"] . ">>>>>" . "uploaded/".$_GET["fileName"].".".$file[1] . "\n";
  rename("uploaded/".$_GET["originalFile"], "uploaded/".$_GET["fileName"].".".$file[1]);

  $script = shell_exec("powershell.exe -executionPolicy Unrestricted -File moveFileCR.ps1 2>&1" . " -parkName \"" . $_GET["parkName"] . "\" -fileName \"" . $_GET["fileName"]);
  echo $script;

?>