import { enableProdMode, importProvidersFrom } from '@angular/core'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router'
import { environment } from '@env/environment'

import { AppComponent } from '@default/app.component'
import { API_URL } from '@default/core/http-client'

if (environment.production) {
  enableProdMode()
}

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
              import('@mc/home/home.routes').then((home) => home.HOME_ROUTES),
          },
          {
            path: 'register',
            loadComponent: () =>
              import('@mc/pages/auth').then(
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
  ],
}).catch((err) => console.error(err))
