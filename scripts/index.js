const videoPlayerData = [
  {
    id: 0,
    name: "Office - 1",
    src: "./assets/videos/Office - 1",
    duration: null,
  },
  {
    id: 1,
    name: "Office - 2",
    src: "./assets/videos/Office - 2",
    duration: null,
  },
  {
    id: 2,
    name: "Plexus",
    src: "./assets/videos/Plexus",
    duration: null,
  },
  {
    id: 3,
    name: "River",
    src: "./assets/videos/River",
    duration: null,
  },
];

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

// создаём плейлист в виде DOM элементов
function setVideoDOM(data) {
  let box = document.getElementById("videoSelection");
  const len = data.length;
  box.innerHTML = "";
  for (let i = 0; i < len; i++) {
    let el = document.createElement("a");
    el.className = "videoSelection unSelectedVideo videoItem";
    el.setAttribute("id", `video${i}`);
    el.innerText = data[i].name;
    box.append(el);
  }
}

// вешаем слушатели на кнопки управления видео
function controlListener(video, data) {
  document.getElementById("previous").onclick = () => {
    prevVideo(video, data);
  };
  document.getElementById("big_play").onclick = () => {
    playVideo(video);
  };
  document.getElementById("play").onclick = () => {
    playVideo(video);
  };
  document.getElementById("pause").onclick = () => {
    playVideo(video);
  };
  document.getElementById("next").onclick = () => {
    nextVideo(video, data);
  };
  document.getElementById("mute").onclick = () => {
    muteVideo(video);
  };
  document.getElementById("volume_bar").addEventListener("input", (e) => {
    volumeInit(Number(e.target.value) / 100, video);
  });
  document.getElementById("input_searcher").oninput = (e) => {
    console.log(e.target.value);
    valueSearcher = e.target.value;
    const len = valueSearcher.length;
    if (len >= 3 && len < 20) {
      setVideoDOM(searching(valueSearcher, data));
      videoList(video, searching(valueSearcher, data), 0);
      pushUnpushButtons("video0", []); // выбор первого видео
    } else {
      setVideoDOM(data);
      videoList(video, data, 0);
      pushUnpushButtons("video0", []); // выбор первого видео
    }
  };
  document.getElementById("fullScreen").onclick = () => {
    fullscreenVideo();
  };
}

// отработка полноэкранного режима
const fullscreenVideo = () => {
  const elem = document.getElementById("video");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
};

//  проверка нажата ли кнопка или нет
function isButtonPushed(id) {
  return (
    document.getElementById(id).getAttribute("class").indexOf("selected") !== -1
  );
}

// визуальная обработка нажатия кнопок
function pushUnpushButtons(idPush, arrIdUnpush) {
  if (idPush != "") {
    let anchor = document.getElementById(idPush);
    let theClass = anchor.getAttribute("class");
    if (theClass.indexOf("selected") === -1) {
      theClass = theClass.replace("unSelected", "selected");
      anchor.setAttribute("class", theClass);
    }
  }
  // в остальных элементах находим класс "selected" и убираем его
  let len = arrIdUnpush.length;
  if (arrIdUnpush[0] !== "") {
    for (let i = 0; i < len; i++) {
      anchor = document.getElementById(arrIdUnpush[i]);
      theClass = anchor.getAttribute("class");
      if (theClass.indexOf("selected") !== -1) {
        theClass = theClass.replace("selected", "unSelected");
        anchor.setAttribute("class", theClass);
      }
    }
  }
}

// для обработки нажатия на кнопку PREV
function prevVideo(v, vs) {
  let currV = getId() - 1; // текущий id
  let arrayId = [];
  let len = vs.length;
  if (currV < 0) {
    currV = len - 1;
  }
  v.src = vs[currV].src + getFormatExtension(v);
  for (let i = 0; i < len; i++) {
    if (currV != i) {
      arrayId.push(`video${i}`);
    }
  }
  pushUnpushButtons(currV ? `video${currV}` : "video0", arrayId);
  pushUnpushButtons("big_play", []);
  pushUnpushButtons("play", []);
  pushUnpushButtons("", ["pause"]);
  v.play();
}

