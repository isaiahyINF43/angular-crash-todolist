import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic Classes
  setClasses() {
    console.log('setClasses() called');
    let classes = {
      'todo': true, //Always add todo class. this is connected with the stuff in todo-item.component.css
      'is-complete': this.todo.completed //Only add is-complete class if input todo is completed. this is connected with the stuff in todo-item.component.css
    }
    return classes;
  }

  onToggle(todo) {
    //Toggle in UI
    console.log('toggle');
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(response => console.log(response));
  }

  onDelete(todo) {
    console.log('delete');
    this.deleteTodo.emit(todo); //Tell todos component that we've deleted an item
  }
}
