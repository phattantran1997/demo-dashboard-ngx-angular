import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}
  getToken() {
    return localStorage.getItem("token");
  }

  getUsername(){
    return localStorage.getItem('username');
  }
}
