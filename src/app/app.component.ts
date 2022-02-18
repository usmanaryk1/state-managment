import { Component } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stateManagementNgrxStore';
  //2- and here we ask for the data
  todos$ = this.store.select<any[]>('todos');
  
  constructor(private store:Store){
    // console.log(this.store);
    //1-here we are populating the initializing date
    this.store.set('todos', [{id:1, name:'usman'},{id:2, name:'adnan'}])
    this.todos$.subscribe(ok=> console.log(ok))
  }
  //subsubbeanch
  //into 6thsubbranch
  //into 7thsubbranch
}
