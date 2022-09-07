import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { EMPTY, Observable, of } from 'rxjs'
import { Article } from '@mc/core/api-types'
import { ArticleListItemComponent } from './article-list-item/article-list-item.component'

@Component({
  standalone: true,
  selector: 'mc-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [CommonModule, ArticleListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  @Input('listConfig') listConfigProp!: string
  @Input('articles') articlesProp!: Article[] | null
  @Input('error') errorMessageProp!: string[] | null
  articles$: Observable<Article[]> = EMPTY
  isArticleLoading$: Observable<boolean> = of(false)
}
