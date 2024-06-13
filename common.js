const questions = [
    { question: "이상형의 분위기는?", choices: ["깜찍발랄, 귀요미 girl", "청순가련, 사연 girl", "매혹적인 섹시 girl", "4차원 엉뚱 girl"] },
    { question: "이상형의 MBTI는?", choices: ["내향적, 집순이 I", "파티피플, 데이트 가자! E"] },
    { question: "이상형의 MBTI는? 2", choices: ["공감해줘! F", "자, 이제 할 일을 하자 T"] },
    { question: "이상형의 패션 취향은?", choices: ["꾸안꾸, 자연스러움", "꾸꾸꾸, 핫걸로 변신!", "오버핏이 좋아! 힙합 스트릿"] },
    { question: "이상형과 함께 즐길 취미는?", choices: ["영화 감상", "스포츠 경기 관람", "독서 토론", "음주가무"] },
    { question: "이상형의 음식 취향은?", choices: ["여고생 st : 엽떡, 마라탕", "내 안의 아저씨?! 제육볶음, 국밥"] },
    { question: "이상형을 볼 때 중요한 것은?", choices: ["외모", "몸매", "개그코드"] },
];

let currentQuestionIndex = 0;
let selections = [];
let userName = '';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('user-info-container').classList.remove('hidden');
});

function startGame() {
    const nameInput = document.getElementById('user-name');
    userName = nameInput.value.trim();
    const contactInput = document.getElementById('user-contact');
    const userContact = contactInput.value.trim();

    if (userName && userContact) {
        document.getElementById('user-info-container').classList.add('hidden');
        document.getElementById('quiz-container').classList.remove('hidden');
        displayQuestion();
    } else {
        alert("Please fill in all information.");
    }
}

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    const choicesContainer = document.getElementById('choices-container');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');

    questionContainer.textContent = questions[currentQuestionIndex].question;

    choicesContainer.innerHTML = '';

    // Create buttons for each choice
    questions[currentQuestionIndex].choices.forEach(choice => {
        const button = document.createElement('button');
        button.classList.add('choice-btn');
        button.textContent = choice;
        button.addEventListener('click', () => selectChoice(button, choice));
        choicesContainer.appendChild(button);
    });

    nextBtn.disabled = !selections[currentQuestionIndex];
    prevBtn.disabled = currentQuestionIndex === 0;


    if (selections[currentQuestionIndex]) {
        const selectedButton = Array.from(choicesContainer.children).find(button => button.textContent === selections[currentQuestionIndex]);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }
}


function selectChoice(button, choice) {
    selections[currentQuestionIndex] = choice;
    document.getElementById('next-btn').disabled = false;
    document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        displayResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function displayResults() {
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');
    const resultAnalysis = document.getElementById('result-analysis');
    const gameContainer = document.getElementById('game-container');
    const resultContainer = document.getElementById('result-container');

    gameContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');

    resultTitle.textContent = `${userName} Type Girl:`;

    resultContent.innerHTML = ''; // Clear previous results
    selections.forEach((selection, index) => {
        const listItem = document.createElement('p');
        listItem.innerHTML = `<strong>${questions[index].question}</strong>: ${selection}`;
        resultContent.appendChild(listItem);
    });

    let analysisText = '';
    selections.forEach(selection => {
        const analysisResult = analysisResults[selection];
        if (analysisResult) {
            analysisText += `${analysisResult}<br><br>`;
        }
    });

    resultAnalysis.innerHTML = analysisText;
}
