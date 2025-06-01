import { trpc } from "../../trpc/client";
import CreateTodo from "./CreateTode";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    // Add other fields as needed
}

interface TodosQueryResult {
    data: Todo[] | undefined;
}

interface UpdateTodoInput {
    id: string;
    date: {
        completed: boolean;
    };
}

interface DeleteTodoInput {
    id: string;
}

export default function Todos(): JSX.Element {
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
                            <input type="text" name=" " id="" />
                            <div/>
                        </div>
                    </div>
                ))
            }            
        </div>
    );
}