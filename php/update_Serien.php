<?php
 include "db_netgoflix.php";
 
 $id=$_POST['id'];
 $titel=$_POST['titel'];
 $beschreibung = $_POST['beschreibung'];
 $erscheinungsjahr = $_POST['erscheinungsjahr'];
 $genre = $_POST['genre'];
 $dauer=$_POST['dauer'];
 $folgen=$_POST['folgen'];
 $staffeln = $_POST['staffeln'];
 $erstellerid =$_POST['erstellerid'];
 mysqli_query($con,"UPDATE `serien` SET `Titel`='$titel',`Beschreibung`='$beschreibung',`Erscheinungsjahr`='$erscheinungsjahr',`Genre`='$genre',`Dauer`='$dauer',`Folgen`='$folgen',`Staffeln`='$staffeln',`ErstellerID`='$erstellerid' WHERE `SerienID`='$id'");
 ?>