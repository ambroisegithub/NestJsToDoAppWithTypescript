import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The first name of the user' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'The last name of the user' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'The Email of the user' })
  email: string;

  @Column()
  @ApiProperty({ description: 'The Password of the user' })
  password: string; // Hashed password will be stored here

  @Column({ default: 'user' })  // Default role 'user'
  @ApiProperty({ description: 'The roles of the user', example: 'user,admin' })

  roles: string; // Store roles as a comma-separated string
}
