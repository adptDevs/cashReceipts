#Get params ----------------------------------------------------------
param([string]$parkName = "parkName", [string]$fileName = "fileName")

#Source --------------------------------------------------------------
$source = "uploaded"
$deleteSource = "uploaded\*.*"

#Destanation ---------------------------------------------------------
# $uncServer = "\\170.94.192.220\cashReceipts"
# $dest = "\\170.94.192.220\cashReceipts\" + $parkName

#Login ---------------------------------------------------------------
$username = "adpt\appwriter"
$password = "8BjqyZ45&@_zbuBa"

$webclient = New-Object System.Net.WebClient

$webclient.Credentials = New-Object System.Net.NetworkCredential($username, $password)

# $file = Get-ChildItem -Path $source
# $filePath = $source + "\" + $file
# Write-Host $file
# Write-Host "`n"
# Write-Host $filePath

foreach($item in (dir $source)){ 
    Write-Host $item
    $uri = New-Object System.Uri("ftp://170.94.192.220/cashReceipts/$parkName/$($item.Name)")
    $webclient.UploadFile($uri, $item.FullName) 
 } 

 Remove-Item $deleteSource