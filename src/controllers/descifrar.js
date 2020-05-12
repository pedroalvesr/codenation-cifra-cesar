const fs = require('fs');
const path = require('path');
const codificar_json = require('./codificar');

const caminhoJson = path.resolve(__dirname, 'temp', 'answer.json');

const descifrar = (cifrado, chave) => {
    let decifrado = '';

    for (let i = 0; i < cifrado.length; i++) {
        const codigo = cifrado.toLocaleUpperCase().charCodeAt(i);
        let c = '';

        if (codigo >= 65 && codigo <= 90) {
            if (codigo - chave < 65) {
                c = String.fromCharCode((codigo - chave) + (90 - 65) % 26 + 1)
            } else {
                c = String.fromCharCode(codigo - chave);
            }
        } else {
            if (codigo == 32 || codigo == 46) {
                c = String.fromCharCode(codigo);
            }
        }
        decifrado += c;
    }
    return decifrado.toLocaleLowerCase();
}

const atualizarArquivo = (conteudoJson) => {
    fs.writeFile(caminhoJson, JSON.stringify(conteudoJson), error => {
        if (error) {
            console.log(error);
        } else {
            console.log('decrifrarTexto: arquivo atualizado!');
            codificar_json();
        }
    });
}

const jsonDecifrado = () => {
    fs.readFile(caminhoJson, (erro, data) => {
        if (erro) {
            throw erro;
        }

        const conteudoJson = JSON.parse(data);
        const resultado = descifrar(conteudoJson.cifrado, conteudoJson.numero_casas);
        conteudoJson.decifrado = resultado;
        atualizarArquivo(conteudoJson);
        return console.log(resultado);
    });
}

module.exports = jsonDecifrado;