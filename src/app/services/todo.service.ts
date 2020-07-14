import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import { Todo } from '../models/Todo';

//????? Need to learn about this syntax
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=5';

  constructor(private http:HttpClient) { }



  //Our data is retrieved through this service
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`); //get data from the url + concatenated with a string for limiting # of results
    
    /*Old stuff. Hardcoded data
    return
    [
      {
        id: 1,
        title: 'xcom wotc',
        completed: true
      },
      {
        id: 2,
        title: 'bullshit rng',
        completed: false
      }
    ]
    */
  }

  //Toggle Completed
  toggleCompleted(todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }


  //Deleted
  deleteTodo(id:number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }
}
