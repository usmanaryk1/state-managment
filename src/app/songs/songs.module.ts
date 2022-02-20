import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import{ HttpClientModule} from '@angular/common/http';//HttpModuel is deprecated in v7 use HttpClientModule instead
import { SongsFavouritesComponent } from './components/songs-favourites/songs-favourites.component';
import { SongsListenedComponent } from './components/songs-listened/songs-listened.component';
import { SongsPlaylistComponent } from './components/songs-playlist/songs-playlist.conponent';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import {SongsService} from './services/songs.service'
@NgModule({
 imports:[
     CommonModule,
    //  HttpModule//is deprecated in v7 use HttpClientModule now
    HttpClientModule
 ],
 providers:[
     SongsService
 ],
 declarations:[
    SongsListComponent,
     SongsFavouritesComponent,
     SongsListenedComponent,
     SongsPlaylistComponent
 ],
 exports:[
    SongsListComponent,
    SongsFavouritesComponent,
    SongsListenedComponent,
    SongsPlaylistComponent
]
})

export class SongsModule{

}