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
  for (let i = 0; i < len; i++) {
    let el = document.createElement("a");
    el.className = "videoSelection unSelectedVideo videoItem";
    el.setAttribute("id", `video${i}`);
    el.innerText = data[i].name;
    box.append(el);
  }
}

function controlListener(video, data) {
  // let id = event.target.getAttribute("id");
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

  // document.getElementById("video_progress_bar").onclick = currentTimeInit(
  //   Number(event.offsetX)
  // );
  // document.getElementById("volume").onclick = () => {
  // volumeInit(Number(event.offsetX) / 100);
  // };

  // document.getElementById("input_searcher").oninput = () => {
  //   valueSearcher = event.target.value;
  //   if (valueSearcher.length >= 3 && valueSearcher.length <= 20) {
  //     setVideoInDom(searching(valueSearcher));
  //     durationInit();
  //   } else {
  //     audios = audiosArray;
  //     setVideoInDom(audios);
  //     durationInit();
  //   }
  // };
}

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
  // v.addEventListener("error", errorHandler, false);
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
    console.log(document.getElementById(`video${id}`));
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

window.onload = () => {
  const videos = videoPlayerData;
  let id = 0;
  let video = document.getElementById("video");
  video.name = id;
  video.src = videos[id].src + getFormatExtension(video);
  video.load();

  setVideoDOM(videos); // создаём плейлист
  controlListener(video, videos); // вешаем обработчики на кнопки управления
  videoList(video, videos, id); // вешаем обработчики на кнопки с видео
  eventListener(video, videos, id); // вешаем слушатели на события видео
  setMetaData(video, id, videos); // при загрузке метаданных выводим их в дом

  pushUnpushButtons("video0", []);

  // находим прогрес бар и считываем value
  // let progress = document.getElementByld("video_progress_bar");
  // progress.addEventListener("input", function () {
  //   const value = this.value;
  //   this.style.border = `1px solid red`;
  //   this.style.background = `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${value}%, #fff ${value}%, white 100%)`;
  // });
};
