import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { ServiceManager } from "./serviceManager";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(private serviceManager: ServiceManager) { 


    // console.log("Service found");
  }


  getNewReleasesByCountry(){

    // const cabecera = new HttpHeaders({
    //   'authorization' : 'Bearer BQB4RSIB90dHnFKpfJ48bd7HCFYt9CKrwJ-BEPqfv49MnwUP2gN7DZTrfiPrXALdjDuiIg4pWVug9b17RaA'
    // });

   const parametros = new HttpParams().set("country","JP");

    return this.serviceManager.Get('/v1/browse/new-releases',parametros)
                              .pipe(map(data => {
                                return data['albums'].items
                              }));

    // return this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers: cabecera, params:parametros})
                    // .pipe(map(data => {
                    //   return data['albums'].items
                    // }))
  }

  

 
}
