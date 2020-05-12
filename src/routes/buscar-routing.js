module.exports = (router) => {

    const codenation = require('../controllers/criarJson');

    router.group('/buscar', (router) => {
        router.get('/json', codenation.buscarJson)
    });
};