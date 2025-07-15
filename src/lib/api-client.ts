import { API_BASE_URL, API_ENDPOINTS } from './api-config';

type RequestOptions = RequestInit & {
  headers?: Record<string, string>;
};

class ApiClient {
  baseURL: string;

  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  async request(endpoint: string, options: RequestOptions = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getWeather(city = 'Monastir') {
    return this.request(`${API_ENDPOINTS.weather}?city=${encodeURIComponent(city)}`);
  }

  async getOpenMeteo(lat = '48.85', lon = '2.35') {
    return this.request(`${API_ENDPOINTS.openMeteo}?lat=${lat}&lon=${lon}`);
  }

  async getLocation(query = 'Monastir') {
    return this.request(`${API_ENDPOINTS.locationIQ}?q=${encodeURIComponent(query)}`);
  }

  async getCountries() {
    return this.request(API_ENDPOINTS.countries);
  }

  async getGithubRepos(user = 'vercel') {
    return this.request(`${API_ENDPOINTS.github}?user=${user}`);
  }

  async getNpmPackage(pkg = 'react') {
    return this.request(`${API_ENDPOINTS.npm}?pkg=${pkg}`);
  }

  async getStackOverflowQuestions(tag = 'javascript') {
    return this.request(`${API_ENDPOINTS.stackoverflow}?tag=${tag}`);
  }

  async getIpInfo() {
    return this.request(API_ENDPOINTS.ipWhois);
  }

  async getDnsInfo(domain = 'example.com') {
    return this.request(`${API_ENDPOINTS.dns}?domain=${domain}`);
  }

  async getCryptoData() {
    return this.request(API_ENDPOINTS.crypto);
  }

  async getTwelveData(symbol = 'AAPL') {
    return this.request(`${API_ENDPOINTS.twelveData}?symbol=${symbol}`);
  }
}

export const apiClient = new ApiClient();
