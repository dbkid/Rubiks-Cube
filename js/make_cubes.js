var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var selectMouse = new THREE.Vector2();
var mouse = new THREE.Vector2();

var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
// bigCube.rotation.x = Math.PI/4;
// bigCube.rotation.x = Math.PI/4;
scene.add( bigCube );

var xCrossSectionGeometry = new THREE.BoxGeometry(3,1,3);
var xCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
xCrossSectionGeometry.name = "xCrossSection"

var xCrossSection = new THREE.Mesh(xCrossSectionGeometry, xCrossSectionMaterial);
scene.add(xCrossSection);
xCrossSection.position.setY(-1);



// var xCrossSectionGeometry2 = new THREE.BoxGeometry(3,1,3);
// var xCrossSectionMaterial2 = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
// xCrossSectionGeometry2.name = "xCrossSection"
// var xCrossSection2 = new THREE.Mesh(xCrossSectionGeometry, xCrossSectionMaterial);
// scene.add(xCrossSection2);
// xCrossSection2.position.setY(0);
// //
// // var xCrossSectionGeometry3 = new THREE.BoxGeometry(3,1,3);
// // xCrossSectionGeometry3.name = "xCrossSection3"
// // var xCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
// var xCrossSection3 = new THREE.Mesh(xCrossSectionGeometry, xCrossSectionMaterial);
// scene.add(xCrossSection3);
// xCrossSection3.position.setY(1);

var yCrossSectionGeometry = new THREE.BoxGeometry(1,3,3);
yCrossSectionGeometry.name = "yCrossSection"
var yCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
var yCrossSection = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
scene.add(yCrossSection);
yCrossSection.position.setX(-1);
//
// var yCrossSection2 = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
// scene.add(yCrossSection2);
// yCrossSection2.position.setX(0);
//
// var yCrossSection3 = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
// scene.add(yCrossSection3);
// yCrossSection3.position.setX(1);

// var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
// zCrossSectionGeometry.name = "zCrossSection"
// var zCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
// var zCrossSection = new THREE.Mesh(zCrossSectionGeometry, zCrossSectionMaterial);
// scene.add(zCrossSection);
// zCrossSection.position.setZ(1);

var smallCubeGeometry = new THREE.BoxGeometry(1,1,1);
smallCubeGeometry.name = "smallCubeGeometry"
var smallCubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: false });
var smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
scene.add(smallCube);
// smallCube.position.setY(-1);
smallCube.position.setX(-1);

// bigCube.add(smallCube);
xCrossSection.add(smallCube);

// crossSection.add(bigCube);

camera.position.z = 5;
