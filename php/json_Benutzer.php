<?php
include "db_netgoflix.php";
$data=array();
$email = $_POST['email'];
$q=mysqli_query($con,"SELECT * FROM `Benutzer` WHERE `email`='$email'");
while($row=mysqli_fetch_object($q)){
 $data[]=$row;  
}
echo json_encode($data);
?> 