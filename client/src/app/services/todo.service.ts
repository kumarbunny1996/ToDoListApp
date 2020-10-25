import { Todo } from 'src/app/models/Todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get<any>('/api/todos');
  }

  addTodo(todo: Todo): Observable<any> {
    return this.http.post('/api/addTask', todo, httpOptions);
  }

  updateTodos(todo: Todo): Observable<any> {
    return this.http.put(`/api/updateTask?rowId=${todo.ROWID}`, todo, httpOptions);
  }

  deleteTodoOnDb(todo: Todo): Observable<any> {
    return this.http.delete(`/api/deleteTask?rowId=${todo.ROWID}`);
  }

}
