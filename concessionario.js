/*Dato le entità: Concessionario, Cliente, auto
registrare i clienti, le prenotazioni per il noleggio
 o la vendita delle auto*/

/* Gestire l'overbooking */
/* Ottimizzare il codice per l'acquisto */
/* Gestire il booking per le vendite, sulla falsa riga del noleggio */
const readlineSync = require('readline-sync');

function Concessionaria() {

    this.Cliente = function() {
        this.firstname = readlineSync.question("Inserire nome: ");
        this.lastname = readlineSync.question("Inserire cognome: ");
    };
    this.clienti = []

    this.Prenotazioni = {
        booking: [],
        create: function(client, car){
            this.booking[car.id] = {
                dataIn: new Date(readlineSync.question("Inserire la data di inizio noleggio: ")),
                dataEnd: new Date(readlineSync.question("Inserire la data di fine noleggio: ")),
                cliente: client, car: car.id};

        }
    };
    this.Selling = {
        listino: {},
        vendita : function(pagamento, client, car){
            this.listino[car.id] = { pagamento:pagamento, cliente:client, car:car};
        }
    }
};

Concessionaria.prototype.salone = [
    { marca: "FIAT", modello: "500", id: 1, action: "rent", prezzo: "10€"},
    { marca: "AUDI", modello: "Q3", id: 2, action: "sail", prezzo: "70.000€"},
    {marca: "Nissan",modello: "Juke", id: 3, action: "sail", prezzo: "12.000€"},
    {marca: "Lancia",modello: "Ypsilon", id: 5, action: "rent", prezzo: "10€"},
    {marca: "Ferrari", modello: "Roma", id: 6, action: "rent", prezzo: "100€"}
];

//________________________________________________
Concessionaria.prototype.action = function(type="rent"){
    return this.salone.filter(function(item){ return item.action == type});
}
Concessionaria.prototype.noleggiare = function(){
    console.log("Modelli disponibili al noleggio: ", this.action());

    var rent = parseInt(readlineSync.question("Scrivere 'ID' dell'auto desiderata: "));

    if (isNaN(rent) || !this.salone.map(function(item) { if (item.action == "rent") return item.id }).includes(rent)){
        console.log("Scelta non valida");
        this.noleggiare();
        return false;
    }

    if(this.Prenotazioni.booking.find(function(item){return item.car == rent })){
        var overIndex = this.Prenotazioni.booking.findIndex(function(item){return item.car ==rent});
        var noloEnd = this.Prenotazioni.booking[overIndex].dataEnd;
        console.log("Macchina prenotata fino a",noloEnd)
    }

    var inizio = new Date(readlineSync.question("Scrivere la data iniziale del noleggio: "));

    if (noloEnd.getTime()<inizio.getTime()){
        console.log("Data è valida");
    } else {
        console.log("Data non valida, scegliere una nuova auto!");
        this.noleggiare()
    }


    var fine = new Date(readlineSync.question("Scrivere la data di riconsegna dell'auto: "));
    var cliente = new this.Cliente()
    this.clienti.push(cliente);

    var car = this.salone.find(function(item) { return item.id == rent});
    this.Prenotazioni.create(cliente, car);
    var prenot = this.Prenotazioni.booking[rent];

    console.log("Il signor ", prenot.cliente.firstname, prenot.cliente.lastname, " ha noleggiato", prenot.car," dal ", prenot.dataIn, " al ", prenot.dataEnd, ".");
}
//__________________________________________________

Concessionaria.prototype.action2 = function(type="sail"){
    return this.salone.filter(function(item){ return item.action == type});
}

Concessionaria.prototype.comprare = function(){
    console.log("Modelli disponibili alla vendita: ", this.action2());

    var sell = parseInt(readlineSync.question("Scrivere 'ID' dell'auto desiderata: "));

    if (isNaN(sell) || !this.salone.map(function(item) { if (item.action == "sail") return item.id }).includes(sell)){
        console.log("Scelta non valida");
        this.comprare();
        return false;
    }
    var cliente2 = new this.Cliente()
    this.clienti.push(cliente2);

    var pay = readlineSync.question("Come desidera pagare?");
    var car = this.salone.find(function(item) { return item.id == sell});
    this.Selling.vendita(pay,sell,cliente2,car);
    var vend = this.Selling.listino[sell];

    console.log("Il signor",vend.cliente2.firstname,vend.cliente2.lastname,"ha comprato",vend.car.marca,vend.car.modello," per ",vend.car.prezzo)
}

//__________________________________________________

function validID(user_input) {
    var regex = /^(?:[A-Z][AEIOU][AEIOUX]|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i
    var userID = new RegExp(regex);
    if (userID.test(user_input)) {
        console.log("CF valid!");
    } else {
        console.log("CF no valid!")
    }
}

//validID("PSIDGI91T05H501F")

var DiegoRent = new Concessionaria();
do{
    var init = readlineSync.question("Salve desidera Comprare (C) o Noleggiare (N) una macchina? Digitare N o C, per uscire qualsiasi altro tasto");
    continua = true;
    switch (init) {
        case "N":
            DiegoRent.noleggiare();
            break;
        case "C":
            DiegoRent.comprare();
            break;
        default:
            console.log("Scelta non valida!")
            continua = false;
    }
} while (continua);
