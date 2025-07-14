import next from 'next';
import express from 'express';

const port = 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.get('/api/countries', async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/independent?status=true&fields=languages,capital');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('[Countries API Error]:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
    }
  });
  //meteo
  server.get('/api/weather', async (req, res) => {
    const city = req.query.city || 'Monastir';
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('[Weather API]', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

  //open-meteo
  server.get('/api/open-meteo', async (req, res) => {
    const lat = req.query.lat || '48.85', lon = req.query.lon || '2.35';
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
      const data = await (await fetch(url)).json();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //loctation
  server.get('/api/locationiq', async (req, res) => {
    const q = req.query.q || 'Monastir';
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${encodeURIComponent(q)}&format=json`;
    try {
      res.json(await (await fetch(url)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  
  //github
  server.get('/api/github', async (req, res) => {
    const user = req.query.user || 'vercel';
    try {
      res.json(await (await fetch(`https://api.github.com/users/${user}/repos`)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //npm-registry
  server.get('/api/npm', async (req, res) => {
    const pkg = req.query.pkg || 'react';
    try {
      res.json(await (await fetch(`https://registry.npmjs.org/${pkg}`)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //stackexchange
  server.get('/api/stackoverflow', async (req, res) => {
    const tag = req.query.tag || 'javascript';
    try {
      const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`;
      res.json(await (await fetch(url)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //location-ip
  server.get('/api/ipwhois', async (req, res) => {
    try {
      const response = await fetch('https://ipwho.is/');
      const data = await response.json();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  //dns
  server.get('/api/dns', async (req, res) => {
    const domain = req.query.domain || 'example.com';
    try {
      const url = `https://dns.google/resolve?name=${domain}&type=A`;
      res.json(await (await fetch(url)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //economie_crypto
  server.get('/api/crypto', async (_, res) => {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
      res.json(await (await fetch(url)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //economie_twelve
  server.get('/api/twelvedata', async (req, res) => {
    const symbol = req.query.symbol || 'AAPL';
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${process.env.TWELVEDATA_KEY}`;
    try {
      res.json(await (await fetch(url)).json());
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


  

  server.get('/', (req, res) => {
    res.json('Hello from Express');
  });

  server.listen(port, () => {
    console.log(`🚀 Ready on http://localhost:${port}`);
  });

});




