import next from 'next';
import express from 'express';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
// const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Express' });
  });

  server.listen(port, () => {
    console.log(`🚀 Ready on http://localhost:${port}`);
  });
});
