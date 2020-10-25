import { Todo } from 'src/app/models/Todo';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos.listArr;
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(task => task.ROWID !== todo.ROWID);
    this.todoService.deleteTodoOnDb(todo).subscribe();
  }
  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(res => {
        this.todos.push(res.todoData);
    });
  }

}
