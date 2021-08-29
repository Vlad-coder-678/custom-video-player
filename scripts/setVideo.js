// функция обработки выбора видео
function setVideo(event) {
  var video = document.getElementById("video");
  var idEvent;
  if (event.type == "click") {
    idEvent = event.target.getAttribute("id");
    id = idEvent.replace("video", "");
  } else if (event.type == "ended") {
    id = Number(video.name) + 1;
    if (id >= videos.length) {
      id = 0;
    }
    idEvent = "video" + id;
  }
  video.name = id;
  video.src = videos[id].src + getFormatExtension();
  var arrayId = [];
  for (var i = 0; i < videos.length; i++) {
    if (idEvent != "video" + i) {
      arrayId.push("video" + i);
    }
  }
  pushUnpushButtons(idEvent, arrayId);
  pushUnpushButtons("play", ["pause"]);
  video.play();
}

export default setVideo;
