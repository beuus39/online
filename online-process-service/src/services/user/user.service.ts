import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../entities/user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectModel("user") private readonly userModel: Model<User>
    ) {}

    async addListUser(users: User[]): Promise<any> {
        return this.userModel.insertMany(users)
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec()
    }
}
