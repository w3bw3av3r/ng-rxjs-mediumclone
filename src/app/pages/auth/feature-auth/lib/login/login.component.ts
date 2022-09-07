import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@mc/auth/data-access'

@Component({
  standalone: true,
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn$.value) {
      this.router.navigateByUrl('/')
    }
  }

  ngOnInit(): void {}
}
