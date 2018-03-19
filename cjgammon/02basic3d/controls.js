const Rx = require('rxjs');
const $ = require('jquery');

let speed = .01;
let zoom = -1000;
let sceneRedColor = 210;
let sceneGreenColor = 210;
let sceneBlueColor = 210;
let objectWidth = 100;
let objectHeight = 100;
let objectDepth = 100;
let objectRedColor = 255;
let objectGreenColor = 0;
let objectBlueColor = 0;

const controls = {
  getSpeed: function() {
    return speed;
  },
  getZoom: function() {
    return zoom;
  },
  getSceneRedColor: function() {
    return decimalToHexString(parseInt(sceneRedColor));
  },
  getSceneGreenColor: function() {
    return decimalToHexString(parseInt(sceneGreenColor));
  },
  getSceneBlueColor: function() {
    return decimalToHexString(parseInt(sceneBlueColor));
  },
  getXScale: function() {
    return objectWidth/100;
  },
  getYScale: function() {
    return objectHeight/100;
  },
  getZScale: function() {
    return objectDepth/100;
  },
  getObjectRedColor: function() {
    return decimalToHexString(parseInt(objectRedColor));
  },
  getObjectGreenColor: function() {
    return decimalToHexString(parseInt(objectGreenColor));
  },
  getObjectBlueColor: function() {
    return decimalToHexString(parseInt(objectBlueColor));
  }

};

exports.controls = controls;

/* Utilities */

function decimalToHexString(number)
{
  let finalNumber = '';
  if (number < 0) {
    number = 0xFFFFFF + number + 1;
  }
  finalNumber = number.toString(16).toUpperCase();

  if (number < 16) {
    finalNumber = '0' + finalNumber;
  }

  return finalNumber;
}

/* Bootstrap Code - binds the inputs to the values. */

(function setupObjectWidthInput() {
  const objectWidthInput = document.getElementById('objectWidth');
  objectWidthInput.value = objectWidth;
  Rx.Observable.fromEvent(objectWidthInput, 'change').subscribe(
    function(event) {
      objectWidth = objectWidthInput.value;
    }
  );
})();

(function setupObjectHeightInput() {
  const objectHeightInput = document.getElementById('objectHeight');
  objectHeightInput.value = objectHeight;
  Rx.Observable.fromEvent(objectHeightInput, 'change').subscribe(
    function(event) {
      objectHeight = objectHeightInput.value;
    }
  );
})();

(function setupObjectDepthInput() {
  const objectDepthInput = document.getElementById('objectDepth');
  objectDepthInput.value = objectDepth;
  Rx.Observable.fromEvent(objectDepthInput, 'change').subscribe(
    function(event) {
      objectDepth = objectDepthInput.value;
    }
  );
})();

(function setupSceneRedInput() {
  const redInput = document.getElementById('redInput');
  redInput.value = sceneRedColor;
  Rx.Observable.fromEvent(redInput, 'change').subscribe(
    function(event) {
      sceneRedColor = redInput.value;
    }
  );
})();

(function setupSceneGreenInput() {
  const greenInput = document.getElementById('greenInput');
  greenInput.value = sceneGreenColor;
  Rx.Observable.fromEvent(greenInput, 'change').subscribe(
    function(event) {
      sceneGreenColor = greenInput.value;
    }
  );
})();

(function setupSceneBlueInput() {
  const blueInput = document.getElementById('blueInput');
  blueInput.value = sceneGreenColor;
  Rx.Observable.fromEvent(blueInput, 'change').subscribe(
    function(event) {
      sceneBlueColor = blueInput.value;
    }
  );
})();

(function setupObjectRedInput() {
  const redObjectInput = document.getElementById('objectRedInput');
  redObjectInput.value = objectRedColor;
  Rx.Observable.fromEvent(objectRedInput, 'change').subscribe(
    function(event) {
      objectRedColor = objectRedInput.value;
    }
  );
})();

(function setupObjectGreenInput() {
  const greenInput = document.getElementById('objectGreenInput');
  objectGreenInput.value = objectGreenColor;
  Rx.Observable.fromEvent(greenInput, 'change').subscribe(
    function(event) {
      objectGreenColor = greenInput.value;
    }
  );
})();

(function setupObjectBlueInput() {
  const blueInput = document.getElementById('objectBlueInput');
  objectBlueInput.value = objectBlueColor;
  Rx.Observable.fromEvent(blueInput, 'change').subscribe(
    function(event) {
      objectBlueColor = blueInput.value;
    }
  );
})();

(function setupSpeedInput() {
  const speedInput = document.getElementById('speedInput');
  speedInput.value = 10;
  Rx.Observable.fromEvent(speedInput, 'change').subscribe(
    function(event) {
      speed = event.target.value/100;
    }
  );
})();

(function setupZoomInput() {
  const zoomInput = document.getElementById('zoomInput');
  zoomInput.value = 10;
  Rx.Observable.fromEvent(zoomInput, 'change').subscribe(
    function(event) {
      zoom = event.target.value * -100;
    }
  );
})();




(function setUpMenuShowHide() {
  const hideMenuHandler = function(evt) {
    const attrTypeName = evt.target.attributes['attr-type'];
    $(evt.target).hide();
    $('.'+attrTypeName.value+'-row-attribute').hide();
    $('#'+attrTypeName.value+'Shower').show();
  }

  const showMenuHandler = function(evt) {
    const attrTypeName = evt.target.attributes['attr-type'];
    $(evt.target).hide();
    $('.'+attrTypeName.value+'-row-attribute').hide();
    $('.'+attrTypeName.value+'-row-attribute').show();
    $('#'+attrTypeName.value+'Hider').show();
  }

  Rx.Observable.fromEvent(controlsHider, 'click').subscribe(hideMenuHandler);
  Rx.Observable.fromEvent(sceneHider, 'click').subscribe(hideMenuHandler);
  Rx.Observable.fromEvent(objectHider, 'click').subscribe(hideMenuHandler);
  Rx.Observable.fromEvent(lightsHider, 'click').subscribe(hideMenuHandler);
  Rx.Observable.fromEvent(controlsShower, 'click').subscribe(showMenuHandler);
  Rx.Observable.fromEvent(sceneShower, 'click').subscribe(showMenuHandler);
  Rx.Observable.fromEvent(objectShower, 'click').subscribe(showMenuHandler);
  Rx.Observable.fromEvent(lightsShower, 'click').subscribe(showMenuHandler);
})();
