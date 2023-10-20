import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        
        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword
        });
        return await createdUser.save();
    }

    async getAllUser(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found')
        return user;
    }

    async getUserByEmail(email: string): Promise<UserDocument> {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException('User Not Found');
        return user;
    }

    async updateUserById(id: string, userData: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, userData, {
            new: true,
            runValidators: true
        });
    }

    async deleteUserById(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete(id)
    }
}
