import { CommonModule } from '@angular/common'
import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
} from '@angular/core'
import { Observable, EMPTY, of } from 'rxjs'
import { mergeMap, catchError, map } from 'rxjs/operators'
import {
  MatTabsModule,
  MatTabGroup,
  MatTabChangeEvent,
} from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card'
import {
  Article,
  ArticlesResponse,
  ArticleListConfig,
  Tag,
} from '@mc/core/api-types'
import { ArticlesService } from '@mc/articles/data-access'
import { AuthService } from '@mc/auth/data-access'
import { ArticleListComponent } from '@mc/articles/feature-articles'
import { TaglistComponent } from './tag-list/tag-list.component'

@Component({
  standalone: true,
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    ArticleListComponent,
    TaglistComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly authService: AuthService
  ) {}

  @ViewChild('matTab') listTab!: MatTabGroup
  articles$: Observable<Article[]> = EMPTY
  tags$ = this.articlesService.getTags().pipe(map(({ tags }) => tags))
  listConfig: ArticleListConfig = {
    type: 'ALL',
    currentPage: 1,
    filters: { limit: 10 },
  }
  errorMessage$: Observable<string[]> = EMPTY
  isAuthenticated = this.authService.authUser
  tagTab: string = ''

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isAuthenticated) {
      this.listConfig = { ...this.listConfig, type: 'FEED' }
      this.getArticles(this.listConfig)
    } else this.listTab.selectedIndex = 1
  }

  setArticleList({ index: tabIndex }: MatTabChangeEvent) {
    this.isAuthenticated = this.authService.authUser
    if (this.isAuthenticated === null && this.listTab.selectedIndex === 0) {
      this.listTab.selectedIndex = 1
    }
    this.errorMessage$ = EMPTY
    if (tabIndex <= 1) {
      this.listConfig = {
        ...this.listConfig,
        type: tabIndex === 0 ? 'FEED' : 'ALL',
        filters: { limit: 10 },
      }
      this.getArticles(this.listConfig)
    }
  }

  getArticles(listType: ArticleListConfig) {
    this.articles$ = this.articlesService.getArticles(listType).pipe(
      mergeMap((articles: ArticlesResponse) => [articles.articles]),
      catchError((err) => (this.errorMessage$ = of([err.error.message])))
    )
  }

  setListTag(tag: Tag) {
    this.tagTab = ('#' + tag) as unknown as string
    this.listConfig = {
      ...this.listConfig,
      type: 'ALL',
      filters: { tag: tag, limit: 10 },
    }
    this.getArticles(this.listConfig)
    this.listTab.selectedIndex = 2
  }
}
