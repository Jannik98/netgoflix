//Klassen
class Serie{
    constructor(titel,erscheinungsjahr,genre, dauer, folgenoderteil,beschreibung,ersteller,staffeln){
        this.titel = titel;
        this.erscheinungsjahr = erscheinungsjahr;
        this.genre = genre;
        this.dauer = dauer;
        this.folgenoderteil = folgenoderteil;
        this.beschreibung = beschreibung;
        this.ersteller = ersteller;
        this.staffeln = staffeln;
    }
    ausgabefuerTabelle(){
        var string=  "<tr><td>"+this.titel+"</td><td>"+this.erscheinungsjahr+"</td><td>"+this.genre+"</td><td>"+this.dauer+"</td><td>"+this.folgenoderteil+"</td><td>"+this.beschreibung+"</td><td>"+this.ersteller+"</td><td>"+this.staffeln+"</td>";
        return string;
    }
}
class Film{
    constructor(titel,erscheinungsjahr,genre, dauer, folgenoderteil,beschreibung,ersteller){
        this.titel = titel;
        this.erscheinungsjahr = erscheinungsjahr;
        this.genre = genre;
        this.dauer = dauer;
        this.folgenoderteil = folgenoderteil;
        this.beschreibung = beschreibung;
        this.ersteller = ersteller;
    }
    ausgabefuerTabelle(){
        var string=  "<tr><td>"+this.titel+"</td><td>"+this.erscheinungsjahr+"</td><td>"+this.genre+"</td><td>"+this.dauer+"</td><td>"+this.folgenoderteil+"</td><td>"+this.beschreibung+"</td><td>"+this.ersteller+"</td>";
        return string;
    }
}
//Anmelden und Registrieren
var Listeemails =[];
var x = document.cookie;
$(document).ready(function()
{
    if(x.length!=0){
        document.getElementById("Sign-in").classList.add("invisible");
        document.getElementById("Inhalt").classList.remove("invisible");
    }
    if(x.length ==0){
        document.getElementById("Sign-in").classList.remove("invisible");
        document.getElementById("Inhalt").classList.add("invisible");
    }
    $.getJSON("http://localhost/json_alleBenutzer.php", function(result){
        for(var i =0;i<result.length;i++){
        Listeemails.push(result[i].email)
        }
     })
});

//Anmelden und Registrieren
function WechselnzuRegistrieren(){
    document.getElementById("Anmelden").classList.add("invisible");
    document.getElementById("Registrieren").classList.remove("invisible");
}
function WechselnzuAnmelden(){
    document.getElementById("Anmelden").classList.remove("invisible");
    document.getElementById("Registrieren").classList.add("invisible");
}
function Anmelden(){
    try{
    var email = document.getElementById("tbxemailanm").value;
    if(email == ""){
        throw new Error("Bitte ein E-mail eingeben");
    }
    var passwort = document.getElementById("tbxpasswortanm").value;
    if(passwort.length<8){
        throw new Error("Bitte ein Passwort mit mindestens 8 Zeichen eingeben!");
    }
    var datastring = "email="+email;
    $.ajax({
        type: "POST",
        url:"http://localhost/json_Benutzer.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(daten){
            for(var i =0;i<daten.length;i++){
                if(daten[i].passwort==passwort){
                    document.cookie = "ErstellerID=" + daten[i].BenutzerID;
                    alert("Angemeldet!")
                    location.reload();
                }
                else{
                alert("Passwort und Email stimmen nicht überein.");
                }
            }
            }
        });
    }
    catch(error){
        alert("Fehler: " + error.message);
    }
}
function Registrieren(){
    try{
    var email = document.getElementById("tbxemailreg").value;
    if(testobemailvorhanden(email)){
        throw new Error("Email Adresse ist bereits registriert.");
    }
    if(email.substr(email.length-9)!="@netgo.de"){
        throw new Error("Bitte ein E-mail mit der Endung '@netgo.de' eingeben");
    }
    var passwort = document.getElementById("tbxpasswortreg").value;
    var passwortw = document.getElementById("tbxpasswortwiederholungreg").value;
    if(passwort != passwortw){
        throw new Error("Passwörter sind nicht identisch!");
    }
    if(passwort.length<8){
        throw new Error("Bitte ein Passwort mit mindestens 8 Zeichen eingeben!");
    }
    var datastring = "email=" + email + "&passwort=" + passwort;
    
    $.ajax({
        type: "POST",
        url:"http://localhost/insert_Benutzer.php",
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(data){
        if(data=="success"){
            console.log("Erfolgreich")
            window.location.href = "uebersicht.html";
        }
        else{
            console.log("Error");
        }
    }
})
    }   
    catch(error){
        alert("Fehler: " + error.message);
    }

}

