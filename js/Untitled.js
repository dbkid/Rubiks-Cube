
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

camera.position.z = 5;

controls = new THREE.OrbitControls(camera, renderer.domElement);

let selectedCubes = [];


// MAKE CUBES
var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
scene.add( bigCube );

var crossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
// CrossSectionGeometry.name = "CrossSection"

// make crosssections
let crossSections = [];
var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
zCrossSectionGeometry.name = "zCrossSection";
var yCrossSectionGeometry = new THREE.BoxGeometry(1,3,3);
yCrossSectionGeometry.name = "yCrossSection";
var xCrossSectionGeometry = new THREE.BoxGeometry(3,1,3);
xCrossSectionGeometry.name = "xCrossSection";


for (var y = -1; y <= 1; y++) {
  let newCrossSection = new THREE.Mesh(xCrossSectionGeometry, crossSectionMaterial);
  newCrossSection.position.setY(y);
  scene.add(newCrossSection);
  crossSections.push(newCrossSection);
}
for (var x = -1; x <= 1; x++) {
  let newCrossSection = new THREE.Mesh(yCrossSectionGeometry, crossSectionMaterial);
  newCrossSection.position.setX(x);
  scene.add(newCrossSection);
  crossSections.push(newCrossSection);
}
// for (var z = -1; z <= 1; z++) {
//   let newCrossSection = new THREE.Mesh(zCrossSectionGeometry, crossSectionMaterial);
//   newCrossSection.position.setZ(z);
//   crossSections.push(newCrossSection);
// }

// make cubes
var smallCubeGeometry = new THREE.BoxGeometry(1,1,1);
smallCubeGeometry.name = "smallCubeGeometry"
var color = new THREE.Color().setRGB(1, 0, 0);
// smallCubeGeometry.faces[1].color.set(color);
// smallCubeGeometry.faces[2].color.set(color);
// smallCubeGeometry.faces[3].color.setHex(FFFF00);
// smallCubeGeometry.faces[4].color.setHex(FFFF00);
// smallCubeGeometry.faces[5].color.setHex(FFFF00);
// smallCubeGeometry.faces[6].color.setHex(FFFF00);

var smallCubeMaterials = [
    new THREE.MeshBasicMaterial({color:"orange"}),
    new THREE.MeshBasicMaterial({color:"green"}),
    new THREE.MeshBasicMaterial({color:"white"}),
    new THREE.MeshBasicMaterial({color:"blue"}),
    new THREE.MeshBasicMaterial({color:"red"}),
    new THREE.MeshBasicMaterial({color:"yellow"}),
    // new THREE.MeshBasicMaterial({color: "black", wireframe: true, wireframeLinewidth: 3})
];
// Create a MeshFaceMaterial, which allows the cube to have different materials on each face
var smallCubeMaterial = new THREE.MeshFaceMaterial(smallCubeMaterials);
// var smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
// var smallCube = new THREE.SceneUtils.createMultiMaterialObject( smallCubeGeometry, smallCubeMaterial );


// var smallCubeMaterial = new THREE.MeshBasicMaterial( { wireframe: true, color: 000000 });
// var smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);


let newCubes = [];
let cubeArray = [];
for (var i = 0; i < 27; i++) {
  newCubes.push(new THREE.Mesh(smallCubeGeometry, smallCubeMaterial));
  // newCubes.push(new THREE.SceneUtils.createMultiMaterialObject( smallCubeGeometry, smallCubeMaterial ));
}
  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
        for (var z = -1; z <= 1; z++) {
          let cube = newCubes.pop();
          cube.position.setX(x);
          cube.position.setY(y);
          cube.position.setZ(z);
          cubeArray.push(cube);

    }
  }
};
cubeArray.forEach((cube) =>scene.add(cube))



// MOUSE LISTENERS


let dragging = false;
let startX = 0;
let startY = 0;
let selectStartX = 0;
let selectStartY = 0;
var selectMouse = new THREE.Vector2();

function yesDragging(event){
  dragging = true;


  selectMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  selectMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  selectStartX = ( event.clientX / window.innerWidth ) * 2 - 1;
  selectStartY = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function noDragging(event){

  dragging = false;


}

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );




// DRAG CROSS SECTIONS

