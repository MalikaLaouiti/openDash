import { apiClient } from '@/lib/api-client';
import { useApi } from './useApi';


export interface NpmPackage {
  name: string;
  description?: string;
  distTags?: Record<string, string>; // e.g., { latest: "1.2.3" }
  license?: string;
  author?: Author;
  maintainers?: Maintainer[];
  keywords?: string[];
  homepage?: string;
  repository?: {
    type?: string;
    url?: string;
    directory?: string;
  };
  bugs?: {
    url?: string;
    email?: string;
  };
  readme?: string;
  readmeFilename?: string;
  time?: {
    created?: string;
    modified?: string;
    [version: string]: string | undefined;
  };
  versions?: Record<string, NpmPackageVersion>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  engines?: {
    node?: string;
    npm?: string;
  };
  downloadsLastWeek?: number; // From npm downloads API
}

export interface NpmPackageVersion {
  name: string;
  version: string;
  description?: string;
  keywords?: string[];
  license?: string;
  author?: Author;
  main?: string;
  engines?: {
    node?: string;
    npm?: string;
  };
  _from?: string;
  _npmVersion?: string;
  _npmUser?: Maintainer;
  maintainers?: Maintainer[];
  directories?: Record<string, unknown>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  homepage?: string;
  repository?: {
    type?: string;
    url?: string;
    directory?: string;
  };
  bugs?: {
    url?: string;
    email?: string;
  };
}

export interface Author {
  name: string;
  email?: string;
  url?: string;
}

export interface Maintainer {
  name: string;
  email?: string;
}


export function useNpm (pkg?: string) {
  return useApi<NpmPackage>(() => apiClient.getNpmPackage(pkg), [pkg]);
}