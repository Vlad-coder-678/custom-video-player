function prevVideo() {
  pushUnpushButtons("next", []);
  setTimeout(() => {
    pushUnpushButtons("", ["next"]);
  }, 100);
  let currentVideo = getId();
  let arrayId = [];

  currentVideo++;
  if (currentAudio >= videos.length) {
    currentVideo = 0;
  }
  video.src = videos[currentVideo];
  for (let i = 0; i < videos.length; i++) {
    if (currentVideo != i) {
      arrayId.push(i);
    }
  }
  pushUnpushButtons(currentVideo ? currentVideo : "0", arrayId);
  pushUnpushButtons("play", []);
  video.play();
}

export default prevVideo;
