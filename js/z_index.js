
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// var axisHelper = new THREE.AxisHelper( 5 );
// scene.add( axisHelper );

camera.position.z = 5;

controls = new THREE.OrbitControls(camera, renderer.domElement);

let selectedCubes = [];


// MAKE CUBES
var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
scene.add( bigCube );

var crossSectionMaterial = new THREE.MeshBasicMaterial( {color: "black", wireframe: true });
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
for (var z = -1; z <= 1; z++) {
  let newCrossSection = new THREE.Mesh(zCrossSectionGeometry, crossSectionMaterial);
  newCrossSection.position.setZ(z);
  crossSections.push(newCrossSection);
}

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


function pick(intersects, yComponent, xComponent){
    for (var i = 0; i < intersects.length; i++){
      if (xComponent >= yComponent && intersects[i].object.geometry.name === "xCrossSection" && intersects[i].object.position.y !== intersects[i].face.normal.y){
        selected = "xCrossSection";
        selectCubesX(intersects[i].object);
      }
      else if (yComponent > xComponent && intersects[i].object.geometry.name === "yCrossSection" && intersects[i].object.position.x !== intersects[i].face.normal.x){
        selected = "yCrossSection";
        selectCubesY(intersects[i].object);
      }
      else if (intersects[i].object.geometry.name === "zCrossSection" && intersects[i].object.position.z !== intersects[i].face.normal.z){
        selected = "zCrossSection";
        selectCubesZ(intersects[i].object);
      };
    }
}


function noDragging(event){
  dragging = false;
  needToPick = true;
  selected = null;
  controls.enableRotate = false;
}


// SNAP FUNCTIONS

function snapX(crossSection){
    if (crossSection.rotation.equals(bigCube.rotation) === false) {
      let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
      let index = null;
      let least = 100;
      let distance = null;
      for (var i = 0; i < distances.length; i++) {
        distance = crossSection.rotation.y - distances[i];
        if (Math.abs(distance) <= Math.abs(least)){
          least = distance;
          index = i;
        };

      }
      if (crossSection.rotation.z === -Math.PI && index === 3){
        crossSection.rotation.set(crossSection.rotation.x,Math.PI, crossSection.rotation.z)
      } else {
        crossSection.rotation.set(crossSection.rotation.x,distances[index],crossSection.rotation.z);
      }

    };
  }

  function snapY(crossSection){
    if (crossSection.rotation.equals(bigCube.rotation) === false) {
      distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
      index = null;
      least = 100;
      distance = null;
      for (var i = 0; i < distances.length; i++) {
        distance = crossSection.rotation.x - distances[i];
        console.log(distances[i], distance)
        if (Math.abs(distance) <= Math.abs(least)){
          least = distance;
          index = i;
        };
      }
        crossSection.rotation.set(distances[index],crossSection.rotation.y,crossSection.rotation.z);
      }
  }

// ADD EVENT LISTENERS

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );




// DRAG CROSS SECTIONS

let rotateAxis = new THREE.Vector3();
let dragXCrossSection = function(obj){
  rotateAxis = new THREE.Vector3(0,1,0);
  if(dragging===true){
    let xDelta = startX - mouse.x;
    if(xDelta < 0){
      obj.rotateOnAxis(rotateAxis, .05);
      startX = mouse.x;
    }
    else if(xDelta > 0){
      obj.rotateOnAxis(rotateAxis,-.05);
      startX = mouse.x;
    }
  }
  if(dragging===false){
    snapX(obj)
  }
  // if (obj.rotation.equals(bigCube.rotation) === false) {
  //   obj.rotation.set(0,0,0);
  // }
};

let startY = 0;
let dragYCrossSection = function(obj){
  rotateAxis = new THREE.Vector3(1,0,0);
  let yDelta = startY - mouse.y;
  if(dragging===true){
    if(yDelta > 0){
      obj.rotateOnAxis(rotateAxis, .05);
      startY = mouse.y;
    }
    else if(yDelta < 0){
      obj.rotateOnAxis(rotateAxis,-.05);
      startY = mouse.y;
    }
  }
  if(dragging===false){
    snapY(obj)
  }
  // if (obj.rotation.equals(bigCube.rotation) === false) {
  //   obj.rotation.set(0,0,0);
  // }
};

