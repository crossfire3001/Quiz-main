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
    },
    validateField(field, element) {},
  };

  Form.init();
})();
