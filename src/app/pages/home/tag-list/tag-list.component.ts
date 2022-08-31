import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Tag } from '@default/core/api-types'

@Component({
  standalone: true,
  selector: 'mc-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaglistComponent {
  @Input('tags') tagsProp: Tag[] | null = []
  @Output() setListTag: EventEmitter<Tag> = new EventEmitter()
}
