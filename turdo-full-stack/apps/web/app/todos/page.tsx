import React from "react";
import { trpc } from "../../trpc/client";
import CreateTodo from "./CreateTode";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    description: string;
    priority?: string;
    dueDate?: string;
    // Add other fields as needed
}

interface TodosQueryResult {
    data: Todo[] | undefined;
}

interface UpdateTodoInput {
    id: string;
    date: {
        completed:boolean;
    };
}

interface DeleteTodoInput {
    id: string;
}

export default function Todos(): React.JSX.Element {
    const { data: todos }: TodosQueryResult = trpc.todo.getAllTodos.useQuery();

    const updateMutation = trpc.todo.updateTodo.useMutation<unknown, unknown, UpdateTodoInput>();

    const deleteMutation = trpc.todo.deleteTodo.useMutation<unknown, unknown, DeleteTodoInput>();
    
    const handleTaggle = (todoId: string, completed: boolean): void => {
        updateMutation.mutate({
            id: todoId,
            date: {
                completed
            }
        });
    };

    const handleDelete = (todoId: string): void => {
        if (confirm("Are you sure you want to delete this todo?")) {
            deleteMutation.mutate({ id: todoId });
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <CreateTodo />
            {
                todos?.map((todo: Todo) => (   
                    <div className="border p-4 rounded shadow-md flex justify-between items-center" key={todo.id}>
                        <div className="flex flex-col">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 text-blue-500"
                                checked={todo.completed}
                                onChange={() => handleTaggle(todo.id, todo.completed)}
                            />
                            <h3 className={`text-lg font-semibold ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                                {todo.title}
                            </h3>
                            <p className="text-gray-700">{todo.description}</p>
                            <div className="text-sm text-gray-500">
                                {todo.dueDate && (
                                    <span>
                                        Due: {new Date(todo.dueDate).toLocaleDateString()}  
                                    </span>)}
                                    {
                                        todo.priority && (
                                            <span className="ml-2">
                                                Priority: {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                            </span>
                                        )
                                    }
                        </div>
                        </div>
                        <button
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(todo.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            }
        </div>
    );
}