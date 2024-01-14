export { AppServerModule as default } from './app/app.module.server';

export const provideHttpClient = (httpClient: any) => {
  return httpClient.withFetch(() => fetch);
};
