
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

camera.position.z = 5;

// controls = new THREE.OrbitControls(camera, renderer.domElement);




// MAKE CUBES
var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { visible: false } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
scene.add( bigCube );

var crossSectionMaterial = new THREE.MeshBasicMaterial( {color: "black", visible: true });
// CrossSectionGeometry.name = "CrossSection"

// make crosssections
let crossSections = [];
// var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
// zCrossSectionGeometry.name = "zCrossSection";
var yCrossSectionGeometry = new THREE.BoxGeometry(1,3,3);
yCrossSectionGeometry.name = "yCrossSection";
var xCrossSectionGeometry = new THREE.BoxGeometry(3,1,3);
xCrossSectionGeometry.name = "xCrossSection";

let xCrossSections = [];
let yCrossSections = [];

for (var y = -1.5; y <= 0.5; y++) {
  let min = new THREE.Vector3(-1.5,y,-1.5)
  let max = new THREE.Vector3(1.5, y+1, 1.5)
  let newCrossSection = new THREE.Box3(min, max);
  xCrossSections.push(newCrossSection);
}
for (var x = -1.5; x <= 0.5; x++) {
  let min = new THREE.Vector3(x,-1.5,-1.5)
  let max = new THREE.Vector3(x+1, 1.5, 1.5)
  let newCrossSection = new THREE.Box3(min, max);
  yCrossSections.push(newCrossSection);
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
  cubeArray.forEach((cube) => {
    THREE.SceneUtils.detach( cube, cube.parent, scene );
  });
  scene.remove(pivot);

  // reset = false;

  // crossSections.forEach((crossSection) => {
  //   snap(crossSection);
  // }
// );

}

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );




// DRAG CROSS SECTIONS


let dragXCrossSection = function(obj){
  if(dragging===true){
    let xDelta = startX - mouse.x;
    if(xDelta < 0){
      obj.rotateY(.05);
      startX = mouse.x;
    }
    else if(xDelta > 0){
      obj.rotateY(-.05);
      startX = mouse.x;
    }
  }
  // if (obj.rotation.equals(bigCube.rotation) === false) {
  //   obj.rotation.set(0,0,0);
  // }
};

let startY = 0;
let dragYCrossSection = function(obj){
  let yDelta = startY - mouse.y;
  if(dragging===true){
    if(yDelta > 0){
      obj.rotateX(.05);
      startY = mouse.y;
    }
    else if(yDelta < 0){
      obj.rotateX(-.05);
      startY = mouse.y;
    }
  }
  // if (obj.rotation.equals(bigCube.rotation) === false) {
  //   obj.rotation.set(0,0,0);
  // }
};


// BOUNDARY BOXES

//
// let boundaryBoxX = new THREE.Box3();
// // boundaryBoxX.setFromObject(xCrossSection);
// let boundaryBoxY = new THREE.Box3();
// boundaryBoxY.setFromObject(yCrossSection);
let cubeBoundaryBox = new THREE.Box3();
// cubeBoundaryBox.setFromObject(smallCube);



// SELECT CUBES
//
// let reset = false;
// let ySwitched = false;
// let xSwitched = true;

// let selectCubesX = function(xCrossSection, test){
//   cubeArray.forEach( (cube) => {
//
//     boundaryBoxX.setFromObject(xCrossSection);
//     cubeBoundaryBox.setFromObject(cube);
//
//     if (boundaryBoxX.containsPoint(cubeBoundaryBox.getCenter()) === true){
//
//       // if (reset === false && ySwitched === true){
//         THREE.SceneUtils.detach( cube, cube.parent, scene );
//         THREE.SceneUtils.attach( cube, scene, xCrossSection );
//         cubeBoundaryBox.setFromObject(cube);
//         reset = true;
//         xSwitched = true;
//         ySwitched = false;
//       }
//     // }
//   });
// };

let boundaryBox = new THREE.Box3();

