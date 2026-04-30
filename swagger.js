const swaggerAutogen = require('swagger-autogen')();

// Configuración general de la documentación
const doc = {
  info: {
    title: 'Recipe API',
    description: 'API for managing cooking recipes',
    version: '1.0.0',
  },
  // Esto permite que Swagger funcione en localhost y en Render sin cambiar el código
  host: '', 
  basePath: '/',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generar la documentación
swaggerAutogen(outputFile, endpointsFiles, doc);