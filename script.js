const cards = document.querySelectorAll(".card");
var flips = 0;

var gameStarted = true;
var hasFlippedCard = false;
var firstCard, secondCard;
var matched = 0;

function flipCard() {

  if (gameStarted) {
    document.getElementById("message").innerHTML = "";
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
      lose();
    } else if (matched === 8) {
      win();
      clearInterval(timer);
    }
  }, 1000);

}

function playAgain() {
  location.reload();
}

function lose() {
  document.getElementById("message").style.color = "#660033";
  document.getElementById("message").innerHTML = "You lose.<br> <a href = '#' onclick='playAgain()' style = 'text-decoration: none;color:#330d00;'>Click to try again.</a>";

  for (var i = 0; i < cards.length; i++) {
    cards[i].removeEventListener('click', flipCard);
  }
}

function win() {
  document.getElementById("message").innerHTML = "Congratulations.<br> You win!<a href = '#' onclick='playAgain()' style = 'text-decoration: none;color:#336600;'><br>Play Again</a>";
  var name = prompt("Enter your name: ");
  var flips = document.getElementById("num-of-flips").innerHTML;
  saveScore(name, flips);
}

(function shuffle() {
  for (var i = 0; i < cards.length; i++) {
    var random = Math.floor(Math.random() * 12);
    cards[i].style.order = random;
  }
})();

function saveScore(name, flips) {
  localStorage.setItem(name, flips);
}

function compare(a, b) {
  if (a.flips < b.flips)
    return -1;
  if (a.flips > b.flips)
    return 1;
  return 0;
}

function sortScores() {
  var scoresList = new Array();

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var score = {
      name,
      flips
    };

    score.name = key;
    score.flips = localStorage.getItem(key);
    scoresList.push(score);
  }

  scoresList.sort(compare);
  return scoresList;
}

(function printScores() {
  var scoresList = sortScores();
  for (var i = 0; i < scoresList.length; i++) {
    document.getElementById("scores").innerHTML += "<td>" + (i + 1) + "</td>" + "<td>" + scoresList[i].name + "</td>" + "<td>" + scoresList[i].flips + "</td>";
  }
})();

function showScoreboard() {
  var scores = document.getElementById("scores");
  if (scores.style.visibility != "visible") {
    scores.style.visibility = "visible";
    document.getElementById("scores-button").innerHTML = "Hide scoreboard";
  } else if (scores.style.visibility == "visible") {
    scores.style.visibility = "hidden";
    document.getElementById("scores-button").innerHTML = "Show scoreboard";
  }
}

for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', flipCard);
}
