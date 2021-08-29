// вешаем обработчики на кнопки управления
function controlListener(video, data) {
  // var id = event.target.getAttribute("id");
  document.getElementById("previous").onclick = prevVideo(video, data);
  document.getElementById("play").onclick = playVideo;
  document.getElementById("pause").onclick = playVideo;
  document.getElementById("next").onclick = nextVideo(video, data);
  document.getElementById("mute").onclick = muteVideo(video);

  document.getElementById("video_progress_bar").onclick = currentTimeInit(
    Number(event.offsetX)
  );
  document.getElementById("volume").onclick = () => {
    // volumeInit(Number(event.offsetX) / 100);
  };

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
function pushUnpushButtons(classPush, arrClassUnpush) {
  if (classPush != "") {
    var anchor = document.getElementById(classPush);
    var theClass = anchor.getAttribute("class");
    if (theClass.indexOf("selected") === -1) {
      theClass = theClass.replace("unSelected", "selected");
      anchor.setAttribute("class", theClass);
    }
  }
  // в остальных элементах находим класс "selected" и убираем его
  for (var i = 0; i < arrClassUnpush.length; i++) {
    anchor = document.getElementById(arrClassUnpush[i]);
    theClass = anchor.getAttribute("class");
    if (theClass.indexOf("selected") !== -1) {
      theClass = theClass.replace("selected", "unSelected");
      anchor.setAttribute("class", theClass);
    }
  }
}

function prevVideo(v, vs) {
  pushUnpushButtons("next", []);
  setTimeout(() => {
    pushUnpushButtons("", ["next"]);
  }, 100);
  let currV = getId();
  let arrayId = [];
  let len = vs.length;

  currV++;
  if (currV >= len) {
    currV = 0;
  }
  v.src = vs[currV];
  for (let i = 0; i < len; i++) {
    if (currV != i) {
      arrayId.push(i);
    }
  }
  pushUnpushButtons(currV ? currV : "0", arrayId);
  pushUnpushButtons("play", []);
  v.play();
}

const playVideo = () => {
  // if (video.ended) {
  //   video.load();
  // }
  if (!isButtonPushed("play")) {
    pushUnpushButtons("play", ["pause"]);
    video.play();
  } else {
    pushUnpushButtons("pause", ["play"]);
    video.pause();
  }
};

function nextVideo(v, vs) {
  pushUnpushButtons("next", []);
  setTimeout(() => {
    pushUnpushButtons("", ["next"]);
  }, 100);
  let currV = getId();
  let arrayId = [];
  let len = vs.length;

  currV++;
  if (currV >= len) {
    currV = 0;
  }
  v.src = vs[currV];
  for (let i = 0; i < len; i++) {
    if (currV != i) {
      arrayId.push(i);
    }
  }
  pushUnpushButtons(currV ? currV : "0", arrayId);
  pushUnpushButtons("play", []);
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

export default controlListener;
