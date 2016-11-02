
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var selectMouse = new THREE.Vector2();
var mouse = new THREE.Vector2();


// MAKE CUBES
var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
// var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
// var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
// bigCube.rotation.x = Math.PI/4;
// bigCube.rotation.x = Math.PI/4;



// bigCubeGeometry.faces[1].color.set(0x00ff00);
// bigCubeGeometry.faces[5].color.set("red");

var color = new THREE.Color().setRGB(1, 1, 1);
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true });
var bigCube = new THREE.Mesh(bigCubeGeometry, bigCubeMaterial);

var crossSectionMaterials = [
    new THREE.MeshBasicMaterial({color:"orange"}),
    new THREE.MeshBasicMaterial({color:"green"}),
    new THREE.MeshBasicMaterial({color:"white"}),
    new THREE.MeshBasicMaterial({color:"blue"}),
    new THREE.MeshBasicMaterial({color:"red"}),
    new THREE.MeshBasicMaterial({color:"yellow"}),
];
// // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
// var bigCubeMaterial = new THREE.MeshFaceMaterial(bigCubeMaterials);
// var bigCube = new THREE.Mesh(bigCubeGeometry, bigCubeMaterial);

var crossSectionMaterial = new THREE.MeshFaceMaterial(crossSectionMaterials);


scene.add( bigCube );

var xCrossSectionGeometry = new THREE.BoxGeometry(3,1,3);
var xCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
xCrossSectionGeometry.name = "xCrossSection"

var xCrossSection = new THREE.Mesh(xCrossSectionGeometry, crossSectionMaterial);
scene.add(xCrossSection);
// bigCube.add(xCrossSection);
xCrossSection.position.setY(1);

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
var yCrossSection = new THREE.Mesh(yCrossSectionGeometry, crossSectionMaterial);
scene.add(yCrossSection);
// bigCube.add(yCrossSection);
yCrossSection.position.setX(1);
//
// var yCrossSection2 = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
// scene.add(yCrossSection2);
// yCrossSection2.position.setX(0);
//
// var yCrossSection3 = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
// scene.add(yCrossSection3);
// yCrossSection3.position.setX(1);

var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
zCrossSectionGeometry.name = "zCrossSection"
var zCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: "black", wireframe: false });
var zCrossSection = new THREE.Mesh(zCrossSectionGeometry, zCrossSectionMaterial);
scene.add(zCrossSection);
zCrossSection.position.setZ(1);
// var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
// zCrossSectionGeometry.name = "zCrossSection"
// var zCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: "black", wireframe: false });
// var zCrossSection = new THREE.Mesh(zCrossSectionGeometry, zCrossSectionMaterial);
// scene.add(zCrossSection);
// zCrossSection.position.setZ(0);
// var zCrossSectionGeometry = new THREE.BoxGeometry(3,3,1);
// zCrossSectionGeometry.name = "zCrossSection"
// var zCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: "black", wireframe: false });
// var zCrossSection = new THREE.Mesh(zCrossSectionGeometry, zCrossSectionMaterial);
// scene.add(zCrossSection);
// zCrossSection.position.setZ(-1);

var smallCubeGeometry = new THREE.BoxGeometry(1,1,1);

smallCubeGeometry.name = "smallCubeGeometry"
var smallCubeMaterial = new THREE.MeshBasicMaterial( {vertexColors: THREE.FaceColors });
var smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
scene.add(smallCube);
smallCube.position.setY(-1);
smallCube.position.setX(-1);


// bigCube.add(smallCube);
// scene.add(smallCube);
// let cubeArray = [];

// make cubes
// let newCubes = [];
// let cubeArray = [];
// for (var i = 0; i < 27; i++) {
//   newCubes.push(new THREE.Mesh(smallCubeGeometry, smallCubeMaterial));
// }
//   for (var x = -1; x <= 1; x++) {
//     for (var y = -1; y <= 1; y++) {
//         for (var z = -1; z <= 1; z++) {
//           let cube = newCubes.pop();
//           cube.position.setX(x);
//           cube.position.setY(y);
//           cube.position.setZ(z);
//           cubeArray.push(cube);
//
//     }
//   }
// };
// cubeArray.forEach((cube) =>scene.add(cube))


// crossSection.add(bigCube);

camera.position.z = 5;

let dragging = false;
let startX = 0;
let selectStartX = 0;
let selectStartY = 0;

