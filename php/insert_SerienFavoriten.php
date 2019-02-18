<?php
include "db_netgoflix.php";
   $bid=$_POST['bid'];
   $sid = $_POST['sid'];
 $q=mysqli_query($con,"INSERT INTO `serienfavoriten`(`BID`, `SID`) VALUES ('$bid', '$sid')");
 if($q)
  echo "success";
 else
  echo "error";
 ?>