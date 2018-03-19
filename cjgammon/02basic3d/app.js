const THREE = require('three');
const Rx = require('rxjs');
const controls = require('./controls.js').controls;
const calcInterval = Rx.Observable.interval(100);
const rendererDefinition = {
  canvas: document.getElementById('myCanvas'),
  antialias: true
};

const camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 10000);
// camera.position(0,0,0);

const renderer = new THREE.WebGLRenderer(rendererDefinition);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x666666 );

const light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

const light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

const geometry = new THREE.CubeGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial({color:0xffcccc});
const mesh = new THREE.Mesh(geometry, material);
const group = new THREE.Group();
group.add(mesh);
scene.add(group);

  console.log(mesh.material.color);
  mesh.material.color.setHex( 0x00ff00 );
  console.log(mesh.material.color);

let controlsSettings = {};
controlsInfoParser();

function controlsInfoParser() {
  let sceneColor = '0x'
    + controls.getSceneRedColor()
    + controls.getSceneGreenColor()
    + controls.getSceneBlueColor();
  sceneColor = parseInt(sceneColor);
  const xRotationSpeed = controls.getSpeed();
  const yRotationSpeed = controls.getSpeed();
  const zRotationSpeed = controls.getSpeed();
  const xScale = controls.getXScale();
  const yScale = controls.getYScale();
  const zScale = controls.getZScale();
  let objectColor = '0x'
    + controls.getObjectRedColor()
    + controls.getObjectGreenColor()
    + controls.getObjectBlueColor();
  objectColor = parseInt(objectColor);

  const zoom = controls.getZoom();
  const background = new THREE.Color( sceneColor );
  controlsSettings = {
    sceneColor: sceneColor,
    xRotationSpeed: xRotationSpeed,
    yRotationSpeed: yRotationSpeed,
    zRotationSpeed: zRotationSpeed,
    background: background,
    zoom: zoom,
    xScale: xScale,
    yScale: yScale,
    zScale: zScale,
    objectColor: objectColor
  };
}

calcInterval.subscribe(controlsInfoParser);

function render() {
  mesh.material.color.setHex( controlsSettings.objectColor );
  scene.background = controlsSettings.background;
  group.rotation.x += controlsSettings.xRotationSpeed;
  group.rotation.y += controlsSettings.yRotationSpeed;
  group.position.set(0,0,controlsSettings.zoom);
  mesh.scale.x = controlsSettings.xScale;
  mesh.scale.y = controlsSettings.yScale;
  mesh.scale.z = controlsSettings.zScale;
  //mesh.material.color.setHex( 0xffffff );

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
