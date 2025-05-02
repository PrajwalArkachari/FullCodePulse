import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  model: LoginRequest;

  constructor(private authService : AuthService, private cookieService : CookieService, private route : Router){
    this.model={
      email:'',
      password : ''
    }
  }

  onFormSubmit() : void{
     this.authService.login(this.model)
     .subscribe({
      next : (Response) =>{
        this.cookieService.set('Authorization',`Bearer ${Response.token}`,undefined,'/',undefined,true,'Strict');

        //set user
        this.authService.setUser({
          email : Response.email,
          roles : Response.roles
        });
        
        //navigate to home page
        this.route.navigateByUrl('/');
      }
     });
  }
}
