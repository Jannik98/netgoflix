<?php
include "db_netgoflix.php";
    $data=array();
    $genre=$_POST['genre'];
    $q = mysqli_query($con, "SELECT * FROM `Serien` WHERE `genre`='$genre'");
    while ($row=mysqli_fetch_object($q)){
        $data[]=$row;
       }
        echo json_encode($data);
?>