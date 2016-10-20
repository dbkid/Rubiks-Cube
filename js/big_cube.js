
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x000000, 0 );
document.body.appendChild( renderer.domElement );

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

let dragging = false;
function yesDragging(event){
  dragging = true;
}
function noDragging(event){
  dragging = false;
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'mousemove', onMouseMove );
window.addEventListener('mousedown', yesDragging );
window.addEventListener('mouseup', noDragging );

var bigCubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
bigCubeGeometry.name = "bigCube";
var bigCubeMaterial = new THREE.MeshBasicMaterial( { color: 000000, wireframe: true } );
var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
// bigCube.rotation.x = Math.PI/4;
// bigCube.rotation.x = Math.PI/4;
scene.add( bigCube );

var crossSectionGeometry = new THREE.BoxGeometry(4,1,4);
crossSectionGeometry.name = "crossSection"
var crossSectionMaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: false });
var crossSection = new THREE.Mesh(crossSectionGeometry, crossSectionMaterial);
scene.add(crossSection);
crossSection.position.setY(-1.5);


// crossSection.add(bigCube);

camera.position.z = 5;



  let startX = 0;
let dragCrossSection = function(obj){

  if(dragging===true){
    if(startX - mouse.x < 0){
      obj.object.rotateY(.03);
      startX = mouse.x;
    }
    else if(startX - mouse.x > 0){
      obj.object.rotateY(-.03);
      startX = mouse.x;
    }
  }
}
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



var render = function () {
  requestAnimationFrame( render );

  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );

  renderer.render(scene, camera);

  for (var i = 0; i < intersects.length; i++) {
    if(intersects[i].object.geometry.name === "crossSection"){
      dragCrossSection(intersects[i]);
    };
  };

  if (intersects.length === 0){
    controls.update();
  };

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
