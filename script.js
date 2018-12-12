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
    firstCard.removeEventListener('click', flipCard);
    return;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    secondCard.removeEventListener('click', flipCard);
    checkForMatch(firstCard, secondCard);
  }

  console.log(firstCard.id + " " + secondCard.id);
}

function checkForMatch(firstCard, secondCard) {
  if (firstCard.id === secondCard.id) {
    disableCards(firstCard, secondCard);
  } else{
    setTimeout(() => {
      unflipCards(firstCard, secondCard);
      firstCard.addEventListener('click', flipCard);
      secondCard.addEventListener('click', flipCard);
    }, 1500);

  }

}

function disableCards(firstCard, secondCard) {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
}

function unflipCards(firstCard, secondCard) {
  firstCard.classList.remove('flip');
  secondCard.classList.remove('flip');
}

function countdown() {
  var timer = setInterval(function() {

    time = document.getElementById("time-remaining").innerHTML--;

    if (time <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard);
}
