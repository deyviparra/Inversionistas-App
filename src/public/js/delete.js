let formDelete = document.getElementsByName("form-delete");
formDelete.forEach(element => element.addEventListener("submit", confirmar));

function confirmar(e) {
  e.preventDefault();
  let confirmar = confirm("Estas seguro de querer eliminar?");
  if (confirmar) {
    document.forms["form-delete"].submit();
  }
  return;
}
