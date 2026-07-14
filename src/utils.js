// Split a string into "tokens" so the typewriter effect reveals full HTML
// tags (e.g. <a href="...">) atomically instead of one raw character at a
// time, and stays safe with multi-codepoint characters like emojis.
function tokenize(str) {
  const chars = Array.from(str);
  const tokens = [];
  let i = 0;
  while (i < chars.length) {
    if (chars[i] === "<") {
      let tag = "";
      while (i < chars.length && chars[i] !== ">") {
        tag += chars[i];
        i++;
      }
      if (i < chars.length) {
        tag += chars[i]; // include the closing ">"
        i++;
      }
      tokens.push(tag);
    } else {
      tokens.push(chars[i]);
      i++;
    }
  }
  return tokens;
}

export function displayDialogue(text, onDisplayEnd) {
  const dialogueUI = document.getElementById("textbox-container");
  const dialogue = document.getElementById("dialogue");
  const closeBtn = document.getElementById("close");
  const touchControls = document.getElementById("touch-controls");

  dialogueUI.style.display = "block";
  // Hide the on-screen D-pad while reading so it can't overlap the Close button.
  if (touchControls) touchControls.style.display = "none";

  const tokens = tokenize(text);
  let index = 0;
  let isTyping = true;

  function finishTyping() {
    dialogue.innerHTML = text;
    index = tokens.length;
    isTyping = false;
    clearInterval(intervalRef);
  }

  const intervalRef = setInterval(() => {
    if (index < tokens.length) {
      dialogue.innerHTML = tokens.slice(0, index + 1).join("");
      index++;
      return;
    }
    isTyping = false;
    clearInterval(intervalRef);
  }, 40);

  function onKeyPress(e) {
    if (e.code !== "Enter") return;
    // First Enter completes the text instantly; a second one closes.
    if (isTyping) {
      finishTyping();
    } else {
      closeBtn.click();
    }
  }

  // Clicking the dialogue box skips the typewriter animation.
  function onDialogueClick() {
    if (isTyping) finishTyping();
  }

  function onCloseBtnClick() {
    onDisplayEnd();
    dialogueUI.style.display = "none";
    // Restore the D-pad (back to its stylesheet value: grid on touch, none on desktop).
    if (touchControls) touchControls.style.display = "";
    dialogue.innerHTML = "";
    clearInterval(intervalRef);
    closeBtn.removeEventListener("click", onCloseBtnClick);
    dialogue.removeEventListener("click", onDialogueClick);
    removeEventListener("keypress", onKeyPress);
  }

  closeBtn.addEventListener("click", onCloseBtnClick);
  dialogue.addEventListener("click", onDialogueClick);
  addEventListener("keypress", onKeyPress);
}

export function setCamScale(k) {
  // Use the real viewport size (CSS px) to adapt the zoom to the device.
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (w >= h) {
    // Landscape / desktop: a fixed comfortable zoom so sprites aren't tiny.
    k.camScale(k.vec2(1.5));
    return;
  }

  // Portrait: phones sit around a comfortable ~1.2 (not too close, not too
  // far); only larger portrait screens (tablets) zoom in further. The gentle
  // ramp keeps the character readable without cramping the view on wide phones.
  const scale = Math.min(Math.max(w / 460, 1.2), 1.5);
  k.camScale(k.vec2(scale));
}
