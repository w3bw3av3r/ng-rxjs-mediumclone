import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { ApiService } from '@mc/core/http-client'
import {
  UserResponse,
  NewUser,
  NewUserRequest,
  User,
  LoginUser,
  LoginUserRequest,
} from '@mc/core/api-types'

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUserSubject$: BehaviorSubject<User | null>
  authUser$: Observable<User | null>

  constructor(private readonly apiService: ApiService) {
    this.authUserSubject$ = new BehaviorSubject(this.getItem('user'))
    this.authUser$ = this.authUserSubject$.asObservable()
  }

  public get authUser(): User | null {
    return this.authUserSubject$.value
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>(
      '/users/login',
      {
        user: credentials,
      }
    )
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
