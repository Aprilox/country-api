const express = require('express');
const fs = require('fs');
const config = require('./config.json');
const rateLimit = require('express-rate-limit');
const path = require('path');
const app = express();

// Charger les données des pays
let countriesData = [];
const filePath = path.join(__dirname, 'countriesData.json');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors du chargement des données des pays :', err);
        return;
    }
    countriesData = JSON.parse(data);
});

// Configurer EJS comme moteur de templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', '127.0.0.1');

// Middleware pour servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Lire les paramètres de la limitation de taux depuis la configuration
const rateLimitConfig = config.rateLimitConfig;
const apiLimiter = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    message: { error: true, message: 'Too many requests, please try again later.' },

    //AJOUT POUR LOG
    handler: (req, res, next, options) => {
        console.log(`[RateLimit BLOCKED] IP: ${req.ip} - URL: ${req.originalUrl}`);
        res.status(options.statusCode).json(options.message);
    }
});

// Appliquer la limitation de taux uniquement à la route /country/
app.use('/country/', (req, res, next) => {
    console.log(`[Limiter] IP: ${req.ip} - URL: ${req.originalUrl} - Attempting access`);
    next();
}, apiLimiter);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    console.log(`[GET /] IP: ${req.ip}`);

    const domain = req.get('X-Forwarded-Host') || req.get('host');
    res.render('index', {
        domain,
        rateLimit: {
            max: rateLimitConfig.max,
            windowMs: rateLimitConfig.windowMs
        }
    });
});

// Route pour obtenir les informations du pays par diminutif (code pays)
app.get('/country/:code', (req, res) => {
    console.log(`[GET /country/:code] IP: ${req.ip} - Code: ${req.params.code}`);

    // Ce code ne sera exécuté que si la requête passe le middleware de limitation de taux

    const countryCode = req.params.code.toUpperCase();

    // Chercher le pays correspondant au code
    const country = countriesData.find(country =>
        country.cca2 === countryCode || country.cca3 === countryCode
    );

    if (country) {
        res.json({
            error: false,
            country: country
        });
    } else {
        res.status(404).json({
            error: true,
            message: 'Country not found!'
        });
    }
});

// Redirection des routes non existantes vers la page d'accueil
app.get('*', (req, res) => {
    console.log(`[GET *] IP: ${req.ip} - Redirigé vers /`);

    res.redirect('/');
});

// Lancement du serveur
app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});
