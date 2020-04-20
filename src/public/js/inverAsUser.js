let checkbox = document.getElementsByName("habilitar-user");
checkbox.forEach(element => element.addEventListener("change", verificarEstado,false));



function verificarEstado(e) {
    if(e.target.checked){
        habilitar();
    }else{
        deshabilitar();
    }
}

  async function habilitar(){
    let url = window.location;
    const id = obtenerId(url);
    let response = await fetch('/habilitar-user/' + id);
    const data =  await response.text()
    return console.log(data)    
  }

  async function deshabilitar(){
    let url = window.location;
    const id = obtenerId(url);
    let response = await fetch('/deshabilitar-user/' + id);
    const data =  await response.text()
    return console.log(data)  
  }
  
  function obtenerId(url){
      let path = url.pathname;
      let arr = path.split("/")
      let id = arr[2]
      return id
  }