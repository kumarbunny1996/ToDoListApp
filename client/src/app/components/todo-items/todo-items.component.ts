import { TodoService } from './../../services/todo.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  //sets the class names in dynamic way
  setClassNames() {
    const classes = {
      todo: true,
      'is-completed': this.todo.completed,
    };
    return classes;
  }

  onToggle(todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodos(todo).subscribe();
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }

}
