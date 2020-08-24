import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


const SERVICE_ENVIROMENT = {
    DEV: "https://api.spotify.com",
    PROD: "",
};

const API_DOMAIN = SERVICE_ENVIROMENT.DEV;



@Injectable()
export class ServiceManager {

constructor(private http: HttpClient) {
    if(this.getTokenOnStorage() === null){
      this.saveTokenOnStorage()
    }
}


Get(url: string, parametros: HttpParams) {
    // let { url = null} = params;
    
    let tokenAuth = this.getTokenOnStorage();
    const cabecera = new HttpHeaders({
        'authorization' : `Bearer ${tokenAuth}`
      });
    
    
    return this.http.get(`${API_DOMAIN}${url}`, {headers:cabecera, params:parametros});
}

Post(url: string, body: any){

    let tokenAuth = this.getTokenOnStorage();

    let headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
        'authorization' : `Bearer ${tokenAuth}`
    });

    //  const headers = { 'Authorization': 'Bearer ${tokenAuth}' }
    // const body = { title: 'Angular POST Request Example' }
    return this.http.post<any>(`${API_DOMAIN}${url}`, body, { headers });
}

saveTokenOnStorage():void{
    
    let headers = new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
    .set('grant_type', "client_credentials")
    .set('client_id', "b9f7ffcb5b324ca39882945628412109")
    .set('client_secret', "4c059d4c03f8430fac5f61a24ae66c30");


     this.http.post('https://accounts.spotify.com/api/token', body.toString(), {headers} ).subscribe((data:any) =>{
        //  console.log("saveTokenOnStorage",data)
         localStorage.setItem('tokenAuth',data.access_token)
     });

}

  getTokenOnStorage() : string{
    return localStorage.getItem('tokenAuth');
  }

}
