// Este es el "escudo" o "portero" semana 4 
const isAuthenticated = (req, res, next) => {
    // Si el usuario no está logueado en la sesión
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access. Please log in first.");
    }
    // Si está logueado, le permitimos pasar a la siguiente función
    next();
};

module.exports = {
    isAuthenticated
};