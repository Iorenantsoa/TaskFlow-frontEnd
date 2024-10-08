import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = ""
  email: string = ""
  password: string = ""

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toatr: ToastrService
  ) { }


  onRegister(formulaire: any) {
    this.authenticationService.userRegistration(formulaire.form.value).subscribe(
      (response) => { 
        if (response.success) {
          this.username = ""
          this.email = ""
          this.password = ""
          this.router.navigate(['/login'])
          this.toatr.success(response.message, "Success")
        }
      },
      (error) => {
        this.toatr.error(error, "Erreur")
        console.log(error)
      }
    )
  }


}
