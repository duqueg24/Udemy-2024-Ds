// Declaración de una constante 'dicesImg' que es un array de rutas de imágenes de dados.
const dicesImg = [
    "./images/dice1.png", // Ruta de la imagen del dado con el número 1
    "./images/dice2.png", // Ruta de la imagen del dado con el número 2
    "./images/dice3.png", // Ruta de la imagen del dado con el número 3
    "./images/dice4.png", // Ruta de la imagen del dado con el número 4
    "./images/dice5.png", // Ruta de la imagen del dado con el número 5
    "./images/dice6.png", // Ruta de la imagen del dado con el número 6
  ];
  
  // Definición de la función 'rollDice' que simula el lanzamiento de dos dados.
  function rollDice() {
    // Selecciona el primer elemento en el DOM con la clase 'img1' y cambia su atributo 'src'
    document
      .querySelector(".img1") // 'querySelector' busca el primer elemento con la clase 'img1' en el documento.
      .setAttribute( // 'setAttribute' modifica el atributo especificado ('src') del elemento seleccionado.
        "src", // Nombre del atributo a modificar: 'src' indica la ruta de la imagen a mostrar.
        `${dicesImg[Math.floor(Math.random() * dicesImg.length)]}` // Genera una ruta aleatoria desde el array 'dicesImg'.
      );
  
    // Selecciona el primer elemento en el DOM con la clase 'img2' y cambia su atributo 'src'
    document
      .querySelector(".img2") // 'querySelector' busca el primer elemento con la clase 'img2' en el documento.
      .setAttribute(
        "src", // Nombre del atributo a modificar
        `${dicesImg[Math.floor(Math.random() * dicesImg.length)]}` // Genera una ruta aleatoria desde el array 'dicesImg'.
      );
  
    // Extrae el número del dado a partir de la imagen actual en el elemento con clase 'img1'
    let resultDices1 = extractDiceNumber(
      document.querySelector(".img1").getAttribute("src") // Obtiene el valor actual del atributo 'src' de 'img1' con 'getAttribute'.
    );
  
    // Extrae el número del dado a partir de la imagen actual en el elemento con clase 'img2'
    let resultDices2 = extractDiceNumber(
      document.querySelector(".img2").getAttribute("src") // Obtiene el valor actual del atributo 'src' de 'img2' con 'getAttribute'.
    );
  
    // Compara los números obtenidos de los dos dados para determinar el resultado del juego
    if (resultDices1 > resultDices2) {
      // Si el número del dado 1 es mayor que el dado 2, actualiza el contenido del elemento <h1> con "Player 1 Wins!"
      document.querySelector("h1").textContent = "Player 1 Wins!";
    } else if (resultDices1 < resultDices2) {
      // Si el número del dado 2 es mayor que el dado 1, actualiza el contenido del elemento <h1> con "Player 2 Wins!"
      document.querySelector("h1").textContent = "Player 2 Wins!";
    } else {
      // Si los números son iguales, actualiza el contenido del elemento <h1> con "It's a Draw!"
      document.querySelector("h1").textContent = "It's a Draw!";
    }
  }
  
  // Función que extrae el número del dado a partir del nombre de la imagen (por ejemplo, "dice3.png" devuelve 3)
  function extractDiceNumber(imagePath) {
    // Utiliza una expresión regular para extraer el número de la ruta del archivo de imagen.
    const match = imagePath.match(/dice(\d)\.png$/); // Busca un número entre 1-6 en el nombre del archivo con el patrón "diceX.png"
    // Devuelve el número encontrado como entero o 'null' si no hay coincidencia
    return match ? parseInt(match[1], 10) : null; // 'parseInt' convierte la cadena a número entero.
  }
  
  // Llama a la función 'rollDice' para ejecutar el código al cargar la página.
  rollDice();
  