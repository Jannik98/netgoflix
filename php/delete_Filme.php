<?php
 include "db_netgoflix.php";
 $fid=$_POST['fid'];
 $q=mysqli_query($con,"DELETE FROM `filme` WHERE`FilmID`='$fid'");
 if($q)
    echo "success";
 else
    echo "error";
 ?>