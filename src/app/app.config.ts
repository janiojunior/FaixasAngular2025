import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideHttpClient(),
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: {}}
  ]
};

