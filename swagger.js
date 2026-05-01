const swaggerAutogen = require('swagger-autogen')();

// Lógica inteligente: Si existe la variable de Render, úsala. Si no, usa localhost.
const host = process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8080';
const schemes = process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'Recipe API',
    description: 'API for managing cooking recipes',
  },
  host: host, // Aquí se pone el host automático
  schemes: schemes, // Aquí se ponen los protocolos automáticos
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);