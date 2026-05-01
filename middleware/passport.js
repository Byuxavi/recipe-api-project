//semana 4 
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // Esto intentará usar la variable de Render, y si no existe, usará localhost
    callbackURL: process.env.CALLBACK_URL || "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Aquí es donde recibes los datos de GitHub (nombre, id, etc.)
    // Por ahora, solo dejamos pasar al usuario sin guardarlo en DB aún
    return done(null, profile);
  }
));

// Necesario para que Passport sepa cómo manejar al usuario en la sesión
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;