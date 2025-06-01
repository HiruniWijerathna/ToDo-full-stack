import { Mutation, Query, Router, Input } from "nestjs-trpc";
import { TodosService } from "./todos.service";
import { date, z } from "zod";
import { CreateTodoInput, createTodoSchema, todoSchema } from "./todo.schema";

@Router({ alias: "todos" })
export class TodosRouter {
    constructor(private readonly todosService: TodosService) {}

    @Query({
        input: z.object({ id: z.string() }),
        output: todoSchema
    })
    getTodoById(@Input('id')id: string){
        return this.todosService.getTodoById(id);
    }

    @Query({
        output: z.array(todoSchema)
    })
    getAllTodos() {
        return this.todosService.getAllTodos();
    }

    @Mutation({
        input:createTodoSchema,
        output: todoSchema
    })
    createTodo(@Input() todoDate: CreateTodoInput) {
        return this.todosService.createTodo(todoDate);
    }
    
    @Mutation({
        input: z.object({ 
            id: z.string(),
        date: createTodoSchema.partial()}),
        output: todoSchema
    })
    updateTodo(@Input('id') id: string, @Input('date') date: Partial<CreateTodoInput>,
) {
        return this.todosService.updateTodo(id, date);
    }

    @Mutation({
        input: z.object({ 
            id: z.string() 
        }),    
        output: z.boolean()
    })
    deleteTodo(
        @Input('id') id: string
    ) {
        return this.todosService.deleteTodo(id);
    }
}