// создаём плейлист в виде DOM элементов
function setVideoDOM(data) {
  let box = document.getElementById("videoSelection");
  const len = data.length;
  for (let i = 0; i < len; i++) {
    let el = document.createElement("a");
    el.className = "videoSelection unSelected";
    el.setAttribute("id", `video${i}`);
    el.innerText = data[i].name;
    box.append(el);
  }
}

export default setVideoDOM;
