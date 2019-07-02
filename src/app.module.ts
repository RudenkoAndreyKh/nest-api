import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './games/games.controller';
import { GamesService } from './games/games.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';

@Module({
  imports: [],
  controllers: [AppController, GamesController, AuthController, UsersController],
  providers: [AppService, GamesService, AuthService, UserService],
})
export class AppModule { }
