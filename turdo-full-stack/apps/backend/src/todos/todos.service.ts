import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoInput, Todo } from './todo.schema';

@Injectable()
export class TodosService {
    private todos: Todo[] = [];

    getTodoById(id: string){
        const todo = this.todos.find((t) => t.id === id);
        if (!todo) {
            throw new NotFoundException('Todo not found.');
        }
        return todo;
    }

    getAllTodos() {
        return this.todos;
    }

    createTodo(
        todoDate:CreateTodoInput
    ){
        const todo:Todo = {
            ...todoDate,
            id: Math.random().toString(36).substring(2, 15),
            createdAt: new Date().toISOString(),
    };
        this.todos.push(todo);
        return todo;
    }
    
    updateTodo(id: string, date: Partial<CreateTodoInput>) {
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx === -1) {
            throw new NotFoundException('Todo not found.');
        }
        this.todos[idx] = {
            ...this.todos[idx],
            ...date,
        };
        return this.todos[idx];
    }
    deleteTodo(id: string) {
        const idx = this.todos.findIndex((t) => t.id === id);
        if (idx === -1) {
            throw new NotFoundException('Todo not found.');
        }
        this.todos.splice(idx, 1);
        return true;
    }

}
