function nextVideo(v, vs) {
  pushUnpushButtons("next", []);
  setTimeout(() => {
    pushUnpushButtons("", ["next"]);
  }, 100);
  let currV = getId();
  let arrayId = [];
  let len = vs.length;

  currV++;
  if (currV >= len) {
    currV = 0;
  }
  v.src = vs[currV];
  for (let i = 0; i < len; i++) {
    if (currV != i) {
      arrayId.push(i);
    }
  }
  pushUnpushButtons(currV ? currV : "0", arrayId);
  pushUnpushButtons("play", []);
  v.play();
}

export default nextVideo;
