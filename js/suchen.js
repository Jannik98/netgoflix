//Klassen
class Serie{
    constructor(titel,erscheinungsjahr, genre, dauer, folgenoderteil,beschreibung,ersteller,staffeln){
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
        var string=  "<td>"+this.titel+"</td><td>"+this.erscheinungsjahr+"</td><td>"+this.genre+"</td><td>"+this.dauer+"</td><td>"+this.folgenoderteil+"</td><td>"+this.beschreibung+"</td><td>"+this.ersteller+"</td><td>"+this.staffeln+"</td>";
        return string;
    }
}
class Film{
    constructor(titel,erscheinungsjahr, genre, dauer, folgenoderteil,beschreibung,ersteller){
        this.titel = titel;
        this.erscheinungsjahr = erscheinungsjahr;
        this.genre = genre;
        this.dauer = dauer;
        this.folgenoderteil = folgenoderteil;
        this.beschreibung = beschreibung;
        this.ersteller = ersteller
    }
    ausgabefuerTabelle(){
        var string=  "<td>"+this.titel+"</td><td>"+this.erscheinungsjahr+"</td><td>"+this.genre+"</td><td>"+this.dauer+"</td><td>"+this.folgenoderteil+"</td><td>"+this.beschreibung+"</td><td>"+this.ersteller+"</td>";
        return string;
    }
}
//Anmelden und Registrieren

//Globale Variablen
var idfuerupdate;
var Listeemails =[];
var x = document.cookie;

Listgenre = ["Abenteuer","Action","Drama","Fantasy","Biographie","Komödie","Horror","Krieg","Material-Arts","Musik","Roadmovie","Science-Fiction","Sport","Thriller","Western"]

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

