const express = require('express');
const packege = require('./package');

const route_buscarJson = require('./routes/buscar-routing');
const route_enviarJson = require('./routes/enviar-routing');
require('express-group-routes');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port);

app.get("/", (res, req) => {
    req.json(packege);
});

route_buscarJson(app);
route_enviarJson(app);

console.log("Aplicação iniciada na porta " + port);