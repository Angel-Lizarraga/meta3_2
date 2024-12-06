const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Estudiantes',
            version: '1.0.0',
            description: 'API para gestionar el registro de estudiantes',
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./routes/*.js'], // Ubicación de los archivos de rutas
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;
