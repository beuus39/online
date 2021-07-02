import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UserService} from "../../services/user/user.service";
import {ApiOkResponse, ApiOperation} from "@nestjs/swagger";
import {User} from "../../entities/user.interface";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiOperation({
        description: "Add users"
    })
    @ApiOkResponse({})
    @HttpCode(HttpStatus.OK)
    async addAllUsers(@Body() users: User[]) {
        return this.userService.addListUser(users)
    }

    @Get()
    @ApiOperation({
        description: "Get all users"
    })
    @ApiOkResponse({})
    @HttpCode(HttpStatus.OK)
    async getAllUsers() {
        return this.userService.getAllUsers()
    }
}
