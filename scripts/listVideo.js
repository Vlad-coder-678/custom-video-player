// вешаем обработчики на кнопки с видео
function videoList() {
  var videoLinks = document.querySelectorAll("a.videoSelection");
  for (var i = 0; i < videoLinks.length; i++) {
    videoLinks[i].onclick = setVideo;
  }
}

export default videoList;
