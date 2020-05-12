module.exports = (router) => {

    const codenation = require('../controllers/enviarJson');

    router.group('/enviar', (router) => {
        router.get('/json', codenation.enviarJson)
    });
};