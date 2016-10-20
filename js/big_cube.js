
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );


var bigCubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
// bigCube.rotation.x = Math.PI/4;
// bigCube.rotation.x = Math.PI/4;
scene.add( bigCube );

var crossSectionGeometry = new THREE.BoxGeometry(4,1,4);
var crossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: false });
var crossSection = new THREE.Mesh(crossSectionGeometry, crossSectionMaterial);
scene.add(crossSection);
crossSection.position.setY(-1.5);


bigCube.add(crossSection);

camera.position.z = 5;


let dragging = false;
$(renderer.domElement).on("mousedown", function(e){
  dragging = true;
  $(renderer.domElement).on("mousemove", function(e){
    if(dragging === true){
      crossSection.rotateY(.01);}
    });
});

$(renderer.domElement).on("mouseup", function(e){
  dragging = false;
});

// controls = new THREE.OrbitControls(camera, renderer.domElement);

// var mouse = new THREE.Vector2();
// var offset = new THREE.Vector3( 10, 10, 10 );

// controls.addEventListener( 'change', render );

// var rotate = function(e){
//   e.preventDefault();
//
//   cube.matrix.makeRotationFromQuaternion(quaternion);
// }

//



var render = function () {
  requestAnimationFrame( render );

  renderer.render(scene, camera);

  // controls.update();

};


// cube.matrixAutoUpdate = false;
// cube.rotation.x += e.clientX;
// cube.rotation.y += e.clientY;

var oldX = 0;
var oldY = 0;

// var onMouseDown = function(e){
//   e.preventDefault();
//   mouse = new THREE.Vector2(e.clientX, e.clientY);
//   var changeQuaternion = new THREE.Quaternion(mouse.x - oldX, mouse.y - oldY);
//   cube.quaternion.multiplyQuaternions(changeQuaternion, cube.quarternion);
//   oldX = mouse.x;
//   oldY = mouse.y;
//
// }



render();
