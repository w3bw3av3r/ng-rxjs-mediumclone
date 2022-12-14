import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable, Inject } from '@angular/core'
import { Observable } from 'rxjs'
import { API_URL } from '@mc/core/http-client'

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject(API_URL) private api_url: string
  ) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.api_url}${url}`, {
      headers: this.headers,
      params,
    })
  }

  post<T, D>(url: string, data: D): Observable<T> {
    return this.http.post<T>(`${this.api_url}${url}`, JSON.stringify(data), {
      headers: this.headers,
    })
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    return new HttpHeaders(headersConfig)
  }
}
