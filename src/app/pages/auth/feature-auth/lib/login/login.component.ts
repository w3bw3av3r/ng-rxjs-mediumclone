import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { RouterModule, Router } from '@angular/router'
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { catchError, finalize, map, tap } from 'rxjs/operators'
import { AuthService } from '@mc/auth/data-access'
import { LoginUser, UserResponse } from '@mc/core/api-types'
@Component({
  standalone: true,
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
  ) {
    if (this.authService.authUser) {
      this.router.navigateByUrl('/')
    }
  }
  @ViewChild('loginUserFormGroup') loginUserFormGroup!: FormGroupDirective
  userLogin$!: Subscription
  loginUserForm: FormGroup = this.fb.group({
    email: ['tofu@test.com'],
    password: ['123'],
  })
  isSubmitting = new Subject<boolean>()
  errors: string[] = []

  get loginForm() {
    return this.loginUserFormGroup.control
  }

  ngOnInit(): void {
    this.isSubmitting.next(true)
  }

  handleUserLogin(userCredentials: LoginUser) {
    this.loginForm.disable()
    this.isSubmitting.next(true)
    this.userLogin$ = this.authService
      .login(userCredentials)
      .pipe(
        tap(({ user }) => this.authService.authUserSubject$.next(user)),
        map(({ user }: UserResponse) => {
          this.authService.setItem('user', user)
          this.router.navigateByUrl('/')
        }),
        catchError(
          async ({ error: { errors } }: HttpErrorResponse) =>
            (this.errors = Object.keys(errors || {}).map(
              (key) => `${key} ${errors[key]}`
            ))
        ),
        finalize(() => {
          this.loginForm.enable()
          this.isSubmitting.next(false)
        })
      )
      .subscribe()
  }
}
