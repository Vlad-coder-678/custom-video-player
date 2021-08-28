window.onload = () => {
  let videos = [
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

  let id = 0;
  var video = document.getElementById("video");
  video.name = id;
  video.src = videos[id].src + getFormatExtension();
  video.load();

  setVideoInDom();
  addListenerOnControlButton(); // вешаем обработчики на кнопки управления
  addListenerOnVideoButton(); // вешаем обработчики на кнопки с видео
  addListenerVideoEvent(); // вешаем слушатели на события видео

  pushUnpushButtons("video0", []);

  // вешаем обработчики на кнопки управления
  function addListenerOnControlButton() {
    var controlLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlLinks.length; i++) {
      controlLinks[i].onclick = handeControl;
    }
  }

  // вешаем обработчики на кнопки с видео
  function addListenerOnVideoButton() {
    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++) {
      videoLinks[i].onclick = setVideo;
    }
  }

  // вешаем слушатели на события видео
  function addListenerVideoEvent() {
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

  // определяем поддерживаемый формат видео браузером и предагаем использовать видео в данном формате
  function getFormatExtension() {
    if (video.canPlayType("video/mp4") != "") {
      return ".mp4";
    } else if (video.canPlayType("video/webm") != "") {
      return ".webm";
    } else if (video.canPlayType("video/ogg") != "") {
      return ".ogg";
    } else {
      return "Your browser doesn't support HTML5 video tag.";
    }
  }

  // добавляем обработчики событий нажатия клавиш на панели управления
  function handeControl(event) {
    var id = event.target.getAttribute("id");
    var video = document.getElementById("video");
    if (id == "play") {
      pushUnpushButtons("play", ["pause"]);
      if (video.ended) {
        video.load();
      }
      video.play();
    } else if (id == "pause") {
      pushUnpushButtons("pause", ["play"]);
      video.pause();
    } else if (id == "loop") {
      if (!isButtonPushed("loop")) {
        pushUnpushButtons("loop", []);
        video.loop = true;
      } else {
        pushUnpushButtons("", ["loop"]);
        video.loop = false;
      }
    } else if (id == "mute") {
      if (!isButtonPushed("mute")) {
        pushUnpushButtons("mute", []);
        video.muted = true;
      } else {
        pushUnpushButtons("", ["mute"]);
        video.muted = false;
      }
    }
  }

  // визуальная обработка нажатия кнопок
  function pushUnpushButtons(idToPush, idArrayToUnpush) {
    if (idToPush != "") {
      var anchor = document.getElementById(idToPush);
      var theClass = anchor.getAttribute("class");
      if (theClass.indexOf("selected") === -1) {
        theClass = theClass.replace("unSelected", "selected");
        anchor.setAttribute("class", theClass);
      }
    }
    // в остальных элементах находим класс "selected" и убираем его
    for (var i = 0; i < idArrayToUnpush.length; i++) {
      anchor = document.getElementById(idArrayToUnpush[i]);
      theClass = anchor.getAttribute("class");
      if (theClass.indexOf("selected") !== -1) {
        theClass = theClass.replace("selected", "unSelected");
        anchor.setAttribute("class", theClass);
      }
    }
  }

  // проверка нажата ли кнопка или нет
  function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");

    if (theClass.indexOf("selected") !== -1) {
      return true;
    } else {
      return false;
    }
  }

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

  // создаём плейлист в виде DOM элементов
  function setVideoInDom() {
    var boxVideo = document.getElementById("videoSelection");
    for (var i = 0; i < videos.length; i++) {
      var aElement = document.createElement("a");
      aElement.className = "videoSelection unSelectedVideo";
      aElement.setAttribute("id", "video" + i);
      aElement.innerText = videos[i].name;
      boxVideo.append(aElement);
    }
  }

  // при загрузке метаданных, выводим duration в дом
  function setMetadata() {
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
    console.log(m);
  }

  // отлавливание ошибок
  function errorHandler() {
    var video = document.getElementByld("video");
    if (video.error) {
      video.poster = "./assets/image/technicaldifficulties.jpg";
      alert(video.error.code);
    }
  }
};
