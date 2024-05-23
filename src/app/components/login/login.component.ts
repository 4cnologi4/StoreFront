import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { nombre, password } = this.loginForm.value;
      this.authService.login(nombre, password).subscribe(
        success => {
          if (success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Invalid login credentials';
          }
        },
        error => {
          console.error(error);
          if (error.status === 401) {
            this.errorMessage = 'Usuario no encontrado o credenciales incorrectas.';
          } else {
            this.errorMessage = 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.';
          }
        }
      );
    }
  }
  
}
