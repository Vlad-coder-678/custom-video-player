// отлавливание ошибок
function errorHandler() {
  var video = document.getElementByld("video");
  if (video.error) {
    video.poster = "./assets/images/technicaldifficulties.jpg";
    alert(video.error.code);
  }
}

export default errorHandler;
