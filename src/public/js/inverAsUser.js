let checkbox = document.getElementsByName("habilitar-user");
checkbox.forEach(element => element.addEventListener("change", verificarEstado, false));



function verificarEstado(e) {
  try {
    if (e.target.checked) {
      habilitar();
    } else {
      deshabilitar();
    }
  }
  catch{
    console.log("error");
  }
}

async function habilitar() {
  try {
    let url = window.location;
    const id = obtenerId(url);
    let response = await fetch('/habilitar-user/' + id);
    const data = await response.text();
    return console.log(data);
  }
  catch{
    console.log("error");
  }
}

async function deshabilitar() {
  try {
    let url = window.location;
    const id = obtenerId(url);
    let response = await fetch('/deshabilitar-user/' + id);
    const data = await response.text();
    return console.log(data);
  }
  catch{
    console.log("error");
  }
}

function obtenerId(url) {
  try {
    let path = url.pathname;
    let arr = path.split("/")
    let id = arr[2];
    return id;
  }
  catch{
    console.log("error");
  }
}