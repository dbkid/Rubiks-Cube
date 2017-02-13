var aboutButton = document.getElementById("about");
var aboutModal = document.getElementById("aboutModal");

var toggle = "closed";

aboutButton.onclick = function(){
  if (toggle === "closed"){
    aboutModal.style.display = "inline";
    toggle = "open";
  }
  else{
    aboutModal.style.display = "none";
    toggle = "closed";
  }

}

var instructionsButton = document.getElementById("instructions");
var instructionsModal = document.getElementById("instructionsModal");

var instructionsToggle = "closed";

instructionsButton.onclick = function(){
  if (instructionsToggle === "closed"){
    instructionsModal.style.display = "inline";
    instructionsToggle = "open";
  }
  else{
    instructionsModal.style.display = "none";
    instructionsToggle = "closed";
  }

}
