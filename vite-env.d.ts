declare global {
  interface ImportMetaEnv {
    readonly GAO_PREFIX: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
