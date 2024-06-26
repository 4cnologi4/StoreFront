import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';

import routes from './app.routes';
import { provideHttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      RouterModule,
      FormsModule,
      JwtModule.forRoot({
        config: {
          tokenGetter,
          allowedDomains: ["localhost:44313"],
          disallowedRoutes: []
        }
      })
    )
  ]
};
