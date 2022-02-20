import { Component,OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from 'src/app/store';
import { SongsService } from '../../services/songs.service';

@Component({
 selector:'songs-listened',
 template:`
 <div class="songs">

    <songs-list
    [list]="listened"
    (toggle)="onToggle($event)" >
    Played<!--content projection means pass data to show in ng-content-->
    </songs-list>

 </div>
 `
})

export class SongsListenedComponent implements OnInit{

    listened$:Observable<any[]>
    listened;
    constructor(
    private store:Store,
    private songsService:SongsService
    ){}

    ngOnInit(){
        this.listened$=this.store.select('playlist');
        console.log(this.listened$);
        this.listened$.subscribe(playlist=> {if(playlist){this.listened=playlist.filter(track=> track.listened)}})

        //no need to called the service because it is called from playlist only need once, play list is a kind of main component playlist must need thats way called from here.
        // this.subscription=this.songsService.getPlayList$.subscribe();

        
    }
    onToggle(event){
        this.songsService.toggle(event);//we are going to change it from service so store will update auto
    }
}
