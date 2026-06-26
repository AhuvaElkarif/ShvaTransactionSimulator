/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the .NET Web API. */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
