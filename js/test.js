(function () {
  const Test = {
    quiz: null,
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
    },
  };

  Test.init();
})();
