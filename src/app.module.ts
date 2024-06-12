import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './modules/user.modules';
import { AuthModule } from './modules/auth.modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, 
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
