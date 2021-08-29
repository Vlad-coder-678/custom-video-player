// вешаем слушатели на события видео
function eventListener() {
  video.addEventListener(
    "loadedmetadata",
    () => {
      if (videos[id].duration == null) {
        setMetadata();
      }
    },
    false
  );
  video.addEventListener("ended", setVideo, false);
  // video.addEventListener("play", processFrame, false);
  video.addEventListener("error", errorHandler, false);
}

export default eventListener;
