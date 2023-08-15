// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// // import { AuthService } from './users/auth/auth.service';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// // import { UsersModule } from './users/user.module';
// import { UsersModule } from '../user.module';
// import * as dotenv from 'dotenv';

// dotenv.config(); // Load environment variables from .env

// @Module({
//   imports: [
//     UsersModule, // Import the UsersModule to access the UsersService
//     JwtModule.register({
//       secret: process.env.JWT_SECRET_KEY, // Replace with your secret key
//       signOptions: { expiresIn: '1h' }, // Token expiration time
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
// })
// export class AuthModule {}

// sudo systemctl stop apache2


import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule, // Import the UsersModule
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

