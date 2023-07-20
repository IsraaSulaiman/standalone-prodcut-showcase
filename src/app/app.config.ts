import { ApplicationConfig, ErrorHandler, importProvidersFrom } from '@angular/core';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

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
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    MatSnackBarModule,
  ],
};
