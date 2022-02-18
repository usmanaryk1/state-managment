/*

add value in store 
Store.set('todos', [{},{}] );

get value from store
Store.select('todos');

*/
import { BehaviorSubject } from "rxjs";
import {  Observable } from "rxjs";
import { pluck } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

import { State } from './state';

// act as initial state of an application and BehaviourSubject needs initial state
const state: State = {
    playlist: undefined
  };
  

//export store to availabe globally to use other components so import in app.module.ts and declear in providers:[Store]
export class Store {

// initialize the state with BehaviorSubject
//behaviourSubject takes initial state and allows us to create initial state and also its passed the last value to any new subscriber to our store
private subject = new BehaviorSubject<State>(state);

//asObservable givs us BehaviourSubject as an obsevable so what we can do pass new values or obtain the value from our store
//on dupllicate value distinctUntilChanged not notify to any subscriber to our store means not get fire twice on same value
// private store = this.subject.asObservable().distinctUntilChanged();//distinctUntilChanged not work without .pipe(distinctUntilChanged())
private store = this.subject.asObservable().pipe(distinctUntilChanged());

// gives us value to our store like store.value
get value(){
    return this.subject.value;
}

//ask for particularly property from store //how to get value now store.select<Todo[]>('todos'); // this will return an observable 
select<T>(name:string):Observable<any>{
    // return this.store.pluck(name);//pluk('name') not work without .pipe(pluck('name'))
    return this.store.pipe(pluck(name));//pluck=>fetch only one property from our store
}

//set value to our store
set(name:string, state:any){
    this.subject.next({
        ...this.value, [name]:state //set property dynamically and if not exist so we create it and [name]:state=>state.set('todos' , [{},{}]) means (('todos' is [name] , [{},{}] is :state))
    });
}


}