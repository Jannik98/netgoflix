<?php
 include "db_netgoflix.php";
 $sid=$_POST['sid'];
 $q=mysqli_query($con,"DELETE FROM `serienfavoriten` WHERE`SID`='$sid'");
 ?>