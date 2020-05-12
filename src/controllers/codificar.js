const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const caminhoJson = path.resolve(__dirname, 'temp', 'answer.json');

const sha1 = (decifrado) => {
    return crypto.createHash('sha1').update(decifrado).digest('hex');
}

const atualizarArquivo = (conteudoJson) => {
    fs.writeFile(caminhoJson, JSON.stringify(conteudoJson), error => {
        if (error) {
            console.log(error);
        } else {
            console.log('codificar: arquivo atualizado e codificado em SHA1, pronto para ser enviado!');
        }
    });
}

const jsonDecifrado = () => {
    fs.readFile(caminhoJson, (erro, data) => {
        if (erro) {
            throw erro;
        }

        const conteudoJson = JSON.parse(data);
        const resultado = sha1(conteudoJson.decifrado);
        conteudoJson.resumo_criptografico = resultado;
        atualizarArquivo(conteudoJson);
        return console.log(resultado);
    });
}

module.exports = jsonDecifrado;