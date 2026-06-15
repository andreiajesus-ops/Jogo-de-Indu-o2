const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));


// BUSCAR DADOS
app.get("/dados", (req, res) => {
    const dados = fs.readFileSync("dados.json");
    res.json(JSON.parse(dados));
});


// SALVAR INVESTIGAÇÃO DO PROFESSOR
app.post("/salvar-investigacao", (req, res) => {

    const dados = JSON.parse(
        fs.readFileSync("dados.json")
    );

    dados.investigacao4 = req.body;

    fs.writeFileSync(
        "dados.json",
        JSON.stringify(dados, null, 2)
    );

    res.json({
        mensagem: "Investigação salva!"
    });
});


app.listen(3000, () => {
    console.log("Servidor do jogo iniciado 🕵️");
});