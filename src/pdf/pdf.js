const pdf = require('html-pdf');

const generarPdf = (nombre,var1,var2,var3)=>{
const content = `
<!doctype html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>PDF Result Template</title>
            <style>
                h1 {
                    color: green;
                }
            </style>
        </head>
        <body>
        <div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
        <p>Anartz - Ejemplo de cabecera en HTML PDF</p>
        </div>
        <div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
        <p style="color: #666; width: 70%; margin: 0; padding-bottom: 5px; text-align: let; font-family: sans-serif; font-size: .65em; float: left;"><a href="https://anartz-mugika.com" target="_blank">https://anartz-mugika.com</a></p>
        <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
        </div>
        <h1>Título en el PDF creado con el paquete html-pdf</h1>
        <h2>var 1 es ${var1}</h2>
        
        <h2>var 2 es ${var2}</h2>
        <h2>var 3 es ${var3}</h2>
            <p>Generando un PDF con un HTML sencillo</p>
        </body>
    </html>
`;


pdf.create(content).toFile(`./src/public/informes/${nombre}.pdf`, function(err, res) {
    if (err){
        console.log(err);
    } else {
        console.log(res);
    }
});
return 'Resolved'
}

module.exports = {
    'generarPdf':generarPdf
}