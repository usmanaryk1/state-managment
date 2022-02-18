import { Component } from '@angular/core';
import { Store } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stateManagementNgrxStore';

  todos$ = this.store.select<any[]>('todos');
  
  constructor(private store:Store){
    // console.log(this.store);
    this.store.set('todos', [{id:1, name:'usman'},{id:2, name:'adnan'}])
    // this.todos$.subscribe(ok=> console.log(ok))
  }
  
}
