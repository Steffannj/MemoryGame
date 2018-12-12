const cards = document.querySelectorAll(".card");
var flips = 0;

var hasFlippedCard = false;
var firstCard, secondCard;

function flipCard() {
  this.classList.add("flip");
  flips++;
  document.getElementById("num-of-flips").innerHTML = flips;

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;
  }
  checkForMatch();

}
function checkForMatch(){
  if (firstCard.id == secondCard.id) {
    disableCards();
  }else setTimeout(()=>{
    unflipCards();
  },1500);
}
function disableCards(){
  firstCard.removeEventListener('click',flipCard);
  secondCard.removeEventListener('click',flipCard);
}
function unflipCards(){
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard);
}
