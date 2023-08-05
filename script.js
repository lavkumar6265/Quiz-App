const questions = [
    {
        question: "which is largest animal in the world",

        answers:[
            { text:"Shark", correct:false},
            { text:"Blue whale", correct:true},
            { text:"Elephant", correct:false},
            { text:"Giraffe", correct:false},
        ]
    },

    {
        question: "which is the smallest content in the world",

        answers:[
            { text:"Asia", correct:false},
            { text:"Australia", correct:false},
            { text:"Arctic", correct:false},
            { text:"Afrika", correct:true},
        ]
    },

    {
        question: "which is my name in the world",

        answers:[
            { text:"Shark", correct:false},
            { text:"Blue whale", correct:false},
            { text:"Love", correct:true},
            { text:"Giraffe", correct:false},
        ]
    }

];

const quetionElement = document.getElementById("quetion");
const answerBtn = document.getElementById("answer-button");
const nextBtn = document.getElementById("next-btn");


let currentQuetionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuetionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuetion();
}

function showQuetion(){

    resetState();

    let currentQuetion = questions[currentQuetionIndex]
    let questionNo = currentQuetionIndex +1;
    quetionElement.innerHTML = questionNo + "." +currentQuetion.question

    currentQuetion.answers.forEach(answer =>{
        // first create one Btn
        const button = document.createElement("button");
        // console.log(button);
        // button ke text me answer ka text dalo
        button.innerHTML = answer.text;
        // Button me btn class add karo
        button.classList.add("btn");
        // answerBtn me button jo create kiye h ade kar do
        answerBtn.appendChild(button);

        // agar button correct h to usko store kar leta h 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        // click karne par selectAnswer call honga 
        button.addEventListener("click",selectAnser);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

// click karne par ye function call honga
function selectAnser(e){
    // selctBtn me select kiye answer ko store kar lenge 
    const selectBtn = e.target;

    // isCorrect me check karenge ki select tagget true h ya nhi 
    const isCorrect = selectBtn.dataset.correct ==="true";

    // agar target true h to correct class add kar denge ya active kar dnege 
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }

    // agar select target fals h to incorrect class add kar denge
    else{
        selectBtn.classList.add("incorrect");
    }

    // Array.from method se answerBtn ke children par forEach loop lgakar 
    // check karenge ki kon sa anwer true h
    Array.from(answerBtn.children).forEach(button =>{
        // jo answer true h usme correct class add kar denge 
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        // button disable true kar denge jisse cursor do-drop property 
        // me chale jayenga 
        button.disabled = true;
    });

    // nextBtn style.display kar dnege jisse uska display block ho jyenga 
    // aar nextBtn visibale ho jayenga
    
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();

    quetionElement.innerHTML = `You Scored ${score} out of ${questions.length} !`
    nextBtn.innerHTML = "play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn(){
    currentQuetionIndex++;
    if(currentQuetionIndex<questions.length){
        showQuetion();
    }
    else{
        showScore();
    }
}

nextBtn.addEventListener("click",() =>{
    if(currentQuetionIndex<questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})
startQuiz();