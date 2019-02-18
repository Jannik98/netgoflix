<?php
include "db_netgoflix.php";
    $data=array();
    $sid=$_POST['sid'];
    $q = mysqli_query($con, "SELECT * FROM `Serien` WHERE `SerienID`='$sid'");
    while ($row=mysqli_fetch_object($q)){
        $data[]=$row;
       }
        echo json_encode($data);
?>