const axios = require('axios');
const fs = require('fs');
const path = require('path');

const descifrar_json = require('./descifrar');


const caminhoJson = path.resolve(__dirname, 'temp', 'answer.json');
const url = 'https://api.codenation.dev/v1/challenge/dev-ps/generate-data';
const params = {
    token: ''
};


const request = async() => {
    return await axios.get(url, { params });
};

const buscarJson = async(req, res) => {
    const resultado = await request();
    let json;

    try {
        json = await jsonAsync(resultado);
        res.json(json);
        fs.writeFile(caminhoJson, JSON.stringify(json), error => {
            if (error) {
                console.log(error);
            } else {
                console.log('criarJson: arquivo criado e salvo!');
                descifrar_json();
            }
        });
    } catch (error) {
        res.send(error);
    }
};

const jsonAsync = async resultado => {
    return new Promise((resolve, reject) => {
        resolve(resultado.data)
    });
}


module.exports = {
    buscarJson: (req, res) => buscarJson(req, res)
}