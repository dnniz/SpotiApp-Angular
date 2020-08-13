import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { 
    console.log("Service found");
  }

  getNewReleasesByCountry(){

    const cabecera = new HttpHeaders({
      'authorization' : 'Bearer BQAQ4L0gQEVo71hJMjxTvxO2PdILCJzNAAMEIj8mYYKHn_WdAiQdQkSkkBeTJIrR034yeQFITswbeH92ggE'
    });

    const parametros = new HttpParams().set("country","JP");

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers: cabecera, params:parametros});
  }
}
