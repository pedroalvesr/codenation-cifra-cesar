const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const caminhoJson = path.resolve(__dirname, 'temp', 'answer.json');
const url = 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution';
const params = {
    token: ''
};

const request = async() => {
    const formulario = new FormData();
    formulario.append('answer', fs.createReadStream(caminhoJson), {
        filename: 'answer.json'
    });

    return await axios.post(url, formulario, { params, headers: formulario.getHeaders() });
};

const jsonAsync = async resultado => {
    return new Promise((resolve, reject) => {
        resolve(resultado.data)
    });
}


const enviarJson = async(req, res) => {
    const resultado = await request();
    let json;

    try {
        json = await jsonAsync(resultado);
        res.json(json);
    } catch (error) {
        res.send(error);
    }
    console.log(`json enviado e sua nota é ${resultado.data.score}`);
}

module.exports = {
    enviarJson: (req, res) => enviarJson(req, res)
}