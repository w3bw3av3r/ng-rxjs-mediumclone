import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from '@mc/auth/data-access'
import { User } from '@mc/core/api-types'

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let jwtToken: User | null = this.authService.authUser
    if (jwtToken?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${jwtToken.token}`,
        },
      })
    }

    return next.handle(request)
  }
}
