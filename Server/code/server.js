const _basedeDados = require("./bd/BasedeDados.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _authentication = require("./routing/_Authentication.js");
const rooter = require("./routing/Router");

//cria ligacao à base de dados
let bd = new _basedeDados.BasedeDados(
  "localhost",
  "root",
  "root",
  "5",
  "brandi_a"
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//port de escuta
const port = process.env.PORT || 5000;

rooter.indexRoute(app, bd);
rooter.loginRoute(app, bd);
rooter.registerRoute(app, bd);
app.listen(port, () => console.log("Listening na porta", port));
