<?php
 include "db_netgoflix.php";
 $sid=$_POST['sid'];
 $q=mysqli_query($con,"DELETE FROM `serien` WHERE`SerienID`='$sid'");
 if($q)
    echo "success";
 else
    echo "error";
 ?>