let dragZCrossSection = function(obj){
  yDelta = startY - mouse.y;
  xDelta = startX - mouse.x;
  if(dragging===true){
    if((yDelta > 0 && xDelta > 0) || (yDelta < 0 && xDelta < 0) ){
      obj.rotateZ(.05);
      startY = mouse.y;
      startX = mouse.x;
    }
    else{
      obj.rotateZ(-.05);
      startY = mouse.y;
      startX = mouse.x;
    }
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

let reset = false;
let ySwitched = false;
let xSwitched = true;



let selectCubesX = function(xCrossSection){
  cubeArray.forEach( (cube) => {

    boundaryBoxX.setFromObject(xCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (boundaryBoxX.containsPoint(cubeBoundaryBox.getCenter()) === true){
      selectedCubes << cube;

      // if (reset === false && ySwitched === true){
        THREE.SceneUtils.detach( cube, cube.parent, bigCube );
        THREE.SceneUtils.attach( cube, bigCube, xCrossSection );
        cubeBoundaryBox.setFromObject(cube);
        // reset = true;
        // xSwitched = true;
        // ySwitched = false;
        // needToSelect = false;
    }
    // }
  });
  dragXCrossSection(xCrossSection)
};


let selectCubesY = function(yCrossSection){
  cubeArray.forEach( (cube) => {
    boundaryBoxY.setFromObject(yCrossSection);
    cubeBoundaryBox.setFromObject(cube);
    // boundaryBoxY.union(cubeBoundaryBox);

    if (boundaryBoxY.containsPoint(cubeBoundaryBox.getCenter()) === true){
      selectedCubes << cube;

      // if (reset === false && xSwitched === true){

        THREE.SceneUtils.detach( cube, cube.parent, bigCube );
        THREE.SceneUtils.attach( cube, bigCube, yCrossSection );
        cubeBoundaryBox.setFromObject(cube);

        reset = true;
        ySwitched = true;
        xSwitched = false;
        needToSelect = false;
      // }
    }
  });
  dragYCrossSection(yCrossSection)
};


let selectCubesZ = function(zCrossSection){
  cubeArray.forEach( (cube) => {
    boundaryBoxZ.setFromObject(zCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    if (boundaryBoxZ.containsPoint(cubeBoundaryBox.getCenter()) === true){

      // if (reset === false && xSwitched === true){

        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, zCrossSection );
        cubeBoundaryBox.setFromObject(cube);
        //
        // reset = true;
        // ySwitched = true;
        // xSwitched = false;
      // }
    }
  });
  dragZCrossSection(zCrossSection)
};
//
// let pivot = null;
// let createPivot = function(crossSection){
//   pivot = new THREE.Mesh(crossSection.geometry, crossSection.material);
//   pivot.position.setY(crossSection.position.y);
//   pivot.position.setX(crossSection.position.x);
//   pivot.position.setZ(crossSection.position.z);
//   scene.add(pivot);
// };

// SNAP

// function snap(crossSection, axis){
//     let axes = ["x","y","z"];
//
//     if (crossSection.rotation.equals(bigCube.rotation) === false) {
//       let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
//       let index = null;
//       let least = 100;
//       let distance = null;
//       // console.log("startRotate", startRotate);
//       // console.log("endRotate", endRotate);
//       for (var i = 0; i < distances.length; i++) {
//         // distance = Math.abs(crossSection.rotation.y - distances[i]);
//         let value = `crossSection.rotation.${axis}`;
//         distance = eval(value) - distances[i];
//         // distance = distances[i]%crossSection.rotation.y;
//
//         console.log(distances[i], distance)
//         if (Math.abs(distance) <= Math.abs(least)){
//           least = distance;
//           index = i;
//         };
//
//       }
//
//       console.log("least", least);
//       console.log("endpoint", distances[index]);
//     //   if (crossSection.rotation.z === -Math.PI && index === 3){
//     //     crossSection.rotation.set(0,Math.PI, 0)
//     //   } else {
//     //     crossSection.rotation.set(0,distances[index],0);
//     //   }
//     //
//     // };
//
//     let order = axes.indexOf(axis);
//     let angles = [crossSection.rotation.x,crossSection.rotation.y,crossSection.rotation.z];
//     angles[order] = distances[index];
//     crossSection.rotation.set(angles[0], angles[1], angles[2]);
//   };
// }

// RENDER
let snapper = null;
let selected = null;
let intersects = null;
let axis = null;
let needToSelect = false;
let needToPick = true;
let xComponent = 0;
let yComponent = 0;

var render = function () {

  requestAnimationFrame( render );

  // raycaster.setFromCamera( selectMouse, camera );
  //
  // if (dragging === true ){
  //   var intersects = raycaster.intersectObjects( scene.children );
  // }
  // else {
  //   intersects = null;
  // }

  renderer.render(scene, camera);

  raycaster.setFromCamera( selectMouse, camera );

  if (dragging === true && needToPick === true){
    intersects = raycaster.intersectObjects(scene.children);

    if (Math.abs(selectMouse.y - mouse.y) < 5 && Math.abs(selectMouse.x - mouse.x) < 5){
      yComponent = Math.abs(selectMouse.y - mouse.y);
      xComponent = Math.abs(selectMouse.x - mouse.x);
    
      pick(intersects, yComponent, xComponent);
      needToPick = false;
    }

    else if (intersects === null || intersects.length === 0){
      controls.enableRotate = true;
    };
  }

  controls.update();

};

render();
