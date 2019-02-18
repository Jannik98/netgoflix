<?php
include "db_netgoflix.php";
   $email=$_POST['email'];
   $passwort = $_POST['passwort'];
 $q=mysqli_query($con,"INSERT INTO `Benutzer`(`email`, `passwort`) VALUES('$email', '$passwort')");
 if($q)
  echo "success";
  else
  echo "error";
 ?>