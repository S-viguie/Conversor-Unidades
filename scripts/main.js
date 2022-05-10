//Variables
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
let celsius = new Unidad ("Celsius", "°C", true)
let farenheite = new Unidad ("Farenheite", "°F", false)

//Arrays de unidades
const longitudes = [metros, pies, pulgadas]
const pesos = [kilogramos, libras, onzas]
const tiempos = [horas, minutos, segundos]
const temperaturas = [celsius, farenheite]

//Funciones
function selector(e){
    input = e.target.id
    selector1.innerHTML=`<option value="0">Seleccione unidad inicial</option>`
    selector2.innerHTML=`<option value="0">Seleccione unidad final</option>`
    if (input=="long") {
        for (const und of longitudes) {
            selector1.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
            selector2.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
        }
    } else if (input=="weig") {
        for (const und of pesos) {
            selector1.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
            selector2.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
        }
    } else if (input=="time") {
        for (const und of tiempos) {
            selector1.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
            selector2.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
        }
    } else {
        for (const und of temperaturas) {
            selector1.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
            selector2.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
        }
    }
}

function conversor(e){
    valor=e.target.value
    switch (input) {
        case "long":
        case "weig":
        case "time":
            if (unidad1.nombre=="Metros" || unidad1.nombre=="Kilogramos" || unidad1.nombre=="Horas") {
                mult(valor, coef)
            } else if (unidad1.nombre=="Pies" || unidad1.nombre=="Libras" || unidad1.nombre=="Minutos") {
                    if (unidad2.nombre=="Metros" || unidad2.nombre=="Kilogramos" || unidad2.nombre=="Horas") {
                        div(valor, coef)
                    } else {
                        mult(valor, coef)
                    }
            } else if (unidad1.nombre=="Pulgadas" || unidad1.nombre=="Onzas" || unidad1.nombre=="Segundos") {
                div(valor, coef)
            }
            break
        case "temp":
            if (unidad1.nombre=="Celsius"){
                faren(valor)
            } else {
                cels(valor)
            }
    }
    subtitulo.innerText = `${valor+" "+unidad1.simbolo} equivalen a ${res+" "+unidad2.simbolo}`
    if (unidad1==unidad2) {
        subtitulo.innerText = "Elija unidades distintas"
    }
    if (unidad2.si==true) {
        parrafo.innerText = "Está convirtiendo a una unidad del Sistema Internacional"
    }
}

//Funciones conversión
function mult (valor, coef) {
    res = Math.round(valor*100*coef)/100
}

function div (valor, coef) {
    res = Math.round(valor*100/coef)/100 
}

function cels (valor) {
    res = Math.round((valor-32)*5/9*100)/100
}

function faren (valor) {
    res = Math.round((valor*9/5)*100)/100+32
}

//Eventos
const iconos = document.querySelector("#iconos")
const selector1 = document.querySelector("#selector1")
const selector2 = document.querySelector("#selector2")
const value = document.querySelector("#value")
const parrafo = document.querySelector("#parrafo")
const subtitulo = document.querySelector("#subtitulo")

iconos.addEventListener("click", selector)  

selector1.addEventListener("change", (e)=>{
    switch (input){
        case "long":
            unidad1 = longitudes.find(longitud => longitud.nombre==e.target.value)
            if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pies") || (unidad1.nombre=="Pies" && unidad2.nombre=="Metros")) {
                coef = 3.281
            } else if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pulgadas") || (unidad1.nombre=="Pulgadas" && unidad2.nombre=="Metros")) {
                coef = 39.37
            } else {
                coef = 12
            }
            break
        case "weig":
            unidad1 = pesos.find(peso => peso.nombre==e.target.value)
            if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Libras") || (unidad1.nombre=="Libras" && unidad2.nombre=="Kilogramos")) {
                coef = 2.205
            } else if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Onzas") || (unidad1.nombre=="Onzas" && unidad2.nombre=="Kilogramos")) {
                coef = 35.274
            } else {
                coef = 16
            }
            break
        case "time":
            unidad1 = tiempos.find(tiempo => tiempo.nombre==e.target.value)
            if ((unidad1.nombre=="Horas" && unidad2.nombre=="Segundos") || (unidad1.nombre=="Segundos" && unidad2.nombre=="Horas")) {
                coef = 3600
            } else {
                coef = 60
            }
            break
        case "temp":
            unidad1 = temperaturas.find(temperatura => temperatura.nombre==e.target.value)
            break
    }
})

selector2.addEventListener("change", (e)=>{
    switch (input){
        case "long":
            unidad2 = longitudes.find(longitud => longitud.nombre==e.target.value)
            if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pies") || (unidad1.nombre=="Pies" && unidad2.nombre=="Metros")) {
                coef = 3.281
            } else if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pulgadas") || (unidad1.nombre=="Pulgadas" && unidad2.nombre=="Metros")) {
                coef = 39.37
            } else {
                coef = 12
            }
            break
        case "weig":
            unidad2 = pesos.find(peso => peso.nombre==e.target.value)
            if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Libras") || (unidad1.nombre=="Libras" && unidad2.nombre=="Kilogramos")) {
                coef = 2.205
            } else if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Onzas") || (unidad1.nombre=="Onzas" && unidad2.nombre=="Kilogramos")) {
                coef = 35.274
            } else {
                coef = 16
            }
            break
        case "time":
            unidad2 = tiempos.find(tiempo => tiempo.nombre==e.target.value)
            if ((unidad1.nombre=="Horas" && unidad2.nombre=="Segundos") || (unidad1.nombre=="Segundos" && unidad2.nombre=="Horas")) {
                coef = 3600
            } else {
                coef = 60
            }
            break
        case "temp":
            unidad2 = temperaturas.find(temperatura => temperatura.nombre==e.target.value)
            break
    }
})

value.addEventListener("input", conversor)