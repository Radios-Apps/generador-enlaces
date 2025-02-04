const { v4: uuidv4 } = require('uuid'); // Para generar IDs únicos
const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON que almacena los enlaces
const linksFilePath = path.join(__dirname, 'links.json');

// Cargar o inicializar el archivo de enlaces
let links = {};
if (fs.existsSync(linksFilePath)) {
    links = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'));
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Método no permitido' };
    }

    const { url } = JSON.parse(event.body);
    if (!url) {
        return { statusCode: 400, body: 'URL no proporcionada' };
    }

    // Generar un ID único para el enlace
    const id = uuidv4().substr(0, 8); // Usa solo los primeros 8 caracteres del UUID
    links[id] = url;

    // Guardar los enlaces en el archivo JSON
    fs.writeFileSync(linksFilePath, JSON.stringify(links, null, 2));

    // Retornar la URL acortada
    return {
        statusCode: 200,
        body: JSON.stringify({ shortUrl: `${process.env.URL}/${id}` }),
    };
};