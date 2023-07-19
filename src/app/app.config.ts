import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withPreloading,
} from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './routes/app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import  AppHttpInterceptor  from './interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules)
      // withDebugTracing()
    ),
    provideHttpClient(withInterceptors([AppHttpInterceptor])),
    provideClientHydration(),
  ],
};
