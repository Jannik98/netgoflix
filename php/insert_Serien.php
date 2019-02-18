<?php
include "db_netgoflix.php";
if(isset($_POST['button']))
{
   $titel=$_POST['titel'];
   $beschreibung = $_POST['beschreibung'];
   $erscheingungsjahr = $_POST['erscheinungsjahr'];
   $genre = $_POST['genre'];
   $dauer = $_POST['dauer'];
   $teil = $_POST['teil'];
   $staffeln = $_POST['staffeln'];
   $erstellerID = $_POST['erstellerID'];
 $q=mysqli_query($con,"INSERT INTO `serien`(`Titel`, `Beschreibung`, `Erscheinungsjahr`, `Genre`, `Dauer`, `Folgen`, `Staffeln`, `ErstellerID`) VALUES('$titel', '$beschreibung', '$erscheingungsjahr', '$genre', '$dauer', '$teil', '$staffeln','$erstellerID')");
 if($q)
  echo "success";
  else
  echo "error";
}
 ?>