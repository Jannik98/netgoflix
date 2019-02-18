<?php
include "db_netgoflix.php";
    $data=array();
    $titel=$_POST['titel'];
    $q = mysqli_query($con, "SELECT * FROM `Serien` WHERE `titel`='$titel'");
    while ($row=mysqli_fetch_object($q)){
        $data[]=$row;
       }
        echo json_encode($data);
?>