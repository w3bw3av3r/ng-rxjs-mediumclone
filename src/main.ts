import { enableProdMode, importProvidersFrom } from '@angular/core'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { environment } from '@env/environment'

import { AppComponent } from './app/app.component'
import { API_URL } from '@mc/core/http-client'
import { TokenInterceptorService } from '@mc/auth/data-access'

if (environment.production) {
  enableProdMode()
}

const httpInterceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
]

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(
        [
          {
            path: '',
            loadChildren: () =>
              import('@mc/pages/home').then((home) => home.HOME_ROUTES),
          },
          {
            path: 'login',
            loadComponent: () =>
              import('@mc/auth/feature-auth').then(
                (login) => login.LoginComponent
              ),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('@mc/auth/feature-auth').then(
                (register) => register.RegisterComponent
              ),
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
        {
          initialNavigation: 'enabledBlocking',
          useHash: true,
          relativeLinkResolution: 'legacy',
        }
      )
    ),
    { provide: API_URL, useValue: environment.api_url },
    ...httpInterceptors,
  ],
}).catch((err) => console.error(err))
