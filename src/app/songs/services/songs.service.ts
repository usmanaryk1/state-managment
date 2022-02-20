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
}