function testobemailvorhanden(email){
    for(var i =0;i<Listeemails.length;i++){
        if(email == Listeemails[i]){
            return true;
        }
    }
    return false;
} 
//Menu
function Menuanzeigen(){
    document.getElementById("Menuzeichen").classList.add("invisible");
    document.getElementById("Menu").classList.remove("invisible");
}
function Menuschliessen(){
    document.getElementById("Menuzeichen").classList.remove("invisible");
    document.getElementById("Menu").classList.add("invisible");
}
//Hinzufügen
function Serieausgewaehlt(){
    removeinvisible("SerienTabelle");
    addinvisible("FilmeTabelle");
    var datastring = "bid="+welcherbenutzeristangemeldet();
    $.ajax({
        type: "POST",
        url:"http://localhost/json_SerienFavoriten.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(daten){
            for(var i =0;i<daten.length;i++){
                row = daten[i];
                ElementevonSID(row.SID);
            }
        }
        });
}
function Filmausgewaehlt(){
    removeinvisible("FilmeTabelle");
    addinvisible("SerienTabelle");
    var datastring = "bid="+welcherbenutzeristangemeldet();
    $.ajax({
        type: "POST",
        url:"http://localhost/json_FilmFavoriten.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(daten){
            for(var i =0;i<daten.length;i++){
                row = daten[i];
                ElementevonFID(row.FID);
            }
            }
        });
}
function ElementevonSID(daten){
    var datastring = "sid=" + daten;
    $.ajax({
        type: "POST",
        url:"http://localhost/json_SeriennachSID.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(daten){
            DatenfuerSerienFavoritenausgeben(daten);
        }
    });
}
function ElementevonFID(daten){
    var datastring = "fid=" + daten;
    $.ajax({
    type: "POST",
    url:"http://localhost/json_FilmenachFID.php",
    dataType: 'json',
    data: datastring,
    crossDomain: true,
    cache: false,
    success: function(daten){
        DatenfuerFilmFavoritenausgeben(daten);
        }
    });
}
function DatenfuerFilmFavoritenausgeben(daten){
    var ausgabestring="";
    for(var i=0;i<daten.length;i++){
        var row = daten[i];
        var film = new Film(row.Titel, row.Erscheinungsjahr, row.Genre, row.Dauer, row.Teil, row.Beschreibung, row.ErstellerID);
        ausgabestring += film.ausgabefuerTabelle();
        ausgabestring += "<td class='Funktionen' onclick='Fentfernen("+row.FilmID+")'>&#10060</td></tr>";
    }

    document.getElementById("tbodyDatenabfragenFilmFavoriten").innerHTML = ausgabestring;
}
 
function DatenfuerSerienFavoritenausgeben(daten){
    var ausgabestring="";
    for(var i=0;i<daten.length;i++){
        var row = daten[i];
        var serie = new Serie(row.Titel, row.Erscheinungsjahr, row.Genre,row.Dauer, row.Folgen, row.Beschreibung, row.ErstellerID, row.Staffeln);
        ausgabestring += serie.ausgabefuerTabelle();
        ausgabestring += "<td class='Funktionen' onclick='Sentfernen("+row.SerienID+")'>&#10060</td></tr>"
    }
    
    document.getElementById("tbodyDatenabfragenSerienFavoriten").innerHTML = ausgabestring;
}
function Sentfernen(sid){
    var datastring = "sid=" + sid;
    $.ajax({
    type: "POST",
    url:"http://localhost/delete_SerienFavoriten.php",
    dataType: 'json',
    data: datastring,
    crossDomain: true,
    cache: false,
    });
    alert("Serie aus Favoriten gelöscht!");
    location.reload(); 
}
function Fentfernen(fid){
    var datastring = "fid=" + fid;
    $.ajax({
    type: "POST",
    url:"http://localhost/delete_FilmeFavoriten.php",
    dataType: 'json',
    data: datastring,
    crossDomain: true,
    cache: false,
    });
    alert("Film aus Favoriten gelöscht!");
    location.reload(); 
}

function removeinvisible(id){
    document.getElementById(id).classList.remove("invisible");
}
function addinvisible(id){
    document.getElementById(id).classList.add("invisible");
}
function Abmelden(){
    document.cookie = "ErstellerID=; expires=Thu, 01 Jan 1970 00:00:01 UTC";
    alert("Abgemeldet")
    location.reload();    
}
function welcherbenutzeristangemeldet(){
    var bid =  document.cookie;
    var num="";
    if(bid[12]){
        num = bid[12];
    }
    if(bid[13]){
        num +=bid[13];
    }
    if(bid[14]){
        num += bid[14];
    }
    if(bid[15]){
        num += bid[15];
    }
    if(bid[16]){
        num += bid[16];
    }
     return num;
 }