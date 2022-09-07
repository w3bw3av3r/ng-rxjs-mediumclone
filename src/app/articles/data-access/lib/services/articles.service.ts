import { Injectable } from '@angular/core'
import { HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ApiService } from '@mc/core/http-client'
import {
  ArticlesResponse,
  TagsResponse,
  ArticleListConfig,
} from '@mc/core/api-types'

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private readonly apiService: ApiService) {}

  getArticles(config: ArticleListConfig): Observable<ArticlesResponse> {
    return this.apiService.get(
      '/articles' + (config.type === 'FEED' ? '/feed' : ''),
      this.toHttpParams(config.filters)
    )
  }

  getTags(): Observable<TagsResponse> {
    return this.apiService.get('/tags')
  }

  private toHttpParams(params: any) {
    return Object.getOwnPropertyNames(params).reduce(
      (p, key) => p.set(key, params[key]),
      new HttpParams()
    )
  }
}
