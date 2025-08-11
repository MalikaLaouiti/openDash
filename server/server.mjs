import express from 'express';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();


app.get('/api/countries', async (req, res) => {
  const code = req.query.code;
  const url = `https://restcountries.com/v3.1/alpha/${code}`;
  if (!code) {
    return res.status(400).json({ error: 'Missing country code in query parameters' });
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data[0]);
  } catch (error) {
    console.error('[Countries API Error]:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Monastir';
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  
  // Vérifier si la clé API existe
  if (!apiKey) {
    console.error('[Weather API Error]: OPENWEATHERMAP_API_KEY manquante dans les variables d\'environnement');
    return res.status(500).json({ 
      error: 'Clé API OpenWeather manquante. Veuillez configurer OPENWEATHERMAP_API_KEY dans votre fichier .env.local' 
    });
  }
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('[Weather API]', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/open-meteo', async (req, res) => {
  const lat = req.query.lat || '35.78';
  const lon = req.query.lon || '10.83';
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe/Paris`;
  try {
    const data = await (await fetch(url)).json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/locationiq', async (req, res) => {
  const key = process.env.LOCATIONIQ_KEY;
  if (!key) {
    return res.status(500).json({ error: 'Missing LOCATIONIQ_KEY in environment' });
  }

  const lat = req.query.lat || '35.766';
  const lon = req.query.lon || '10.836';

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon in query parameters' });
  }
  const url = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/worldBank', async (req, res) => {
  const countryCode = req.query.country || 'TN';
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/EN.POP.DNST?format=json`;

  if (!countryCode) {
    return res.status(400).json({ error: 'Missing country code in query parameters' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    res.status(200).json(data[1]);
  } catch (error) {
    console.error('[World Bank API Error]:', error);
    res.status(500).json({ error: 'Failed to fetch data from World Bank API' });
  }
});

app.get('/api/github', async (req, res) => {
  const user = req.query.user || 'vercel';
  try {
    res.json(await (await fetch(`https://api.github.com/users/${user}/repos`)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/npm', async (req, res) => {
  const pkg = req.query.pkg || 'nextjs';
  try {
    res.json(await (await fetch(`https://registry.npmjs.org/${pkg}`)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/stackoverflow', async (req, res) => {
  const tag = req.query.tag || 'javascript';
  try {
    const url = `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`;
    res.json(await (await fetch(url)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/ipwhois', async (req, res) => {
  try {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string" ? forwarded.split(",")[0] : "197.25.89.64";
    const response = await fetch(`https://ipwho.is/${ip}`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/dns', async (req, res) => {
  const domain = req.query.domain || 'example.com';
  try {
    const url = `https://dns.google/resolve?name=${domain}&type=A`;
    res.json(await (await fetch(url)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/crypto', async (_, res) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';
    res.json(await (await fetch(url)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/twelvedata', async (req, res) => {
  const symbol = req.query.symbol || 'AAPL';
  const url = `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${process.env.TWELVEDATA_KEY}`;
  try {
    res.json(await (await fetch(url)).json());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Export the Express app as a serverless function
export default app;

// Start the server locally if not in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur Express démarré sur le port ${PORT}`);
  });
}