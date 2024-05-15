(function () {
  const Test = {
    prevButtonElement: null,
    nextButtonElement: null,
    quiz: null,
    questionTitleElement: null,
    optionsElement: null,
    // опрос всегда должен начинатся с самого первого задания
    currentQuestionIndex: 1,
    userResult: [],
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
          try {
            // сохраняем ответ в переменную quiz в форме JSON объекта
            this.quiz = JSON.parse(xhr.responseText);
          } catch (e) {
            location.href = "index.html";
          }
          // начинаем тест
          this.startQuiz();
        } else {
          location.href = "index.html";
        }
      } else {
        location.href = "index.html";
      }
    },
    // начало теста
    startQuiz() {
      console.log(this.quiz);
      // берем название вопроса
      this.questionTitleElement = document.getElementById("title");
      // берем названия ответов
      this.optionsElement = document.getElementById("options");

      // кнопка "Дальше"
      this.nextButtonElement = document.getElementById("next");
      // привязка клика к действию
      this.nextButtonElement.onclick = this.move.bind(this, "next"); // 'this === move, 'next' === action

      // пропустить вопрос
      this.passButtonElement = document.getElementById("pass");
      this.passButtonElement.onclick = this.move.bind(this, "pass");

      // кнопка "Назад"
      this.prevButtonElement = document.getElementById("prev");
      this.prevButtonElement.onclick = this.move.bind(this, "prev");

      this.showQuestion();
    },
    // показать вопрос
    showQuestion() {
      // старт опроса с индекса 0
      const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];

      // создание вопроса в HTML
      this.questionTitleElement.innerHTML = `<span>Вопрос ${this.currentQuestionIndex}: </span> ${activeQuestion.question}`;

      // создание пуского HTML внутри .test-question-options
      this.optionsElement.innerHTML = "";
      const that = this;
      // проверяем если ли у нас результат этого вопроса в наших данных
      const chosenOption = this.userResult.find(
        (item) => item.questionId === activeQuestion.id
      );
      // перебираем ответы
      activeQuestion.answers.forEach((answer) => {
        const optionElement = document.createElement("div");
        optionElement.className = "test-question-option";

        // добавляем к input ответ с id
        const inputId = "answer-" + answer.id;
        const inputElement = document.createElement("input");
        // варианты ответа, их всего 3
        inputElement.className = "option-answer";
        inputElement.setAttribute("id", inputId);
        inputElement.setAttribute("type", "radio");
        inputElement.setAttribute("name", "answer");
        inputElement.setAttribute("value", answer.id);
        // если мы уже выбрали ответ, он у нас будет оставатся выбранным при нажатии на кнопке "Назад"
        if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
          inputElement.setAttribute("checked", "checked");
        }

        // если выбран ответ
        inputElement.onchange = function () {
          that.chooseAnswer();
        };

        const labelElement = document.createElement("label");
        labelElement.setAttribute("for", inputId);
        // вариант ответа на вопрос внутри label
        labelElement.innerText = answer.answer;

        // помещаем внутри .test-question-option: input, label
        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);

        // помещаем внутри .test-question-options: .test-question-option
        this.optionsElement.appendChild(optionElement);
      });
      // если выбран какой-либо из вариантов ответа, то кнопка "Далее" будет активна
      if (chosenOption && chosenOption.chosenAnswerId) {
        this.nextButtonElement.removeAttribute("disabled");
      } else {
        // пока не выбрали ответ, кнопка будет не активна
        this.nextButtonElement.setAttribute("disabled", "disabled");
      }

      // если длинна вопроса будет равна длинне всего QUIZ, то кнопка изменится на 'завершить' в данном случае 5 вопросов
      if (this.currentQuestionIndex === this.quiz.questions.length) {
        this.nextButtonElement.innerText = "Заверишть";
      } else {
        this.nextButtonElement.innerText = "Далее";
      }
      // если у нас уже был выбран 1 ответ, то мы можем нажать кнопку "Назад"
      if (this.currentQuestionIndex > 1) {
        this.prevButtonElement.removeAttribute("disabled");
      } else {
        this.prevButtonElement.setAttribute("disabled", "disabled");
      }
    },
    // выбран ответ
    chooseAnswer() {
      // при выбранном ответе убирается disable и на кнопку можно нажать
      this.nextButtonElement.removeAttribute("disabled");
    },
    move(action) {
      const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
      // из наших вариантов ответа их всего 3, создаем массив и возвращаем выбранный 1 ответ
      const chosenAnswer = Array.from(
        document.getElementsByClassName("option-answer")
      ).find((element) => {
        return element.checked;
      });

      let chosenAnswerId = null;
      // у каждого ответа свой id, мы сохраняем ответ с определенным id в переменной chosenAnswerId
      if (chosenAnswer && chosenAnswer.value) {
        chosenAnswerId = Number(chosenAnswer.value);
      }

      // создаем переменную в которую был сохранен результат теста
      const existingResult = this.userResult.find((item) => {
        return item.questionId === activeQuestion.id;
      });

      // если ответ уже был, то мы будем его изменять
      if (existingResult) {
        existingResult.chosenAnswerId === chosenAnswerId;
      } else {
        // сохраняем наши ответы
        this.userResult.push({
          // сохранение вопроса
          questionId: activeQuestion.id,
          // сохранение ответа на вопрос
          chosenAnswerId: chosenAnswerId,
        });
      }

      console.log(this.userResult);

      // если мы нажали "Дальше" или "Пропустить вопрос"
      if (action === "next" || action === "pass") {
        // переходим к следующему вопросу
        this.currentQuestionIndex++;
      } else {
        // переходим на предыдущий вопрос
        this.currentQuestionIndex--;
      }

      // показать вопрос
      this.showQuestion();
    },
  };

  Test.init();
})();
