import { API_BASE_URL, API_ENDPOINTS } from './api-config';
import { WeatherData } from '@/hooks/useWeather';
import { OpenMeteoData } from '@/hooks/useOpenMeteo';
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

  async  getWeather(city: string): Promise<WeatherData> {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      condition: data.weather[0]?.main || '',
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      visibility: data.visibility,
      icon: data.weather[0]?.icon ,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString().substring(11, 19),
      sunset: new Date(data.sys.sunset * 1000).toISOString().substring(11, 19),
    };
  }

  async getOpenMeteo(lat = 48.85, lon = 2.35): Promise<OpenMeteoData> {
    const res = await fetch(`/api/open-weather?lat=${lat}&lon=${lon}`);
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      currentWeather: {
        temperature: data.current_weather.temperature,
        windSpeed: data.current_weather.windspeed,
        windDirection: data.current_weather.winddirection,
        weatherCode: data.current_weather.weathercode,
        isDay: data.current_weather.is_day,
      },
      daily: data.daily,
      hourly: data.hourly,
    };  
    
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
