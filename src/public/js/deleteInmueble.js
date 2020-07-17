const deleteArr = document.querySelectorAll('.eliminar-inmueble')
const modelo=obtenerInfo(window.location,3)
const id=obtenerInfo(window.location,2)


console.log(deleteArr)
deleteArr.forEach((element,index)=>{
    console.log(element)
    element.onclick = ()=>{
        console.log(index)
        console.log(modelo)
        console.log(id)
        
        fetch('/eliminar-inmueble/'+id+'/'+modelo+'/'+index,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
              }
            
        })
        .then(() =>{console.log('Exito')})

    }
})
function obtenerInfo(url,n) {
    try {
      let path = url.pathname;
      let arr = path.split("/")
      let id = arr[n];
      return id;
    }
    catch{
      console.log("error");
    }
  }