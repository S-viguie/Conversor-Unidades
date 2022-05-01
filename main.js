//Variables
let input = prompt("Bienvenido a conversor de unidades online \nElija un numero para comenzar: \n1 - Longitud \n2 - Peso \n3 - Tiempo")
let un1 = ""
let un2 = ""
let unidad1 = ""
let unidad2 = ""
let valor = ""
let coef = ""
let res = ""

//Constructor de unidades
class Unidad {
    constructor (a, b, c) {
        this.nombre = a
        this.simbolo = b
        this.si = c
    }
}

//Objetos de unidades
let metros = new Unidad ("Metros", "m", true)
let pies = new Unidad ("Pies", "ft", false)
let pulgadas = new Unidad ("Pulgadas", "in", false)
let kilogramos = new Unidad ("Kilogramos", "kg", true)
let libras = new Unidad ("Libras", "lb", false)
let onzas = new Unidad ("Onzas", "oz", false)
let horas = new Unidad ("Horas", "h", false)
let minutos = new Unidad ("Minutos", "min", false)
let segundos = new Unidad ("Segundos", "s", true)

//Arrays de unidades
let longitudes = [metros, pies, pulgadas]
let pesos = [kilogramos, libras, onzas]
let tiempos = [horas, minutos, segundos]

//Selección variables y valor
do switch (input) {
    case "1":
        seleccionLongitud ()
        inicial(seleccionLongitud)
        break
    case "2":
        seleccionPeso ()
        inicial(seleccionPeso)
        break
    case "3":
        seleccionTiempo ()
        inicial(seleccionTiempo)
        break
    default:
        alert("Elija un número válido")
        input = prompt("Bienvenido a conversor de unidades online \nElija un numero para comenzar: \n1 - Longitud \n2 - Peso \n3 - Tiempo")
} while (input!="1" && input!="2" && input!="3")

//Funciones selección
function seleccionLongitud () {
    un1 = prompt("¿Qué unidad desea convertir? \n1 - Metros \n2 - Pies \n3 - Pulgadas")
    if (un1=="1") {
        unidad1 = longitudes.find(longitud => longitud.nombre=="Metros")
    } else if (un1=="2") {
        unidad1 = longitudes.find(longitud => longitud.nombre=="Pies")
    } else {
        unidad1 = longitudes.find(longitud => longitud.nombre=="Pulgadas")
    }
    un2 = prompt("¿A qué unidad desea convertir? \n1 - Metros \n2 - Pies \n3 - Pulgadas")
    if (un2=="1") {
        unidad2 = longitudes.find(longitud => longitud.nombre=="Metros")
    } else if (un2=="2") {
        unidad2 = longitudes.find(longitud => longitud.nombre=="Pies")
    } else {
        unidad2 = longitudes.find(longitud => longitud.nombre=="Pulgadas")
    }
    if ((un1=="1" && un2=="2") || (un1=="2" && un2=="1")) {
        coef = 3.281
    } else if ((un1=="1" && un2=="3") || (un1=="3" && un2=="1")) {
        coef = 39.37
    } else {
        coef = 12
    }
}

function seleccionPeso () {
    un1 = prompt("¿Qué unidad desea convertir? \n1 - Kilogramos \n2 - Libras \n3 - Onzas")
    if (un1=="1") {
        unidad1 = pesos.find(peso => peso.nombre=="Kilogramos")
    } else if (un1=="2") {
        unidad1 = pesos.find(peso => peso.nombre=="Libras")
    } else {
        unidad1 = pesos.find(peso => peso.nombre=="Onzas")
    }
    un2 = prompt("¿A qué unidad desea convertir? \n1 - Kilogramos \n2 - Libras \n3 - Onzas")
    if (un2=="1") {
        unidad2 = pesos.find(peso => peso.nombre=="Kilogramos")
    } else if (un2=="2") {
        unidad2 = pesos.find(peso => peso.nombre=="Libras")
    } else {
        unidad2 = pesos.find(peso => peso.nombre=="Onzas")
    }
    if ((un1=="1" && un2=="2") || (un1=="2" && un2=="1")) {
        coef = 2.205
    } else if ((un1=="1" && un2=="3") || (un1=="3" && un2=="1")) {
        coef = 35.274
    } else {
        coef = 16
    }
}

function seleccionTiempo () {
    un1 = prompt("¿Qué unidad desea convertir? \n1 - Horas \n2 - Minutos \n3 - Segundos")
    if (un1=="1") {
        unidad1 = tiempos.find(tiempo => tiempo.nombre=="Horas")
    } else if (un1=="2") {
        unidad1 = tiempos.find(tiempo => tiempo.nombre=="Minutos")
    } else {
        unidad1 = tiempos.find(tiempo => tiempo.nombre=="Segundos")
    }
    un2 = prompt("¿A qué unidad desea convertir? \n1 - Horas \n2 - Minutos \n3 - Segundos")
    if (un2=="1") {
        unidad2 = tiempos.find(tiempo => tiempo.nombre=="Horas")
    } else if (un2=="2") {
        unidad2 = tiempos.find(tiempo => tiempo.nombre=="Minutos")
    } else {
        unidad2 = tiempos.find(tiempo => tiempo.nombre=="Segundos")
    }
    if ((un1=="1" && un2=="3") || (un1=="3" && un2=="1")) {
        coef = 3600
    } else {
        coef = 60
    }
}

function inicial (unidad) {
    while (un1 == un2) {
        alert("Elija unidades distintas")
        unidad()
    } 
    while ((un1!="1" && un1!="2" && un1!="3") || (un2!="1" && un2!="2" && un2!="3")) {
        alert("Elija un número válido")
        unidad()
    }
    valor = parseFloat(prompt("Ingrese el valor"))
}

//Funciones conversión
function mult (valor, coef) {
    res = valor*coef
}

function div (valor, coef) {
    res = valor/coef
}

//Lógica de conversión
switch (input) {
    case "1":
    case "2":
    case "3":
        if (un1==1) {
            mult(valor, coef)
            }
        if (un1==2) {
            if (un2==1) {
                div(valor, coef)
            } else {
                mult(valor, coef)
            }
        } 
        if (un1==3) {
            div(valor, coef)
        }
        break
}

alert(valor+" "+unidad1.simbolo+" "+"equivale a "+res+" "+unidad2.simbolo)

if (unidad2.si==true) {
    alert("Está convirtiendo a una unidad del Sistema Internacional")
}