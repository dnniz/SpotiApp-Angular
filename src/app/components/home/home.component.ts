import { Component, OnInit } from '@angular/core';
import { SpotifyService } from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  albumRelease: any[] = [];

  constructor(private spotifyService : SpotifyService
              )
  {

      this.spotifyService.getNewReleasesByCountry()
          .subscribe((data:any) => {
             this.albumRelease = data;
             console.log("ARRAY", this.albumRelease);
          })

         
  }

  ngOnInit(): void {
  }

}
