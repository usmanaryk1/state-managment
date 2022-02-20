import { Component , Input, Output,EventEmitter} from "@angular/core";

import { Song } from "../../services/songs.service";
@Component({
    selector: 'songs-list',
    styleUrls:['./songs-list.component.scss'],
    template:`
    <div class="songs-list">
        <h3>
        <ng-content></ng-content>
        </h3>

        <ul>
            <li *ngFor="let item of list; index as i">
                <p>{{item.artist}}</p>
                <span>{{item.track}}</span>
                
                <div 
                 class="songs-list__favourite"
                 (click)="toggleItem(i, 'favourite')"
                 [class.active]="item.favourite">
                </div>

                <div 
                 class="songs-list__listened"
                 (click)="toggleItem(i, 'listened')"
                 [class.active]="item.listened">
                </div>
            </li>
        </ul>

    </div>
    `
})

export class SongsListComponent{

@Input()
// list:Song[];//item.track not exist in Song interface error
list:any

@Output()

toggle= new EventEmitter<any>();

toggleItem(index:number, listenedOrfavouriteDynamicly:string){
    const track = this.list[index]//get the item of clicked from list
    this.toggle.emit({
        track:{...track , [listenedOrfavouriteDynamicly]: !track[listenedOrfavouriteDynamicly]} //means items clicked and invert property listened or favourite like[listened]: !track[listened] neams (true to false or false to true favourite or listened)
    })
}
}