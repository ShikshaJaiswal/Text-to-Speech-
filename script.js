const maxCharacters = 1000;
const url = "http://api.voicerss.org/";
const apiKey = "6bede69773694d008d8e2b5c00dbfd05";

const tooLongError = "Text exceeds 1000 characters";
const whiteSpaceError =
  "Text must contain text characters other than white spaces!";

const buildUrl = (str) =>
  `${url}?key=${apiKey}&src=${str}&f=48khz_16bit_stereo`;
const tooLong = (str) => str.length >= maxCharacters;
const emptyString = (str) =>
  str.split("").every((_char) => _char === "" || _char === "\n");

const playBtn = () => document.getElementById("play-btn");
const textInput = () => document.getElementById("text-input");
const appContainer = () => document.getElementById("app-container");
const errorContainer = () => document.getElementById("error-message");
const clearErrors = () => (errorContainer().innerHTML = "");

const listenerFn = ($event) => {
  if ($event.target.value || $event.type === "paste")
    playBtn().disabled = false;
  else playBtn().disabled = true;
};

const displayErrorMsg = (val) => {
  const errs = [];
  if (tooLong(val)) errs.push(tooLongError);
  if (emptyString(val)) errs.push(whiteSpaceError);
  errs.forEach((_err) => {
    const div = document.createElement("div");
    div.innerText = _err;
    errorContainer().appendChild(div);
  });
};

playBtn().addEventListener("click", () => {
  clearErrors();

  if (!emptyString(textInput().value) && !tooLong(textInput().value)) {
    textInput().value = textInput().value.trim();
    new Audio(buildUrl(textInput().value)).play();
  } else displayErrorMsg(textInput().value);
});

//wait to get it fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const containerHeight = appContainer().clientHeight;
  const docHeight = window.innerHeight; //height between top and bottom of viewport
  appContainer().style.marginTop = `${docHeight / 2 - containerHeight / 2}px`;
  textInput().addEventListener("keyup", listenerFn);
  textInput().addEventListener("paste", listenerFn);
});
