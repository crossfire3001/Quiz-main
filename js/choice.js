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
    processQuizzes() {},
  };

  Choice.init();
})();
