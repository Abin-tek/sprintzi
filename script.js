const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const lapClearButton = document.getElementsByClassName("lap-clear-button")[0];
const centi = document.getElementsByClassName("cen")[0];
const second = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("min")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let counter;
let cen = 0;
let sec = 0;
let min = 0;
let lapCounter = 0;

const play = () => {
  lapButton.classList.remove("hidden");
  resetButton.classList.remove("hidden");

  if (!isPlay) {
    bg.classList.add("animated-bg");
    playButton.innerHTML = "pause";
    isPlay = true;
    counter = setInterval(() => {
      if (cen == 99) {
        if (sec == 59) {
          if (min == 59) {
            // reset minutes to 0
            min = -1;
          }
          // to maintain two digits
          if (min < 9) {
            minute.innerHTML = `0${++min}`;
          } else {
            minute.innerHTML = ++min;
          }
          // reset seconds to 0
          sec = -1;
        }
        // to maintain two digits
        if (sec < 9) {
          second.innerHTML = `0${++sec}`;
        } else {
          second.innerHTML = ++sec;
        }
        // reset centi seconds to 0
        cen = -1;
      }
      // to maintain two digits
      if (cen < 9) {
        centi.innerHTML = `0${++cen}`;
      } else {
        centi.innerHTML = ++cen;
      }
    }, 10);
  } else {
    bg.classList.remove("animated-bg");
    playButton.innerHTML = "play";
    clearInterval(counter);
    isPlay = false;
  }
};

const reset = () => {
  bg.classList.remove("animated-bg");
  playButton.innerHTML = "play";
  isPlay = false;

  clearInterval(counter);
  cen = sec = min = 0;
  centi.innerHTML = "00";
  second.innerHTML = "00";
  minute.innerHTML = "00";

  lapButton.classList.add("hidden");
  resetButton.classList.add("hidden");

  lapClear();
  lapClearButton.classList.add("hidden");
};

const lap = () => {
  const lapItem = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  lapItem.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerText = `#${++lapCounter}`;
  timeStamp.innerHTML = `${min} : ${sec} : ${cen}`;

  lapItem.append(number, timeStamp);
  laps.append(lapItem);

  lapClearButton.classList.remove("hidden");
};

const lapClear = () => {
  laps.innerHTML = "";
  lapCounter = 0;
  lapClearButton.classList.add("hidden");
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
lapClearButton.addEventListener("click", lapClear);
