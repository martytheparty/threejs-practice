var THREE = require('three');

var renderer = new THREE.WebGLRenderer(
  {
    canvas: document.getElementById('myCanvas'),
    antialias: true
  }
);

renderer.setSize(window.innerWidth, window.innerHeight);

var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
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
mesh.position.set(0,0,-1000);
scene.add(mesh);

function render() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
