(function () {
  const Final = {
    quiz: null,
    questionTitleElement: null,
    init() {
      checkUserData();
      // данные пользователя в поисковой строке
      const url = new URL(location.href);
      // номер теста
      const testId = url.searchParams.get("id");
      // если есть id теста
      if (testId) {
        // отправляем запрос на тест с определенным id
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "https://testologia.ru/get-quiz?id=" + testId, false);
        xhr.send();
        // если ответ от сервера положительный (200) и тест с таким Id есть, получаем ответ в форме текста
        if (xhr.status === 200 && xhr.responseText) {
          this.quiz = JSON.parse(xhr.responseText);
        }
      }
      this.showResults();
    },
    showResults() {
      const resultsContainer = document.createElement("div");
      resultsContainer.className = "results-container";
      console.log(this.quiz);
      //resultsContainer.innerHTML = `<p><strong>${this.quiz.name} Результаты теста</strong></p>`; Заголовок
      //resultsContainer.innerHTML = `<p>${this.quiz.questions[0].question} Результаты теста</p>`; // название вопроса
      resultsContainer.innerHTML = `<p>${this.quiz.questions[0].question} Результаты теста</p>`;

      //this.questionTitleElement.innerHTML = `<span>Вопрос ${this.quiz.questions.question}`;

      //this.quiz.innerHTML = `<p><strong>${this.quiz} Результаты теста</strong></p>`;

      const preTitle = document.getElementById("pre-title");
      preTitle.appendChild(resultsContainer);
    },
  };

  Final.init();
})();
