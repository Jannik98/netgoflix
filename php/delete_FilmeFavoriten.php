<?php
 include "db_netgoflix.php";
 $fid=$_POST['fid'];
 $q=mysqli_query($con,"DELETE FROM `filmfavoriten` WHERE`FID`='$fid'");
 ?>