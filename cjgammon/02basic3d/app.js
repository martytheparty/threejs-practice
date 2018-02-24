const THREE = require('three');
const Rx = require('rxjs');
const zoomInput = document.getElementById('zoomInput');
const speedInput = document.getElementById('speedInput');
let currentSpeed = .01;
let cameraPosition = -1000;
speedInput.value = currentSpeed*100;
zoomInput.value = cameraPosition * -1 / 100;

Rx.Observable.fromEvent(zoomInput, 'change').subscribe(
  function(event) {
    cameraPosition = event.target.value * -100;
  }
);

Rx.Observable.fromEvent(speedInput, 'change').subscribe(
  function(event) {
    currentSpeed = event.target.value/100;
  }
);


console.log(Rx);

var renderer = new THREE.WebGLRenderer(
  {
    canvas: document.getElementById('myCanvas'),
    antialias: true
  }
);

renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 10000);
// camera.position(0,0,0);



var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x666666 );
var light = new THREE.AmbientLight(0xff0000, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xff0000, 0.5);
scene.add(light1);

var geometry = new THREE.CubeGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({color:0xffcccc});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0,0,cameraPosition);
scene.add(mesh);

function render() {
  mesh.rotation.x += currentSpeed;
  mesh.rotation.y += currentSpeed;
  mesh.position.set(0,0,cameraPosition);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
