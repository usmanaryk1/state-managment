import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "src/app/store";
import { map , tap } from "rxjs/operators";//do have change into tap

import { api } from "src/app/app.module";
import { Observable } from "rxjs";

export interface Song{
    id:number,
    name:string,
    listened:boolean,
    favourite:boolean
}

@Injectable()
export class SongsService{

   
    
constructor(
    private store:Store,
    private http:HttpClient
){
    
    
        }

    // getPlayList$:Observable<Song[]>=this.http//not working
    getPlayList$=this.http
    .get( api + '/playlist')
    // .get('/api/playlist')
    .pipe(
     map(res=> res),//res.json()
     tap(next=> this.store.set('playlist',next))
    )

    toggle(event:any){
        //console.log(event);//has two object //{track: {…}}
                                            //track: {id: 2, artist: 'Pink Floyd', track: 'Wish You Were Here', listened: true, favourite: true}
                                            //[[Prototype]]: Object
        //console.log(event.track);//only track object will show like {id: 2, artist: 'Pink Floyd', track: 'Wish You Were Here', listened: true, favourite: true}
        //event comes from all 3 component playlist,listened and favourite. and all data is on one place so for all only one logic will be ok
        //communicate back to our api here (api + '/playlist') however we are going to hitt the individual track which we want to update
        this.http
        .put(`${api}/playlist/${event.track.id}` , event.track)
        .pipe(
         map(res=> res))//res.json() not working with pipe and without pipe map not workso json remove
        .subscribe((track:Song)=>{
            console.log("new object back after update the backend",track);
            // after updating the backend data has come back so now we gona tie that back into our store to complete the circle
            console.log(this.store, "old store data before update again", this.store.value.playlist);
            //get the previous value from store 
            const value=this.store.value.playlist;
            //replace nwe changes and then set the store
            const playlistAfterChanging=value.map((song:Song)=>{
                if(event.track.id === song.id){//we have loop of each song and we compare event.track.id to store data loop song.id
                 return {...song, ...event.track };   //event.track is the new one object which we hit from the component and song is old one fron store
                }else{
                    return song;//else return current song
                }
            })
            console.log("store is going to set with this playlistAfterChanging data",playlistAfterChanging);
            
            //now after changing the update we also update the store so our circle is completed now
            this.store.set('playlist', playlistAfterChanging)
            console.log("after set the store playlistAfterChanging data is",playlistAfterChanging);

        })
    }
}