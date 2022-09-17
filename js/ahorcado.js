//======================================================================
// VARIABLES
//======================================================================
// Array de palabras
var palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");

var txtLetra = document.getElementById("letra");
var btnInsertar = document.getElementById("btnInsertar");
let historialLetrasUsuario = [];

    function generaPalabra() {
        rand = (Math.random() * 19).toFixed(0);
        palabra = palabras[rand][0].toUpperCase();
        console.log(palabra);
    }
    
    // Funcion para pintar los guiones de la palabra
    function pintarGuiones(num) {
        for (var i = 0; i < num; i++) {
            oculta[i] = "_";
        }
        hueco.innerHTML = oculta.join("");
    }

    function intento(letra) {
        if(palabra.indexOf(letra) != -1) {
            for(var i=0; i<palabra.length; i++) {
                if(palabra[i]==letra) oculta[i] = letra;
            }
            hueco.innerHTML = oculta.join("");
            document.getElementById("mensaje").innerHTML = "Bien!";
            document.getElementById("mensaje").className += "alert alert-success";
        } else {
            cont--;
            document.getElementById("intentos").innerHTML = cont;
            document.getElementById("mensaje").innerHTML = "Fallo!";
            document.getElementById("mensaje").className += "alert alert-danger";
            document.getElementById("image"+cont).className += "fade-in";
            historialLetrasUsuario.push(letra);
            document.getElementById("historial").innerHTML = historialLetrasUsuario.join(' ');
        }      
        document.getElementById('letra').value = '';
        compruebaFin();
        setTimeout(function () { 
            document.getElementById("mensaje").innerHTML = "";
            document.getElementById("mensaje").className = ""; 
          }, 800);
    }

    function clickInsertar() {
        var input = document.getElementById('letra').value;
        if(input === '') {
            document.getElementById("mensaje").innerHTML = "Inserte una letra!";
            document.getElementById("mensaje").className += "alert alert-warning";
            document.getElementById('letra').focus(); 
            setTimeout(function () { 
                document.getElementById("mensaje").innerHTML = "";
                document.getElementById("mensaje").className = ""; 
              },  800); 
        } else {
            intento(input.toUpperCase());
        }
        
    }

    function pista() {
        document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
      }
      

    function compruebaFin() {
        if( oculta.indexOf("_") == -1 ) {
          document.getElementById("msg-final").innerHTML = "Felicidades !!";
          document.getElementById("msg-final").className += "zoom-in";
          txtLetra.disabled = true;
          btnInsertar.disabled = true;
        }else if( cont == 0 ) {
          document.getElementById("msg-final").innerHTML = "Game Over";
          document.getElementById("msg-final").className += "zoom-in";
          txtLetra.disabled = true;
          btnInsertar.disabled = true;
        }
      }    

  
// Inicializa el juego
function iniciarTablero() {
    generaPalabra();
    pintarGuiones(palabra.length);
   cont = 6;
    //document.getElementById("intentos").innerHTML=cont; */
  }

  window.onload = iniciarTablero();