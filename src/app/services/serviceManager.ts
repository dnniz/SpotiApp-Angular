import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const SERVICE_ENVIROMENT = {
    DEV: "https://api.spotify.com",
    PROD: "",
    ACCOUNT: "https://accounts.spotify.com/api"
};

const API_DOMAIN = SERVICE_ENVIROMENT.DEV;
const API_ACCOUNT = SERVICE_ENVIROMENT.ACCOUNT;



@Injectable()
export class ServiceManager {

constructor(private http: HttpClient) {
    
}


Get(url: string, parametros: HttpParams) {

    let tokenAuth = this.getTokenOnStorage();
    const cabecera = new HttpHeaders({
        'authorization' : `Bearer ${tokenAuth}`
      });

    return this.http.get(`${API_DOMAIN}${url}`, {headers:cabecera, params:parametros})
    .pipe(catchError(err=>{return this.errorHandler(err)}));
}

Post(url: string, body: HttpParams){

    let tokenAuth = this.getTokenOnStorage();

    let headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        'authorization' : `Bearer ${tokenAuth}`
    });

    return this.http.post<any>(`${API_DOMAIN}${url}`, body, { headers })
    .pipe(catchError(err=>{return this.errorHandler(err)}));
}

errorHandler(error: HttpErrorResponse) {
  console.log("errorHandler2 ENTRO",error);
  switch (error.status) {
    case 401: 
    case 403: 
    console.log("ENTRO SWITCH");
      this.saveTokenOnStorage();
    break;
  }
  return throwError(error.message || "server error.");
}

saveTokenOnStorage():void{
  console.log("ENTRO EN saveTokenOnStorage")
  let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
  });

  const body = new HttpParams()
  .set('grant_type', "client_credentials")
  .set('client_id', "b9f7ffcb5b324ca39882945628412109")
  .set('client_secret', "4c059d4c03f8430fac5f61a24ae66c30");


   this.http.post(`${API_ACCOUNT}/token`, body.toString(), {headers} )
   .subscribe((data:any) =>{
    console.log("saveTokenOnStorage",data);
    localStorage.setItem('tokenAuth',data.access_token)
   });

}

getTokenOnStorage() : string{
  console.log("TOKEN VALID",localStorage.getItem('tokenAuth'));
   if(!localStorage.getItem('tokenAuth')){
    this.saveTokenOnStorage()
   }
   return localStorage.getItem('tokenAuth')
}





}
