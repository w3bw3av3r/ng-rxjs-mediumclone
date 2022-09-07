import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { ApiService } from '@mc/core/http-client'
import { UserResponse, NewUser, NewUserRequest, User } from '@mc/core/api-types'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUserSubject$ = new BehaviorSubject<User | null>(null)
  authUser$ = this.authUserSubject$.asObservable()
  isLoggedIn$ = new BehaviorSubject<boolean>(false)
  jwtToken$ = new BehaviorSubject<string | undefined>('')

  constructor(private readonly apiService: ApiService) {
    this.authUserSubject$.next(this.getItem('user'))
    console.debug(
      '[AuthService] authUserSubject$.value>>>',
      this.authUserSubject$.value
    )
    this.isLoggedIn$.next(this.authUserSubject$.value ? true : false)
    console.debug('[AuthService] isLoggedIn$.value>>>', this.isLoggedIn$.value)
    this.jwtToken$.next(this.authUserSubject$.value?.token)
    console.debug('[AuthService] jwtToken$.value>>>', this.jwtToken$.value)
  }

  register(credentials: NewUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, NewUserRequest>('/users', {
      user: credentials,
    })
  }

  getItem<T>(key: string): T | null {
    const keyValue = localStorage.getItem(key)
    if (keyValue) return JSON.parse(keyValue)
    return null
  }

  setItem<T>(key: string, data: T): Observable<T> {
    localStorage.setItem(key, JSON.stringify(data))
    return of(data)
  }

  removeItem(key: string): Observable<boolean> {
    localStorage.removeItem(key)
    return of(true)
  }
}
