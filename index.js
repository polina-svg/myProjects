const buttonNotes = document.querySelector(".button-notes");
const buttonLetters = document.querySelector(".button-letters");
const buttons = document.querySelectorAll(".button-container__button");
const buttonContainer = document.querySelector(".button-container");
const fullscreenBtn = document.querySelector(".fullscreen-btn")
const pianoContainer = document.querySelector(".piano");

const upperKeys = document.querySelectorAll(".piano__key-upper-dark");
const downKeyLetters = document.querySelectorAll(
  ".piano__key-down_light__letter"
);

const pianoUpperEmpty = document.querySelectorAll(
  ".piano__key-upper-dark__empty"
);
const pianoDownEmpty = document.querySelectorAll(
  ".piano__key-down_light__empty"
);

const fullScreenIcon = document.querySelector('.fas')

let isDown = false;
let isFullScreen = false;

const lettersData = {
  KeyR: ["c#", "R", "./assets/c♯.mp3"],
  KeyT: ["d#", "T", "./assets/d♯.mp3"],
  KeyU: ["f#", "U", "./assets/f♯.mp3"],
  KeyI: ["g#", "I", "./assets/g♯.mp3"],
  KeyO: ["a#", "O", "./assets/a♯.mp3"],
  KeyD: ["c", "D", "./assets/c.mp3"],
  KeyF: ["d", "F", "./assets/d.mp3"],
  KeyG: ["e", "G", "./assets/e.mp3"],
  KeyH: ["f", "H", "./assets/f.mp3"],
  KeyJ: ["g", "J", "./assets/g.mp3"],
  KeyK: ["a", "K", "./assets/a.mp3"],
  KeyL: ["b", "L", "./assets/b.mp3"],
};

//передаем ссылку и запускаем
const aduioPlay = (src) => {
  const audio = new Audio(src);
  audio.play();
};

document.addEventListener("copy", (event) => {
  event.preventDefault();
});

document.addEventListener("selectstart", (event) => {
  event.preventDefault();
});


fullscreenBtn.addEventListener('click', (event) => {
    if (isFullScreen){
      isFullScreen = false;
      document.exitFullscreen();       
    }else{
      document.querySelector('html').requestFullscreen()
      isFullScreen = true;
    }
})


document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    fullScreenIcon.classList.remove('fa-expand')
    fullScreenIcon.classList.add('fa-compress-arrows-alt')
  } else {
    fullScreenIcon.classList.remove('fa-compress-arrows-alt')
    fullScreenIcon.classList.add('fa-expand')
  }
});

document.addEventListener("keydown", (event) => {
  const key = document.getElementById(event.code);

  if (key) {
    const src = lettersData[event.code][2];
    key.classList.add("piano__key-upper-dark__letter_active-pressed");
    // const aduio = new Audio(lettersData[event.code][2]) //рука туда сюда key.id
    // aduio.play()

    aduioPlay(src);

    if (key.classList.contains("piano__key-down_light__letter")) {
      key.previousElementSibling.classList.add(
        "piano__key-upper-light__empty_active"
      );
    }
    if (key.classList.contains("piano__key-upper-dark__letter")) {
      key.nextElementSibling.classList.add(
        "piano__key-upper-dark__empty_active"
      );
    }
  }

});

document.addEventListener("keyup", (event) => {
  const key = document.getElementById(event.code);
  if (key) {
    key.classList.remove("piano__key-upper-dark__letter_active-pressed");
    if (key.classList.contains("piano__key-down_light__letter")) {
      key.previousElementSibling.classList.remove(
        "piano__key-upper-light__empty_active"
      );
    }
    if (key.classList.contains("piano__key-upper-dark__letter")) {
      key.nextElementSibling.classList.remove(
        "piano__key-upper-dark__empty_active"
      );
    }
  }
});

buttonContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    buttons.forEach((item) => item.classList.remove("button_active"));
    event.target.classList.add("button_active");

    if (event.target.classList.contains("button-letters")) {
      const objKeys = Object.keys(lettersData);
      objKeys.forEach((id) => {
        const item = document.getElementById(id);
        item.innerHTML = lettersData[item.id][1];
      });
    }
    if (event.target.classList.contains("button-notes")) {
      const objKeys = Object.keys(lettersData);
      objKeys.forEach((id) => {
        const item = document.getElementById(id);
        item.innerHTML = lettersData[item.id][0];
      });
    }
  }
});

pianoUpperEmpty.forEach((element) => {
  element.addEventListener("mouseenter", (event) => {
    event.target.previousElementSibling.classList.add(
      "piano__key-upper-dark__letter_active-hover"
    );
    if (
      isDown &&
      !event.target.classList.contains(
        "piano__key-upper-dark__letter_active-pressed"
      )
    ) {
      event.target.classList.add("piano__key-upper-dark__empty_active");
      event.target.previousElementSibling.classList.add(
        "piano__key-upper-dark__letter_active-pressed"
      );
      
      const src = lettersData[event.target.previousElementSibling.id][2];
      aduioPlay(src);

    }
  });
  element.addEventListener("mouseleave", (event) => {
    event.target.previousElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-hover"
    );
    event.target.previousElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-pressed"
    );
    event.target.classList.remove("piano__key-upper-dark__empty_active");
  });

  element.addEventListener("mousedown", (event) => {
    const src = lettersData[event.target.previousElementSibling.id][2];
    aduioPlay(src);
    event.target.previousElementSibling.classList.add(
      "piano__key-upper-dark__letter_active-pressed"
    );
    event.target.classList.add("piano__key-upper-dark__empty_active");
    isDown = true;
  });
  element.addEventListener("mouseup", (event) => {
    event.target.classList.remove("piano__key-upper-dark__empty_active");
    event.target.previousElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-pressed"
    );
    isDown = false;
  });
});

pianoDownEmpty.forEach((element) => {
  element.addEventListener("mouseenter", (event) => {
    event.target.nextElementSibling.classList.add(
      "piano__key-upper-dark__letter_active-hover"
    );
    if (
      isDown &&
      !event.target.classList.contains(
        "piano__key-upper-dark__letter_active-pressed"
      )
    ) {
      event.target.classList.add("piano__key-upper-light__empty_active");
      event.target.nextElementSibling.classList.add(
        "piano__key-upper-dark__letter_active-pressed"
      );
      const src = lettersData[event.target.nextElementSibling.id][2];
      aduioPlay(src);

    }
  });
  element.addEventListener("mouseleave", (event) => {
    event.target.nextElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-hover"
    );
    event.target.nextElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-pressed"
    );
    event.target.classList.remove("piano__key-upper-light__empty_active");
  });
  element.addEventListener("mousedown", (event) => {
    const src = lettersData[event.target.nextElementSibling.id][2];
    aduioPlay(src);
    event.target.classList.add("piano__key-upper-light__empty_active");
    event.target.nextElementSibling.classList.add(
      "piano__key-upper-dark__letter_active-pressed"
    );
    isDown = true;
  });
  element.addEventListener("mouseup", (event) => {
    event.target.classList.remove("piano__key-upper-light__empty_active");
    event.target.nextElementSibling.classList.remove(
      "piano__key-upper-dark__letter_active-pressed"
    );
    isDown = false;
  });
});
