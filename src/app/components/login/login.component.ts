import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);

  loginForm = this._FormBuilder.group({
    email:[null],
    password: [null]
  })

  login():void{
    this._UsersService.sigunIn(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (isPlatformBrowser(this._PLATFORM_ID)) {
          localStorage.setItem('socialToken' , res.token);
          this._Router.navigate(['/timeline'])
        }
      }
    })
  }
}
