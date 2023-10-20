import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth-controller/auth-controller.controller';
import { AuthService } from './servies/auth/auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'THIS_IS_MY_SECRET_KEY_FOR_MY_APP'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
