export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECT: string;
    }
  }
}