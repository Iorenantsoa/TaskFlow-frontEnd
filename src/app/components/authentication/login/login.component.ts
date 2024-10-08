import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = ""
  password: string = ""

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService

  ) { }

  userLogin(loginForm: NgForm) {
    return this.authenticationService.userLogin(loginForm.form.value).subscribe(
      (response) => {
        if (response.success) {
          this.username = ""
          this.password = ""

          localStorage.setItem('access_token', response.access_token)
          this.toastr.success("Bienvenue sur TaskFlow", 'Succes')

          this.router.navigate(['/dashboard'])
        } else {
          this.toastr.error(response.message, 'Erreur')
        }
      },
      (error) => {
        this.toastr.error(error.message, 'Erreur')
      }
    )
  }
}
