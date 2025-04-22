
BEGIN COMPONENT Quiz

  INITIALIZE state:
    currentQuestion ← 0
    answers ← empty array
    showExplanation ← false

  FETCH:
    quizData ← generateQuiz() using useFetch
    resultData ← saveQuizResult() using useFetch

  ON quizData change:
    IF quizData EXISTS THEN
      answers ← array of nulls with length equal to number of questions

  FUNCTION handleAnswer(answer):
    Copy current answers into newAnswers
    Set newAnswers[currentQuestion] ← answer
    Update answers ← newAnswers

  FUNCTION handleNext():
    IF currentQuestion is NOT last question THEN
      Increment currentQuestion
      Set showExplanation ← false
    ELSE
      Call finishQuiz()

  FUNCTION calculateScore():
    correct ← 0
    FOR each answer with index i in answers:
      IF answer equals quizData[i].correctAnswer THEN
        Increment correct
    RETURN (correct / total questions) * 100

  FUNCTION finishQuiz():
    score ← calculateScore()
    TRY:
      Call saveQuizResultFn with quizData, answers, score
      Show toast "Quiz completed!"
    CATCH error:
      Show toast error

  FUNCTION startNewQuiz():
    Reset currentQuestion ← 0
    Reset answers ← empty
    Reset showExplanation ← false
    Call generateQuizFn()
    Reset resultData ← null

  RENDER LOGIC:
    IF quiz is generating THEN
      SHOW loading spinner

    ELSE IF resultData EXISTS THEN
      SHOW QuizResult screen with results and restart option

    ELSE IF quizData is NOT available THEN
      SHOW Start Quiz card with instructions and button

    ELSE:
      currentQuestionData ← quizData[currentQuestion]

      SHOW quiz card:
        - Display question number and question text
        - Show answer options as radio buttons
        - On option select, call handleAnswer()
        - Show explanation IF showExplanation is true
        - Show two buttons:
          - "Show Explanation" (if not shown yet)
          - "Next Question" or "Finish Quiz" depending on position

END COMPONENT
