(function () {
  const Choice = {
    quizzes: [],
    init() {
      checkUserData();

      // запрос с сервера список тестов
      const xhr = new XMLHttpRequest();
      // не делаем запрос асинхронно - false
      xhr.open("GET", "https://testologia.ru/get-quizzes", false);
      // отправляем наш запрос
      xhr.send();

      // если наш запрос успешный и там пришел какой-то ответ
      if (xhr.status === 200 && xhr.responseText) {
        try {
          // нам нужно распарсить наш текст в JS объект и сохранить в this.quizzes
          this.quizzes = JSON.parse(xhr.responseText);
        } catch (e) {
          // если возникла какая-то ошибка мы просто переведем пользователя на главную страницу
          location.href = "index.html";
        }
        // отображаем наши результаты с бекенда
        this.processQuizzes();
      } else {
        // если от сервера ответ не 200 или какой-то другой, перенаправляем пользоваля на главную страницу
        location.href = "index.html";
      }
    },
    // вызов функции после получения всех необходимых данных
    processQuizzes() {
      // создаем тут переменную, чтобы не искать заново при каждом проходе цикла
      const choiceOptionsElement = document.getElementById("choice-options");
      // если у нас есть хотябы 1 тест
      if (this.quizzes && this.quizzes.length > 0) {
        this.quizzes.forEach((quiz) => {
          const that = this;
          // создаем div
          const choiceOptionElement = document.createElement("div");
          // даем название div элементу
          choiceOptionElement.className = "choice-option";
          // добавляем id к каждому тесту, чтобы мы знали на какой тест мы нажали
          choiceOptionElement.setAttribute("data-id", quiz.id);
          // переход на другую страницу при нажатии на choice-option
          choiceOptionElement.onclick = function () {
            that.chooseQuiz(this);
          };

          const choiceOptionTextElement = document.createElement("div");
          choiceOptionTextElement.className = "choice-option-text";
          // название теста
          choiceOptionTextElement.innerText = quiz.name;

          const choiceOptionArrowElement = document.createElement("div");
          choiceOptionArrowElement.className = "choice-option-arrow";

          const choiceOptionImageElement = document.createElement("img");
          choiceOptionImageElement.setAttribute("src", "img/arrow.png");
          choiceOptionImageElement.setAttribute("alt", "Стрелка");

          // вставляем картинку внутрь стрелки
          choiceOptionArrowElement.appendChild(choiceOptionImageElement);
          // вставляем внутрь choice-option 2 элемента: текст и стрелку
          choiceOptionElement.appendChild(choiceOptionTextElement);
          choiceOptionElement.appendChild(choiceOptionArrowElement);

          // вставляем наш choice-option в choice-options
          choiceOptionsElement.appendChild(choiceOptionElement);
        });
      }
    },
    // переход на следующую страницу
    chooseQuiz(element) {
      // id наших тестов сохраняем в dataId
      const dataId = element.getAttribute("data-id");
      // если id  у нас есть, то мы переводим пользователя на следующую страницу
      if (dataId) {
        // переводим на новую страницу с данными от поисковой строки и добавляем id теста
        location.href = "test.html" + location.search + "&id=" + dataId;
      }
    },
  };

  Choice.init();
})();
