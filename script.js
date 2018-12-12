const cards = document.querySelectorAll(".card");
var flips = 0;

var gameStarted = true;
var hasFlippedCard = false;
var firstCard, secondCard;
var matched = 0;

function flipCard() {

  if(gameStarted){
    countdown();
    gameStarted = false;
  }

  this.classList.add("flip");
  flips++;
  document.getElementById("num-of-flips").innerHTML = flips;
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    firstCard.removeEventListener('click', flipCard);
    return true;
  } else {
    hasFlippedCard = false;
    secondCard = this;
    secondCard.removeEventListener('click', flipCard);
    checkForMatch(firstCard, secondCard);
  }
}

function checkForMatch(firstCard, secondCard) {
  if (firstCard.id === secondCard.id) {
    disableCards(firstCard, secondCard);
    matched++;
  } else {
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
    if (time == 1) {
      clearInterval(timer);
      loose();
    }else if (matched === 8) {
      win();
      clearInterval(timer);
    }
  }, 1000);

}

function lose(){
  document.getElementById("message").style.color = "#660033";
  document.getElementById("message").innerHTML = "You lose.<br> Try again.";

  for (var i = 0; i < cards.length; i++) {
    cards[i].removeEventListener('click', flipCard);
  }
}

function win(){
  document.getElementById("message").innerHTML = "Congratulations.<br> You win!";
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard);
}
