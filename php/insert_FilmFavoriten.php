<?php
include "db_netgoflix.php";
   $bid=$_POST['bid'];
   $fid = $_POST['fid'];
 $q=mysqli_query($con,"INSERT INTO `filmfavoriten`(`BID`, `FID`) VALUES ('$bid', '$fid')");
 if($q)
  echo "success";
 else
  echo "error";
 ?>