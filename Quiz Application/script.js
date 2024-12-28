const startBtn = document.querySelector('.start-btn')
const retryBtn = document.querySelector('.retry-btn')
const initialState = document.querySelector('.initial-state')
const questionState = document.querySelector('.ques-state')
const nextBtn = document.querySelector('.next')
const quesTag = document.querySelector('.ques-container ')
const optionContainer = document.querySelector('.ques-option')
const currQues = document.querySelector('.curr-ques')
const totalQues = document.querySelector('.total-ques')
const quesState = document.querySelector('.ques-state')
const result = document.querySelector('.result')
const score = document.querySelector('.score')
let timer = document.querySelector('.timer span')
const volBtn = document.querySelector('.fas')
const audio = document.querySelector('.audio-tag')
const progressText = document.querySelector('.progress-text')
let startTimer
let timeLeft = 30
let quesCount = 0
let scores = 0


startBtn.addEventListener('click', () => {
     initialState.classList.add('hide')
     questionState.classList.remove('hide')
     localStorage.setItem('mute',false)
     localStorage.setItem('start',true)
      audio.innerHTML = ` <audio src="audio/WhatsApp Audio 2024-12-03 at 5.45.54 AM.mp4" autoplay loop preload="auto"></audio>`
     showQuestion(quesCount)
     quesCounter()
     timeInterval()
})

nextBtn.addEventListener('click',(i) => {
  if(quesCount < quizQuestions.length - 1){
    ++quesCount
    showQuestion(quesCount)
    quesCounter()
    timeInterval()
  }else{
    result.classList.remove('hide')
    quesState.classList.add('hide')
    score.textContent = `${scores} out of ${quizQuestions.length}`
    if(scores===25){
        console.log('congrats');
        progressText.textContent = "Outstanding! 🎉 You've aced the quiz with a perfect score! You're a true master of this topic. 🌟"
    }if(scores>24){
        progressText.textContent = "Great job! 👍 Keep it up, you're doing well! 🚀"
    }if(scores<=24){
        progressText.textContent = "Not bad! Keep practicing, and you'll get even better! 💪"
    }if(scores<=10){
        progressText.textContent = "Don't worry! It’s a start. Keep learning and give it another try. You’ll improve with practice! 🌱"
    }
    }
    clearInterval(startTimer)
  
})

retryBtn.addEventListener('click',() =>{
    result.classList.add('hide')
    quesState.classList.remove('hide')
    scores = 0
    quesCount = 0
    initialState.classList.add('hide')
    questionState.classList.remove('hide')
    showQuestion(quesCount)
    quesCounter()
    timeInterval()
})
volBtn.addEventListener('click',() => {
    if(volBtn.classList.contains('fa-volume-up')){
        volBtn.classList.replace('fa-volume-up', 'fa-volume-mute')
        localStorage.setItem('mute',true)
        audio.innerHTML = ` <audio muted src="audio/WhatsApp Audio 2024-12-03 at 5.45.54 AM.mp4" autoplay loop preload="auto"></audio>`
    }else{
        volBtn.classList.replace('fa-volume-mute','fa-volume-up')
        localStorage.setItem('mute',false)
        audio.innerHTML = ` <audio src="audio/WhatsApp Audio 2024-12-03 at 5.45.54 AM.mp4" autoplay loop preload="auto"></audio>`
    }
})

function showQuestion(index){
    quesTag.innerHTML = `<p>${quizQuestions[index].question}</p>`
    optionContainer.innerHTML = 
    `<p class="option">${quizQuestions[index].options[0]}</p>
    <p class="option">${quizQuestions[index].options[1]}</p>
    <p class="option">${quizQuestions[index].options[2]}</p>
    <p class="option">${quizQuestions[index].options[3]}</p>` 
    const option = optionContainer.querySelectorAll('.option')
    // console.log(option.length);
    for(i = 0; i < option.length; i++){
        option[i].setAttribute('onclick','selectedAnswer(this)')
    }

    quesCounter()

}
showQuestion(quesCount)

function quesCounter(){
   currQues.textContent = quesCount + 1
   totalQues.textContent = `/${quizQuestions.length}`
}

function selectedAnswer(answer){
    clearInterval(startTimer)
    const userAns = answer.textContent
    var correctAns = quizQuestions[quesCount].answer
    if(userAns === correctAns){
        answer.classList.add('correct')
        scores++
    }else{
        answer.classList.add('wrong')
        for(let i = 0; i < optionContainer.children.length; i++){
           if( optionContainer.children[i].textContent === correctAns){
            optionContainer.children[i].classList.add('correct')
           }
        } 
    }
    for(let i = 0; i < optionContainer.children.length; i++){
        optionContainer.children[i].classList.add('disable')
    }
    console.log(userAns, correctAns);
}


function timeInterval(){
   timeLeft = 30
   startTimer =  setInterval(()=>{
        timeLeft--
        timer.textContent = timeLeft
        if(timeLeft >5 && timeLeft <= 15){
           quesState.classList.add('time-15sec')
        }else if(timeLeft <= 5){
            quesState.classList.add('time-5sec')
        }
        // console.log(timeLeft);
        if(timeLeft===0){
            clearInterval(startTimer)
            timeUp()
        }
    },1000)
}
function timeUp(){
    var correctAns = quizQuestions[quesCount].answer
    for(i = 0; i < optionContainer.children.length; i++){
        if(optionContainer.children[i].textContent === correctAns){
            optionContainer.children[i].classList.add('correct')
        }
        optionContainer.children[i].classList.add('disable')
    } 
}
 