// для обработки нажатия на кнопку PLAY
const playVideo = (v) => {
  if (!isButtonPushed("play" || "big_play")) {
    pushUnpushButtons("play", ["pause"]);
    pushUnpushButtons("big_play", [""]);
    v.play();
  } else {
    pushUnpushButtons("pause", ["play"]);
    pushUnpushButtons("", ["big_play"]);
    v.pause();
  }
};

// для обработки нажатия на кнопку NEXT
function nextVideo(v, vs) {
  let currV = getId() + 1; // текущий id
  let arrayId = [];
  let len = vs.length;
  if (currV >= len) {
    currV = 0;
  }
  v.src = vs[currV].src + getFormatExtension(v);
  for (let i = 0; i < len; i++) {
    if (currV != i) {
      arrayId.push(`video${i}`);
    }
  }
  pushUnpushButtons(currV ? `video${currV}` : "video0", arrayId);
  pushUnpushButtons("big_play", []);
  pushUnpushButtons("play", []);
  pushUnpushButtons("", ["pause"]);
  v.play();
}

// для обработки нажатия на кнопку MUTE
function muteVideo(v) {
  if (!isButtonPushed("mute")) {
    pushUnpushButtons("mute", []);
  } else {
    pushUnpushButtons("", ["mute"]);
  }
  v.muted = !v.muted;
}

// поиск текущего трека по ID
function getId() {
  const vids = document.querySelectorAll(".videoItem");
  const len = vids.length;
  for (let i = 0; i < len; i++) {
    if (vids[i].className.indexOf("selected") !== -1) {
      return i;
    }
  }
}

// функция обработки выбора видео
function setVideo(e, v, vs, id) {
  e.stopPropagation();
  let idEvent;
  if (e.type == "click") {
    idEvent = e.target.getAttribute("id");
    id = idEvent.replace("video", "");
  } else if (e.type == "ended") {
    id = Number(v.name) + 1;
    if (id >= vs.length) {
      id = 0;
    }
    idEvent = "video" + id;
  }
  v.name = id;
  v.src = vs[id].src + getFormatExtension(v);
  let arrayId = [];
  for (let i = 0; i < vs.length; i++) {
    if (idEvent != "video" + i) {
      arrayId.push("video" + i);
    }
  }
  pushUnpushButtons(idEvent, arrayId);
  pushUnpushButtons("play", ["pause"]);
  pushUnpushButtons("big_play", []);
  v.play();
}

// вешаем слушатели на события видео
function eventListener(v, vs, id) {
  v.addEventListener(
    "loadedmetadata",
    () => {
      if (vs[v.name].duration === null) {
        setMetaData(v, v.name, vs);
      }
    },
    false
  );
  v.addEventListener(
    "ended",
    (e) => {
      setVideo(e, v, vs, id);
    },
    false
  );
  v.addEventListener("error", errorHandler, false);
}

// при загрузке метаданных, выводим duration в дом
function setMetaData(v, id, vs) {
  if (v.duration > 0) {
    vs[id].duration = v.duration;
    var spanTime = document.createElement("span");
    var m = v.duration % 60;
    spanTime.innerText =
      Math.floor(v.duration / 60) + ":" + (m < 10 ? "0" : "") + Math.floor(m);
    spanTime.style.float = "right";
    document.getElementById(`video${id}`).append(spanTime);
  }
}

// вешаем обработчики на кнопки с видео
function videoList(v, vs, id) {
  let videoLinks = document.querySelectorAll("a.videoSelection");
  let len = videoLinks.length;
  for (let i = 0; i < len; i++) {
    videoLinks[i].onclick = (e) => {
      setVideo(e, v, vs, id);
    };
  }
}

// отлавливаем ошибки
function errorHandler() {
  var video = document.getElementByld("video");
  if (video.error) {
    video.poster = "./assets/images/technicaldifficulties.jpg";
    alert(video.error.code);
  }
}

