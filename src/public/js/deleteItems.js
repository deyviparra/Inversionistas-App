const inmueble = document.querySelectorAll('.eliminar-inmueble');
const coInver = document.querySelectorAll('.eliminar-coinver');
const tipoApto = document.querySelectorAll('.eliminar-tipoApto');
const modelo = obtenerInfo(window.location, 3);
const id = obtenerInfo(window.location, 2);

inmueble.forEach((element, index) => {
  element.onclick = () => {
    fetch('/eliminar-inmueble/' + id + '/' + modelo + '/' + index, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        window.location.assign(data[0]);
      });

  }
})

coInver.forEach((element, index) => {
  element.onclick = () => {
    fetch('/eliminar-coinver/' + id + '/' + modelo + '/' + index, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        window.location.assign(data[0]);
      });

  }
})

tipoApto.forEach((element, index) => {
    element.onclick = () => {
      fetch('/eliminar-tipoapto/' + id + '/' + index, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          window.location.assign(data[0]);
        });
  
    }
  })

function obtenerInfo(url, n) {
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