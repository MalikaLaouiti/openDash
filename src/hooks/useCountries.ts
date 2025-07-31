import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [langCode: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld?: string[];
  currencies?: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  gini?: {
    [year: string]: number;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  coatOfArms?: {
    png: string;
    svg?: string;
  };
  borders?: string[];
  area: number;
  languages?: {
    [code: string]: string;
  };
  translations?: {
    [langCode: string]: {
      official: string;
      common: string;
    };
  };
  timezones?:string[];
 
}

export function useCountries(countryCode?: string) {
  
  return useApi<Country>(() => apiClient.getCountries(countryCode), [countryCode]);
}