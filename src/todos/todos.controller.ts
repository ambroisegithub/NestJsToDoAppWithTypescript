import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { Roles } from '../users/auth/roles.decorator';
import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  create(@Body() dto: CreateTodoDto) {
    return this.todosService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  findMany() {
    return this.todosService.findMany();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  update(@Param('id') id: number, @Body() dto: CreateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.todosService.delete(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'user')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }
}

// import { CreateTodoDto } from './dtos/create-todo.dto';
// import { TodosService } from './todos.service';
// import {
//   Body,
//   Controller,
//   Post,
//   Get,
//   Put,
//   Param,
//   Delete,
// } from '@nestjs/common';

// @Controller('todos')
// export class TodoController {
//   constructor(private readonly todosService: TodosService) {}

//   @Post()
//   create(@Body() dto: CreateTodoDto) {
//     return this.todosService.create(dto);
//   }

//   @Get()
//   findMany() {
//     return this.todosService.findMany();
//   }

//   @Put(':id')
//   update(@Param('id') id: number, @Body() dto: CreateTodoDto) {
//     return this.todosService.update(id, dto);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: number) {
//     return this.todosService.delete(id);
//   }

//   @Get(':id') // Route parameter for the Todo ID
//   findOne(@Param('id') id: number) {
//     return this.todosService.findOne(id);
//   }
// }
