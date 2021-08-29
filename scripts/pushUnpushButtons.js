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

export default pushUnpushButtons;
