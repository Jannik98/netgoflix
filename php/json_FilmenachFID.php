<?php
include "db_netgoflix.php";
    $data=array();
    $fid=$_POST['fid'];
    $q = mysqli_query($con, "SELECT * FROM `Filme` WHERE `FilmID`='$fid'");
    while ($row=mysqli_fetch_object($q)){
        $data[]=$row;
       }
        echo json_encode($data);
?>