// находим прогресс бар
const findProgressBar = (v) => {
  let progress_bar = document.getElementById("video_progress_bar");
  let duration;
  let currentTime;
  let position;
  v.addEventListener("loadedmetadata", () => {
    duration = v.duration;
  });
  v.addEventListener("timeupdate", () => {
    currentTime = v.currentTime;
    position = (currentTime * 100) / duration;
    progress_bar.style.backgroundImage = `linear-gradient(
      to right,
      #0075ff 0%,
      #0075ff ${position}%,
      #fff ${position}%,
      #fff 100%
  )`;
  });
  progress_bar.addEventListener("input", (e) => {
    v.currentTime = e.target.value * duration * 0.01;
  });
};

// отрисовка громкости звука браузера
function volumeInit(volume, video) {
  let volume_bar = document.getElementById("volume_bar");
  let currVolume = volume * 100;
  video.volume = volume;
  volume_bar.value = currVolume;
  volume_bar.style.background = `linear-gradient(
    to right,
    #0075ff 0%,
    #0075ff ${currVolume}%,
    #fff ${currVolume}%,
    #fff 100%
)`;
}

// для строки поиска
function searching(value, data) {
  let videos = [];
  let len = data.length;
  for (let i = 0; i < len; i++) {
    if (data[i].name.search(new RegExp(value, "i")) != -1) {
      videos.push(data[i]);
    }
  }
  return videos;
}

// вешаем слушатели на окно
const eventWindow = () => {
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "f":
        return fullscreenVideo();
      case "m":
        return muteVideo(video);
      case "p":
        return playVideo(video);
      case "Escape":
        return muteVideo(video);
      case " ":
        return playVideo(video);
      case "ArrowLeft":
        return slowerVideo(video);
      case "ArrowRight":
        return fasterVideo(video);
      case "ArrowUp":
        return louderVideo(video);
      case "ArrowDown":
        return quitVideo(video);
      case "l":
        return nextCadr(video);
      case "j":
        return prevCadr(video);
    }
  });
};

// перематываем на 10 сек назад
const nextCadr = (v) => {
  v.currentTime -= 10;
};

// перематываем на 10 сек вперёд
const prevCadr = (v) => {
  v.currentTime += 10;
};

// увеличиваем громкость
const louderVideo = (v) => {
  volumeInit(v.volume + 0.1 > 1 ? 1 : v.volume + 0.1, v);
};

// уменьшаем громкость
const quitVideo = (v) => {
  volumeInit(v.volume - 0.1 <= 0.1 ? 0 : v.volume - 0.1, v);
};

// замедляем видео
const slowerVideo = (v) => {
  v.playbackRate /= 1.1;
};

// ускоряем видео
const fasterVideo = (v) => {
  v.playbackRate *= 1.1;
};

window.onload = () => {
  const videos = videoPlayerData;
  let id = 0;
  let video = document.getElementById("video");
  let initVolume = 0.2;
  video.name = id;
  video.src = videos[id].src + getFormatExtension(video);
  video.load();

  setVideoDOM(videos); // создаём плейлист
  controlListener(video, videos); // вешаем обработчики на кнопки управления
  videoList(video, videos, id); // вешаем обработчики на кнопки с видео
  eventListener(video, videos, id); // вешаем слушатели на события видео
  eventWindow(); // вешаем слушатели на события окна
  setMetaData(video, id, videos); // при загрузке метаданных выводим их в дом
  findProgressBar(video); // работа с прогресс баром
  volumeInit(initVolume, video); // отрисовка громкости звука браузера

  pushUnpushButtons("video0", []); // выбор первого видео
  describeTask(); // описание проделанной работы
};

const describeTask = () => {
  console.log("Была проделанна следующая работа:");
  console.log(" - свёрстан видеоплеер по дизайну задания 'Музей'");
  console.log(" - повешаны обработчики на кнопки управления в консоли");
  console.log(" - повешаны слушатели на события видео");
  console.log(
    " - повешаны слушатели на окно, для отслеживания нажатия горячих клавиш"
  );
  console.log(
    " - в качестве дополнительных горячих клавиш выступают клавиши 'вверх', 'вниз' - для регулировки громкости; клавиши 'L', 'J' - для перемотки видео на 10 секунд назад/вперёд"
  );
  console.log(" - добавлен плейлист");
  console.log(" - добавлен поиск по плейлисту");
  console.log(
    "'River' - видео со звуком, добавлено для проверки звука, остальные видео без звука"
  );
};
