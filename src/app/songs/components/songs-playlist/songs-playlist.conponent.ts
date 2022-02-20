import { Component, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs';
import { Store } from 'src/app/store';
import { SongsService } from '../../services/songs.service';

@Component({
 selector:'songs-playlist',
 template:`
 <div class="songs">

    <songs-list
    [list]="playlist$ | async" >
    Playlist<!--content projection means pass data to show in ng-content-->
    </songs-list>
    
 </div>
 `
})

export class SongsPlaylistComponent implements OnInit, OnDestroy{

    playlist$:Observable<any[]>
    subscription:Subscription;
    constructor(
    private store:Store,
    private songsService:SongsService
    ){}

    ngOnInit(){
        this.playlist$=this.store.select('playlist');
        console.log(this.playlist$);
        //called the service once
        this.subscription=this.songsService.getPlayList$.subscribe();

        
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        
    }
}