import { UnauthorizedException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }
    
    async signIn(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        if (!user)
            throw new NotFoundException('User Not Found');
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            throw new UnauthorizedException('Wrong user credentials')
        
        return {
            token: await this.jwtService.signAsync({id:user._id})
        }
        
    }
}
