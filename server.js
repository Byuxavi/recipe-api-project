const express = require('express'); // es el edificio ya construido. En lugar de fabricar tus propios ladrillos para manejar peticiones HTTP, usas esta estructura profesional.
const cors = require('cors'); // los navegadores bloquean peticiones que vienen de dominios diferentes. CORS es el "permiso especial" que dice: "Está bien, confío en esta web (o en todas) y dejo que me pidan datos".
const mongoose = require('mongoose'); // Es una librería (un traductor).
//¿Por qué se combina con JS? Porque JavaScript no sabe hablar directamente con MongoDB de forma estructurada. Mongoose traduce tus objetos de JavaScript a documentos que la base de datos entiende.
require('dotenv').config();
const session = require('express-session'); // Es el carnet de visitante. Cuando haces login, el servidor te da un carnet (la sesión). Mientras lo tengas, el edificio sabe quién eres aunque cambies de habitación (de ruta). Si no existiera, tendrías que loguearte cada vez que haces clic en un botón.
const passport = require('./middleware/passport'); // Es el recepcionista. Passport se encarga de hablar con terceros (en este caso GitHub) para verificar que tú eres quien dices ser. Él hace el trabajo sucio de validar tus credenciales y luego le dice a la "sesión": "Oye, este tipo es Javier, dale su carnet"

const app = express(); // Este es el encendido del edificio. Activa todas las funciones de Express para que tu servidor empiece a escuchar y procesar datos.
const port = process.env.PORT || 8080; // Tu dirección postal. Es el canal específico por el cual el mundo exterior puede enviarte cartas (peticiones).

app.use(cors());
app.use(express.json()); // Prepárate para recibir JSON".
//¿Qué hace? Cuando envías datos desde tu archivo .rest o desde Swagger, viajan como un texto plano muy largo. Esta función agarra ese texto y lo convierte automáticamente en un objeto de JavaScript para que tú puedas usar req.body.title. Sin esto, req.body sería undefined.
//semana 4
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret', // Es la "firma" del carnet. Es una palabra secreta (guardada en tu .env) que el servidor usa para cifrar la cookie. Así, nadie puede falsificar su identidad.
  resave: false, // Esto le dice al servidor: "Si la sesión no ha cambiado, no la vuelvas a guardar en la base de datos". Esto ahorra energía y hace que tu servidor sea más rápido.
  saveUninitialized: true // (A veces se pone en false, pero para pruebas es útil). Significa que si alguien visita tu página, aunque no se loguee, el servidor le asigna un carnet vacío. Es como darle un ticket numerado a cualquiera que entre al edificio, aunque no sea un empleado.
}));

app.use(passport.initialize()); // Es como decirle al recepcionista: "¡A trabajar!". Prepara a Passport para que esté atento a cualquier intento de login en las rutas.
app.use(passport.session()); // una vez que te logueas, el servidor "recuerda" quién eres en cada clic que das. Passport lee el carnet de la sesión y dice: "Ah, este es Javier, déjalo pasar a las recetas".
// hasta aqui semana 4 
app.use('/', require('./routes'));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`🚀 Database connected and server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('❌ Connection error:', err);
    });