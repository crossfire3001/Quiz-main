(function () {
  const Form = {
    fields: [
      {
        name: "name",
        id: "name",
        element: null,
        regex: /^[А-Я][а-я]+\s*$/,
        valid: false,
      },
      {
        name: "lastName",
        id: "last-name",
        element: null,
        regex: /^[А-Я][а-я]+\s*$/,
        valid: false,
      },
      {
        name: "email",
        id: "email",
        element: null,
        regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        valid: false,
      },
    ],
    agreeElement: null,
    processElement: null,

    // init function: Initializes the Form object by attaching DOM elements to each field and setting up event handlers for validation.
    // This function ensures that each input field in the form is monitored for changes, and when a change occurs, the appropriate validation function is called to check the input against specified rules.
    init() {
      const that = this; // Store 'this' context to reference the Form object inside callback functions
      this.fields.forEach((field) => {
        field.element = document.getElementById(field.id); // Link each field's element property to its corresponding DOM element
        field.element.onchange = function () {
          that.validateField.call(that, field, this); // Use the 'onchange' event to trigger validation when the user changes the input
        };
      });

      // чекбокс ознакомления с сайтом
      this.agreeElement = document.getElementById("agree");
      this.agreeElement.onchange = function () {
        that.validateForm();
      };

      // кнопка "Перейти к выбору теста"
      this.processElement = document.getElementById("process");
      this.processElement.onclick = function () {
        that.processForm();
      };
    },
    // валидация полей
    validateField(field, element) {
      if (!element.value || !element.value.match(field.regex)) {
        element.parentNode.style.borderColor = "red";
        field.valid = false;
      } else {
        element.parentNode.removeAttribute("style");
        field.valid = true;
      }
      this.validateForm();
    },
    // валидация всей формы для разблокировки кнопки "Перейти к выбору теста"
    validateForm() {
      // проверка каждого поля на валидность
      const validForm = this.fields.every((field) => field.valid);
      // сохраняем результат чтобы использовать в processForm
      const isValid = this.agreeElement.checked && validForm;
      // если чекбокс чекнут и форма валидна
      if (isValid) {
        // убираем атрибут с кнопки для нажатия
        this.processElement.removeAttribute("disabled");
      } else {
        // если какое-либо поле не валидно, то обратно добавляем атрибут "disabled" на кнопку "Перейти выбору к теста"
        this.processElement.setAttribute("disabled", "disabled");
      }
      // возвращаем результат этой функции для дальнейшего использования
      return isValid;
    },
    processForm() {
      // если форма валидна переносим на следующую страницу
      if (this.validateForm()) {
        let paramString = "";
        this.fields.forEach((field) => {
          // проходимся циклом по полям, первый параметр идет с ?, а 2 других уже с &
          // name - name, lastName, email
          // field.element.value - значение поля
          paramString +=
            (!paramString ? "?" : "&") + field.name + "=" + field.element.value;
        });

        location.href = "choice.html" + paramString;
      }
    },
  };

  Form.init();
})();
