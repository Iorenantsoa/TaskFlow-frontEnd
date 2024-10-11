import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseDto } from './dto/user-response.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Router } from '@angular/router';
import { UserLoggedInDto } from './dto/user-logged-in.dto';
import { ToastrService } from 'ngx-toastr';
import { UserChangePass } from './dto/user-change-pass.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private router : Router,
  ) { }

  userRegistration(newUser: RegisterDto): Observable<UserResponseDto> {

    return this.httpClient.post<UserResponseDto>("http://localhost:3000/user/registration", newUser)

  }

  userLogin(credential: LoginDto): Observable<any> {
    return this.httpClient.post<any>("http://localhost:3000/user/login", credential)
  }

  userLogOut() : void{
    localStorage.removeItem('access_token')

    this.router.navigate(['/login'])
  }
  isLogged(): boolean {
    const token = localStorage.getItem('access_token')
    if (token) {
      return true
    } else {
      return false
    }
  }

  getUserLoggedIn () : Observable<UserLoggedInDto> {
    return this.httpClient.get<UserLoggedInDto>("http://localhost:3000/user/getUserLoggedIn")
  }

  onChangePassword(password : UserChangePass) : Observable<any>{
    
    return this.httpClient.put('http://localhost:3000/user/editPassword' , password)
  }

  onEditUser (newUser : UserLoggedInDto) : Observable<any>{
    return this.httpClient.put('http://localhost:3000/user/editUser' , newUser)
  }
}
