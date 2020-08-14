const pdf = require("html-pdf");
var path = require('path');

const generarPdf = (nombre, ifnf, inversionista, fecha, valorActual) => {
  var options = {
      format:"Letter"
  };

  let totalAportes, totalAlCierre, utilidad;
  let pagadoInversionista = 0;
  let pagadoGarantia = 0;

  const veintePorciento =
    parseInt(ifnf.valor_mutuo * (ifnf.tasa_interes - 1)) + 1;

  if (ifnf.pago_realizado_intereses) {
    ifnf.pago_realizado_intereses[0].historial.forEach(element => {
      if (element.destino == "garantia") {
        pagadoGarantia += parseInt(element.valor);
      } else {
        pagadoInversionista += parseInt(element.valor);
      }
    });
  }
  let totalCalculado =
    Number(ifnf.valor_mutuo) +
    Number(pagadoGarantia) -
    Number(pagadoInversionista) +
    veintePorciento;

  let valorizacion = parseInt(valorActual - ifnf.inmuebles[0].valor);

  const content = `
  <!doctype html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <title>Resumen de inversión FNF</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              font-size:12px;
          }
  
          body {
              margin: 0px 15px;
          }
          h1 {
              color: green;
          }
          h2{
            font-size:20px;
          }
          h4{
              font-size:14px;
          }
          
          #pageHeader img{
            width:200px;
          }
  
          .cajon {
              border: 1px solid black;
              display: inline-block;
              width: 30%;
              margin:10px;
              margin-top:0px;
          }
  
          .cajon div {
              width: 60%;
              display: inline-block;

          }
          .cajon .der {
              width:38%;
          }
  
          .cajon div p,
          .datos div p {
              margin-top: 5px;
          }
          .cajon div p {
            font-size: 10px;
          }
          
  
          .der p {
              text-align: end;
          }
  
          .strong {
              font-weight: 800;
          }
  
          .datos {
              border: 1px solid black;
              width:80%;
              display:inline-block;
          }
          
          .datos div {
              display:inline-block;
              width: 58%;
          }
          .datos .der {
              width:40%;
          }
          .contenedor-detalles {
              display: flex;
              justify-content: space-around;
              width: 100%;
          }
  
          .cajon-2 {
              display: flex;
              align-items: center;
              flex-direction: column;
          }
      </style>
  </head>
  
  <body>
      <!-- ------------------------ -->
      <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;"> 
      <h3>Resumen de invesión - ${inversionista.nombre} ${inversionista.apellido}</h3>
          <p>Reporte creado el ${fecha}</p>
      </div>
      <!-- ------------------------ -->
      <section class="resumen">
          <div class="fechas cajon">
              <div>
                  <p>Fecha inicial</p>
                  <p>Fecha de informe</p>
              </div>
              <div class="der">
                  <p>${ifnf.fecha_inicio}</p>
                  <p>${fecha}</p>
              </div>
          </div>
         
          <div class="aportes cajon">
              <div>
                  <p>Total Aportes</p>
                  <p>Total Portafolio</p>
              </div>
              <div class="der">
                  <p>N/A</p>
                  <p>N/A</p>
              </div>
          </div>
          <div class="utilidad cajon">
              <div>
                  <p>TIR (mensual)</p>
                  <p>Utilidad</p>
              </div>
              <div class="der">
                  <p>N/A</p>
                  <p>N/A</p>
              </div>
          </div> 
      </section>
      <br>
      <br>
      <hr>
      <br>
      <section class="detalles">
          <h2>Detalles</h2>
          <hr>
          <br>
          <div class="contenedor-detalles">
              <div class="cajon-2">
                  <h4 class="strong">Detalles de la inversión</h4>
                  <br>
                  <div class="datos datos-inversion">
                      <div>
                          <p>Inversión</p>
                          <p>Intereses pagados Garantía</p>
                          <p>Intereses pagados Inversionista</p>
                          <p>20% de la inversión</p>
                          <p class="strong">Total</p>
                          <p>Valorización del inmueble en garantía al día</p>
                      </div>
                      <div class="der">
                          <p>${new Intl.NumberFormat("co-CO").format(
                            ifnf.valor_mutuo
                          )}</p>
                          <p>${new Intl.NumberFormat("co-CO").format(
                            pagadoGarantia
                          )}</p>
                          <p>-${new Intl.NumberFormat("co-CO").format(
                            pagadoInversionista
                          )}</p>
                          <p>${new Intl.NumberFormat("co-CO").format(
                            veintePorciento
                          )}</p>
                          <p class="strong">${new Intl.NumberFormat(
                            "co-CO"
                          ).format(totalCalculado)}</p>
                          <p>${new Intl.NumberFormat("co-CO").format(
                            valorizacion
                          )}</p>
                      </div>
                  </div>
              </div>
              <div class="cajon-2">
                  <br>
                  <h4 class="strong">Datos del inversionista</h4>
                  <br>
                  <div class="datos datos-inversionista">
                      <div>
                          <p>Nombre</p>
                          <p>Cedula</p>
                          <p>Correo</p>
                          <p>Celular</p>
                      </div>
                      <div class="der">
                          <p>${inversionista.nombre} ${
    inversionista.apellido
  }</p>
                          <p>${inversionista.cedula}</p>
                          <p>${inversionista.correo}</p>
                          <p>${inversionista.celular}</p>
                      </div>
                  </div>
              </div>
              <div class="cajon-2">
                  <br>
                  <h4 class="strong">Datos del inmueble</h4>
                  <br>
                  <div class="datos datos-garantia">
                      <div>
                          <p>Proyecto</p>
                          <p>Torre</p>
                          <p>Apartamento</p>
                          <p>Parqueadero</p>
                          <p>Cuarto útil</p>
                          <p class="strong">Valor</p>
                      </div>
                      <div class="der">
                          <p>${ifnf.proyecto.nombre}</p>
                          <p>${ifnf.inmuebles[0].torre}</p>
                          <p>${ifnf.inmuebles[0].apartamento}</p>
                          <p>${ifnf.inmuebles[0].parqueadero}</p>
                          <p>${ifnf.inmuebles[0].cuarto_util}</p>
                          <p>${new Intl.NumberFormat("co-CO").format(
                            ifnf.inmuebles[0].valor
                          )}</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <br>
      <br>
      <!-- ------------------------ -->
      <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
          <p
              style="color: #666; width: 70%; margin: 0; padding-bottom: 5px; text-align: let; font-family: sans-serif; font-size: .65em; float: left;">
              <a href="https://fondo-fnf.heroku.com" target="_blank">Generado por Fondo FNF</a></p>
          <p
              style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">
              Página {{page}} de {{pages}}</p>
      </div>
      <!-- ------------------------ -->
  </body>
  
  </html>
`;

  pdf
    .create(content,options)
    .toFile(`./src/public/informes/${nombre}.pdf`, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
};

module.exports = {
  generarPdf: generarPdf
};
