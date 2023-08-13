import { Module } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodosService],
})
export class TodosModule {}
