const username = document.getElementById('username');
const savescorebtn = document.getElementById('savescorebtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore')
finalScore.innerText = mostRecentScore;

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGHSCORES = 9;

finalScore.innerText = mostRecentScore; 

username.addEventListener('keyup', () =>{
    console.log(username.value);
    savescorebtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();

const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};
highScores.push(score);
highScores.sort( (a, b) => b.score - a.score)
highScores.splice(9);

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/");


};