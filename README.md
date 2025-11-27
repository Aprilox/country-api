# 🌍 Country Info API

Une API simple, rapide et élégante pour récupérer toutes les informations d'un pays à partir de son code ISO (2 ou 3 lettres).

Idéale pour tes projets web, bots Discord, applications mobiles ou tout simplement pour tester une API proprement protégée !

![Express.js](https://img.shields.io/badge/Express.js-4.19.2-black?style=flat&logo=express)
![EJS](https://img.shields.io/badge/EJS-3.1.10-brightgreen)
![Rate Limited](https://img.shields.io/badge/Rate%20Limit-5%20req%2F10s-red)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js)

## ✨ Fonctionnalités

- Recherche par code pays **CCA2** (ex: FR) ou **CCA3** (ex: FRA)
- Retour complet : nom, drapeau, indicatif téléphone, capitales, langues, monnaies, population, région, etc.
- Page d'accueil jolie avec testeur intégré
- Protection anti-abus avec **rate limiting** (configurable)
- Logs clairs des accès et blocages
- 100% prête pour le déploiement (Render, Railway, Vercel, Fly.io, Docker...)

## 🚀 Démarrage rapide

```bash
git clone https://github.com/Aprilox/country-api.git
cd country-api
npm install
npm start
```

→ API disponible sur http://localhost:8083

## 📡 Endpoint

```
GET /country/:code
```

Exemples :
- http://localhost:8083/country/FR
- http://localhost:8083/country/JPN
- http://localhost:8083/country/br

## ⚙️ Configuration (config.json)

```json
{
  "PORT": 8083,
  "rateLimitConfig": {
    "windowMs": 10000,   // 10 secondes
    "max": 5             // 5 requêtes max
  }
}
```

## 🛡️ Rate Limiting

5 requêtes toutes les 10 secondes par IP (facilement modifiable)

## 📂 Structure du projet

```
country-api/
├── index.js
├── config.json
├── countriesData.json        ← obligatoire
├── views/index.ejs
├── public/
│   ├── styles/style.css
│   └── images/favicon.png
└── package.json
```

## ❤️ Créé avec passion par Aprilox

Star le repo si tu kiffes ⭐  
Joyeux codage ! 🚀