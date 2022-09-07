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
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.authUser?.token
    if (jwtToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${jwtToken}`,
        },
      })
    }

    return next.handle(request)
  }
}