let rotateXCrossSection = function(obj, direction){
    if(direction === "positive"){
      obj.rotateY(Math.PI/2);
    }
    else if(direction === "negative"){
      obj.rotateY(-Math.PI/2);
    }
}

let rotateYCrossSection = function(obj, direction){
  if(direction === "positive"){
    obj.rotateX(Math.PI/2);
  }
  else if(direction === "negative"){
    obj.rotateX(-Math.PI/2);
  }
}

let rotateZCrossSection = function(obj){
  if(direction === "positive"){
    obj.rotateX(Math.PI/2);
  }
  else if(direction === "negative"){
    obj.rotateX(-Math.PI/2);
  }
};


// BOUNDARY BOXES


let boundaryBoxX = new THREE.Box3();
// boundaryBoxX.setFromObject(xCrossSection);
let boundaryBoxY = new THREE.Box3();
// boundaryBoxY.setFromObject(yCrossSection);
let boundaryBoxZ = new THREE.Box3();
let cubeBoundaryBox = new THREE.Box3();
// cubeBoundaryBox.setFromObject(smallCube);



// SELECT CUBES

let selectCubesX = function(xCrossSection){
  cubeArray.forEach( (cube) => {

    boundaryBoxX.setFromObject(xCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (boundaryBoxX.containsPoint(cubeBoundaryBox.getCenter()) === true){
        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, xCrossSection );
        cubeBoundaryBox.setFromObject(cube);
      }

  });
};


let selectCubesY = function(yCrossSection){
  cubeArray.forEach( (cube) => {
    boundaryBoxY.setFromObject(yCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (boundaryBoxY.containsPoint(cubeBoundaryBox.getCenter()) === true){

        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, yCrossSection );
        cubeBoundaryBox.setFromObject(cube);
    }
  });
};


let selectCubesZ = function(zCrossSection){
  cubeArray.forEach( (cube) => {
    boundaryBoxZ.setFromObject(zCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (boundaryBoxZ.containsPoint(cubeBoundaryBox.getCenter()) === true){

        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, zCrossSection );
        cubeBoundaryBox.setFromObject(cube);

    }
  });
};


// RENDER
let selected = null;
let intersects = null;
let direction = null;

var render = function () {
  controls.enableRotate = false;
  requestAnimationFrame( render );

  raycaster.setFromCamera( selectMouse, camera );

  if (dragging === true){
    var intersects = raycaster.intersectObjects( scene.children );
  }
  else {
    intersects = null;
  }

  renderer.render(scene, camera);
if (intersects !== null){
  for (var i = 0; i < intersects.length; i++) {

    if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y)) && (selectStartX - mouse.x) > 0 && (selectStartX - mouse.x) < 5){

      selected = "xCrossSection";
      direction = "positive";

    }
    else if ((Math.abs(selectStartY - mouse.y) > Math.abs(selectStartX - mouse.x)) && (selectStartY - mouse.y) > 0 && (selectStartY - mouse.y) < 5){
      selected = "yCrossSection";
      direction = "positive";

    }
    else if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y)) && (selectStartX - mouse.x) < 0 &&  (selectStartX - mouse.x) > -5){
      selected = "xCrossSection";
      direction = "negative";

    }
    else if ((Math.abs(selectStartY - mouse.y) > Math.abs(selectStartX - mouse.x)) && (selectStartY - mouse.y) < 0 && (selectStartY - mouse.y) > -5){
      selected = "yCrossSection";
      direction = "negative";

    }
  }
  for (var i = 0; i < intersects.length; i++){
    if( selected === "xCrossSection"){
      if(intersects[i].object.geometry.name === "xCrossSection"){

        selectCubesX(intersects[i].object);
        rotateXCrossSection(intersects[i].object, direction);
        selected = null;
        intersects = null;
      };
    }
    else if( selected === "yCrossSection"){
      if(intersects[i].object.geometry.name === "yCrossSection"){
        selectCubesY(intersects[i].object);
        rotateYCrossSection(intersects[i].object, direction);
        selected = null;
        intersects = null;
      };
    }
  }}
  intersects = null;
  selected = null;

  if (intersects === null || intersects.length === 0){
    controls.enableRotate = true;
  };
  controls.update();

};

render();
