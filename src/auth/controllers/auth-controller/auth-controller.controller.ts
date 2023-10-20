import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../servies/auth/auth.service';
import { SingInDto } from 'src/auth/dtos/singIn.dto';
import { Public } from 'src/Decorators/IsPublic';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userData: SingInDto) {
        return this.authService.signIn(userData.email, userData.password)
    }
}
