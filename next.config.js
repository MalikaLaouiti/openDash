/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  async rewrites() {
    // En développement, rediriger vers le serveur Express local
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ];
    }
    
    // En production, utiliser les fonctions serverless de Vercel
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
