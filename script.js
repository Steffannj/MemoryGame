const cards = document.querySelectorAll(".card");
var flips = 0;
function flipCard(){
  this.classList.toggle("flip");
  flips++;
  document.getElementById("num-of-flips").innerHTML = flips;
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click',flipCard);
}
