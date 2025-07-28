/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const port = process.env.PORT || 3000;

console.log('🚀 Démarrage du serveur...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', port);

// Test simple pour vérifier que le serveur démarre
app.get('/health', (req, res) => {
  console.log('Health check appelé');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    port: port
  });
});

nextApp.prepare().then(() => {
  console.log('✅ Next.js préparé');
  
  // Gérer toutes les routes Next.js
  app.all('*', (req, res) => {
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    return handle(req, res);
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`✅ Serveur démarré sur port ${port}`);
  });
  
}).catch((err) => {
  console.error('❌ Erreur Next.js:', err);
  process.exit(1);
});