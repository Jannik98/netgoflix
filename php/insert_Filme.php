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
   $erstellerID = $_POST['erstellerid'];
 $q=mysqli_query($con,"INSERT INTO `filme`(`Titel`, `Beschreibung`, `Erscheinungsjahr`, `Genre`, `Dauer`, `Teil`, `ErstellerID`) VALUES ('$titel', '$beschreibung', '$erscheingungsjahr', '$genre', '$dauer', '$teil', '$erstellerID')");
 if($q)
  echo "success";
 else
  echo "error";
}
 ?>