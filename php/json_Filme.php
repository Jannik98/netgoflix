<?php
include "db_netgoflix.php";
$data=array();
$q=mysqli_query($con,"SELECT * FROM `filme`");
while($row=mysqli_fetch_object($q)){
 $data[]=$row;  
}
echo json_encode($data);
?> 