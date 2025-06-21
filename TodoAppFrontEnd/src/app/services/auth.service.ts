import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments/enviroment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${enviroment.apiUrl}/auth`;
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  constructor() { }

  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`,user);
  }

  isLoggedIn(): boolean {
    const token: string = this.tokenService.getToken();
    console.log("Token en auth service: " + token);
    if (!token) return false;

    // Opcional: verificar expiración manual
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp;
    const now = Math.floor(Date.now() / 1000);

    return expiration > now;
  }
}
