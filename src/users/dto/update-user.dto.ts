import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './crate-user.dto';
export class UpdateUserDto extends PartialType(CreateUserDto) {}
