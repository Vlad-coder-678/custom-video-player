// для обработки нажатия на кнопку MUTE
function muteVideo() {
  if (!isButtonPushed("mute")) {
    pushUnpushButtons("mute", []);
  } else {
    pushUnpushButtons("", ["mute"]);
  }
  video.muted = !video.muted;
}

export default muteVideo;
