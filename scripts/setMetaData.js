// при загрузке метаданных, выводим duration в дом
function setMetaData() {
  videos[id].duration = video.duration;
  var spanTime = document.createElement("span");
  var m = videos[id].duration % 60;
  spanTime.innerText =
    Math.floor(videos[id].duration / 60) +
    ":" +
    (m < 10 ? "0" : "") +
    Math.floor(m);
  spanTime.style.float = "right";
  document.getElementById("video" + id).append(spanTime);
}

export default setMetaData;
