<?php
include "db_netgoflix.php";
$data=array();
$bid = $_POST['bid'];
$q=mysqli_query($con,"SELECT * FROM `filmfavoriten` WHERE `BID`=$bid");
while($row=mysqli_fetch_object($q)){
 $data[]=$row;  
}
echo json_encode($data);
?> 