import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [DatePipe], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _Router = inject(Router);
  private readonly _datePipe = inject(DatePipe);  // Inject DatePipe here


  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],

    email: [null , [Validators.required , Validators.email]],

    password: [null , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],

    rePassword:[null],

    dateOfBirth: [null],

    gender:[null],

  }    ,{validators:[this.confirmPassword]}
)
confirmPassword (g:AbstractControl){
  return g.get('password')?.value == g.get('rePassword')?.value ? null : {'mismatch' : true};
}
onDateChange(event: any) {
  const formattedDate = this._datePipe.transform(event, 'd-M-yyyy');
  this.registerForm.get('dateOfBirth')?.setValue(formattedDate, { emitEvent: false });
}

  register():void{
    this._UsersService.sigunUp(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (isPlatformBrowser(this._PLATFORM_ID)) {
          this._Router.navigate(['/login'])
        }
      }
    })
  }
}

