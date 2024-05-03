// проверка введенных данных пользователя в адресной строке
function checkUserData() {
  const url = new URL(location.href);
  const name = url.searchParams.get("name");
  const lastName = url.searchParams.get("lastName");
  const email = url.searchParams.get("email");

  // если каких-либо данных нету, то переадресовываем на главную страницу
  if (!name || !lastName || !email) {
    location.href = "index.html";
  }
}
