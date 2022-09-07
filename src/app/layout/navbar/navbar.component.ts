import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { User } from '@mc/core/api-types'

@Component({
  standalone: true,
  selector: 'mc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  // @Input() isLoggedIn: boolean = false
  @Input() user: User | null = null
  avatar: string | undefined = undefined

  constructor() {}

  ngOnInit(): void {
    this.avatar =
      this.user?.image !== undefined
        ? this.user?.image
        : 'https://api.realworld.io/images/smiley-cyrus.jpeg'
  }
}
