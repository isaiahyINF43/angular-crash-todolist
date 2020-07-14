import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo'; //Need to import this from ./src/app/models/Todo.ts
import { TodoService } from '../../services/todo.service'; //Need to import this class from ./src/app/services/todo.service.ts

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  //We created this Todo in ./src/app/models/Todo.ts
  todos:Todo[]; //this.todos is an array of Todo objects
  constructor(private todoService:TodoService) { } //constructor with one parameter. todoService is the parameter bound to the imported TodoService class

  ngOnInit(): void {
    //this.todos = this.todoService.getTodos(); //Grab the todo data/todo list via the service. Can't do this way because asynchronous.
    this.todoService.getTodos().subscribe(response => {
      this.todos = response;
    })
  }

  deleteTodo(todo:Todo){
    console.log('help I\'ve been deleted');
    //Delete on UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //Delete on server
    this.todoService.deleteTodo(todo.id).subscribe(response => {
      console.log(response);
    })
  }

}