function yesDragging(event){
  dragging = true;
  selectMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  selectMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  selectStartX = ( event.clientX / window.innerWidth ) * 2 - 1;
  selectStartY = - ( event.clientY / window.innerHeight ) * 2 + 1;
  startRotate = xCrossSection.rotation;
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );


let startRotate = null;
let rotation = null;
let finishRotate = null;
let direct = null;

let dragXCrossSection = function(obj){
  if(dragging===true){
    let xDelta = startX - mouse.x;
    if(xDelta < 0){
      direction = "positive";
      obj.rotateY(.05);
      // let axis = bigCube.localToWorld ( bigCube.position );
      // obj.rotateOnAxis ( axis, .05 );


      startX = mouse.x;
    }
    else if(xDelta > 0){
      direction = "negative";
      obj.rotateY(-.05);
      startX = mouse.x;
    }
  }
  rotation = startRotate - obj.rotation.y;
};

let startY = 0;
let dragYCrossSection = function(obj){
  let yDelta = startY - mouse.y;
  if(dragging===true){
    if(yDelta > 0){
      direction = "positive";
      obj.rotateX(.05);
      startY = mouse.y;
    }
    else if(yDelta < 0){
      direction = "negative";
      obj.rotateX(-.05);
      startY = mouse.y;
    }
  }
};

let dragZCrossSection = function(obj){
  let yDelta = startY - mouse.y;
  if(dragging===true){
    if(yDelta > 0){
      obj.rotateZ(-.05);
      startY = mouse.y;
    }
    else if(yDelta < 0){
      obj.rotateZ(.05);
      startY = mouse.y;
    }
  }
};


let cubeArray = [smallCube];
let boundaryBoxX = new THREE.Box3();
boundaryBoxX.setFromObject(xCrossSection);
let boundaryBoxY = new THREE.Box3();
boundaryBoxY.setFromObject(yCrossSection);
let boundaryBoxZ = new THREE.Box3();
boundaryBoxZ.setFromObject(zCrossSection);
let cubeBoundaryBox = new THREE.Box3();
cubeBoundaryBox.setFromObject(smallCube);

function noDragging(event){
  dragging = false;
  // cubeBoundaryBox.setFromObject(smallCube);
  // cubeBoundaryBox = smallCubeGeometry.computeBoundingBox();
  reset = false;
  endRotate = xCrossSection.rotation;
  selected = null;

  // if (rotation%Math.PI/2 !== 0){
  //   let remaining = rotation%Math.PI/2;
  //   if (Math.abs(rotation) < Math.PI/4){
  //     xCrossSection.rotateY(rotation);
  //   }
  //   else if (remaining < Math.PI/4){
  //     xCrossSection.rotateY(-remaining);
  //   } else {
  //     xCrossSection.rotateY(remaining);
  //   }
  //
  // }
  //
  // let remaining = Math.PI/2 - Math.abs(xCrossSection.rotation.y);
  // xCrossSection.rotateY(remaining);

  // THREE.SceneUtils.detach( smallCube, yCrossSection, scene );

    // if(xCrossSection.rotation.equals(bigCube.rotation) === false){
    //   let remaining = Math.PI/2 - xCrossSection.rotation.y;
    //   xCrossSection.rotateY(remaining);
    // }

      // // //
      if (xCrossSection.rotation.equals(bigCube.rotation) === false) {
        let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
        let index = null;
        let least = 100;
        let distance = null;
        console.log("startRotate", startRotate);
        console.log("endRotate", endRotate);
        for (var i = 0; i < distances.length; i++) {
          // distance = Math.abs(xCrossSection.rotation.y - distances[i]);



          distance = xCrossSection.rotation.y - distances[i];
          // distance = distances[i]%xCrossSection.rotation.y;

          console.log(distances[i], distance)
          if (Math.abs(distance) <= Math.abs(least)){
            least = distance;
            index = i;
          };

        }

        console.log("least", least);
        console.log("endpoint", distances[index]);
        if (xCrossSection.rotation.z === -Math.PI && index === 3){
          xCrossSection.rotation.set(0,Math.PI, 0)
        } else {
          xCrossSection.rotation.set(0,distances[index],0);
        }

      };
      //
      if (yCrossSection.rotation.equals(bigCube.rotation) === false) {
        distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
        index = null;
        least = 100;
        distance = null;
        console.log("startRotate", startRotate);
        console.log("endRotate", endRotate);
        for (var i = 0; i < distances.length; i++) {
          // distance = Math.abs(yCrossSection.rotation.y - distances[i]);



          distance = yCrossSection.rotation.x - distances[i];
          // distance = distances[i]%yCrossSection.rotation.y;

          console.log(distances[i], distance)
          if (Math.abs(distance) <= Math.abs(least)){
            least = distance;
            index = i;
          };

        }
      //
        console.log("least", least);
        console.log("endpoint", distances[index]);
        // if (yCrossSection.rotation.z === -0 && index === 3){
        //   yCrossSection.rotation.set(Math.PI,0, 0)
        // } else {
          yCrossSection.rotation.set(distances[index],0,0);
        // }

      };

      if (zCrossSection.rotation.equals(bigCube.rotation) === false) {
        distances = [Math.PI, Math.PI/2, -Math.PI/2, 0]
        index = null;
        least = 100;
        distance = null;
        for (var i = 0; i < distances.length; i++) {
          distance = zCrossSection.rotation.z - distances[i];
          if (Math.abs(distance) <= Math.abs(least)){
            least = distance;
            index = i;
          };

        }
          zCrossSection.rotation.set(zCrossSection.rotation.x,zCrossSection.rotation.y,distances[index]);
        }
    // snap(xCrossSection);
    // snap(yCrossSection);
    // snap(xCrossSection);
  }

