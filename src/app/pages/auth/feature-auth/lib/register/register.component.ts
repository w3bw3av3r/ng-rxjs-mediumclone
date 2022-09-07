import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpErrorResponse } from '@angular/common/http'
import { Router, RouterModule } from '@angular/router'
import { Subject, Subscription } from 'rxjs'
import { map, catchError, finalize, tap } from 'rxjs/operators'
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormGroupDirective,
} from '@angular/forms'
import { AuthService } from '@mc/auth/data-access'
import { NewUser, UserResponse } from '@mc/core/api-types'

@Component({
  standalone: true,
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly authService: AuthService
  ) {
    if (this.authService.authUser) {
      this.router.navigateByUrl('/')
    }
  }

  @ViewChild('registerUserFormGroup') registerUserFormGroup!: FormGroupDirective
  userRegister$!: Subscription
  registerUserForm: FormGroup = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
  })
  isSubmitting = new Subject<boolean>()
  errors: string[] = []

  get registerForm() {
    return this.registerUserFormGroup.control
  }

  ngOnInit(): void {}

  handleUserRegistration(userCredentials: NewUser) {
    this.registerForm.disable()
    this.isSubmitting.next(true)
    this.userRegister$ = this.authService
      .register(userCredentials)
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
          this.registerForm.enable()
          this.isSubmitting.next(false)
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    if (this.userRegister$) this.userRegister$.unsubscribe()
  }
}
