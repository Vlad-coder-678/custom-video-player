// определяем поддерживаемый формат видео браузером и предагаем использовать видео в данном формате
function getFormatExtension(v) {
  if (v.canPlayType("video/mp4") != "") {
    return ".mp4";
  } else if (v.canPlayType("video/webm") != "") {
    return ".webm";
  } else if (v.canPlayType("video/ogg") != "") {
    return ".ogg";
  } else {
    return "Your browser doesn't support HTML5 video tag.";
  }
}

export default getFormatExtension;
