import { Component } from '@angular/core';
import { Auth, User } from '../../../core/services/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registre',
  standalone:false,
  templateUrl: './registre.html',
  styleUrl: './registre.css',
})
export class Registre {
  registerForm! : FormGroup
  constructor(private authService : Auth,private fb:FormBuilder){
    this.registerForm = this.fb.group({
      nom:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      prenom:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      email:['',[Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.email]],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
    },{
      validators : this.passwordMatchValidator
    });
  }

  get nom(){return this.registerForm.get('nom') as FormControl}
  get prenom(){return this.registerForm.get('prenom') as FormControl}
  get email(){return this.registerForm.get('email') as FormControl}
  get password(){return this.registerForm.get('password') as FormControl}
  get confirmPassword(){return this.registerForm.get('confirmPassword')as FormControl}

  private passwordMatchValidator(form: FormGroup) {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
}


  register() {
  if (this.registerForm.valid) {
    const user: Partial<User> = {
      nom: this.nom.value,
      prenom: this.prenom.value,
      email: this.email.value,
      password: this.password.value,
    };

    const success = this.authService.addUser(user);

    if (success) {
      alert('Inscription réussie');
    } else {
      alert('Email déjà utilisé');
    }
  }
}


}
