import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '@mc/auth/data-access'

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private jwtToken: string | undefined = undefined

  constructor(private readonly authService: AuthService) {
    this.jwtToken = this.authService.jwtToken$.value
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.jwtToken) {
      console.debug('[AUTH INTERCEPTOR] jwtToken.value>>>', this.jwtToken)
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtToken}`,
        },
      })
    }

    return next.handle(request)
  }
}
