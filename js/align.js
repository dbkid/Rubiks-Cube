
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


function noDragging(event){

  dragging = false;
  reset = false;


if (selected === "xCrossSection"){
// crossSections.forEach((snapper) => {


    if (snapper.rotation.equals(bigCube.rotation) === false) {
      let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
      let index = null;
      let least = 100;
      let distance = null;
      // console.log("startRotate", startRotate);
      // console.log("endRotate", endRotate);
      for (var i = 0; i < distances.length; i++) {
        // distance = Math.abs(snapper.rotation.y - distances[i]);



        distance = snapper.rotation.y - distances[i];
        // distance = distances[i]%snapper.rotation.y;

        console.log(distances[i], distance)
        if (Math.abs(distance) <= Math.abs(least)){
          least = distance;
          index = i;
        };

      }

      // console.log("least", least);
      // console.log("endpoint", distances[index]);
      if (snapper.rotation.z === -Math.PI && index === 3){
        snapper.rotation.set(snapper.rotation.x,Math.PI, snapper.rotation.z)
      } else {
        snapper.rotation.set(snapper.rotation.x,distances[index],snapper.rotation.z);
      }

    };
  }
    //
    else if (selected === "yCrossSection"){
    if (snapper.rotation.equals(bigCube.rotation) === false) {
      distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
      index = null;
      least = 100;
      distance = null;
      // console.log("startRotate", startRotate);
      // console.log("endRotate", endRotate);
      for (var i = 0; i < distances.length; i++) {
        // distance = Math.abs(snapper.rotation.y - distances[i]);



        distance = snapper.rotation.x - distances[i];
        // distance = distances[i]%snapper.rotation.y;

        console.log(distances[i], distance)
        if (Math.abs(distance) <= Math.abs(least)){
          least = distance;
          index = i;
        };

      }
    //
      // console.log("least", least);
      // console.log("endpoint", distances[index]);
      // if (snapper.rotation.z === -0 && index === 3){
      //   snapper.rotation.set(Math.PI,0, 0)
      // } else {
        snapper.rotation.set(distances[index],snapper.rotation.y,snapper.rotation.z);
      }

    };



// })
// }
  // snap(snapper, axis);


  // crossSections.forEach((crossSection) => {
  //   snap(crossSection);
  // }
// );
  //
  // selectedCubes.forEach((cube) => {
  //   THREE.SceneUtils.detach( cube, cube.parent, scene );
  // });
  // selectedCubes = [];

}

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
boundaryBoxX.setFromObject(xCrossSection);
let boundaryBoxY = new THREE.Box3();
boundaryBoxY.setFromObject(yCrossSection);
let boundaryBoxZ = new THREE.Box3();
let cubeBoundaryBox = new THREE.Box3();
cubeBoundaryBox.setFromObject(smallCube);



// SELECT CUBES

let reset = false;
let ySwitched = false;
let xSwitched = true;



let selectCubesX = function(xCrossSection){
  cubeArray.forEach( (cube) => {

    boundaryBoxX.setFromObject(xCrossSection);
    cubeBoundaryBox.setFromObject(cube);
    // boundaryBoxX.union(cubeBoundaryBox);

    if (boundaryBoxX.containsPoint(cubeBoundaryBox.getCenter()) === true){
      selectedCubes << cube;

      // if (reset === false && ySwitched === true){
        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, xCrossSection );
        cubeBoundaryBox.setFromObject(cube);
        reset = true;
        xSwitched = true;
        ySwitched = false;
        needToSelect = false;
      }
    // }
  });
};


let selectCubesY = function(yCrossSection){
  cubeArray.forEach( (cube) => {
    boundaryBoxY.setFromObject(yCrossSection);
    cubeBoundaryBox.setFromObject(cube);
    // boundaryBoxY.union(cubeBoundaryBox);

    if (boundaryBoxY.containsPoint(cubeBoundaryBox.getCenter()) === true){
      selectedCubes << cube;

      // if (reset === false && xSwitched === true){

        THREE.SceneUtils.detach( cube, cube.parent, scene );
        THREE.SceneUtils.attach( cube, scene, yCrossSection );
        cubeBoundaryBox.setFromObject(cube);

        reset = true;
        ySwitched = true;
        xSwitched = false;
        needToSelect = false;
      // }
    }
  });
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
};

