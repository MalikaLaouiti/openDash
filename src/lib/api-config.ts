export const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ENDPOINTS: Record<string, string> = {
  weather: '/api/weather',
  openMeteo: '/api/open-meteo',
  locationIQ: '/api/locationiq',
  countries: '/api/countries',
  github: '/api/github',
  npm: '/api/npm',
  stackoverflow: '/api/stackoverflow',
  ipWhois: '/api/ipwhois',
  dns: '/api/dns',
  crypto: '/api/crypto',
  twelveData: '/api/twelvedata',
};