let remaining = null;

function snap(crossSection){
  rotation = startRotate - endRotate;
  remaining = (Math.PI/2)%rotation;
  console.log(rotation);
  console.log(remaining);
  //
  // if (direction === "positive" && rotation >= (Math.PI/2)){
  //   crossSection.rotateY(remaining)
  // }
  //
  // if (direction === "negative" && rotation >= (Math.PI/2)){
  //   crossSection.rotateY(-remaining)
  // }
  //
  // if (direction === "positive" && rotation < Math.PI/2 ){
  //   crossSection.rotateY(-rotation)
  // }
  //
  // if (direction === "negative" && rotation < Math.PI/2){
  //   crossSection.rotateY(rotation)
  // }

}



//
// function snap(crossSection){
//   if (crossSection.rotation.equals(bigCube.rotation) === false) {
//     let distances = [Math.PI, Math.PI/2, -Math.PI/2, 0];
//     let axes = ["x","y","z"];
//     let axis = null;
//     axes.forEach((axis) => {
//       if(crossSection.rotation.axis !== 0){
//         axis = axis;
//       }
//     });
//     let index = 0;
//     let greatest = 0;
//     let distance = 0;
//     for (var i = 0; i < distances.length; i++) {
//       let value = `crossSection.rotation.${axis}`;
//       distance = Math.abs(distances[i] - eval(value));
//       if (distances[i] >= greatest){
//         greatest = distances[i];
//         index = i;
//       }
//     }
//     let order = axes.indexOf(axis);
//     let angles = [0,0,0];
//     angles[order] = distances[index];
//     crossSection.rotation.set(angles[0], angles[1], angles[2]);
//   };
// }


