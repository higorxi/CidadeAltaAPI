import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user.modules';
import { AuthModule } from './modules/auth.modules';
import { BadgeModule } from './modules/badge.modules';
import { GameScoreModule } from './modules/gameScore.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, 
    AuthModule,
    BadgeModule,
    GameScoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
