import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs';
import { filter ,map} from 'rxjs/operators';
import { Store } from 'src/app/store';
import { SongsService } from '../../services/songs.service';

@Component({
 selector:'songs-favourites',
 template:`
 <div class="songs">

    <songs-list
    [list]="favourites" 
    (toggle)="onToggle($event)">
    Favourites<!--content projection means pass data to show in ng-content-->
    </songs-list>

 </div>
 `
})

export class SongsFavouritesComponent implements OnInit{

    favourites$:Observable<any[]>
    favourites;
    constructor(
        private store:Store,
        private songsService:SongsService
    ){}

        
    ngOnInit(){
        this.favourites$=this.store.select('playlist')
        // not working why? (
        // .filter(Boolean)//only run this infact there is only have a data;//this is not a just filter, it is a part of observable stream
        // .map(playlist=> playlist.filter(track=> track.favourite))//here playlist has a db.json array and filter is only a filter method  not a part of observable stream
        // console.log(this.favourites$);
        // )

        this.favourites$.subscribe(playlist=> {if(playlist){this.favourites=playlist.filter(track=> track.favourite)}})
        //no need to called the service because it is called from playlist only need once, play list is a kind of main component playlist must need thats way called from here.
        // this.subscription=this.songsService.getPlayList$.subscribe();


}
    onToggle(event){
        this.songsService.toggle(event);//we are going to change it from service so store will update auto
    }
}