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
let ambientLightRed = 255;
let ambientLightGreen = 0;
let ambientLightBlue = 255;
let ambientIntensity = 80;

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
  },
  getAmbientRedColor: function() {
    return decimalToHexString(parseInt(ambientLightRed));
  },
  getAmbientGreenColor: function() {
    return decimalToHexString(parseInt(ambientLightGreen));
  },
  getAmbientBlueColor: function() {
    return decimalToHexString(parseInt(ambientLightBlue));
  },
  getAmbientIntensity: function() {
    return ambientIntensity;
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
  const objectInput = document.querySelector('threejs-control');
  Rx.Observable.fromEvent(objectInput, 'change').subscribe(
    function(event) {
      objectWidth = objectInput.objectWidth*4;
      objectHeight = objectInput.objectHeight*4;
      objectDepth = objectInput.objectDepth*4;
      sceneRedColor = objectInput.sceneRedColor;
      sceneGreenColor = objectInput.sceneGreenColor;
      sceneBlueColor = objectInput.sceneBlueColor;
      objectRedColor = objectInput.objectRed;
      objectBlueColor = objectInput.objectBlue;
      objectGreenColor = objectInput.objectGreen;
      speed = objectInput.speed/100;
      zoom = objectInput.zoom*-100;
      ambientLightRed = objectInput.ambientRed;
      ambientLightGreen = objectInput.ambientGreen;
      ambientLightBlue = objectInput.ambientBlue;
      ambientIntensity = objectInput.ambientIntensity;
    }
  );
})();



(function setupAbientInputs() {
  const redInput = document.getElementById('lightAmbientRed');
  const greenInput = document.getElementById('lightAmbientGreen');
  const blueInput = document.getElementById('lightAmbientBlue');
  const lightAmbientInput = document.getElementById('lightAmbientIntensity');
  redInput.value = ambientLightRed;
  blueInput.value = ambientLightBlue;
  greenInput.value = ambientLightGreen;
  lightAmbientInput.value = ambientIntensity;
  Rx.Observable.fromEvent(redInput, 'change').subscribe(
    function(event) {
      ambientLightRed = event.target.value;
    }
  );

  Rx.Observable.fromEvent(greenInput, 'change').subscribe(
    function(event) {
      ambientLightGreen = event.target.value;
    }
  );

  Rx.Observable.fromEvent(blueInput, 'change').subscribe(
    function(event) {
      ambientLightBlue = event.target.value;
    }
  );

  Rx.Observable.fromEvent(lightAmbientInput, 'change').subscribe(
    function(event) {
      ambientIntensity = event.target.value;
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
