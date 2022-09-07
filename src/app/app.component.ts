import { CommonModule } from '@angular/common'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FooterComponent } from './layout/footer/footer.component'
import { NavbarComponent } from './layout/navbar/navbar.component'
import { AuthService } from './pages/auth/data-access'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, CommonModule, NavbarComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {}
  isLoggedIn = this.authService.isLoggedIn$.value
  userData$ = this.authService.authUser$
}
