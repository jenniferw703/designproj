import { HttpHeaders } from "@angular/common/http";

export const endpoint = "http://api.ece496.com";
//export const endpoint = "http://localhost:8000";

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // params: _params,
    withCredentials: true
  }