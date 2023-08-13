import { Module } from '@nestjs/common';
import  { Todo } from  './todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {}
