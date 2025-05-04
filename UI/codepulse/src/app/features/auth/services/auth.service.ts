import { Injectable } from '@angular/core';
import {  BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { LoginRequest } from '../models/login-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { user } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<user | undefined>(undefined);

  constructor(private http : HttpClient, private cookieService : CookieService) { }


login(request : LoginRequest) : Observable<LoginResponse>{

  return this.http.post<LoginResponse>('http://localhost:5193/api/Auth/login', {
    email : request.email,
    password : request.password
  });

}

setUser(user : user) : void {
  this.$user.next(user)
  localStorage.setItem('user-email',user.email);
  localStorage.setItem('user-roles', user.roles.join(','));
}

user() : Observable<user | undefined>{
  return this.$user.asObservable();
}

getUser() : user | undefined{
  const email = localStorage.getItem('user-email');
  const roles = localStorage.getItem('user-roles');

  if(email&& roles){
    const User : user ={
      email : email,
      roles : roles.split(',')
    };
    return User;
  }

  return undefined;
}

logout(): void {
  this.cookieService.delete('Authorization','/');
  this.$user.next(undefined);
}

}