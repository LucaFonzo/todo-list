import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private token: string = "";
  constructor() { }

  setToken(newToken: string) {
    console.log(`Setting token: ${newToken}`)
    this.token = newToken;
  }

  getToken(): string {
    return this.token;
  }
}
