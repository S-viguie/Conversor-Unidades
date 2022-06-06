//Variables
let unidad1 = ""
let unidad2 = ""
let valor = ""
let coef = ""
let res = ""
let card 
let data

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
let ars = new Unidad ("Pesos", "$", false)
let usd = new Unidad ("Dolares", "USD", false)

//Arrays de unidades
const longitudes = [metros, pies, pulgadas]
const pesos = [kilogramos, libras, onzas]
const tiempos = [horas, minutos, segundos]
const temperaturas = [celsius, farenheite]
const monedas = [ars, usd]
const total = [longitudes, pesos, tiempos, temperaturas, monedas]

//Funciones generales
function selector(e){
    input = total[e.target.id]
    if (input==monedas) {
        fetch ("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/dolarblue")
            .then ((resp)=>resp.json())
                .then ((datos)=>{
                    data = datos
                })
    }
    nombreInput.innerText = ""
    card!=undefined && anime({
        targets: card,
        scale: 1,
        opacity: {
            value: 1,
            duration: 300,
            easing: 'linear'}
    })
    selector1.innerHTML=`<option value="0">Seleccione unidad inicial</option>`
    selector2.innerHTML=`<option value="0">Seleccione unidad final</option>`
    subtitulo.innerText = ""
    value.value=""
    for (const und of input) {
        selector1.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
        selector2.innerHTML+=`<option value="${und.nombre}">${und.nombre}</option>`
    }
    card = document.querySelector(`#card${parseFloat(e.target.id)+1}`)
    let main = document.getElementsByClassName("main__selectores")
    let mainFila = document.getElementsByClassName("main__fila")
    anime({
        targets: card,
        opacity: 0,
        scale: {value: 1.2, duration: 150},
        easing: 'linear',
        duration: 100,
    })
    anime({
        targets: nombreInput,
        opacity: {
            value: [0,1],
            duration: 50,
            easing: 'linear',},
        width: {
            value: [0, 150],
            delay: 500,
            duration: 500,
            easing: 'linear',
        },
        scale: {value: [0, 1], duration: 500, easing: 'linear',},
        complete: function() {
            nombreInput.innerText = (e.target.id==0? "Longitud":(e.target.id==1? "Peso":(e.target.id==2? "Tiempo":(e.target.id==3? "Temperatura":"Dolar"))))
        }
    })
    anime({
        targets: main,
        opacity: [0, 1],
        duration: 1000,
        easing: "linear",
    })
    anime({
        targets: mainFila,
        opacity: [0, 1],
        duration: 1000,
        easing: "linear",
    })
}

function conversor(e){
    valor=e.target.value
    localStorage.setItem("entradaValor", e.target.value)
    switch (input) {
        case longitudes:
        case pesos:
        case tiempos:
        case monedas:
            if (unidad1.nombre=="Metros" || unidad1.nombre=="Kilogramos" || unidad1.nombre=="Horas" || unidad1.nombre=="Dolares") {
                mult(valor, coef)
            } else if (unidad1.nombre=="Pies" || unidad1.nombre=="Libras" || unidad1.nombre=="Minutos") {
                (unidad2.nombre=="Metros" || unidad2.nombre=="Kilogramos" || unidad2.nombre=="Horas") ? div(valor, coef) : mult(valor, coef)
            } else {
                div(valor, coef)
            }
            break
        case temperaturas:
            (unidad1.nombre=="Celsius") ? faren(valor) : cels(valor)
    }
    if (unidad1=="" || unidad2=="") {
        subtitulo.innerText = ""
    } else if (unidad1==unidad2) {
        subtitulo.innerText = "Elija unidades distintas";
        value.value=""
        Swal.fire({
            title: '¡Error!',
            text: 'Elija unidades distintas',
            icon: 'error',
            confirmButtonText: 'Continuar',
            width: "400px",
            background: "#d4cdff",
            color: "black",
            confirmButtonColor: "#3C1C78"
            })
    } else if (valor!=""){
        if (input==monedas){
            subtitulo.innerText = `${unidad1.simbolo+" "+valor} equivalen a ${unidad2.simbolo+" "+res}`
            parrafo.innerText = `Última actualización: ${data.fecha} GMT`
        } else {
        subtitulo.innerText = `${valor+" "+unidad1.simbolo} equivalen a ${res+" "+unidad2.simbolo}`;
        unidad2.si==true && (parrafo.innerText = "Está convirtiendo a una unidad del Sistema Internacional")}
    } else {
        subtitulo.innerText = ""
    }
    localStorage.setItem("resultado", subtitulo.innerText)
}

function asignacion (e) {
    for (let i = 0; i < total.length; i+=1) {
        n = total[i].find(longitud => longitud.nombre==e.target.value)
        if (n!=undefined) {
            return n
            break
        }
    }
}

function coeficientes () {
    switch (input){
        case longitudes:
            if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pies") || (unidad1.nombre=="Pies" && unidad2.nombre=="Metros")) {
                coef = 3.281
            } else if ((unidad1.nombre=="Metros" && unidad2.nombre=="Pulgadas") || (unidad1.nombre=="Pulgadas" && unidad2.nombre=="Metros")) {
                coef = 39.37
            } else {
                coef = 12
            }
            break
        case pesos:
            if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Libras") || (unidad1.nombre=="Libras" && unidad2.nombre=="Kilogramos")) {
                coef = 2.205
            } else if ((unidad1.nombre=="Kilogramos" && unidad2.nombre=="Onzas") || (unidad1.nombre=="Onzas" && unidad2.nombre=="Kilogramos")) {
                coef = 35.274
            } else {
                coef = 16
            }
            break
        case tiempos:
            if ((unidad1.nombre=="Horas" && unidad2.nombre=="Segundos") || (unidad1.nombre=="Segundos" && unidad2.nombre=="Horas")) {
                coef = 3600
            } else {
                coef = 60
            }
            break
        case temperaturas:
            break
        case monedas:
            unidad1.nombre=="Pesos" ? coef=data.venta : coef=data.compra
            break
    }
    value.value=""
    subtitulo.innerText=""
    parrafo.innerText=""
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
const nombreInput = document.querySelector("#nombreInput")

iconos.addEventListener("click", selector) 

selector1.addEventListener("change", (e)=>{
    unidad1 = asignacion (e)
    coeficientes ()
})

selector2.addEventListener("change", (e)=>{
    unidad2 = asignacion (e)
    coeficientes ()
})

value.addEventListener("input", conversor)

document.addEventListener("DOMContentLoaded", ()=>{
    value.value=localStorage.getItem("entradaValor")
    subtitulo.innerText = localStorage.getItem("resultado")
})