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
    document.getElementById("Hinweis1").classList.remove("invisible");

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
    document.getElementById("beschriftungDauer").innerHTML = "Dauer einer Folge in Minuten";
    document.getElementById("beschriftungFolgenoderTeile").innerHTML ="Folgen pro Staffel";
    document.getElementById("Staffel").classList.remove("invisible");
}
function Filmausgewaehlt(){
    document.getElementById("beschriftungDauer").innerHTML = "Dauer des Films in Minuten";
    document.getElementById("beschriftungFolgenoderTeile").innerHTML ="Teile";
    document.getElementById("Staffel").classList.add("invisible");
}
Listgenre = ["Abenteuer","Action","Drama","Fantasy","Biographie","Komödie","Horror","Krieg","Material-Arts","Musik","Roadmovie","Science-Fiction","Sport","Thriller","Western"]
//Button Hinzufügen
function Datensatzhinzufuegen(){    
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
            var dataString="titel="+titel+"&beschreibung="+beschreibung +"&erscheinungsjahr="+erscheinungsjahr +"&genre="+genre +"&dauer="+dauer +"&teil="+teil +"&erstellerid="+welcherbenutzeristangemeldet()+"&button=";
                if(titel){
                    $.ajax({
                    type: "POST",
                    url:"http://localhost/insert_Filme.php",
                    data: dataString,
                    crossDomain: true,
                    cache: false,
                    success: function(data){
                    if(data=="success"){
                        alert("Erfolgreich hinzugefügt")
                    }
                    else{
                        alert("Hinzufügen fehlgeschlagen. Versuchen Sie es erneut oder wenden Sie sich an den Anbieter");
                    }
                }
            })
            };
        }
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
            var dataString= "staffeln="+staffeln+"&titel="+titel+"&beschreibung="+beschreibung +"&erscheinungsjahr="+erscheinungsjahr +"&genre="+genre +"&dauer="+dauer +"&teil="+teil+"&erstellerID="+welcherbenutzeristangemeldet() +"&button=";
            if(titel){
                $.ajax({
                type: "POST",
                url:"http://localhost/insert_Serien.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                success: function(data){
                if(data=="success"){
                    alert("Erfolgreich hinzugefügt")
                }
                else{
                    alert("Hinzufügen fehlgeschlagen. Versuchen Sie es erneut oder wenden Sie sich an den Anbieter");
                }
            }
        })
        };  
        }  
    }
    catch(error){
        alert("Fehler: " + error.message);
    }
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