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

  dialogueUI.style.display = "block";

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
  const resizeFactor = k.width() / k.height();
  // Portrait / narrow screens (mobile) keep a wider view so you see more of
  // the room; wide landscape screens (desktop) zoom in so sprites aren't tiny.
  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));
  } else {
    k.camScale(k.vec2(1.5));
  }
}
