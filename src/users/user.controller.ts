import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './dto/crate-user.dto';
import { UsersService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
@Controller('users')
@ApiTags('users') 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('signup')
  @ApiOperation({ summary: 'Create a new user' }) // Add an operation summary
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User successfully created', type: User })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = await this.usersService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully logged in', type: User })
  async login(@Body() loginData: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved users', type: [User] })
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Successfully retrieved user', type: User })
  async getUser(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully updated', type: User })
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User successfully deleted' })
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