let pivot = null;
let createPivot = function(crossSection){
  pivot = new THREE.Mesh(crossSection.geometry, crossSection.material);
  pivot.position.setY(crossSection.position.y);
  pivot.position.setX(crossSection.position.x);
  pivot.position.setZ(crossSection.position.z);
  scene.add(pivot);
};

// SNAP

function snap(crossSection, axis){
    let axes = ["x","y","z"];

    if (crossSection.rotation.equals(bigCube.rotation) === false) {
      let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
      let index = null;
      let least = 100;
      let distance = null;
      // console.log("startRotate", startRotate);
      // console.log("endRotate", endRotate);
      for (var i = 0; i < distances.length; i++) {
        // distance = Math.abs(crossSection.rotation.y - distances[i]);
        let value = `crossSection.rotation.${axis}`;
        distance = eval(value) - distances[i];
        // distance = distances[i]%crossSection.rotation.y;

        console.log(distances[i], distance)
        if (Math.abs(distance) <= Math.abs(least)){
          least = distance;
          index = i;
        };

      }

      console.log("least", least);
      console.log("endpoint", distances[index]);
    //   if (crossSection.rotation.z === -Math.PI && index === 3){
    //     crossSection.rotation.set(0,Math.PI, 0)
    //   } else {
    //     crossSection.rotation.set(0,distances[index],0);
    //   }
    //
    // };

    let order = axes.indexOf(axis);
    let angles = [crossSection.rotation.x,crossSection.rotation.y,crossSection.rotation.z];
    angles[order] = distances[index];
    crossSection.rotation.set(angles[0], angles[1], angles[2]);
  };
}

// RENDER
let snapper = null;
let selected = null;
let intersects = null;
let axis = null;
let needToSelect = false;
var render = function () {
  controls.enableRotate = false;
  requestAnimationFrame( render );

  raycaster.setFromCamera( selectMouse, camera );

  if (dragging === true ){
    var intersects = raycaster.intersectObjects( scene.children );
  }
  else {
    intersects = null;
  }

  renderer.render(scene, camera);

  if (intersects !== null ){

  for (var i = 0; i < intersects.length; i++) {

    if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y)) && Math.abs(selectStartX - mouse.x) < 2){
      selected = "xCrossSection";
      axis = "x";
      needToSelect = true;

    }
    else if ((Math.abs(startY - mouse.y) > Math.abs(startX - mouse.x)) && Math.abs(startY - mouse.y) < 5){
      selected = "yCrossSection";
      axis = "y";
      needToSelect = true;

    }
  }
  for (var i = 0; i < intersects.length; i++){
    if( selected === "xCrossSection" && needToSelect === true ){
      if(intersects[i].object.geometry.name === "xCrossSection"){
        snapper = intersects[i].object;
        // createPivot(intersects[i].object);
        selectCubesX(intersects[i].object);
        dragXCrossSection(intersects[i].object);
      };
    }
    else if( selected === "yCrossSection" && needToSelect === true){
      if(intersects[i].object.geometry.name === "yCrossSection"){
        snapper = intersects[i].object;
        // createPivot(intersects[i].object);
        selectCubesY(intersects[i].object);
        dragYCrossSection(intersects[i].object);
      };
    }
    else if( selected === "xCrossSection" && needToSelect === false ){
      if(intersects[i].object.geometry.name === "xCrossSection"){
        snapper = intersects[i].object;
        // createPivot(intersects[i].object);
        // selectCubesX(intersects[i].object);
        dragXCrossSection(intersects[i].object);
      };
    }
    else if( selected === "yCrossSection" && needToSelect === false ){
      if(intersects[i].object.geometry.name === "yCrossSection"){
        snapper = intersects[i].object;
        // createPivot(intersects[i].object);
        // selectCubesY(intersects[i].object);
        dragYCrossSection(intersects[i].object);
      };
    }
  }}
    // else{
    //   if(intersects[i].object.geometry.name === "zCrossSection"){
    //     snapper = intersects[i].object;
    //     // createPivot(intersects[i].object);
    //     selectCubesZ(intersects[i].object);
    //     dragZCrossSection(intersects[i].object);
    //   };
    // }


  if (intersects === null || intersects.length === 0){
    controls.enableRotate = true;
  };
  controls.update();
  // controls.reset();
  bigCube.updateMatrixWorld();
};

render();