//Suchen
function Datensatzsuchen(){    
    var titel = document.getElementById("tbxTitel").value;
    var datastring = "titel="+titel;
    var ausgabetext="";
    var ueberschrift;
    if(document.getElementById("radFilm").checked){
        $.ajax({
            type: "POST",
            url:"http://localhost/json_FilmenachTitel.php",
            dataType: 'json',
            data: datastring,
            crossDomain: true,
            cache: false,
            success: function(daten){
                    ausgabetext = TabelleFilmeerstellen(daten);
                    document.getElementById("tbodyDatenabfragen").innerHTML =ausgabetext;
                }
            });
        document.getElementById("tddauer").innerHTML = "Dauer des Films";
        document.getElementById("tdFolgenoderTeile").innerHTML ="Teile";
        document.getElementById("tdStaffeln").classList.add("invisible"); 
        ueberschrift ="Filme mit dem Titel: " + titel;
    }
    if(document.getElementById("radSerie").checked){
        $.ajax({
            type: "POST",
            url:"http://localhost/json_SeriennachTitel.php",
            dataType: 'json',
            data: datastring,
            crossDomain: true,
            cache: false,
            success: function(daten){
                    ausgabetext = TabelleSerieerstellen(daten);
                    document.getElementById("tbodyDatenabfragen").innerHTML =ausgabetext;
                }
            });
        document.getElementById("tddauer").innerHTML = "Dauer einer Folge";
        document.getElementById("tdFolgenoderTeile").innerHTML ="Folgen pro Staffel";
        document.getElementById("tdStaffeln").classList.remove("invisible");
        ueberschrift ="Serien mit dem Titel: " + titel;
    }
    document.getElementById("h3Datenabfrage").innerHTML = ueberschrift; 
}
function SBearbeiten(sid){
    var datastring = "sid="+sid;
    $.ajax({
        type: "POST",
        url:"http://localhost/json_SeriennachSID.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(data){
            var ListefuerTextboxen =["Beschreibung","Erscheinungsjahr","Genre","Dauer","FolgenoderTeile","Staffeln"];
            var ListefuerInhalt =[];
            var a = data[0].Beschreibung;
            var b = data[0].Erscheinungsjahr;
            var c= data[0].Genre;
            var d= data[0].Dauer;
            var e = data[0].Folgen;
            var f = data[0].Staffeln;
            ListefuerInhalt.push(a,b,c,d,e,f);
                for(var i =0;i<ListefuerTextboxen.length;i++){
                    removeinvisible(ListefuerTextboxen[i]);
                    einsetzendesvalues("tbx"+ListefuerTextboxen[i], ListefuerInhalt[i]);
                }
        removeinvisible("btnDatenueberschreiben");
        document.getElementById("btnDatenueberschreiben").classList.add("btn");
        addinvisible("btnSuchen");
        document.getElementById("Typauswaehlen").classList.add("Breite95");
        document.getElementById("h3Datenanlegen").innerHTML = "Serie bearbeiten";
        idfuerupdate = sid;
        addinvisible("Typauswaehlen");
        addinvisible("Datenabfrage");
        }
        });
}
function SFavorit(sid){
    var datastring = "sid="+sid +"&bid="+welcherbenutzeristangemeldet();
    $.ajax({
        type: "POST",
        url:"http://localhost/insert_SerienFavoriten.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        });
        alert("Serie zu Favoriten hinzugefügt!");
        location.reload();
}
function SLoeschen(sid){
    var datastring = "sid="+sid;
    $.ajax({
        type: "POST",
        url:"http://localhost/delete_Serien.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        });
        alert("Serie gelöscht!");
        location.reload();
}
function FBearbeiten(fid){
    var datastring = "fid="+fid;
    $.ajax({
        type: "POST",
        url:"http://localhost/json_FilmenachFID.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        success: function(data){
            var ListefuerTextboxen =["Beschreibung","Erscheinungsjahr","Genre","Dauer","FolgenoderTeile"];
            var ListefuerInhalt =[];
            var a = data[0].Beschreibung;
            var b = data[0].Erscheinungsjahr;
            var c= data[0].Genre;
            var d= data[0].Dauer;
            var e = data[0].Teil;
            ListefuerInhalt.push(a,b,c,d,e);
                for(var i =0;i<ListefuerTextboxen.length;i++){
                    removeinvisible(ListefuerTextboxen[i]);
                    einsetzendesvalues("tbx"+ListefuerTextboxen[i], ListefuerInhalt[i]);
                }
        removeinvisible("btnDatenueberschreiben");
        document.getElementById("btnDatenueberschreiben").classList.add("btn");
        addinvisible("btnSuchen");
        document.getElementById("Typauswaehlen").classList.add("Breite95");
        document.getElementById("h3Datenanlegen").innerHTML = "Film  bearbeiten";
        idfuerupdate = fid;
        addinvisible("Typauswaehlen");
        addinvisible("Datenabfrage");
        }
        });
}
function FFavorit(fid){
    var datastring = "fid="+fid +"&bid="+welcherbenutzeristangemeldet();
    $.ajax({
        type: "POST",
        url:"http://localhost/insert_FilmFavoriten.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        });
        alert("Film zu Favoriten hinzugefügt!");
        location.reload();
}
function FLoeschen(fid){

    var datastring = "fid="+fid;
    $.ajax({
        type: "POST",
        url:"http://localhost/delete_Filme.php",
        dataType: 'json',
        data: datastring,
        crossDomain: true,
        cache: false,
        });
        alert("Film gelöscht!");
        location.reload();
}
function removeinvisible(id){
    document.getElementById(id).classList.remove("invisible");
}
function addinvisible(id){
    document.getElementById(id).classList.add("invisible");
}
function einsetzendesvalues(id,text){
    document.getElementById(id).value =text;
}
function Datensatzueberschreiben(){  
    var ListefuerTextboxen =["Beschreibung","Erscheinungsjahr","Genre","Dauer","FolgenoderTeile","Staffeln"];
    
    try{
        var titel = document.getElementById("tbxTitel").value;
        if(titel == ""){
            throw new Error("Bitte einen Titel eingeben!");
        }
        var beschreibung = document.getElementById("tbxBeschreibung").value;
        if(beschreibung == ""){
            throw new Error("Bitte eine Beschreibung eingeben!");
        }
        var erscheinungsjahr = Number(document.getElementById("tbxErscheinungsjahr").value);
        if(isNaN(erscheinungsjahr) || erscheinungsjahr <1850 || erscheinungsjahr >2019 || Number.isInteger(erscheinungsjahr)==false){
            throw new Error("Bitte ein Erscheinungsjahr zwischen 1850 und 2019 eingeben (ganz Zahl)!");
        }
        var genre = document.getElementById("tbxGenre").value;
        var i;
        for(i=0;i<Listgenre.length;i++){
            if(genre == Listgenre[i]){
            i=Listgenre.length+1;
            }
        }
        if(i<(Listgenre.length+1)){
            throw new Error("Bitte nur vorgegebene Genre auswählen!");
        }
        var teil = Number(document.getElementById("tbxFolgenoderTeile").value);
        if(isNaN(teil)||teil<=0){
            throw new Error("Bitte mehr als 0 Teile angeben!");
        }
        var dauer = Number(document.getElementById("tbxDauer").value);
        if(isNaN(dauer)|| dauer<=0 || Number.isInteger(dauer)==false){
            throw new Error("Bitte eine Dauer größer als 0 eingeben (als ganz Zahl)!")
        }
        if(document.getElementById("radFilm").checked){
            if(Number.isInteger(teil)==false){
                throw new Error("Bitte nur ganze Zahlen bei 'Teile' eingeben!");
            } 
            var dataString="id=" + idfuerupdate+ "&titel="+titel+"&beschreibung="+beschreibung +"&erscheinungsjahr="+erscheinungsjahr +"&genre="+genre +"&dauer="+dauer +"&teil="+teil + "&erstellerid="+ welcherbenutzeristangemeldet();;
                    $.ajax({
                    type: "POST",
                    url:"http://localhost/update_Filme.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    success: function(){
                        alert("Erfolgreich")
                        for(var i =0;i<ListefuerTextboxen.length;i++){
                            addinvisible(ListefuerTextboxen[i]);
                        }
                        removeinvisible("btnSuchen");
                        addinvisible("btnDatenueberschreiben");
                        document.getElementById("Typauswaehlen").classList.remove("Breite95");
                        document.getElementById("h3Datenanlegen").innerHTML = "Film/Serie suchen";
                        removeinvisible("Typauswaehlen");
                        location.reload();
                        removeinvisible("Datenabfrage");
                    }
            })
            };
        if(document.getElementById("radSerie").checked){  
            if(Number.isInteger(teil)==false){
                throw new Error("Bitte nur ganze Zahlen bei 'Folgen' eingeben!");
            }
            var staffeln = Number(document.getElementById("tbxStaffeln").value);    
            if(isNaN(staffeln)|| staffeln<=0){
                throw new Error("Bitte mehr als 0 Staffeln angeben!");
            }
            if(Number.isInteger(staffeln)==false){
                throw new Error("Bitte nur ganze Zahlen bei 'Staffeln' eingeben!");
            }
            var dataString= "id=" + idfuerupdate+ "&titel="+titel+"&beschreibung="+beschreibung +"&erscheinungsjahr="+erscheinungsjahr +"&genre="+genre +"&dauer="+dauer +"&folgen="+teil+ "&staffeln="+staffeln+ "&erstellerid=" + welcherbenutzeristangemeldet();
                $.ajax({
                type: "POST",
                url:"http://localhost/update_Serien.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                success: function(){
                    alert("Erfolgreich");
                    for(var i =0;i<ListefuerTextboxen.length;i++){
                        addinvisible(ListefuerTextboxen[i]);
                    }
                    removeinvisible("btnSuchen");
                    addinvisible("btnDatenueberschreiben");
                    document.getElementById("Typauswaehlen").classList.remove("Breite95");
                    document.getElementById("h3Datenanlegen").innerHTML = "Film/Serie suchen";
                    removeinvisible("Typauswaehlen");
                    removeinvisible("Datenabfrage");
                    location.reload();
                }

        });
    } 
    
    }
    catch(error){
        alert("Fehler: " + error.message);
    }
}
function TabelleSerieerstellen(daten){
    var ausgabetext="";
    for(var z=0;z<daten.length;z++){
        var row = daten[z];
        var serie = new Serie(row.Titel,row.Erscheinungsjahr,row.Genre,row.Dauer,row.Folgen,row.Beschreibung,row.ErstellerID ,row.Staffeln);
        ausgabetext += "<tr><td class='Funktionen' onclick='SBearbeiten("+row.SerienID+")'>&#9999</td><td class='Funktionen' onclick='SFavorit("+row.SerienID+")'>&#9734</td><td class='Funktionen' onclick='SLoeschen("+row.SerienID+")'>&#10060</td>";
        ausgabetext += serie.ausgabefuerTabelle()+"</tr>";
    }
    return ausgabetext;
}
function TabelleFilmeerstellen(daten){
    var ausgabetext="";
    for(var i=0;i<daten.length;i++){
        var row = daten[i];
        var film = new Film(row.Titel,row.Erscheinungsjahr,row.Genre,row.Dauer,row.Teil,row.Beschreibung,row.ErstellerID);
        ausgabetext += "<td class='Funktionen' onclick='FBearbeiten("+row.FilmID+")'>&#9999</td><td class='Funktionen' onclick='FFavorit("+row.FilmID+")'>&#9734</td><td class='Funktionen' onclick='FLoeschen("+row.FilmID+")'>&#10060</td>";
        ausgabetext += film.ausgabefuerTabelle()+"</tr>";
    }
    return ausgabetext;
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