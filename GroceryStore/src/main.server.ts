export { AppServerModule as default } from './app/app.module.server';

export const provideHttpClient = (httpClient: any) => {
  // Use the fetch method provided by Angular Universal
  return httpClient.withFetch(() => fetch);
};