let reset = false;
let ySwitched = false;
let xSwitched = true;
let selectCubesX = function(xCrossSection){
  cubeArray.forEach( (cube) => {
    // cubeBoundaryBox.setFromObject(smallCube);
    boundaryBoxX.setFromObject(xCrossSection);
    cubeBoundaryBox.setFromObject(cube);
    // cube.worldToLocal(cube.getWorldPosition());

    // boundaryBoxX = xCrossSectionGeometry.computeBoundingBox();
    if (boundaryBoxX.containsPoint(cubeBoundaryBox.getCenter()) === true){
      // yCrossSection.remove(cube);
      // xCrossSection.add(cube);
      if (reset === false && ySwitched === true){
        // cube.position.setY(0);
        // cube.position.setX(smallCube.parent.position.y);
        // cube.worldToLocal(cube.getWorldPosition());
        // smallCube.setWorldPosition(xCrossSection.position);
        THREE.SceneUtils.detach( smallCube, smallCube.parent, scene );

        THREE.SceneUtils.attach( cube, scene, xCrossSection );

        cubeBoundaryBox.setFromObject(cube);

        // cubeBoundaryBox = smallCubeGeometry.computeBoundingBox();
        reset = true;
        xSwitched = true;
        ySwitched = false;
      }
    }
  });
};
let selectCubesY = function(yCrossSection){
  cubeArray.forEach( (cube) => {
    // cubeBoundaryBox.setFromObject(smallCube);
    boundaryBoxY.setFromObject(yCrossSection);
    cubeBoundaryBox.setFromObject(cube);

    // boundaryBoxY = yCrossSectionGeometry.computeBoundingBox();
    if (boundaryBoxY.containsPoint(cubeBoundaryBox.getCenter()) === true){
      // yCrossSection.remove(cube);
      // yCrossSection.add(cube);
      // cubeBoundaryBox.setFromObject(cube);

      // cube.worldToLocal(cube.getWorldPosition());

      if (reset === false && xSwitched === true){
        // cube.position.setX(0);
        // cube.position.setY(smallCube.parent.position.x);
        THREE.SceneUtils.detach( smallCube, smallCube.parent, scene );

        THREE.SceneUtils.attach( cube, scene, yCrossSection );

        cubeBoundaryBox.setFromObject(cube);

        // cubeBoundaryBox = smallCubeGeometry.computeBoundingBox();
        // smallCube.setWorldPosition(yCrossSection.position);
        reset = true;
        ySwitched = true;
        xSwitched = false;
      }
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
// }
//   let dragging = false;
//   let startX = 0;
//   $(renderer.domElement).on("mousedown", function(e){
//     startX = e.clientX;
//     dragging = true;
//     $(renderer.domElement).on("mousemove", function(e){
//       if(dragging === true){
//         let moveX = e.clientX;
//           if(startX-moveX > 0){
//             crossSection.rotateY(-.03);
//             startX = moveX;
//           }
//           else if(startX-moveX < 0){
//             crossSection.rotateY(.03);
//             startX = moveX;
//           }
//
//
//       }
//       });
//   });
//
//   $(renderer.domElement).on("mouseup", function(e){
//     dragging = false;
//   });
// };
//
//
//



// let dragging = false;
// let startX = 0;
// $(renderer.domElement).on("mousedown", function(e){
//   startX = e.clientX;
//   dragging = true;
//   $(renderer.domElement).on("mousemove", function(e){
//     if(dragging === true){
//       let moveX = e.clientX;
//         if(startX-moveX > 0){
//           crossSection.rotateY(-.03);
//           startX = moveX;
//         }
//         else if(startX-moveX < 0){
//           crossSection.rotateY(.03);
//           startX = moveX;
//         }
//
//
//     }
//     });
// });
//
// $(renderer.domElement).on("mouseup", function(e){
//   dragging = false;
// });}


// var mouse = new THREE.Vector2();
// var offset = new THREE.Vector3( 10, 10, 10 );

// controls.addEventListener( 'change', render );

// var rotate = function(e){
//   e.preventDefault();
//
//   cube.matrix.makeRotationFromQuaternion(quaternion);
// }

//
controls = new THREE.OrbitControls(camera, renderer.domElement);

    let selected = null;

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


  if (intersects !== null && intersects.length > 0){
    for (var i = 0; i < intersects.length; i++) {

      if (intersects[i].object.geometry.name === "xCrossSection" && intersects[i].face.normal.y === 0){
        if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y)) && Math.abs(selectStartX - mouse.x) < 5){
          selected = "xCrossSection";
        }
      }
      // else if ((Math.abs(startY - mouse.y) > Math.abs(startX - mouse.x)) && Math.abs(startY - mouse.y) < 5){
      else if (intersects[i].object.geometry.name === "yCrossSection" && intersects[i].face.normal.x === 0){
        selected = "yCrossSection";
      }
      else if (intersects[i].object.geometry.name === "zCrossSection" && intersects[i].face.normal.z === 0){
        selected = "zCrossSection";
      };

      if( selected === "xCrossSection"){
        if(intersects[i].object.geometry.name === "xCrossSection"){
          selectCubesX(intersects[i].object);
          dragXCrossSection(intersects[i].object);
        };
      }

      else if( selected === "yCrossSection"){
        if(intersects[i].object.geometry.name === "yCrossSection"){
          selectCubesY(intersects[i].object);
          dragYCrossSection(intersects[i].object);
        };
      }
      else if( selected === "zCrossSection"){
        if(intersects[i].object.geometry.name === "zCrossSection"){
          selectCubesZ(intersects[i].object);
          dragZCrossSection(intersects[i].object);
        };
      }
    }
  };

  if (intersects === null || intersects.length === 0){
    controls.enableRotate = true;
  };
  controls.update();
  bigCube.updateMatrixWorld();
};


// cube.matrixAutoUpdate = false;
// cube.rotation.x += e.clientX;
// cube.rotation.y += e.clientY;
//
// var oldX = 0;
// var oldY = 0;

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
