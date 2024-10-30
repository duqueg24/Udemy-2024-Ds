// Asocia cada tecla con su archivo de sonido correspondiente
const soundMap = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3",
  };
  
  // Función para reproducir el sonido correspondiente
  const playSound = (key) => {
    const soundFile = soundMap[key];
    if (soundFile) {
      const audio = new Audio(soundFile);
      audio.play();
    } else {
      console.error(`Tecla no válida: ${key}`);
    }
  };
  
  // Agrega el evento click a cada botón con la clase 'drum'
  const addClickEventToDrums = () => {
    document.querySelectorAll(".drum").forEach((button) => {
      button.addEventListener("click", () => playSound(button.innerHTML));
    });
  };
  
  // Inicializa los eventos
  addClickEventToDrums();
  
  // Agrega el evento keypress al documento
  document.addEventListener("keypress", (event) => {
    playSound(event.key);
    buttonAnimation(event.key);
  });

  // Función para animar el botón presionado
  const buttonAnimation = (key) => {
    const activeButton = document.querySelector(`.${key}`);
    if (activeButton) {
      activeButton.classList.add("pressed");
      setTimeout(() => {
        activeButton.classList.remove("pressed");
      }, 100);
    }
  };