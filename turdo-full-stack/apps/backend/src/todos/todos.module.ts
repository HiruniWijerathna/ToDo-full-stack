import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosRouter } from './todo.router';

@Module({
    providers: [TodosService,TodosRouter],
})
export class TodosModule {}
