// Sample Quiz Data
const quizData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
    { question: "Which language is used for web development?", options: ["Python", "Java", "JavaScript", "C++"], answer: 2 },
  ];
  
  const quizContainer = document.getElementById("quizContainer");
  const questionContainer = document.getElementById("questionContainer");
  const resultContainer = document.getElementById("resultContainer");
  const timerElement = document.getElementById("timer");
  const nextButton = document.getElementById("nextButton");
  
  let currentQuestion = sessionStorage.getItem("currentQuestion")
    ? parseInt(sessionStorage.getItem("currentQuestion"))
    : 0;
  let answers = sessionStorage.getItem("answers")
    ? JSON.parse(sessionStorage.getItem("answers"))
    : [];
  let timeLeft = sessionStorage.getItem("timeLeft")
    ? parseInt(sessionStorage.getItem("timeLeft"))
    : 60;
  
  let timer;
  
  // Load Question
  function loadQuestion() {
    if (currentQuestion >= quizData.length) {
      return showResults();
    }
  
    const questionData = quizData[currentQuestion];
    questionContainer.innerHTML = `
      <div class="question">${questionData.question}</div>
      <ul class="options">
        ${questionData.options
          .map(
            (option, index) =>
              `<li>
                <input type="radio" name="option" id="option${index}" value="${index}">
                <label for="option${index}">${option}</label>
              </li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  // Show Results
  function showResults() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
  
    const correctAnswers = quizData.filter(
      (q, index) => q.answer === answers[index]
    ).length;
  
    document.getElementById("score").textContent = `You scored ${correctAnswers} out of ${quizData.length}`;
  
    const reviewList = document.getElementById("review");
    quizData.forEach((q, index) => {
      const li = document.createElement("li");
      li.textContent = `${q.question} - Your Answer: ${
        q.options[answers[index]]
      } - ${q.answer === answers[index] ? "Correct" : "Incorrect"}`;
      reviewList.appendChild(li);
    });
  
    sessionStorage.clear();
  }
  
  // Next Question
  nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
      answers[currentQuestion] = parseInt(selectedOption.value);
      sessionStorage.setItem("answers", JSON.stringify(answers));
  
      currentQuestion++;
      sessionStorage.setItem("currentQuestion", currentQuestion);
  
      loadQuestion();
    } else {
      alert("Please select an option!");
    }
  });
  
  // Timer
  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up!");
        showResults();
      } else {
        timeLeft--;
        sessionStorage.setItem("timeLeft", timeLeft);
        timerElement.textContent = `Time Left: ${timeLeft}s`;
      }
    }, 1000);
  }
  
  // Initialize
  loadQuestion();
  startTimer();
  