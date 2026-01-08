import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm! : FormGroup;

  constructor(private authService : Auth,private fb:FormBuilder,private router:Router){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email,Validators.maxLength(20),Validators.minLength(5)]],
      password: ['',[Validators.required,Validators.minLength(8)]]
    })
  }
  
  get email(){
    return this.loginForm.get('email') as FormControl;
  }
  get password(){
    return this.loginForm.get('password') as FormControl;
  }
  login() {
  console.log(this.loginForm.value); // Vérifie ce qui est soumis
  console.log(this.loginForm.valid); // Vérifie si le formulaire est valide

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    console.log('Formulaire invalide');
    return;
  }

  const user = this.loginForm.value;
  const success = this.authService.logIn(user);
  console.log('Résultat login:', success);

  if (success) {
    console.log('Login réussi, navigation vers /home');
    this.router.navigate(['/home']);
  } else {
    console.log('Login échoué');
    alert('Email ou mot de passe incorrect');
  }
}


}
