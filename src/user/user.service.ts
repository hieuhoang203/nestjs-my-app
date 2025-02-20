import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "./user.schema";
import { UserDto } from "src/user/user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()

export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {}

    async findAll() : Promise<User[]> {
        const users = this.userModel.find().exec();
        if(!users) {
            throw new Error('No users found');
        }
        return users;
    }

    async detail(id : string) : Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async update(id : string, dto : Partial<UserDto>) : Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(id, dto, {new:true}).exec();
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async delete(id : string) : Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if(!user) {
            throw new Error('User not found');
        }
        return user;
    }

};

export default UserService;