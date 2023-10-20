import { Body, Controller, Post, Get, Param, Put, Delete, UseInterceptors, UploadedFile  } from '@nestjs/common';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UsersService } from '../../services/users/users.service';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { Public } from 'src/Decorators/IsPublic';

@Controller('user')
export class UsersController {

    constructor(private userService: UsersService) { }
    
    @Get('all')
    getAllUsers() {
        return this.userService.getAllUser()
    }

    @Public()
    @Post()
    createUser(@Body() userData: CreateUserDto)  {
        return this.userService.create(userData)
    }

    @Get(':id')
    getUserById(@Param('id') userId: string) {
        return this.userService.getUserById(userId)
    }

    @Put(':id')
    updateUserById(@Param('id') userId: string,@Body() userData: UpdateUserDto) {
        return this.userService.updateUserById(userId, userData)
    }

    @Delete(':id')
    deleteUserById(@Param('id') userId: string) {
        return this.userService.deleteUserById(userId)
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'uploads',
            filename: (req, file, cb) => {
                cb(null,  Date.now() + '' + file.originalname)
            }
        })
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { file: file.path }
    }

}
