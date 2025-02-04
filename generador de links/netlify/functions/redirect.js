const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON que almacena los enlaces
const linksFilePath = path.join(__dirname, 'links.json');

// Cargar los enlaces
let links = {};
if (fs.existsSync(linksFilePath)) {
    links = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
}

exports.handler = async (event) => {
    const id = event.path.split('/').pop(); // Obtener el ID de la URL
    const targetUrl = links[id];

    if (targetUrl) {
        return {
            statusCode: 301,
            headers: { Location: targetUrl },
        };
    } else {
        return {
            statusCode: 404,
            body: 'Enlace no encontrado',
        };
    }
};