
//Idea and Inspiration credit to John Conway, creator of the original Game of life.
var aliveMap = mapMaker(15);
var orig = mapMaker(15);
var neighborMap = mapMaker(15); 
var future = mapMaker(15);
var boardSize = 15;
// blackBox image credit - https://www.vecteezy.com/png/1209957-square
var blackBox = "https://static.vecteezy.com/system/resources/previews/001/209/957/large_2x/square-png.png";
// whiteBox image credit - https://www.iconsdb.com/white-icons/square-icon.html
var whiteBox = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEX8/vz///8pKikAAAAtLS2Oj47hKWeDAAABEElEQVR4nO3PBxEDMRAAMZcLf8p5GuuRGGjdO+dhc9f97afNmr1ets86hm2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2GfYZ9hn2Gfd9w9ttm3Tkvm/sHIDIKk6RLvD4AAAAASUVORK5CYII=";


onEvent("gliderBtn", "click", function() {
  setImageURL("image(3,2)", blackBox);
  setImageURL("image(3,3)", blackBox);
  setImageURL("image(3,4)", blackBox);
  setImageURL("image(2,4)", blackBox);
  setImageURL("image(1,3)", blackBox);
});

onEvent("pentaBtn", "click", function() {
  setImageURL("image(3,7)", blackBox);
  setImageURL("image(4,7)", blackBox);
  setImageURL("image(5,6)", blackBox);
  setImageURL("image(5,8)", blackBox);
  setImageURL("image(6,7)", blackBox);
  setImageURL("image(7,7)", blackBox);
  setImageURL("image(8,7)", blackBox);
  setImageURL("image(9,7)", blackBox);
  setImageURL("image(10,6)", blackBox);
  setImageURL("image(10,8)", blackBox);
  setImageURL("image(11,7)", blackBox);
  setImageURL("image(12,7)", blackBox);
});

onEvent("clearBoardBtn", "click", function () {
    clearBoard();
  });
onEvent("nextScreenBtn", "click", function() {
  setScreen("screen2");
});
onEvent("randomBtn", "click", function () {
     clearBoard();
   for (var i = 0; i < boardSize; i++) {
     for (var j = 0;j < boardSize; j++) {
       var chance = Math.random();
       if (chance <= 0.30) {
         setImageURL("image(" + i + "," + j + ")",blackBox);
       }
     }
  }
   updateMap(aliveMap);
});

 var timing;
onEvent("startBtn", "click", function  () {
  updater();
  if (!timing) {
  timing = setInterval(updater, 500);
  }
});

onEvent("resetBtn", "click", function () {
  clearInterval(timing);
  timing = null;
});


function checkNeighbors() {
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
       neighborMap[i][j] = neighborCounter(i,j);
    }
  }
}

function neighborCounter(i,j) {
   var neighborCount = 0;
      for (var m = -1; m < 2; m++) {
        for (var n = -1;n < 2; n++) {
          if ((i + m >= 0 && i + m <= 14) && 
          (j + n >= 0 && j + n <= 14) && 
          (m != 0 || n != 0)) {
            if (aliveMap[i + m][j + n] == 1) {
              neighborCount++;
            }
          }
        }
      }
  return neighborCount;
}

function updater() {
   updateMap(aliveMap);
  if (!arraysEqual2D(orig, aliveMap)) {
    updateMap(aliveMap);
    checkNeighbors();
    for (var i = 0; i < boardSize; i++) {
      for (var j = 0; j < boardSize; j++) {
        futureCalc(i,j);
      }
    }
    updateBoard(future);
  } else {
    return;
  }
}

function futureCalc(i,j) {
 var neighbors = neighborMap[i][j];
  if (aliveMap[i][j] == 1) {
    if (neighbors < 2)  {
      future[i][j] = 0;
    } else if (neighbors > 3) {
      future[i][j] = 0;
    } else {
      future[i][j] = 1;
    }
  } else {
    if (neighbors == 3) {
      future[i][j] = 1;
    } else {
      future[i][j] = 0;
    }
  }
}
 
function clearBoard() {
   setScreen("screen2");
   for (var i = 0; i < boardSize; i++) {
     for (var j = 0; j < boardSize; j++) {
       setImageURL("image(" + i + "," + j + ")", whiteBox);
     }
   }
}

function updateMap(map) {
  for (var i = 0; i < boardSize; i++) {
     for (var j = 0; j < boardSize; j++) {
       if (getImageURL("image(" + i + "," + j + ")") == blackBox) {
         map[i][j] = 1;
       } else {
         map[i][j] = 0;
      }
    }
  }
}

function arraysEqual2D(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
     for (var j = 0; j < arr1[i].length; j++) {
       if (arr1[i][j] != arr2[i][j]) {
         return false;
       }
    }
  }
  return true;
}

function mapMaker(size) {
var temp = new Array(size);
  for (var i = 0; i < size; i++) {
    temp[i] = new Array(size);
  for (var j = 0; j < size; j++) {
    temp[i][j] = 0;
    }
  }
  return temp;
}

function updateBoard(map) {
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      if (map[i][j] == 1) {
        setImageURL("image(" + i + "," + j + ")", blackBox);
      } else if (map[i][j] == 0) {
        setImageURL("image(" + i + "," + j + ")", whiteBox);
      }
    }
  }
}

