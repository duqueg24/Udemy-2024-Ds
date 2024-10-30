document.querySelector("h1").style.color = "red";
document.querySelector("button").style.backgroundColor = "yellow";

// Añade la clase "huge" al elemento <h1>
console.log(document.querySelector("h1").classList.add("huge"));
// Elimina la clase "huge" del elemento <h1>
document.querySelector("h1").classList.remove("huge");

// Alterna la clase "huge" en el elemento <h1> (si está, la quita; si no está, la agrega)
document.querySelector("h1").classList.toggle("huge");

// Verifica si el elemento <h1> tiene la clase "huge"
// Devuelve true si la clase está presente, y false si no
document.querySelector("h1").classList.contains("huge");


// Obtiene el valor del atributo "href" del elemento <a>
console.log(document.querySelector("a").getAttribute("href"));

// Establece el atributo "href" del elemento <a> al valor especificado
// En este caso, cambiará la URL a la que apunta el enlace
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("a").setAttribute("href", "https://espanol.yahoo.com/");
});
