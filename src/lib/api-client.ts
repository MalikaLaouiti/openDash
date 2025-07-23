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

  async getOpenMeteo(): Promise<OpenMeteoData> {
    const res = await fetch(`/api/open-meteo`);
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation,
      generationtime_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds,
      daily_units: {
        time: 'iso8601',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        precipitation_sum: 'mm',
      },
      daily: {
        time: data.daily.time,
        temperature_2m_max: data.daily.temperature_2m_max,
        temperature_2m_min: data.daily.temperature_2m_min,
        precipitation_sum: data.daily.precipitation_sum,
      },
    };  
    
  }

  async getIpInfo() {
    const res = await fetch(API_ENDPOINTS.ipwhois);
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();

    return {
      ip: data.ip,
      success: data.success,
      type: data.type,
      continent: data.continent,
      continent_code: data.continent_code,
      country: data.country,
      country_code: data.country_code,
      region: data.region,
      region_code: data.region_code,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      is_eu: data.is_eu,
      postal: data.postal,
      calling_code: data.calling_code,
      capital: data.capital,
      borders: data.borders,
      flag: {
        img: data.flag.img,
        emoji: data.flag.emoji,
        emoji_unicode: data.flag.emoji_unicode
      },
      connection: {
        asn: data.connection.asn,
        org: data.connection.org,
        isp: data.connection.isp
      },
      timezone: {
        id: data.timezone.id,
        abbr: data.timezone.abbr,
        is_dst: data.timezone.is_dst,
        offset: data.timezone.offset,
        utc: data.timezone.utc
      }
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
