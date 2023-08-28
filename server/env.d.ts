declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv extends Dict<string> {
        // Custom environment variable type definitions
        PORT: string;
        DB_PASSWORD: string;
        JWT_SECRET: string;
        CRYPTO_SECRET: string;
        DB_PASSWORD_ONLINE: string;
      }
    }
  }
}
