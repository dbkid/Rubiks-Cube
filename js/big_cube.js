
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var selectMouse = new THREE.Vector2();
var mouse = new THREE.Vector2();

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
}
function noDragging(event){
  dragging = false;
  smallCubeGeometry.computeBoundingBox();
  reset = false;
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );

var bigCubeGeometry = new THREE.BoxGeometry( 3, 3, 3 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
// bigCube.rotation.x = Math.PI/4;
// bigCube.rotation.x = Math.PI/4;
scene.add( bigCube );

var xCrossSectionGeometry = new THREE.BoxGeometry(3,1,3);
xCrossSectionGeometry.name = "xCrossSection"
var xCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
var xCrossSection = new THREE.Mesh(xCrossSectionGeometry, xCrossSectionMaterial);
scene.add(xCrossSection);
xCrossSection.position.setY(-1);

var yCrossSectionGeometry = new THREE.BoxGeometry(1,3,3);
yCrossSectionGeometry.name = "yCrossSection"
var yCrossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
var yCrossSection = new THREE.Mesh(yCrossSectionGeometry, yCrossSectionMaterial);
scene.add(yCrossSection);
yCrossSection.position.setX(-1);

var smallCubeGeometry = new THREE.BoxGeometry(1,1,1);
smallCubeGeometry.name = "smallCubeGeometry"
var smallCubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: false });
var smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
scene.add(smallCube);
// smallCube.position.setY(-1);
smallCube.position.setX(-1);

xCrossSection.add(smallCube);
// xCrossSection.add(smallCube);

// crossSection.add(bigCube);

camera.position.z = 5;




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
};

let cubeArray = [smallCube];
let boundaryBoxX = new THREE.Box3();
boundaryBoxX.setFromObject(xCrossSection);
let boundaryBoxY = new THREE.Box3();
boundaryBoxY.setFromObject(yCrossSection);
let cubeBoundaryBox = new THREE.Box3();
cubeBoundaryBox.setFromObject(smallCube);


let reset = false;
let ySwitched = false;
let xSwitched = true;
let selectCubesX = function(xCrossSection){
  cubeArray.forEach( (cube) => {
    // cubeBoundaryBox.setFromObject(smallCube);
    if (boundaryBoxX.containsBox(cubeBoundaryBox) === true){
      xCrossSection.add(cube);
      if (reset === false && ySwitched === true){
        smallCube.position.setY(smallCube.position.y + 1);
        smallCube.position.setX(smallCube.position.x - 1);
        smallCubeGeometry.computeBoundingBox();
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
    if (boundaryBoxY.containsBox(cubeBoundaryBox) === true){
      yCrossSection.add(cube);
      if (reset === false && xSwitched === true){
        smallCube.position.setX(smallCube.position.x + 1);
        smallCube.position.setY(smallCube.position.y - 1);
        smallCubeGeometry.computeBoundingBox();

        reset = true;
        ySwitched = true;
        xSwitched = false;
      }
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
// controls = new THREE.OrbitControls(camera, renderer.domElement);



var render = function () {
  requestAnimationFrame( render );

  raycaster.setFromCamera( selectMouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  renderer.render(scene, camera);

  for (var i = 0; i < intersects.length; i++) {
    let selected = null;
    if ((Math.abs(selectStartX - mouse.x) >= Math.abs(selectStartY - mouse.y)) && Math.abs(selectStartX - mouse.x) < 5){
      selected = "xCrossSection";


    }
    // else if ((Math.abs(startY - mouse.y) > Math.abs(startX - mouse.x)) && Math.abs(startY - mouse.y) < 5){
    else{
      selected = "yCrossSection";

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

  };

  // if (intersects.length === 0){
    // controls.update();
  // };

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
