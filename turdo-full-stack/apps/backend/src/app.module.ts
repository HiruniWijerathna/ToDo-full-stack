import { Module } from '@nestjs/common';
import { TRPCModule } from 'nestjs-trpc';
import { TodosModule } from './todos/todos.module';
import { TodosService } from './todos/todos.service';



@Module({
  imports: [
 TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc/src/server',
    }),
 TodosModule

  ],
  controllers: [],
  providers: [TodosService],
})
export class AppModule {}
