<?php
 include "db_netgoflix.php";
 $id=$_POST['id'];
 $titel=$_POST['titel'];
 $beschreibung = $_POST['beschreibung'];
 $erscheinungsjahr = $_POST['erscheinungsjahr'];
 $genre = $_POST['genre'];
 $dauer=$_POST['dauer'];
 $teil=$_POST['teil'];
 $erstellerid = $_POST['erstellerid'];
 
 mysqli_query($con,"UPDATE `Filme` SET  `Titel`='$titel',`Beschreibung`='$beschreibung',`Erscheinungsjahr`='$erscheinungsjahr',`Genre`= '$genre',`Dauer`='$dauer',`Teil`='$teil',`ErstellerID`= '$erstellerid' WHERE `FilmID`='$id'");
 ?>