let selectCubes = function(crossSection, pivot){
  cubeArray.forEach( (cube) => {
    // boundaryBox.setFromObject(crossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (crossSection.containsPoint(cubeBoundaryBox.getCenter()) === true){

      // if (reset === false && xSwitched === true){

        // THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, pivot );
        cubeBoundaryBox.setFromObject(cube);

        // reset = true;
        // ySwitched = true;
        // xSwitched = false;
      // }
    }
  });
};


let pivot = null;
let positionY = null;
let positionX = null;
let positionZ = null;

let setPivot = function(crossSection){
  pivotGeometry = new THREE.BoxGeometry(Math.abs(crossSection.max.x - crossSection.min.x), Math.abs(crossSection.max.y - crossSection.min.y), Math.abs(crossSection.max.z - crossSection.min.z))
  pivot = new THREE.Mesh(pivotGeometry, crossSectionMaterial);

  positionY = crossSection.min.y + crossSection.max.y;
  positionX = crossSection.min.x + crossSection.max.x;
  positionZ = crossSection.min.z + crossSection.max.z;

  if (positionY === 0){
    pivot.position.setY(positionY);
  }
  else {
    pivot.position.setY(crossSection.min.y + .5);
  }
  if (positionX === 0){
    pivot.position.setX(positionX);
  }
  else {
    pivot.position.setX(crossSection.min.x + .5);
  }
  if (positionZ === 0){
    pivot.position.setZ(positionZ);
  }
  else {
    pivot.position.setZ(crossSection.min.z + .5);
  }
  scene.add(pivot);
  return pivot;
};

// SNAP

function snap(crossSection){
  if (crossSection.rotation.equals(bigCube.rotation) === false) {
    let distances = [Math.PI, Math.PI/2, Math.PI/3, 0];
    let axes = ["x","y","z"];
    let axis = null;
    axes.forEach((axis) => {
      if(crossSection.rotation.axis !== 0){
        axis = axis;
      }
    });
    let index = 0;
    let greatest = 0;
    let distance = 0;
    for (var i = 0; i < distances.length; i++) {
      let value = `crossSection.rotation.${axis}`;
      distance = Math.abs(distances[i] - eval(value));
      if (distances[i] >= greatest){
        greatest = distances[i];
        index = i;
      }
    }
    let order = axes.indexOf(axis);
    let angles = [0,0,0];
    angles[order] = distances[index];
    crossSection.rotation.set(angles[0], angles[1], angles[2]);
  };
}

// RENDER
let selected = null;

var render = function () {
  // controls.enableRotate = false;
  requestAnimationFrame( render );

  raycaster.setFromCamera( selectMouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  renderer.render(scene, camera);
  if (intersects.length !== 0){
  if ((Math.abs(selectStartX - mouse.x) < 5) || (Math.abs(selectStartY - mouse.y) < 5)){
    if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y))){
      selected = "xCrossSection";
    }
    // else if ((Math.abs(startY - mouse.y) > Math.abs(startX - mouse.x)) && Math.abs(startY - mouse.y) < 5){
    else{
      selected = "yCrossSection";
    };
    for (var i = 0; i < intersects.length; i++){
      if(selected === "xCrossSection"){
        if(xCrossSections.includes(intersects[i].object)){
          pivot = setPivot(intersects[i].object);
          selectCubes(intersects[i].object, pivot);
        };
      }
      else if(selected === "yCrossSection"){
        if(yCrossSections.includes(intersects[i].object)){
          pivot = setPivot(intersects[i].object);
          selectCubes(intersects[i].object, pivot);
        };
      }
    }
  };
  if (selected === "xCrossSection"){
    dragXCrossSection(pivot);
  }
  else {
    dragYCrossSection(pivot);
  }
}
  // if (intersects.length === 0){
  //   controls.enableRotate = true;
  // };
  // controls.update();
};

render();
